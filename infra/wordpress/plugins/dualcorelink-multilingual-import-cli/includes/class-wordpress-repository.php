<?php

final class DualCoreLink_WordPress_Import_Repository implements DualCoreLink_Import_Repository
{
    private function acf_fields(int $post_id): array
    {
        if (!function_exists('get_fields')) {
            throw new DualCoreLink_Import_Exception(
                'Advanced Custom Fields get_fields() is unavailable.',
                DualCoreLink_Import_Config::EXIT_SAFETY
            );
        }
        $fields = get_fields($post_id);
        return is_array($fields) ? $fields : [];
    }

    private function snapshot(WP_Post $post): array
    {
        $meta = [];
        foreach (DualCoreLink_Import_Config::META_KEYS as $key) {
            $value = get_post_meta($post->ID, $key, true);
            if ($value !== '') {
                $meta[$key] = $value;
            }
        }
        return [
            'id' => (int) $post->ID,
            'post_type' => $post->post_type,
            'slug' => $post->post_name,
            'status' => $post->post_status,
            'core' => [
                'post_title' => $post->post_title,
                'post_name' => $post->post_name,
                'post_excerpt' => $post->post_excerpt,
                'post_content' => $post->post_content,
                'post_status' => $post->post_status,
            ],
            'acf' => $this->acf_fields((int) $post->ID),
            'meta' => $meta,
        ];
    }

    public function get_source(string $post_type, int $source_id): ?array
    {
        $post = get_post($source_id);
        if (!$post || $post->post_type !== $post_type) {
            return null;
        }
        $language = apply_filters(
            'smart_home_b2b_rest_language',
            'en',
            $post_type,
            $source_id
        );
        return [
            'id' => (int) $post->ID,
            'post_type' => $post->post_type,
            'slug' => $post->post_name,
            'status' => $post->post_status,
            'language' => is_string($language) ? $language : 'en',
            'core' => [
                'post_title' => $post->post_title,
                'post_name' => $post->post_name,
                'post_excerpt' => $post->post_excerpt,
                'post_content' => $post->post_content,
                'post_status' => $post->post_status,
                'featured_media' => (int) get_post_thumbnail_id($source_id),
            ],
            'acf' => $this->acf_fields($source_id),
        ];
    }

    public function source_hash(string $post_type, int $source_id): string
    {
        $source = $this->get_source($post_type, $source_id);
        return $source ? hash('sha256', DualCoreLink_Import_Config::canonical_json($source)) : '';
    }

    public function find_by_slug(string $post_type, string $slug): array
    {
        $posts = get_posts([
            'post_type' => $post_type,
            'name' => $slug,
            'post_status' => ['publish', 'draft', 'pending', 'private', 'future'],
            'posts_per_page' => -1,
            'no_found_rows' => true,
            'suppress_filters' => false,
        ]);
        return array_map(function (WP_Post $post): array {
            $localized = get_post_meta(
                $post->ID,
                DualCoreLink_Import_Config::META_SOURCE_ID,
                true
            );
            if ($localized === '') {
                return [
                    'id' => (int) $post->ID,
                    'post_type' => $post->post_type,
                    'slug' => $post->post_name,
                    'status' => $post->post_status,
                    'language' => apply_filters(
                        'smart_home_b2b_rest_language',
                        'en',
                        $post->post_type,
                        (int) $post->ID
                    ),
                ];
            }
            return $this->snapshot($post);
        }, $posts);
    }

    public function find_localized(string $post_type, int $source_id, string $locale, string $slug): ?array
    {
        $ids = get_posts([
            'post_type' => $post_type,
            'post_status' => ['publish', 'draft', 'pending', 'private', 'future'],
            'fields' => 'ids',
            'posts_per_page' => 2,
            'no_found_rows' => true,
            'meta_query' => [
                'relation' => 'AND',
                [
                    'key' => DualCoreLink_Import_Config::META_SOURCE_ID,
                    'value' => $source_id,
                    'compare' => '=',
                    'type' => 'NUMERIC',
                ],
                [
                    'key' => DualCoreLink_Import_Config::META_LOCALE,
                    'value' => $locale,
                    'compare' => '=',
                ],
            ],
        ]);
        if (count($ids) > 1) {
            throw new DualCoreLink_Import_Exception(
                'Duplicate localized identity detected.',
                DualCoreLink_Import_Config::EXIT_CONFLICT
            );
        }
        if (!$ids) {
            return null;
        }
        $post = get_post((int) $ids[0]);
        if (!$post || $post->post_name !== $slug) {
            throw new DualCoreLink_Import_Exception(
                'Localized identity has a conflicting slug.',
                DualCoreLink_Import_Config::EXIT_CONFLICT
            );
        }
        return $this->snapshot($post);
    }

    public function list_localized(string $locale, string $batch): array
    {
        $ids = get_posts([
            'post_type' => ['product', 'solution'],
            'post_status' => ['publish', 'draft', 'pending', 'private', 'future'],
            'fields' => 'ids',
            'posts_per_page' => -1,
            'no_found_rows' => true,
            'meta_query' => [
                'relation' => 'AND',
                [
                    'key' => DualCoreLink_Import_Config::META_LOCALE,
                    'value' => $locale,
                    'compare' => '=',
                ],
                [
                    'key' => DualCoreLink_Import_Config::META_BATCH,
                    'value' => $batch,
                    'compare' => '=',
                ],
            ],
        ]);
        $records = [];
        foreach ($ids as $id) {
            $post = get_post((int) $id);
            if ($post) {
                $records[] = $this->snapshot($post);
            }
        }
        return $records;
    }

    private function with_duplicate_slug_scope(string $slug, callable $operation)
    {
        $filter = static function ($override, $candidate_slug) use ($slug) {
            return $candidate_slug === $slug ? $slug : $override;
        };
        add_filter('pre_wp_unique_post_slug', $filter, 10, 2);
        try {
            return $operation();
        } finally {
            remove_filter('pre_wp_unique_post_slug', $filter, 10);
        }
    }

    private function write_acf(int $post_id, array $acf): void
    {
        if (!function_exists('update_field')) {
            throw new DualCoreLink_Import_Exception(
                'Advanced Custom Fields update_field() is unavailable.',
                DualCoreLink_Import_Config::EXIT_SAFETY
            );
        }
        foreach ($acf as $key => $value) {
            if (update_field($key, $value, $post_id) === false) {
                $current = get_field($key, $post_id);
                if ($current !== $value) {
                    throw new RuntimeException('Failed to update ACF field: ' . $key);
                }
            }
        }
    }

    private function write_meta(int $post_id, array $meta): void
    {
        foreach ($meta as $key => $value) {
            if (!in_array($key, DualCoreLink_Import_Config::META_KEYS, true)) {
                throw new DualCoreLink_Import_Exception(
                    'Attempted to write an unapproved translation meta key.',
                    DualCoreLink_Import_Config::EXIT_SAFETY
                );
            }
            update_post_meta($post_id, $key, $value);
        }
    }

    public function create(array $mapped): array
    {
        $post_data = $mapped['core'];
        $post_data['post_type'] = $mapped['post_type'];
        $post_data['post_status'] = 'draft';
        $post_id = $this->with_duplicate_slug_scope(
            $mapped['slug'],
            static fn () => wp_insert_post($post_data, true)
        );
        if (is_wp_error($post_id)) {
            throw new RuntimeException('WordPress create failed: ' . $post_id->get_error_message());
        }
        $post_id = (int) $post_id;
        $this->write_acf($post_id, $mapped['acf']);
        $this->write_meta($post_id, $mapped['meta']);
        $snapshot = $this->get_localized($post_id);
        if (!$snapshot) {
            throw new RuntimeException('Created post could not be read back.');
        }
        return $snapshot;
    }

    public function update(int $post_id, array $mapped): array
    {
        $post_data = $mapped['core'];
        $post_data['ID'] = $post_id;
        $post_data['post_type'] = $mapped['post_type'];
        $post_data['post_status'] = 'draft';
        $result = $this->with_duplicate_slug_scope(
            $mapped['slug'],
            static fn () => wp_update_post($post_data, true)
        );
        if (is_wp_error($result)) {
            throw new RuntimeException('WordPress update failed: ' . $result->get_error_message());
        }
        $this->write_acf($post_id, $mapped['acf']);
        $this->write_meta($post_id, $mapped['meta']);
        $snapshot = $this->get_localized($post_id);
        if (!$snapshot) {
            throw new RuntimeException('Updated post could not be read back.');
        }
        return $snapshot;
    }

    public function set_status(int $post_id, string $status): void
    {
        if (!in_array($status, ['draft', 'publish'], true)) {
            throw new DualCoreLink_Import_Exception(
                'Importer status must be draft or publish.',
                DualCoreLink_Import_Config::EXIT_SAFETY
            );
        }
        $post = get_post($post_id);
        if (!$post) {
            throw new RuntimeException('Cannot update status for a missing post.');
        }
        $result = $this->with_duplicate_slug_scope(
            $post->post_name,
            static fn () => wp_update_post([
                'ID' => $post_id,
                'post_status' => $status,
                'post_name' => $post->post_name,
            ], true)
        );
        if (is_wp_error($result)) {
            throw new RuntimeException('Status update failed: ' . $result->get_error_message());
        }
    }

    public function restore(array $snapshot): void
    {
        $post_id = (int) $snapshot['id'];
        $post_data = $snapshot['core'];
        $post_data['ID'] = $post_id;
        $post_data['post_type'] = $snapshot['post_type'];
        $result = $this->with_duplicate_slug_scope(
            $snapshot['slug'],
            static fn () => wp_update_post($post_data, true)
        );
        if (is_wp_error($result)) {
            throw new RuntimeException('Pre-image restore failed: ' . $result->get_error_message());
        }
        $this->write_acf($post_id, $snapshot['acf']);
        foreach (DualCoreLink_Import_Config::META_KEYS as $key) {
            if (array_key_exists($key, $snapshot['meta'])) {
                update_post_meta($post_id, $key, $snapshot['meta'][$key]);
            } else {
                delete_post_meta($post_id, $key);
            }
        }
    }

    public function get_localized(int $post_id): ?array
    {
        $post = get_post($post_id);
        if (!$post) {
            return null;
        }
        if (get_post_meta($post_id, DualCoreLink_Import_Config::META_SOURCE_ID, true) === '') {
            return null;
        }
        return $this->snapshot($post);
    }
}
