<?php

function wp_json_encode($value, $flags = 0)
{
    return json_encode($value, $flags | JSON_THROW_ON_ERROR);
}

function esc_html($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function esc_url($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$plugin_root = dirname(__DIR__, 2) .
    '/infra/wordpress/plugins/dualcorelink-multilingual-import-cli';
require_once $plugin_root . '/includes/class-config.php';
require_once $plugin_root . '/includes/class-renderer.php';
require_once $plugin_root . '/includes/interface-repository.php';
require_once $plugin_root . '/includes/class-run-store.php';
require_once $plugin_root . '/includes/class-import-service.php';

final class Mock_Import_Repository implements DualCoreLink_Import_Repository
{
    public array $sources = [];
    public array $localized = [];
    private int $next_id = 1000;

    public function __construct(array $payload)
    {
        foreach ($payload as $record) {
            $id = (int) $record['sourceEnglishContentId'];
            $this->sources[$id] = [
                'id' => $id,
                'post_type' => $record['contentType'],
                'slug' => $record['sourceEnglishSlug'],
                'status' => 'publish',
                'language' => 'en',
                'core' => [
                    'post_title' => 'English source ' . $id,
                    'post_name' => $record['sourceEnglishSlug'],
                    'post_status' => 'publish',
                ],
                'acf' => ['source_marker' => 'source-' . $id],
            ];
        }
    }

    public function get_source(string $post_type, int $source_id): ?array
    {
        $source = $this->sources[$source_id] ?? null;
        return $source && $source['post_type'] === $post_type ? $source : null;
    }

    public function source_hash(string $post_type, int $source_id): string
    {
        $source = $this->get_source($post_type, $source_id);
        return $source
            ? hash('sha256', DualCoreLink_Import_Config::canonical_json($source))
            : '';
    }

    public function find_by_slug(string $post_type, string $slug): array
    {
        return array_values(array_filter(
            array_merge(array_values($this->sources), array_values($this->localized)),
            static fn ($record) =>
                $record['post_type'] === $post_type && $record['slug'] === $slug
        ));
    }

    public function find_localized(string $post_type, int $source_id, string $locale, string $slug): ?array
    {
        $matches = array_values(array_filter(
            $this->localized,
            static fn ($record) =>
                $record['post_type'] === $post_type &&
                $record['slug'] === $slug &&
                (int) ($record['meta'][DualCoreLink_Import_Config::META_SOURCE_ID] ?? 0) === $source_id &&
                ($record['meta'][DualCoreLink_Import_Config::META_LOCALE] ?? '') === $locale
        ));
        if (count($matches) > 1) {
            throw new DualCoreLink_Import_Exception(
                'Duplicate localized identity.',
                DualCoreLink_Import_Config::EXIT_CONFLICT
            );
        }
        return $matches[0] ?? null;
    }

    public function list_localized(string $locale, string $batch): array
    {
        return array_values(array_filter(
            $this->localized,
            static fn ($record) =>
                ($record['meta'][DualCoreLink_Import_Config::META_LOCALE] ?? '') === $locale &&
                ($record['meta'][DualCoreLink_Import_Config::META_BATCH] ?? '') === $batch
        ));
    }

    private function from_mapped(int $id, array $mapped): array
    {
        return [
            'id' => $id,
            'post_type' => $mapped['post_type'],
            'slug' => $mapped['slug'],
            'status' => $mapped['status'],
            'core' => $mapped['core'],
            'acf' => $mapped['acf'],
            'meta' => $mapped['meta'],
        ];
    }

    public function create(array $mapped): array
    {
        $created = $this->from_mapped($this->next_id++, $mapped);
        $this->localized[$created['id']] = $created;
        return $created;
    }

    public function update(int $post_id, array $mapped): array
    {
        if (!isset($this->localized[$post_id])) {
            throw new RuntimeException('Missing localized record.');
        }
        $updated = $this->from_mapped($post_id, $mapped);
        $this->localized[$post_id] = $updated;
        return $updated;
    }

    public function set_status(int $post_id, string $status): void
    {
        if (!isset($this->localized[$post_id])) {
            throw new RuntimeException('Missing localized record.');
        }
        $this->localized[$post_id]['status'] = $status;
        $this->localized[$post_id]['core']['post_status'] = $status;
    }

    public function restore(array $snapshot): void
    {
        $this->localized[(int) $snapshot['id']] = $snapshot;
    }

    public function get_localized(int $post_id): ?array
    {
        return $this->localized[$post_id] ?? null;
    }
}

function fixture(): array
{
    $file = dirname(__DIR__) . '/fixtures/cms-import/zh-p0-reviewed.json';
    $payload = json_decode((string) file_get_contents($file), true);
    if (!is_array($payload)) {
        throw new RuntimeException('Fixture is invalid.');
    }
    return $payload;
}

function temporary_root(string $name): string
{
    return sys_get_temp_dir() . '/dualcorelink-import-' . $name . '-' . bin2hex(random_bytes(4));
}

function service(Mock_Import_Repository $repository, string $root): array
{
    $store = new DualCoreLink_Import_Run_Store($root);
    return [new DualCoreLink_Multilingual_Import_Service($repository, $store), $store];
}

function remove_tree(string $directory): void
{
    if (!is_dir($directory)) {
        return;
    }
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($directory, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($iterator as $item) {
        $item->isDir() ? rmdir($item->getPathname()) : unlink($item->getPathname());
    }
    rmdir($directory);
}

function expect_failure(callable $action, ?int $code = null): DualCoreLink_Import_Exception
{
    try {
        $action();
    } catch (DualCoreLink_Import_Exception $exception) {
        if ($code !== null && $exception->import_exit_code() !== $code) {
            throw new RuntimeException(
                "Expected exit code {$code}, got {$exception->import_exit_code()}."
            );
        }
        return $exception;
    }
    throw new RuntimeException('Expected operation to fail.');
}

function assert_true($condition, string $message = 'Assertion failed.'): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

function stringify_numeric_translation_meta(Mock_Import_Repository $repository): void
{
    foreach ($repository->localized as &$record) {
        foreach ([
            DualCoreLink_Import_Config::META_SCHEMA_VERSION,
            DualCoreLink_Import_Config::META_SOURCE_ID,
        ] as $key) {
            $record['meta'][$key] = (string) $record['meta'][$key];
        }
    }
    unset($record);
}

function verify_with_numeric_meta(
    string $name,
    string $key,
    $value
): DualCoreLink_Import_Exception {
    $payload = fixture();
    $repository = new Mock_Import_Repository($payload);
    $root = temporary_root($name);
    [$service] = service($repository, $root);
    $result = $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        $name,
        $name,
        false
    );
    $id = $result['operations'][0]['localized_id'];
    $repository->localized[$id]['meta'][$key] = $value;
    if ($key === DualCoreLink_Import_Config::META_SOURCE_ID) {
        // Keep preflight's slug-collision guard out of this focused verifier
        // normalization test so the whitelist error is exercised directly.
        $repository->localized[$id]['slug'] = 'numeric-meta-test-' . $name;
    }
    try {
        return expect_failure(fn () => $service->verify($name), 60);
    } finally {
        remove_tree($root);
    }
}

$tests = [];
$tests['preflight accepts exact 7/7 payload'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('preflight'));
    $result = $service->preflight($payload, 'zh', 'p0');
    assert_true($result['records'] === 7 && $result['writes'] === 0);
};
$tests['preflight rejects missing source'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    unset($repo->sources[48]);
    [$service] = service($repo, temporary_root('missing-source'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects eighth record'] = function (): void {
    $payload = fixture();
    $payload[] = $payload[0];
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('eighth'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects non-zh locale'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('locale'));
    expect_failure(fn () => $service->preflight($payload, 'de', 'p0'), 20);
};
$tests['preflight rejects non-p0 batch'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('batch'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p1'), 20);
};
$tests['preflight rejects reviewer mismatch'] = function (): void {
    $payload = fixture();
    $payload[0]['nativeReviewer'] = 'Unknown';
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('reviewer'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects review date mismatch'] = function (): void {
    $payload = fixture();
    $payload[0]['nativeReviewDate'] = '2026-07-30';
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('date'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects non-approved record'] = function (): void {
    $payload = fixture();
    $payload[0]['nativeReviewStatus'] = 'pending';
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('pending'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects duplicate source ID'] = function (): void {
    $payload = fixture();
    $payload[1]['sourceEnglishContentId'] = 48;
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('duplicate-id'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects string payload source ID'] = function (): void {
    $payload = fixture();
    $payload[0]['sourceEnglishContentId'] = '48';
    $repo = new Mock_Import_Repository(fixture());
    [$service] = service($repo, temporary_root('string-source-id'));
    $exception = expect_failure(
        fn () => $service->preflight($payload, 'zh', 'p0'),
        20
    );
    assert_true(str_contains(
        $exception->getMessage(),
        'sourceEnglishContentId must be an integer'
    ));
};
$tests['preflight rejects duplicate localized slug'] = function (): void {
    $payload = fixture();
    $payload[1]['localizedSlug'] = $payload[0]['localizedSlug'];
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('duplicate-slug'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects unrelated slug collision'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $repo->localized[999] = [
        'id' => 999,
        'post_type' => 'product',
        'slug' => $payload[0]['localizedSlug'],
        'status' => 'draft',
        'core' => [],
        'acf' => [],
        'meta' => [
            DualCoreLink_Import_Config::META_SOURCE_ID => 999,
            DualCoreLink_Import_Config::META_LOCALE => 'zh',
        ],
    ];
    [$service] = service($repo, temporary_root('collision'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects English overwrite envelope'] = function (): void {
    $payload = fixture();
    $payload[0]['localizedContentId'] = 48;
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('overwrite'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['preflight rejects unmapped field'] = function (): void {
    $payload = fixture();
    $payload[0]['unsafeField'] = 'not allowed';
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('unmapped'));
    expect_failure(fn () => $service->preflight($payload, 'zh', 'p0'), 20);
};
$tests['first apply creates seven drafts'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('create');
    [$service] = service($repo, $root);
    $result = $service->apply($payload, 'zh', 'p0', 'draft', 'create-001', 'create-001', false);
    assert_true(count($result['operations']) === 7);
    assert_true(count($repo->list_localized('zh', 'p0')) === 7);
    assert_true(count(array_filter($repo->localized, fn ($record) => $record['status'] === 'draft')) === 7);
    remove_tree($root);
};
$tests['second apply does not duplicate records'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('idempotent');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'idem-001', 'idem-001', false);
    $second = $service->apply($payload, 'zh', 'p0', 'draft', 'idem-002', 'idem-002', false);
    assert_true(count($repo->localized) === 7);
    assert_true(count(array_filter($second['operations'], fn ($op) => $op['operation'] === 'unchanged')) === 7);
    remove_tree($root);
};
$tests['changed existing content fails without allow-update'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('no-update');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'no-update-1', 'no-update-1', false);
    $changed = $payload;
    $changed[0]['translatedTitle'] .= ' 修订';
    expect_failure(
        fn () => $service->apply($changed, 'zh', 'p0', 'draft', 'no-update-2', 'no-update-2', false),
        30
    );
    remove_tree($root);
};
$tests['allow-update records field-level diff'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('allow-update');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'allow-001', 'allow-001', false);
    $changed = $payload;
    $changed[0]['translatedTitle'] .= ' 修订';
    $result = $service->apply($changed, 'zh', 'p0', 'draft', 'allow-002', 'allow-002', true);
    $updated = array_values(array_filter($result['operations'], fn ($op) => $op['operation'] === 'updated'));
    assert_true(count($updated) === 7);
    assert_true(isset($updated[0]['diff']['core.post_title']) || count($updated[0]['diff']) > 0);
    remove_tree($root);
};
$tests['verify detects localized field drift'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('drift');
    [$service] = service($repo, $root);
    $result = $service->apply($payload, 'zh', 'p0', 'draft', 'drift-001', 'drift-001', false);
    $id = $result['operations'][0]['localized_id'];
    $repo->localized[$id]['core']['post_title'] = 'drifted';
    expect_failure(fn () => $service->verify('drift-001'), 60);
    remove_tree($root);
};
$tests['verify accepts WordPress schema string one against payload integer'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('schema-string');
    [$service] = service($repo, $root);
    $result = $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        'schema-string',
        'schema-string',
        false
    );
    $id = $result['operations'][0]['localized_id'];
    $repo->localized[$id]['meta'][DualCoreLink_Import_Config::META_SCHEMA_VERSION] = '1';
    assert_true($service->verify('schema-string')['records'] === 7);
    remove_tree($root);
};
$tests['verify accepts WordPress source ID string against payload integer'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('source-string');
    [$service] = service($repo, $root);
    $result = $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        'source-string',
        'source-string',
        false
    );
    $id = $result['operations'][0]['localized_id'];
    $repo->localized[$id]['meta'][DualCoreLink_Import_Config::META_SOURCE_ID] = '48';
    assert_true($service->verify('source-string')['records'] === 7);
    remove_tree($root);
};
foreach ([
    'leading zero' => '01',
    'plus sign' => '+1',
    'negative' => '-1',
    'decimal' => '1.0',
    'exponent' => '1e2',
    'surrounding spaces' => ' 1 ',
    'empty string' => '',
] as $label => $value) {
    $tests["verify rejects noncanonical numeric meta {$label}"] =
        function () use ($label, $value): void {
            $exception = verify_with_numeric_meta(
                'numeric-' . str_replace(' ', '-', $label),
                DualCoreLink_Import_Config::META_SCHEMA_VERSION,
                $value
            );
            assert_true(str_contains(
                $exception->getMessage(),
                'Invalid WordPress integer translation meta'
            ));
        };
}
foreach ([
    'null' => null,
    'boolean' => true,
    'array' => ['1'],
    'object' => (object) ['value' => 1],
] as $label => $value) {
    $tests["verify rejects numeric meta {$label}"] =
        function () use ($label, $value): void {
            $exception = verify_with_numeric_meta(
                'numeric-type-' . $label,
                DualCoreLink_Import_Config::META_SCHEMA_VERSION,
                $value
            );
            assert_true(str_contains(
                $exception->getMessage(),
                'Invalid WordPress integer translation meta'
            ));
        };
}
$tests['verify rejects schema version other than one'] = function (): void {
    $exception = verify_with_numeric_meta(
        'schema-version-two',
        DualCoreLink_Import_Config::META_SCHEMA_VERSION,
        '2'
    );
    assert_true(str_contains(
        $exception->getMessage(),
        'Translation schema version must equal 1'
    ));
    assert_true(DualCoreLink_Import_Config::SCHEMA_VERSION === 1);
};
$tests['verify rejects source ID outside approved whitelist'] = function (): void {
    $exception = verify_with_numeric_meta(
        'source-not-approved',
        DualCoreLink_Import_Config::META_SOURCE_ID,
        '999'
    );
    assert_true(str_contains(
        $exception->getMessage(),
        'outside the approved whitelist'
    ));
};
$tests['verify keeps nonnumeric translation meta strict'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('strict-meta');
    [$service] = service($repo, $root);
    $result = $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        'strict-meta',
        'strict-meta',
        false
    );
    $id = $result['operations'][0]['localized_id'];
    $repo->localized[$id]['meta'][DualCoreLink_Import_Config::META_REVIEWER] = 123;
    expect_failure(fn () => $service->verify('strict-meta'), 60);
    remove_tree($root);
};
$tests['verify keeps ACF array structure strict'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('strict-acf');
    [$service] = service($repo, $root);
    $result = $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        'strict-acf',
        'strict-acf',
        false
    );
    $id = $result['operations'][0]['localized_id'];
    $repo->localized[$id]['acf']['product_technical_specs'] = ['drift'];
    expect_failure(fn () => $service->verify('strict-acf'), 60);
    remove_tree($root);
};
$tests['verify passes all seven fixture records with WordPress numeric strings'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('wp-meta-seven');
    [$service] = service($repo, $root);
    $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        'wp-meta-seven',
        'wp-meta-seven',
        false
    );
    stringify_numeric_translation_meta($repo);
    $result = $service->verify('wp-meta-seven');
    assert_true($result['records'] === 7);
    assert_true(count($result['localized_ids']) === 7);
    remove_tree($root);
};
$tests['verify rejects English source hash drift'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('source-drift');
    [$service] = service($repo, $root);
    $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        'source-drift',
        'source-drift',
        false
    );
    $repo->sources[48]['core']['post_title'] = 'Changed English source';
    expect_failure(fn () => $service->verify('source-drift'), 60);
    remove_tree($root);
};
$tests['verify numeric normalization does not mutate repository records'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('verify-read-only');
    [$service] = service($repo, $root);
    $service->apply(
        $payload,
        'zh',
        'p0',
        'draft',
        'verify-read-only',
        'verify-read-only',
        false
    );
    stringify_numeric_translation_meta($repo);
    $before = $repo->localized;
    $service->verify('verify-read-only');
    assert_true($repo->localized === $before);
    remove_tree($root);
};
$tests['publish changes only seven verified records'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('publish');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'publish-1', 'publish-1', false);
    $service->verify('publish-1');
    $service->publish('publish-1', 'publish-1');
    assert_true(count(array_filter($repo->localized, fn ($record) => $record['status'] === 'publish')) === 7);
    remove_tree($root);
};
$tests['publish fails before explicit verify'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('publish-gate');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'publish-gate-1', 'publish-gate-1', false);
    expect_failure(fn () => $service->publish('publish-gate-1', 'publish-gate-1'), 70);
    remove_tree($root);
};
$tests['verify rejects payload hash change'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('hash');
    [$service, $store] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'hash-001', 'hash-001', false);
    $request = $store->read('hash-001', 'request.json');
    $request['payload'][0]['translatedTitle'] .= ' changed';
    $store->write('hash-001', 'request.json', $request);
    expect_failure(fn () => $service->verify('hash-001'), 60);
    remove_tree($root);
};
$tests['rollback returns created records to draft'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('rollback-created');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'rollback-1', 'rollback-1', false);
    $service->verify('rollback-1');
    $service->publish('rollback-1', 'rollback-1');
    $service->rollback('rollback-1', 'rollback-1');
    assert_true(count(array_filter($repo->localized, fn ($record) => $record['status'] === 'draft')) === 7);
    remove_tree($root);
};
$tests['rollback restores updated pre-image'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('rollback-update');
    [$service] = service($repo, $root);
    $first = $service->apply($payload, 'zh', 'p0', 'draft', 'rollback-u1', 'rollback-u1', false);
    $id = $first['operations'][0]['localized_id'];
    $original = $repo->localized[$id];
    $changed = $payload;
    $changed[0]['translatedTitle'] .= ' 修订';
    $service->apply($changed, 'zh', 'p0', 'draft', 'rollback-u2', 'rollback-u2', true);
    $service->rollback('rollback-u2', 'rollback-u2');
    assert_true($repo->localized[$id] === $original);
    remove_tree($root);
};
$tests['repeated rollback is idempotent'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('rollback-idempotent');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'rollback-i1', 'rollback-i1', false);
    $first = $service->rollback('rollback-i1', 'rollback-i1');
    $second = $service->rollback('rollback-i1', 'rollback-i1');
    assert_true($first === $second);
    remove_tree($root);
};
$tests['English source hashes never change'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $before = [];
    foreach ($payload as $record) {
        $before[$record['sourceEnglishContentId']] = $repo->source_hash(
            $record['contentType'],
            $record['sourceEnglishContentId']
        );
    }
    $root = temporary_root('source-hash');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'source-hash-1', 'source-hash-1', false);
    foreach ($payload as $record) {
        assert_true(
            $before[$record['sourceEnglishContentId']] ===
            $repo->source_hash($record['contentType'], $record['sourceEnglishContentId'])
        );
    }
    remove_tree($root);
};
$tests['other-language records remain unchanged'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $repo->localized[900] = [
        'id' => 900,
        'post_type' => 'product',
        'slug' => 'other-language',
        'status' => 'publish',
        'core' => ['post_status' => 'publish'],
        'acf' => ['marker' => 'unchanged'],
        'meta' => [
            DualCoreLink_Import_Config::META_SOURCE_ID => 48,
            DualCoreLink_Import_Config::META_LOCALE => 'de',
            DualCoreLink_Import_Config::META_BATCH => 'p0',
        ],
    ];
    $before = $repo->localized[900];
    $root = temporary_root('other-locale');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'other-locale-1', 'other-locale-1', false);
    assert_true($repo->localized[900] === $before);
    remove_tree($root);
};
$tests['lock competition fails safely'] = function (): void {
    $root = temporary_root('lock');
    $first = new DualCoreLink_Import_Run_Store($root);
    $second = new DualCoreLink_Import_Run_Store($root);
    $first->acquire_lock(0);
    expect_failure(fn () => $second->acquire_lock(0), 40);
    $first->release_lock();
    remove_tree($root);
};
$tests['invalid run ID fails'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    [$service] = service($repo, temporary_root('run-id'));
    expect_failure(
        fn () => $service->apply($payload, 'zh', 'p0', 'draft', '../unsafe', '../unsafe', false),
        10
    );
};
$tests['credentials are absent from logs'] = function (): void {
    $payload = fixture();
    $repo = new Mock_Import_Repository($payload);
    $root = temporary_root('credentials');
    [$service] = service($repo, $root);
    $service->apply($payload, 'zh', 'p0', 'draft', 'credentials-1', 'credentials-1', false);
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($iterator as $file) {
        $contents = (string) file_get_contents($file->getPathname());
        assert_true(preg_match('/password|private[_ -]?key|authorization|cookie/i', $contents) !== 1);
    }
    remove_tree($root);
};
$tests['CLI command registers only under WP_CLI guard'] = function () use ($plugin_root): void {
    $entry = (string) file_get_contents($plugin_root . '/dualcorelink-multilingual-import-cli.php');
    assert_true(str_contains($entry, "defined('WP_CLI') && WP_CLI"));
    assert_true(str_contains($entry, "WP_CLI::add_command"));
};
$tests['renderer output is deterministic snapshot'] = function (): void {
    $record = fixture()[0];
    $first = DualCoreLink_Import_Renderer::render($record);
    $second = DualCoreLink_Import_Renderer::render($record);
    assert_true($first === $second);
    assert_true(
        hash('sha256', $first) === 'f9072982458413ce85a5a292f4e3da9ac4fa143a6781becd7694144ec67f5654',
        'Renderer snapshot hash changed: ' . hash('sha256', $first)
    );
};
$tests['runtime plugin contains no direct SQL calls'] = function () use ($plugin_root): void {
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($plugin_root, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($iterator as $file) {
        if ($file->getExtension() !== 'php') {
            continue;
        }
        $contents = (string) file_get_contents($file->getPathname());
        assert_true(
            preg_match('/\$wpdb|\\b(?:INSERT|UPDATE|DELETE)\\s+(?:INTO|FROM|wp_)/i', $contents) !== 1,
            'Direct SQL marker found in ' . $file->getFilename()
        );
    }
};
$tests['runtime plugin adds no public REST write endpoint'] = function () use ($plugin_root): void {
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($plugin_root, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($iterator as $file) {
        if ($file->getExtension() !== 'php') {
            continue;
        }
        $contents = (string) file_get_contents($file->getPathname());
        assert_true(!str_contains($contents, 'register_rest_route'));
        assert_true(!str_contains($contents, 'update_callback'));
    }
};

$passed = 0;
$failed = 0;
foreach ($tests as $name => $test) {
    try {
        $test();
        $passed++;
        echo "ok - {$name}\n";
    } catch (Throwable $throwable) {
        $failed++;
        fwrite(STDERR, "not ok - {$name}: {$throwable->getMessage()}\n");
    }
}
echo json_encode([
    'tests' => count($tests),
    'passed' => $passed,
    'failed' => $failed,
], JSON_UNESCAPED_SLASHES) . "\n";
exit($failed === 0 ? 0 : 1);
