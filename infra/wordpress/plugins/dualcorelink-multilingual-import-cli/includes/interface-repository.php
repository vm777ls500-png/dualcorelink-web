<?php

interface DualCoreLink_Import_Repository
{
    public function get_source(string $post_type, int $source_id): ?array;
    public function source_hash(string $post_type, int $source_id): string;
    public function find_by_slug(string $post_type, string $slug): array;
    public function find_localized(string $post_type, int $source_id, string $locale, string $slug): ?array;
    public function list_localized(string $locale, string $batch): array;
    public function validate_write_plan(array $mapped, string $locale, string $batch): void;
    public function create(array $mapped): array;
    public function update(int $post_id, array $mapped): array;
    public function set_status(int $post_id, string $status): void;
    public function restore(array $snapshot): void;
    public function get_localized(int $post_id): ?array;
}
