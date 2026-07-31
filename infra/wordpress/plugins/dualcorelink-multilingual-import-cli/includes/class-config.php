<?php

final class DualCoreLink_Import_Config
{
    public const SCHEMA_VERSION = 1;
    public const LOCALE = 'zh';
    public const BATCH = 'p0';
    public const REVIEWER = 'Allan';
    public const REVIEW_DATE = '2026-07-29';
    public const RECORD_COUNT = 7;
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
            ];
        }
        return null;
    }

    public static function approved_source_id(int $source_id): bool
    {
        return array_key_exists($source_id, self::APPROVED) ||
            array_key_exists($source_id, self::ARABIC_APPROVED);
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
