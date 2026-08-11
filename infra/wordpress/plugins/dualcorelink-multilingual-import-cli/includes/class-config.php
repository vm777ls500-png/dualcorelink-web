<?php

final class DualCoreLink_Import_Config
{
    public const SCHEMA_VERSION = 1;
    public const LOCALE = 'zh';
    public const BATCH = 'p0';
    public const REVIEWER = 'Allan';
    public const REVIEW_DATE = '2026-07-29';
    public const RECORD_COUNT = 7;
    public const ZH_P1_REVIEWER = 'Allan';
    public const ZH_P1_REVIEW_DATE = '2026-08-02';
    public const ZH_P1_RECORD_COUNT = 17;
    public const ZH_REMAINING_FINAL_REVIEWER = 'Allan';
    public const ZH_REMAINING_FINAL_REVIEW_DATE = '2026-08-03';
    public const ZH_REMAINING_FINAL_RECORD_COUNT = 18;
    public const AR_FINAL_REVIEWER = 'Allan';
    public const AR_FINAL_REVIEW_DATE = '2026-08-11';
    public const AR_FINAL_RECORD_COUNT = 42;
    public const OWNER_WAIVER_SCHEMA_VERSION = 1;
    public const OWNER_WAIVER_BY = 'Allan';
    public const OWNER_WAIVER_DATE = '2026-07-31';
    public const OWNER_WAIVER_REASON = 'Business owner explicitly waived Arabic native-language review and accepted localization risk.';
    public const OWNER_WAIVER_SCOPE_COUNT = 15;
    public const OWNER_WAIVER_SCOPE_SHA256 = '92eae81730ac445455385ff5f3811394dbb866d6f333dc6a290f5df60e4dc193';

    public const EXIT_ARGUMENTS = 10;
    public const EXIT_PREFLIGHT = 20;
    public const EXIT_CONFLICT = 30;
    public const EXIT_LOCK = 40;
    public const EXIT_APPLY = 50;
    public const EXIT_VERIFY = 60;
    public const EXIT_PUBLISH = 70;
    public const EXIT_ROLLBACK = 80;
    public const EXIT_SAFETY = 90;

    public const META_SCHEMA_VERSION = '_dualcorelink_translation_schema_version';
    public const META_LOCALE = '_dualcorelink_translation_locale';
    public const META_SOURCE_ID = '_dualcorelink_translation_source_id';
    public const META_GROUP = '_dualcorelink_translation_group';
    public const META_BATCH = '_dualcorelink_translation_batch';
    public const META_PAYLOAD_HASH = '_dualcorelink_translation_payload_hash';
    public const META_REVIEWER = '_dualcorelink_translation_reviewer';
    public const META_REVIEW_DATE = '_dualcorelink_translation_review_date';
    public const META_OWNER_WAIVER_SCHEMA_VERSION = '_dualcorelink_owner_review_waiver_schema_version';
    public const META_OWNER_WAIVER_STATUS = '_dualcorelink_owner_review_waiver_status';
    public const META_OWNER_WAIVER_BY = '_dualcorelink_owner_review_waiver_by';
    public const META_OWNER_WAIVER_DATE = '_dualcorelink_owner_review_waiver_date';
    public const META_OWNER_WAIVER_REASON = '_dualcorelink_owner_review_waiver_reason';

    public const META_KEYS = [
        self::META_SCHEMA_VERSION,
        self::META_LOCALE,
        self::META_SOURCE_ID,
        self::META_GROUP,
        self::META_BATCH,
        self::META_PAYLOAD_HASH,
        self::META_REVIEWER,
        self::META_REVIEW_DATE,
    ];

    public const OWNER_WAIVER_META_KEYS = [
        self::META_OWNER_WAIVER_SCHEMA_VERSION,
        self::META_OWNER_WAIVER_STATUS,
        self::META_OWNER_WAIVER_BY,
        self::META_OWNER_WAIVER_DATE,
        self::META_OWNER_WAIVER_REASON,
    ];

    public const OWNER_WAIVER_PAYLOAD_KEYS = [
        'ownerReviewWaiverSchemaVersion',
        'ownerReviewWaiverStatus',
        'ownerReviewWaiverBy',
        'ownerReviewWaiverDate',
        'ownerReviewWaiverReason',
        'ownerReviewWaiverScopeCount',
        'ownerReviewWaiverScopeSha256',
    ];

    public const CORE_WRITE_KEYS = [
        'post_title',
        'post_name',
        'post_excerpt',
        'post_content',
        'post_status',
    ];

    public const WRITE_PLAN_KEYS = [
        'source_id',
        'identity',
        'post_type',
        'slug',
        'status',
        'core',
        'acf',
        'meta',
    ];

    public const ALLOWED_PAYLOAD_KEYS = [
        'contentType',
        'sourceEnglishContentId',
        'sourceEnglishSlug',
        'localizedSlug',
        'localizedContentId',
        'importKey',
        'deliveryMode',
        'locale',
        'batch',
        'priority',
        'translationGroup',
        'translatedTitle',
        'translatedDescription',
        'translatedSpecifications',
        'translatedSeoTitle',
        'translatedMetaDescription',
        'translatedStructuredContent',
        'translationStatus',
        'reviewStatus',
        'nativeReviewStatus',
        'nativeReviewer',
        'nativeReviewDate',
        'nativeReviewNotes',
        'productionReleaseReady',
        'ownerReviewWaiverSchemaVersion',
        'ownerReviewWaiverStatus',
        'ownerReviewWaiverBy',
        'ownerReviewWaiverDate',
        'ownerReviewWaiverReason',
        'ownerReviewWaiverScopeCount',
        'ownerReviewWaiverScopeSha256',
    ];

    public const APPROVED = [
        48 => ['post_type' => 'product', 'slug' => 'hotel-smart-room-rcu-host-1'],
        47 => ['post_type' => 'product', 'slug' => 'rcu-controller-cabinet'],
        6 => ['post_type' => 'product', 'slug' => '86-type-ai-smart-control-display'],
        222 => ['post_type' => 'product', 'slug' => 'smart-four-key-scene-control-panel'],
        142 => ['post_type' => 'solution', 'slug' => 'oem-odm-custom-panel-solution'],
        140 => ['post_type' => 'solution', 'slug' => 'rcu-room-control-solution'],
        138 => ['post_type' => 'solution', 'slug' => 'smart-hotel-automation-solution'],
    ];

    public const ARABIC_APPROVED = [
        48 => ['post_type' => 'product', 'slug' => 'hotel-smart-room-rcu-host-1'],
        47 => ['post_type' => 'product', 'slug' => 'rcu-controller-cabinet'],
        6 => ['post_type' => 'product', 'slug' => '86-type-ai-smart-control-display'],
        140 => ['post_type' => 'solution', 'slug' => 'rcu-room-control-solution'],
        138 => ['post_type' => 'solution', 'slug' => 'smart-hotel-automation-solution'],
        137 => ['post_type' => 'solution', 'slug' => 'hotel-guest-room-control-solution'],
    ];

    public const AR_FINAL_APPROVED = [
        6 => ['post_type' => 'product', 'slug' => '86-type-ai-smart-control-display', 'priority' => 'P0'],
        8 => ['post_type' => 'product', 'slug' => 'ai-large-smart-display', 'priority' => 'P1'],
        9 => ['post_type' => 'product', 'slug' => 'rotary-knob-smart-control-display', 'priority' => 'P1'],
        10 => ['post_type' => 'product', 'slug' => 'thermostat-hvac-control-panel', 'priority' => 'P1'],
        11 => ['post_type' => 'product', 'slug' => 'ai-music-control-panel', 'priority' => 'P1'],
        12 => ['post_type' => 'product', 'slug' => 'hotel-delivery-robot', 'priority' => 'P1'],
        13 => ['post_type' => 'product', 'slug' => 'hotel-smart-delivery-cabinet', 'priority' => 'P1'],
        43 => ['post_type' => 'product', 'slug' => 'embedded-human-presence-sensor', 'priority' => 'P1'],
        44 => ['post_type' => 'product', 'slug' => 'infrared-repeater', 'priority' => 'P2'],
        45 => ['post_type' => 'product', 'slug' => 'hotel-room-door-magnetic-sensor', 'priority' => 'P1'],
        46 => ['post_type' => 'product', 'slug' => 'hotel-guest-room-doorbell', 'priority' => 'P1'],
        47 => ['post_type' => 'product', 'slug' => 'rcu-controller-cabinet', 'priority' => 'P0'],
        48 => ['post_type' => 'product', 'slug' => 'hotel-smart-room-rcu-host-1', 'priority' => 'P0'],
        49 => ['post_type' => 'product', 'slug' => 'smart-usb-five-hole-socket', 'priority' => 'P2'],
        50 => ['post_type' => 'product', 'slug' => 'smart-key-card-energy-saver-panel', 'priority' => 'P1'],
        51 => ['post_type' => 'product', 'slug' => 'smart-four-key-curtain-control-panel', 'priority' => 'P1'],
        52 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-86-base-doorbell-panel', 'priority' => 'P2'],
        137 => ['post_type' => 'solution', 'slug' => 'hotel-guest-room-control-solution', 'priority' => 'P0'],
        138 => ['post_type' => 'solution', 'slug' => 'smart-hotel-automation-solution', 'priority' => 'P0'],
        139 => ['post_type' => 'solution', 'slug' => 'ai-smart-display-solution', 'priority' => 'P1'],
        140 => ['post_type' => 'solution', 'slug' => 'rcu-room-control-solution', 'priority' => 'P0'],
        141 => ['post_type' => 'solution', 'slug' => 'hotel-delivery-robot-solution', 'priority' => 'P1'],
        142 => ['post_type' => 'solution', 'slug' => 'oem-odm-custom-panel-solution', 'priority' => 'P0'],
        188 => ['post_type' => 'product', 'slug' => 'smart-curtain-motor', 'priority' => 'P1'],
        189 => ['post_type' => 'product', 'slug' => 'hotel-smart-room-rcu-host-2', 'priority' => 'P1'],
        190 => ['post_type' => 'product', 'slug' => 'hotel-delivery-robot-charging-dock', 'priority' => 'P1'],
        191 => ['post_type' => 'product', 'slug' => 'borui-red-matte-usb-five-hole-socket', 'priority' => 'P2'],
        192 => ['post_type' => 'product', 'slug' => 'borui-red-matte-room-status-four-key-switch-panel', 'priority' => 'P2'],
        193 => ['post_type' => 'product', 'slug' => 'vintage-gold-key-card-energy-saver-panel', 'priority' => 'P2'],
        194 => ['post_type' => 'product', 'slug' => 'vintage-gold-four-key-smart-switch-panel', 'priority' => 'P2'],
        195 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-sos-alarm-panel', 'priority' => 'P2'],
        196 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-thermostat-control-panel', 'priority' => 'P2'],
        197 => ['post_type' => 'product', 'slug' => 'smart-voice-telephone-information-socket', 'priority' => 'P2'],
        219 => ['post_type' => 'product', 'slug' => 'hotel-smart-room-rcu-host-3', 'priority' => 'P1'],
        220 => ['post_type' => 'product', 'slug' => 'smart-single-key-switch-panel', 'priority' => 'P2'],
        221 => ['post_type' => 'product', 'slug' => 'smart-three-key-music-control-panel', 'priority' => 'P2'],
        222 => ['post_type' => 'product', 'slug' => 'smart-four-key-scene-control-panel', 'priority' => 'P0'],
        223 => ['post_type' => 'product', 'slug' => 'smart-footlight-night-light-panel', 'priority' => 'P2'],
        224 => ['post_type' => 'product', 'slug' => 'smart-series-dual-vertical-socket-panel', 'priority' => 'P2'],
        225 => ['post_type' => 'product', 'slug' => 'borui-red-matte-triple-socket-panel', 'priority' => 'P2'],
        226 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-voice-telephone-information-panel', 'priority' => 'P2'],
        238 => ['post_type' => 'product', 'slug' => 'hotel-ceiling-background-speaker', 'priority' => 'P2'],
    ];

    public const ZH_P1_APPROVED = [
        219 => ['post_type' => 'product', 'slug' => 'hotel-smart-room-rcu-host-3'],
        190 => ['post_type' => 'product', 'slug' => 'hotel-delivery-robot-charging-dock'],
        189 => ['post_type' => 'product', 'slug' => 'hotel-smart-room-rcu-host-2'],
        188 => ['post_type' => 'product', 'slug' => 'smart-curtain-motor'],
        51 => ['post_type' => 'product', 'slug' => 'smart-four-key-curtain-control-panel'],
        50 => ['post_type' => 'product', 'slug' => 'smart-key-card-energy-saver-panel'],
        46 => ['post_type' => 'product', 'slug' => 'hotel-guest-room-doorbell'],
        45 => ['post_type' => 'product', 'slug' => 'hotel-room-door-magnetic-sensor'],
        43 => ['post_type' => 'product', 'slug' => 'embedded-human-presence-sensor'],
        13 => ['post_type' => 'product', 'slug' => 'hotel-smart-delivery-cabinet'],
        12 => ['post_type' => 'product', 'slug' => 'hotel-delivery-robot'],
        11 => ['post_type' => 'product', 'slug' => 'ai-music-control-panel'],
        10 => ['post_type' => 'product', 'slug' => 'thermostat-hvac-control-panel'],
        9 => ['post_type' => 'product', 'slug' => 'rotary-knob-smart-control-display'],
        8 => ['post_type' => 'product', 'slug' => 'ai-large-smart-display'],
        141 => ['post_type' => 'solution', 'slug' => 'hotel-delivery-robot-solution'],
        139 => ['post_type' => 'solution', 'slug' => 'ai-smart-display-solution'],
    ];

    public const ZH_REMAINING_FINAL_APPROVED = [
        238 => ['post_type' => 'product', 'slug' => 'hotel-ceiling-background-speaker', 'priority' => 'P2'],
        226 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-voice-telephone-information-panel', 'priority' => 'P2'],
        225 => ['post_type' => 'product', 'slug' => 'borui-red-matte-triple-socket-panel', 'priority' => 'P2'],
        224 => ['post_type' => 'product', 'slug' => 'smart-series-dual-vertical-socket-panel', 'priority' => 'P2'],
        223 => ['post_type' => 'product', 'slug' => 'smart-footlight-night-light-panel', 'priority' => 'P2'],
        221 => ['post_type' => 'product', 'slug' => 'smart-three-key-music-control-panel', 'priority' => 'P2'],
        220 => ['post_type' => 'product', 'slug' => 'smart-single-key-switch-panel', 'priority' => 'P2'],
        197 => ['post_type' => 'product', 'slug' => 'smart-voice-telephone-information-socket', 'priority' => 'P2'],
        196 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-thermostat-control-panel', 'priority' => 'P2'],
        195 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-sos-alarm-panel', 'priority' => 'P2'],
        194 => ['post_type' => 'product', 'slug' => 'vintage-gold-four-key-smart-switch-panel', 'priority' => 'P2'],
        193 => ['post_type' => 'product', 'slug' => 'vintage-gold-key-card-energy-saver-panel', 'priority' => 'P2'],
        192 => ['post_type' => 'product', 'slug' => 'borui-red-matte-room-status-four-key-switch-panel', 'priority' => 'P2'],
        191 => ['post_type' => 'product', 'slug' => 'borui-red-matte-usb-five-hole-socket', 'priority' => 'P2'],
        52 => ['post_type' => 'product', 'slug' => 'brushed-aluminum-86-base-doorbell-panel', 'priority' => 'P2'],
        49 => ['post_type' => 'product', 'slug' => 'smart-usb-five-hole-socket', 'priority' => 'P2'],
        44 => ['post_type' => 'product', 'slug' => 'infrared-repeater', 'priority' => 'P2'],
        137 => ['post_type' => 'solution', 'slug' => 'hotel-guest-room-control-solution', 'priority' => 'P0'],
    ];

    public const PRODUCT_ACF_KEYS = [
        'product_short_description',
        'product_technical_specs',
        'product_faqs_text',
        'product_seo_title',
        'product_meta_description',
        'product_breadcrumb_label',
        'product_image_alt_text',
    ];

    public const SOLUTION_ACF_KEYS = [
        'solution_summary',
        'solution_seo_title',
        'solution_meta_description',
        'solution_breadcrumb_label',
    ];

    public static function run_root(): string
    {
        $override = getenv('DUALCORELINK_CMS_IMPORT_RUN_ROOT');
        return is_string($override) && $override !== ''
            ? rtrim($override, '/\\')
            : '/var/lib/dualcorelink/cms-import-runs';
    }

    public static function policy(
        string $locale,
        string $batch,
        bool $allow_owner_waiver
    ): ?array {
        if ($locale === 'zh' && $batch === 'p0' && !$allow_owner_waiver) {
            return [
                'locale' => 'zh',
                'batch' => 'p0',
                'records' => 7,
                'approved' => self::APPROVED,
                'native_review' => true,
                'owner_waiver' => false,
                'reviewer' => self::REVIEWER,
                'review_date' => self::REVIEW_DATE,
            ];
        }
        if ($locale === 'zh' && $batch === 'p1' && !$allow_owner_waiver) {
            return [
                'locale' => 'zh',
                'batch' => 'p1',
                'records' => self::ZH_P1_RECORD_COUNT,
                'approved' => self::ZH_P1_APPROVED,
                'native_review' => true,
                'owner_waiver' => false,
                'reviewer' => self::ZH_P1_REVIEWER,
                'review_date' => self::ZH_P1_REVIEW_DATE,
            ];
        }
        if ($locale === 'zh' && $batch === 'remaining-final' && !$allow_owner_waiver) {
            return [
                'locale' => 'zh',
                'batch' => 'remaining-final',
                'records' => self::ZH_REMAINING_FINAL_RECORD_COUNT,
                'approved' => self::ZH_REMAINING_FINAL_APPROVED,
                'native_review' => true,
                'owner_waiver' => false,
                'reviewer' => self::ZH_REMAINING_FINAL_REVIEWER,
                'review_date' => self::ZH_REMAINING_FINAL_REVIEW_DATE,
            ];
        }
        if ($locale === 'ar' && $batch === 'p0' && $allow_owner_waiver) {
            return [
                'locale' => 'ar',
                'batch' => 'p0',
                'records' => 6,
                'approved' => self::ARABIC_APPROVED,
                'native_review' => false,
                'owner_waiver' => true,
                'reviewer' => null,
                'review_date' => null,
            ];
        }
        if ($locale === 'ar' && $batch === 'remaining-final' && !$allow_owner_waiver) {
            return [
                'locale' => 'ar',
                'batch' => 'remaining-final',
                'records' => self::AR_FINAL_RECORD_COUNT,
                'approved' => self::AR_FINAL_APPROVED,
                'native_review' => true,
                'owner_waiver' => false,
                'reviewer' => self::AR_FINAL_REVIEWER,
                'review_date' => self::AR_FINAL_REVIEW_DATE,
            ];
        }
        return null;
    }

    public static function approved_source_id(int $source_id): bool
    {
        return array_key_exists($source_id, self::APPROVED) ||
            array_key_exists($source_id, self::ARABIC_APPROVED) ||
            array_key_exists($source_id, self::AR_FINAL_APPROVED) ||
            array_key_exists($source_id, self::ZH_P1_APPROVED) ||
            array_key_exists($source_id, self::ZH_REMAINING_FINAL_APPROVED);
    }

    public static function meta_keys_for(string $locale, string $batch): array
    {
        if ($locale === 'zh' && in_array($batch, ['p0', 'p1', 'remaining-final'], true)) {
            return self::META_KEYS;
        }
        if ($locale === 'ar' && $batch === self::BATCH) {
            return array_merge(self::META_KEYS, self::OWNER_WAIVER_META_KEYS);
        }
        if ($locale === 'ar' && $batch === 'remaining-final') {
            return self::META_KEYS;
        }
        return [];
    }

    public static function all_meta_keys(): array
    {
        return array_merge(self::META_KEYS, self::OWNER_WAIVER_META_KEYS);
    }

    public static function acf_keys_for(string $post_type): array
    {
        return match ($post_type) {
            'product' => self::PRODUCT_ACF_KEYS,
            'solution' => self::SOLUTION_ACF_KEYS,
            default => [],
        };
    }

    private static function exact_keys(array $value, array $expected): bool
    {
        $actual = array_keys($value);
        sort($actual, SORT_STRING);
        sort($expected, SORT_STRING);
        return $actual === $expected;
    }

    private static function required_storage_text($value, bool $allow_empty = false): bool
    {
        return is_string($value) &&
            strlen($value) <= 200000 &&
            ($allow_empty || trim($value) !== '');
    }

    public static function validate_write_plan(
        array $mapped,
        string $locale,
        string $batch
    ): void {
        if (!self::exact_keys($mapped, self::WRITE_PLAN_KEYS)) {
            throw new DualCoreLink_Import_Exception(
                'Repository write plan contains unsupported top-level fields.',
                self::EXIT_PREFLIGHT
            );
        }

        $source_id = $mapped['source_id'] ?? null;
        $post_type = $mapped['post_type'] ?? null;
        $slug = $mapped['slug'] ?? null;
        if (!is_int($source_id) || $source_id <= 0 ||
            !self::approved_source_id($source_id) ||
            !is_string($post_type) ||
            !in_array($post_type, ['product', 'solution'], true) ||
            !self::required_storage_text($slug) ||
            ($mapped['status'] ?? null) !== 'draft' ||
            ($mapped['identity'] ?? null) !==
                sprintf('%s:%d:%s:%s', $post_type, $source_id, $locale, $slug)) {
            throw new DualCoreLink_Import_Exception(
                'Repository write plan identity is invalid.',
                self::EXIT_PREFLIGHT
            );
        }

        $core = $mapped['core'] ?? null;
        if (!is_array($core) || !self::exact_keys($core, self::CORE_WRITE_KEYS)) {
            throw new DualCoreLink_Import_Exception(
                'Repository Core field map is unsupported.',
                self::EXIT_PREFLIGHT
            );
        }
        foreach (self::CORE_WRITE_KEYS as $key) {
            if (!self::required_storage_text($core[$key] ?? null)) {
                throw new DualCoreLink_Import_Exception(
                    "Repository Core value is invalid: {$key}",
                    self::EXIT_PREFLIGHT
                );
            }
        }
        if ($core['post_name'] !== $slug || $core['post_status'] !== 'draft') {
            throw new DualCoreLink_Import_Exception(
                'Repository Core identity/status does not match the write plan.',
                self::EXIT_PREFLIGHT
            );
        }

        $acf = $mapped['acf'] ?? null;
        $acf_allowed = self::acf_keys_for($post_type);
        if (!is_array($acf) || !$acf_allowed ||
            array_diff(array_keys($acf), $acf_allowed)) {
            throw new DualCoreLink_Import_Exception(
                'Repository ACF field map contains unsupported fields.',
                self::EXIT_PREFLIGHT
            );
        }
        $acf_required = $post_type === 'product'
            ? array_values(array_diff($acf_allowed, ['product_image_alt_text']))
            : $acf_allowed;
        if (array_diff($acf_required, array_keys($acf))) {
            throw new DualCoreLink_Import_Exception(
                'Repository ACF field map is incomplete.',
                self::EXIT_PREFLIGHT
            );
        }
        foreach ($acf as $key => $value) {
            if (!self::required_storage_text($value)) {
                throw new DualCoreLink_Import_Exception(
                    "Repository ACF value is invalid: {$key}",
                    self::EXIT_PREFLIGHT
                );
            }
        }

        $meta = $mapped['meta'] ?? null;
        $meta_expected = self::meta_keys_for($locale, $batch);
        if (!is_array($meta) || !$meta_expected ||
            !self::exact_keys($meta, $meta_expected)) {
            throw new DualCoreLink_Import_Exception(
                'Repository meta field map does not match locale capability.',
                self::EXIT_PREFLIGHT
            );
        }
        foreach ($meta as $key => $value) {
            if (in_array($key, [
                self::META_SCHEMA_VERSION,
                self::META_SOURCE_ID,
                self::META_OWNER_WAIVER_SCHEMA_VERSION,
            ], true)) {
                if (!is_int($value) || $value <= 0) {
                    throw new DualCoreLink_Import_Exception(
                        "Repository numeric meta is invalid: {$key}",
                        self::EXIT_PREFLIGHT
                    );
                }
                continue;
            }
            $allow_empty = in_array($key, [
                self::META_REVIEWER,
                self::META_REVIEW_DATE,
            ], true) && $locale === 'ar';
            if (!self::required_storage_text($value, $allow_empty)) {
                throw new DualCoreLink_Import_Exception(
                    "Repository text meta is invalid: {$key}",
                    self::EXIT_PREFLIGHT
                );
            }
        }

        if ($meta[self::META_SCHEMA_VERSION] !== self::SCHEMA_VERSION ||
            $meta[self::META_LOCALE] !== $locale ||
            $meta[self::META_SOURCE_ID] !== $source_id ||
            $meta[self::META_GROUP] !== self::group($post_type, $source_id) ||
            $meta[self::META_BATCH] !== $batch ||
            preg_match('/^[a-f0-9]{64}$/D', $meta[self::META_PAYLOAD_HASH]) !== 1) {
            throw new DualCoreLink_Import_Exception(
                'Repository translation meta values do not match the write plan.',
                self::EXIT_PREFLIGHT
            );
        }

        if ($locale === 'ar' && $batch === self::BATCH) {
            if ($meta[self::META_OWNER_WAIVER_SCHEMA_VERSION] !==
                    self::OWNER_WAIVER_SCHEMA_VERSION ||
                $meta[self::META_OWNER_WAIVER_STATUS] !== 'approved' ||
                $meta[self::META_OWNER_WAIVER_BY] !== self::OWNER_WAIVER_BY ||
                $meta[self::META_OWNER_WAIVER_DATE] !== self::OWNER_WAIVER_DATE ||
                $meta[self::META_OWNER_WAIVER_REASON] !== self::OWNER_WAIVER_REASON) {
                throw new DualCoreLink_Import_Exception(
                    'Repository owner-waiver meta values are invalid.',
                    self::EXIT_PREFLIGHT
                );
            }
        }
    }

    public static function valid_run_id(string $run_id): bool
    {
        return preg_match('/^[A-Za-z0-9][A-Za-z0-9._-]{2,63}$/D', $run_id) === 1;
    }

    public static function canonicalize($value)
    {
        if (!is_array($value)) {
            return $value;
        }
        if (array_is_list($value)) {
            return array_map([self::class, 'canonicalize'], $value);
        }
        ksort($value, SORT_STRING);
        foreach ($value as $key => $child) {
            $value[$key] = self::canonicalize($child);
        }
        return $value;
    }

    public static function canonical_json($value): string
    {
        $json = wp_json_encode(
            self::canonicalize($value),
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );
        if (!is_string($json)) {
            throw new RuntimeException('Unable to encode canonical JSON.');
        }
        return $json;
    }

    public static function payload_hash(array $payload): string
    {
        return hash('sha256', self::canonical_json($payload));
    }

    public static function group(string $post_type, int $source_id): string
    {
        return sprintf('shb2b-%s-%d', $post_type, $source_id);
    }
}

final class DualCoreLink_Import_Exception extends RuntimeException
{
    private int $import_exit_code;

    public function __construct(string $message, int $import_exit_code)
    {
        parent::__construct($message);
        $this->import_exit_code = $import_exit_code;
    }

    public function import_exit_code(): int
    {
        return $this->import_exit_code;
    }
}
