<?php
/**
 * Plugin Name: DualCoreLink Multilingual Import CLI
 * Description: Guarded WP-CLI-only importer for exact approved multilingual CMS batches.
 * Version: 1.2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

$dualcorelink_import_files = [
    'includes/class-config.php',
    'includes/class-renderer.php',
    'includes/interface-repository.php',
    'includes/class-wordpress-repository.php',
    'includes/class-run-store.php',
    'includes/class-import-service.php',
];

foreach ($dualcorelink_import_files as $dualcorelink_import_file) {
    require_once __DIR__ . '/' . $dualcorelink_import_file;
}

// Read-only relationship filters are safe in web and REST contexts. They
// expose translations already written by the separately gated CLI commands.
add_filter('smart_home_b2b_rest_language', static function ($language, $post_type, $post_id) {
    $localized = get_post_meta((int) $post_id, DualCoreLink_Import_Config::META_LOCALE, true);
    return is_string($localized) && $localized !== '' ? $localized : $language;
}, 10, 3);

add_filter('smart_home_b2b_rest_translation_group', static function ($group, $post_type, $post_id) {
    $stored = get_post_meta((int) $post_id, DualCoreLink_Import_Config::META_GROUP, true);
    return is_string($stored) && $stored !== '' ? $stored : $group;
}, 10, 3);

add_filter('smart_home_b2b_rest_translations', static function ($translations, $post_type, $post_id) {
    $post_id = (int) $post_id;
    $source_id = (int) get_post_meta($post_id, DualCoreLink_Import_Config::META_SOURCE_ID, true);
    if ($source_id <= 0) {
        $source_id = $post_id;
    }
    $source = get_post($source_id);
    if (!$source || $source->post_type !== $post_type) {
        return $translations;
    }
    $paths = ['en' => '/en/' . $post_type . 's/' . $source->post_name . '/'];
    $localized_ids = get_posts([
        'post_type' => $post_type,
        'post_status' => 'publish',
        'fields' => 'ids',
        'posts_per_page' => -1,
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
                'key' => DualCoreLink_Import_Config::META_SCHEMA_VERSION,
                'value' => DualCoreLink_Import_Config::SCHEMA_VERSION,
                'compare' => '=',
                'type' => 'NUMERIC',
            ],
        ],
    ]);
    foreach ($localized_ids as $localized_id) {
        $locale = get_post_meta((int) $localized_id, DualCoreLink_Import_Config::META_LOCALE, true);
        $localized = get_post((int) $localized_id);
        if (is_string($locale) && $locale !== '' && $localized) {
            $paths[$locale] = '/' . $locale . '/' . $post_type . 's/' . $localized->post_name . '/';
        }
    }
    return $paths;
}, 10, 3);

if (defined('WP_CLI') && WP_CLI) {
    require_once __DIR__ . '/includes/class-cli-command.php';
    WP_CLI::add_command(
        'dualcorelink multilingual-import',
        'DualCoreLink_Multilingual_Import_CLI_Command'
    );
}
