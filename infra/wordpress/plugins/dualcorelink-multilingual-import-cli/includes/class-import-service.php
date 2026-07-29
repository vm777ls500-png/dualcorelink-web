<?php

final class DualCoreLink_Multilingual_Import_Service
{
    private DualCoreLink_Import_Repository $repository;
    private DualCoreLink_Import_Run_Store $store;

    public function __construct(
        DualCoreLink_Import_Repository $repository,
        DualCoreLink_Import_Run_Store $store
    ) {
        $this->repository = $repository;
        $this->store = $store;
    }

    public static function load_payload(string $file): array
    {
        if ($file === '' || !is_file($file) || !is_readable($file)) {
            throw new DualCoreLink_Import_Exception(
                'Payload file is missing or unreadable.',
                DualCoreLink_Import_Config::EXIT_ARGUMENTS
            );
        }
        $contents = file_get_contents($file);
        if (!is_string($contents) || strlen($contents) > 5 * 1024 * 1024) {
            throw new DualCoreLink_Import_Exception(
                'Payload file is empty or exceeds the five-megabyte limit.',
                DualCoreLink_Import_Config::EXIT_ARGUMENTS
            );
        }
        $payload = json_decode($contents, true);
        if (!is_array($payload) || !array_is_list($payload)) {
            throw new DualCoreLink_Import_Exception(
                'Payload must be a JSON array.',
                DualCoreLink_Import_Config::EXIT_ARGUMENTS
            );
        }
        return $payload;
    }

    private static function required_text(array $record, string $key): bool
    {
        return isset($record[$key]) && is_string($record[$key]) &&
            trim($record[$key]) !== '' && strlen($record[$key]) <= 200000;
    }

    private static function validate_structure(array $record, array &$errors): void
    {
        $id = (int) ($record['sourceEnglishContentId'] ?? 0);
        $content = $record['translatedStructuredContent'] ?? null;
        if (!is_array($content)) {
            $errors[] = "missing structured content: {$id}";
            return;
        }
        foreach (['eyebrow', 'h1', 'introduction', 'breadcrumbLabel'] as $key) {
            if (!isset($content[$key]) || !is_string($content[$key]) || trim($content[$key]) === '') {
                $errors[] = "missing structured field {$key}: {$id}";
            }
        }
        if (empty($content['sections']) || !is_array($content['sections'])) {
            $errors[] = "missing structured sections: {$id}";
        }
        if (empty($content['faqs']) || !is_array($content['faqs'])) {
            $errors[] = "missing structured FAQs: {$id}";
        }
        if (empty($content['relatedLinks']) || !is_array($content['relatedLinks'])) {
            $errors[] = "missing related links: {$id}";
        }
        if (empty($content['cta']) || !is_array($content['cta'])) {
            $errors[] = "missing CTA: {$id}";
        }
    }

    private static function comparable_actual(array $actual, array $mapped): array
    {
        $acf = [];
        foreach (array_keys($mapped['acf']) as $key) {
            $acf[$key] = $actual['acf'][$key] ?? null;
        }
        $meta = [];
        foreach (DualCoreLink_Import_Config::META_KEYS as $key) {
            $meta[$key] = $actual['meta'][$key] ?? null;
        }
        return [
            'post_type' => $actual['post_type'],
            'slug' => $actual['slug'],
            'status' => $actual['status'],
            'core' => [
                'post_title' => $actual['core']['post_title'] ?? null,
                'post_name' => $actual['core']['post_name'] ?? null,
                'post_excerpt' => $actual['core']['post_excerpt'] ?? null,
                'post_content' => $actual['core']['post_content'] ?? null,
                'post_status' => $actual['core']['post_status'] ?? null,
            ],
            'acf' => $acf,
            'meta' => $meta,
        ];
    }

    private static function comparable_mapped(array $mapped): array
    {
        return [
            'post_type' => $mapped['post_type'],
            'slug' => $mapped['slug'],
            'status' => $mapped['status'],
            'core' => $mapped['core'],
            'acf' => $mapped['acf'],
            'meta' => $mapped['meta'],
        ];
    }

    private static function flatten($value, string $prefix = ''): array
    {
        if (!is_array($value) || array_is_list($value)) {
            return [$prefix => $value];
        }
        $output = [];
        foreach ($value as $key => $child) {
            $child_prefix = $prefix === '' ? (string) $key : $prefix . '.' . $key;
            $output += self::flatten($child, $child_prefix);
        }
        return $output;
    }

    public static function field_diff($before, $after): array
    {
        $left = self::flatten($before);
        $right = self::flatten($after);
        $keys = array_values(array_unique(array_merge(array_keys($left), array_keys($right))));
        sort($keys, SORT_STRING);
        $diff = [];
        foreach ($keys as $key) {
            $before_value = $left[$key] ?? null;
            $after_value = $right[$key] ?? null;
            if (DualCoreLink_Import_Config::canonical_json($before_value) !==
                DualCoreLink_Import_Config::canonical_json($after_value)) {
                $diff[$key] = ['before' => $before_value, 'after' => $after_value];
            }
        }
        return $diff;
    }

    public function preflight(array $payload, string $locale, string $batch): array
    {
        $errors = [];
        if ($locale !== DualCoreLink_Import_Config::LOCALE ||
            $batch !== DualCoreLink_Import_Config::BATCH) {
            $errors[] = 'locale/batch whitelist mismatch';
        }
        if (count($payload) !== DualCoreLink_Import_Config::RECORD_COUNT) {
            $errors[] = 'payload must contain exactly seven records';
        }
        $ids = [];
        $slugs = [];
        foreach ($payload as $record) {
            if (!is_array($record)) {
                $errors[] = 'payload record must be an object';
                continue;
            }
            $id = (int) ($record['sourceEnglishContentId'] ?? 0);
            $ids[] = $id;
            $post_type = (string) ($record['contentType'] ?? '');
            $slug = (string) ($record['localizedSlug'] ?? '');
            $slugs[] = $post_type . ':' . $slug;
            $unknown = array_diff(array_keys($record), DualCoreLink_Import_Config::ALLOWED_PAYLOAD_KEYS);
            if ($unknown) {
                $errors[] = 'unmapped fields: ' . implode(',', $unknown);
            }
            $approved = DualCoreLink_Import_Config::APPROVED[$id] ?? null;
            if (!$approved ||
                $approved['post_type'] !== $post_type ||
                $approved['slug'] !== ($record['sourceEnglishSlug'] ?? null) ||
                $approved['slug'] !== $slug) {
                $errors[] = "unapproved identity: {$id}";
            }
            if (($record['locale'] ?? null) !== DualCoreLink_Import_Config::LOCALE ||
                ($record['batch'] ?? null) !== DualCoreLink_Import_Config::BATCH ||
                ($record['nativeReviewer'] ?? null) !== DualCoreLink_Import_Config::REVIEWER ||
                ($record['nativeReviewDate'] ?? null) !== DualCoreLink_Import_Config::REVIEW_DATE ||
                ($record['translationStatus'] ?? null) !== 'approved' ||
                ($record['reviewStatus'] ?? null) !== 'approved' ||
                ($record['nativeReviewStatus'] ?? null) !== 'approved' ||
                ($record['productionReleaseReady'] ?? null) !== true) {
                $errors[] = "release evidence mismatch: {$id}";
            }
            if (($record['deliveryMode'] ?? null) !== 'validated-import-payload' ||
                !array_key_exists('localizedContentId', $record) ||
                $record['localizedContentId'] !== null) {
                $errors[] = "invalid delivery envelope: {$id}";
            }
            foreach ([
                'sourceEnglishSlug',
                'localizedSlug',
                'importKey',
                'translatedTitle',
                'translatedDescription',
                'translatedSeoTitle',
                'translatedMetaDescription',
                'nativeReviewNotes',
            ] as $key) {
                if (!self::required_text($record, $key)) {
                    $errors[] = "missing or oversized field {$key}: {$id}";
                }
            }
            if (empty($record['translatedSpecifications']) ||
                !is_array($record['translatedSpecifications'])) {
                $errors[] = "missing translated specifications: {$id}";
            } else {
                foreach ($record['translatedSpecifications'] as $specification) {
                    if (!is_array($specification) ||
                        !self::required_text($specification, 'label') ||
                        !self::required_text($specification, 'value')) {
                        $errors[] = "invalid translated specification: {$id}";
                    }
                }
            }
            self::validate_structure($record, $errors);
            $source = $this->repository->get_source($post_type, $id);
            if (!$source) {
                $errors[] = "missing source: {$id}";
            } elseif ($source['status'] !== 'publish' ||
                $source['language'] !== 'en' ||
                $source['slug'] !== ($record['sourceEnglishSlug'] ?? null) ||
                $source['post_type'] !== $post_type) {
                $errors[] = "invalid English source: {$id}";
            }
            foreach ($this->repository->find_by_slug($post_type, $slug) as $collision) {
                if (isset($collision['language']) && (int) $collision['id'] === $id) {
                    continue;
                }
                if ((int) ($collision['meta'][DualCoreLink_Import_Config::META_SOURCE_ID] ?? 0) !== $id ||
                    ($collision['meta'][DualCoreLink_Import_Config::META_LOCALE] ?? '') !==
                        DualCoreLink_Import_Config::LOCALE) {
                    $errors[] = "localized slug conflict: {$slug}";
                }
            }
        }
        if (count(array_unique($ids)) !== count($ids)) {
            $errors[] = 'duplicate source ID';
        }
        if (count(array_unique($slugs)) !== count($slugs)) {
            $errors[] = 'duplicate localized slug';
        }
        $actual_ids = $ids;
        $expected_ids = array_keys(DualCoreLink_Import_Config::APPROVED);
        sort($actual_ids, SORT_NUMERIC);
        sort($expected_ids, SORT_NUMERIC);
        if ($actual_ids !== $expected_ids) {
            $errors[] = 'source ID whitelist mismatch';
        }
        if ($errors) {
            throw new DualCoreLink_Import_Exception(
                implode('; ', array_values(array_unique($errors))),
                DualCoreLink_Import_Config::EXIT_PREFLIGHT
            );
        }
        $payload_hash = DualCoreLink_Import_Config::payload_hash($payload);
        $mapped = [];
        $source_hashes = [];
        foreach ($payload as $record) {
            $mapped[] = DualCoreLink_Import_Renderer::map($record, $payload_hash);
            $source_hashes[(string) $record['sourceEnglishContentId']] =
                $this->repository->source_hash(
                    $record['contentType'],
                    (int) $record['sourceEnglishContentId']
                );
        }
        return [
            'status' => 'passed',
            'records' => count($mapped),
            'payload_hash' => $payload_hash,
            'mapped' => $mapped,
            'source_hashes' => $source_hashes,
            'writes' => 0,
        ];
    }

    public function apply(
        array $payload,
        string $locale,
        string $batch,
        string $status,
        string $run_id,
        string $confirm_run_id,
        bool $allow_update
    ): array {
        if (!DualCoreLink_Import_Config::valid_run_id($run_id)) {
            throw new DualCoreLink_Import_Exception(
                'Invalid run ID.',
                DualCoreLink_Import_Config::EXIT_ARGUMENTS
            );
        }
        if ($run_id !== $confirm_run_id || $status !== 'draft') {
            throw new DualCoreLink_Import_Exception(
                'Apply requires matching run confirmation and status=draft.',
                DualCoreLink_Import_Config::EXIT_SAFETY
            );
        }
        // Validate before the run root or lock file can be created. The same
        // payload is validated again after locking to close the race window.
        $initial_check = $this->preflight($payload, $locale, $batch);
        $this->store->acquire_lock();
        try {
            if ($this->store->exists($run_id)) {
                throw new DualCoreLink_Import_Exception(
                    'Run ID already exists.',
                    DualCoreLink_Import_Config::EXIT_CONFLICT
                );
            }
            $checked = $this->preflight($payload, $locale, $batch);
            if ($checked['payload_hash'] !== $initial_check['payload_hash']) {
                throw new DualCoreLink_Import_Exception(
                    'Payload changed between preflight and lock acquisition.',
                    DualCoreLink_Import_Config::EXIT_SAFETY
                );
            }
            $plan = [];
            $pre_images = [];
            foreach ($checked['mapped'] as $mapped) {
                $existing = $this->repository->find_localized(
                    $mapped['post_type'],
                    (int) $mapped['source_id'],
                    $locale,
                    $mapped['slug']
                );
                if (!$existing) {
                    $plan[] = ['operation' => 'created', 'mapped' => $mapped, 'existing' => null, 'diff' => []];
                    continue;
                }
                $diff = self::field_diff(
                    self::comparable_actual($existing, $mapped),
                    self::comparable_mapped($mapped)
                );
                if (!$diff) {
                    $plan[] = ['operation' => 'unchanged', 'mapped' => $mapped, 'existing' => $existing, 'diff' => []];
                } elseif (!$allow_update) {
                    throw new DualCoreLink_Import_Exception(
                        'Existing localized content differs: ' . $mapped['slug'],
                        DualCoreLink_Import_Config::EXIT_CONFLICT
                    );
                } else {
                    $pre_images[(string) $existing['id']] = $existing;
                    $plan[] = ['operation' => 'updated', 'mapped' => $mapped, 'existing' => $existing, 'diff' => $diff];
                }
            }
            $existing_batch = $this->repository->list_localized($locale, $batch);
            if (count($existing_batch) > DualCoreLink_Import_Config::RECORD_COUNT) {
                throw new DualCoreLink_Import_Exception(
                    'An eighth localized batch record already exists.',
                    DualCoreLink_Import_Config::EXIT_CONFLICT
                );
            }
            $this->store->initialize($run_id);
            $timestamp = gmdate('c');
            $this->store->write($run_id, 'request.json', [
                'run_id' => $run_id,
                'locale' => $locale,
                'batch' => $batch,
                'status' => 'draft',
                'allow_update' => $allow_update,
                'timestamp' => $timestamp,
                'payload' => $payload,
            ]);
            $this->store->write($run_id, 'preflight.json', [
                'status' => 'passed',
                'records' => $checked['records'],
                'payload_hash' => $checked['payload_hash'],
                'timestamp' => $timestamp,
            ]);
            $this->store->write($run_id, 'pre-image.json', [
                'records' => $pre_images,
                'timestamp' => $timestamp,
            ]);
            $this->store->write($run_id, 'checksums.json', [
                'payload_sha256' => $checked['payload_hash'],
                'source_sha256' => $checked['source_hashes'],
            ]);
            $operations = [];
            foreach ($plan as $planned) {
                if ($planned['operation'] === 'created') {
                    $actual = $this->repository->create($planned['mapped']);
                } elseif ($planned['operation'] === 'updated') {
                    $actual = $this->repository->update(
                        (int) $planned['existing']['id'],
                        $planned['mapped']
                    );
                } else {
                    $actual = $planned['existing'];
                }
                $operations[] = [
                    'source_id' => $planned['mapped']['source_id'],
                    'localized_id' => (int) $actual['id'],
                    'locale' => $locale,
                    'slug' => $planned['mapped']['slug'],
                    'post_type' => $planned['mapped']['post_type'],
                    'operation' => $planned['operation'],
                    'diff' => $planned['operation'] === 'created'
                        ? self::field_diff([], self::comparable_mapped($planned['mapped']))
                        : $planned['diff'],
                    'timestamp' => gmdate('c'),
                ];
                $this->store->write($run_id, 'operations.json', [
                    'status' => 'in_progress',
                    'operations' => $operations,
                ]);
            }
            $this->store->write($run_id, 'operations.json', [
                'status' => 'completed',
                'operations' => $operations,
                'timestamp' => gmdate('c'),
            ]);
            return [
                'status' => 'completed',
                'run_id' => $run_id,
                'payload_hash' => $checked['payload_hash'],
                'operations' => $operations,
            ];
        } catch (DualCoreLink_Import_Exception $exception) {
            throw $exception;
        } catch (Throwable $throwable) {
            throw new DualCoreLink_Import_Exception(
                'Apply failed: ' . $throwable->getMessage(),
                DualCoreLink_Import_Config::EXIT_APPLY
            );
        } finally {
            $this->store->release_lock();
        }
    }

    public function verify(string $run_id): array
    {
        try {
            $request = $this->store->read($run_id, 'request.json');
            $operations_log = $this->store->read($run_id, 'operations.json');
            $checksums = $this->store->read($run_id, 'checksums.json');
            if (($operations_log['status'] ?? '') !== 'completed') {
                throw new RuntimeException('Apply operations are incomplete.');
            }
            $payload = $request['payload'] ?? [];
            $checked = $this->preflight(
                $payload,
                (string) ($request['locale'] ?? ''),
                (string) ($request['batch'] ?? '')
            );
            if (($checksums['payload_sha256'] ?? '') !== $checked['payload_hash']) {
                throw new RuntimeException('Payload hash changed.');
            }
            foreach ($checked['source_hashes'] as $id => $hash) {
                if (($checksums['source_sha256'][$id] ?? '') !== $hash) {
                    throw new RuntimeException('English source hash changed: ' . $id);
                }
            }
            $mapped_by_source = [];
            foreach ($checked['mapped'] as $mapped) {
                $mapped_by_source[(string) $mapped['source_id']] = $mapped;
            }
            $verified = [];
            foreach ($operations_log['operations'] as $operation) {
                $actual = $this->repository->get_localized((int) $operation['localized_id']);
                $mapped = $mapped_by_source[(string) $operation['source_id']] ?? null;
                if (!$actual || !$mapped) {
                    throw new RuntimeException('Localized record is missing.');
                }
                $diff = self::field_diff(
                    self::comparable_actual($actual, $mapped),
                    self::comparable_mapped($mapped)
                );
                if ($diff) {
                    throw new RuntimeException(
                        'Localized field drift: ' . $operation['localized_id']
                    );
                }
                $verified[] = (int) $operation['localized_id'];
            }
            $batch_records = $this->repository->list_localized(
                DualCoreLink_Import_Config::LOCALE,
                DualCoreLink_Import_Config::BATCH
            );
            if (count($batch_records) !== DualCoreLink_Import_Config::RECORD_COUNT) {
                throw new RuntimeException('Localized batch is not exactly seven records.');
            }
            $result = [
                'status' => 'passed',
                'run_id' => $run_id,
                'records' => count($verified),
                'localized_ids' => $verified,
                'payload_hash' => $checked['payload_hash'],
                'timestamp' => gmdate('c'),
            ];
            $this->store->write($run_id, 'verify.json', $result);
            return $result;
        } catch (DualCoreLink_Import_Exception $exception) {
            throw $exception;
        } catch (Throwable $throwable) {
            throw new DualCoreLink_Import_Exception(
                'Verify failed: ' . $throwable->getMessage(),
                DualCoreLink_Import_Config::EXIT_VERIFY
            );
        }
    }

    public function publish(string $run_id, string $confirm_run_id): array
    {
        if ($run_id !== $confirm_run_id) {
            throw new DualCoreLink_Import_Exception(
                'Publish run confirmation mismatch.',
                DualCoreLink_Import_Config::EXIT_SAFETY
            );
        }
        $this->store->acquire_lock();
        try {
            if ($this->store->has($run_id, 'publish.json')) {
                return $this->store->read($run_id, 'publish.json');
            }
            if (!$this->store->has($run_id, 'verify.json')) {
                throw new RuntimeException('Publish requires a completed verify command.');
            }
            $verification = $this->verify($run_id);
            if (($verification['records'] ?? 0) !== DualCoreLink_Import_Config::RECORD_COUNT) {
                throw new RuntimeException('Publish requires seven verified drafts.');
            }
            $operations = $this->store->read($run_id, 'operations.json');
            foreach ($operations['operations'] as $operation) {
                $this->repository->set_status((int) $operation['localized_id'], 'publish');
            }
            $result = [
                'status' => 'published',
                'run_id' => $run_id,
                'records' => DualCoreLink_Import_Config::RECORD_COUNT,
                'localized_ids' => array_map(
                    static fn ($operation) => (int) $operation['localized_id'],
                    $operations['operations']
                ),
                'timestamp' => gmdate('c'),
            ];
            $this->store->write($run_id, 'publish.json', $result);
            return $result;
        } catch (DualCoreLink_Import_Exception $exception) {
            throw $exception;
        } catch (Throwable $throwable) {
            throw new DualCoreLink_Import_Exception(
                'Publish failed: ' . $throwable->getMessage(),
                DualCoreLink_Import_Config::EXIT_PUBLISH
            );
        } finally {
            $this->store->release_lock();
        }
    }

    public function rollback(string $run_id, string $confirm_run_id): array
    {
        if ($run_id !== $confirm_run_id) {
            throw new DualCoreLink_Import_Exception(
                'Rollback run confirmation mismatch.',
                DualCoreLink_Import_Config::EXIT_SAFETY
            );
        }
        $this->store->acquire_lock();
        try {
            if ($this->store->has($run_id, 'rollback.json')) {
                return $this->store->read($run_id, 'rollback.json');
            }
            $operations = $this->store->read($run_id, 'operations.json');
            $pre_images = $this->store->read($run_id, 'pre-image.json');
            foreach (array_reverse($operations['operations']) as $operation) {
                if ($operation['operation'] === 'updated') {
                    $snapshot = $pre_images['records'][(string) $operation['localized_id']] ?? null;
                    if (!is_array($snapshot)) {
                        throw new RuntimeException('Rollback pre-image is missing.');
                    }
                    $this->repository->restore($snapshot);
                } elseif ($operation['operation'] === 'created') {
                    $this->repository->set_status((int) $operation['localized_id'], 'draft');
                }
            }
            foreach ($operations['operations'] as $operation) {
                $actual = $this->repository->get_localized((int) $operation['localized_id']);
                if (!$actual) {
                    throw new RuntimeException('Rollback record cannot be read.');
                }
                if ($operation['operation'] === 'created' && $actual['status'] !== 'draft') {
                    throw new RuntimeException('Created record did not return to draft.');
                }
                if ($operation['operation'] === 'updated') {
                    $snapshot = $pre_images['records'][(string) $operation['localized_id']];
                    if (self::field_diff($actual, $snapshot)) {
                        throw new RuntimeException('Updated record pre-image restore drift.');
                    }
                }
            }
            $result = [
                'status' => 'rolled_back',
                'run_id' => $run_id,
                'records' => count($operations['operations']),
                'timestamp' => gmdate('c'),
            ];
            $this->store->write($run_id, 'rollback.json', $result);
            return $result;
        } catch (DualCoreLink_Import_Exception $exception) {
            throw $exception;
        } catch (Throwable $throwable) {
            throw new DualCoreLink_Import_Exception(
                'Rollback failed: ' . $throwable->getMessage(),
                DualCoreLink_Import_Config::EXIT_ROLLBACK
            );
        } finally {
            $this->store->release_lock();
        }
    }
}
