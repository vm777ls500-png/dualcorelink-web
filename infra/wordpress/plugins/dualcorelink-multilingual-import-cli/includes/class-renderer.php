<?php

final class DualCoreLink_Import_Renderer
{
    private static function text($value): string
    {
        if (!is_string($value)) {
            throw new DualCoreLink_Import_Exception(
                'Renderer received a non-string value.',
                DualCoreLink_Import_Config::EXIT_PREFLIGHT
            );
        }
        return esc_html($value);
    }

    private static function href($value, string $locale): string
    {
        if (!in_array($locale, ['zh', 'ar', 'vi'], true) ||
            !is_string($value) ||
            preg_match('~^/' . preg_quote($locale, '~') . '/[a-z0-9/_-]*(?:#[a-z0-9_-]+)?$~iD', $value) !== 1) {
            throw new DualCoreLink_Import_Exception(
                'Renderer rejected an unsafe localized href.',
                DualCoreLink_Import_Config::EXIT_PREFLIGHT
            );
        }
        return esc_url($value);
    }

    public static function specifications_text(array $record): string
    {
        $lines = [];
        foreach ($record['translatedSpecifications'] as $specification) {
            $lines[] = trim((string) $specification['label']) . ': ' .
                trim((string) $specification['value']);
        }
        return implode("\n", $lines);
    }

    public static function faqs_text(array $record): string
    {
        $blocks = [];
        foreach ($record['translatedStructuredContent']['faqs'] as $faq) {
            $blocks[] = trim((string) $faq['question']) . "\n" .
                trim((string) $faq['answer']);
        }
        return implode("\n\n", $blocks);
    }

    public static function render(array $record): string
    {
        $content = $record['translatedStructuredContent'];
        $locale = (string) $record['locale'];
        $headings = $locale === 'ar'
            ? [
                'specifications' => 'المواصفات ومعلومات الشراء',
                'faq' => 'الأسئلة الشائعة',
                'related' => 'صفحات ذات صلة',
            ]
            : [
                'specifications' => '规格与采购信息',
                'faq' => '常见问题',
                'related' => '相关页面',
            ];
        if ($locale === 'vi') {
            $headings = [
                'specifications' => 'Thông số và thông tin mua hàng',
                'faq' => 'Câu hỏi thường gặp',
                'related' => 'Trang liên quan',
            ];
        }
        $output = [
            '<p class="content-eyebrow">' . self::text($content['eyebrow']) . '</p>',
            '<h1>' . self::text($content['h1']) . '</h1>',
            '<p>' . self::text($content['introduction']) . '</p>',
            '<section><h2>' . $headings['specifications'] . '</h2><dl>',
        ];
        foreach ($record['translatedSpecifications'] as $specification) {
            $output[] = '<dt>' . self::text($specification['label']) . '</dt>';
            $output[] = '<dd>' . self::text($specification['value']) . '</dd>';
        }
        $output[] = '</dl></section>';
        foreach ($content['sections'] as $section) {
            $output[] = '<section><h2>' . self::text($section['heading']) . '</h2>';
            foreach ($section['paragraphs'] as $paragraph) {
                $output[] = '<p>' . self::text($paragraph) . '</p>';
            }
            if (!empty($section['bullets'])) {
                $output[] = '<ul>';
                foreach ($section['bullets'] as $bullet) {
                    $output[] = '<li>' . self::text($bullet) . '</li>';
                }
                $output[] = '</ul>';
            }
            $output[] = '</section>';
        }
        $output[] = '<section><h2>' . $headings['faq'] . '</h2>';
        foreach ($content['faqs'] as $faq) {
            $output[] = '<h3>' . self::text($faq['question']) . '</h3>';
            $output[] = '<p>' . self::text($faq['answer']) . '</p>';
        }
        $output[] = '</section>';
        $output[] = '<section><h2>' . $headings['related'] . '</h2><ul>';
        foreach ($content['relatedLinks'] as $link) {
            $output[] = '<li><a href="' . self::href($link['href'], $locale) . '">' .
                self::text($link['label']) . '</a><p>' .
                self::text($link['description']) . '</p></li>';
        }
        $output[] = '</ul></section>';
        $output[] = '<section class="content-cta"><h2>' .
            self::text($content['cta']['heading']) . '</h2>';
        $output[] = '<p>' . self::text($content['cta']['description']) . '</p>';
        $output[] = '<p><a href="' . self::href($content['cta']['href'], $locale) . '">' .
            self::text($content['cta']['label']) . '</a></p>';
        if (!empty($content['cta']['secondaryLabel']) && !empty($content['cta']['secondaryHref'])) {
            $output[] = '<p><a href="' . self::href($content['cta']['secondaryHref'], $locale) . '">' .
                self::text($content['cta']['secondaryLabel']) . '</a></p>';
        }
        $output[] = '</section>';
        return implode("\n", $output);
    }

    public static function map(array $record, string $payload_hash): array
    {
        $source_id = (int) $record['sourceEnglishContentId'];
        $post_type = (string) $record['contentType'];
        $acf = $post_type === 'product'
            ? [
                'product_short_description' => $record['translatedDescription'],
                'product_technical_specs' => self::specifications_text($record),
                'product_faqs_text' => self::faqs_text($record),
                'product_seo_title' => $record['translatedSeoTitle'],
                'product_meta_description' => $record['translatedMetaDescription'],
                'product_breadcrumb_label' => $record['translatedStructuredContent']['breadcrumbLabel'],
            ]
            : [
                'solution_summary' => $record['translatedDescription'],
                'solution_seo_title' => $record['translatedSeoTitle'],
                'solution_meta_description' => $record['translatedMetaDescription'],
                'solution_breadcrumb_label' => $record['translatedStructuredContent']['breadcrumbLabel'],
            ];
        if ($post_type === 'product' && !empty($record['translatedStructuredContent']['imageAlt'])) {
            $acf['product_image_alt_text'] = $record['translatedStructuredContent']['imageAlt'];
        }
        $meta = [
            DualCoreLink_Import_Config::META_SCHEMA_VERSION => DualCoreLink_Import_Config::SCHEMA_VERSION,
            DualCoreLink_Import_Config::META_LOCALE => $record['locale'],
            DualCoreLink_Import_Config::META_SOURCE_ID => $source_id,
            DualCoreLink_Import_Config::META_GROUP => DualCoreLink_Import_Config::group($post_type, $source_id),
            DualCoreLink_Import_Config::META_BATCH => $record['batch'],
            DualCoreLink_Import_Config::META_PAYLOAD_HASH => $payload_hash,
            DualCoreLink_Import_Config::META_REVIEWER => $record['nativeReviewer'] ?? '',
            DualCoreLink_Import_Config::META_REVIEW_DATE => $record['nativeReviewDate'] ?? '',
        ];
        if (($record['locale'] ?? '') === 'ar' && ($record['batch'] ?? '') === 'p0') {
            $meta += [
                DualCoreLink_Import_Config::META_OWNER_WAIVER_SCHEMA_VERSION =>
                    $record['ownerReviewWaiverSchemaVersion'],
                DualCoreLink_Import_Config::META_OWNER_WAIVER_STATUS =>
                    $record['ownerReviewWaiverStatus'],
                DualCoreLink_Import_Config::META_OWNER_WAIVER_BY =>
                    $record['ownerReviewWaiverBy'],
                DualCoreLink_Import_Config::META_OWNER_WAIVER_DATE =>
                    $record['ownerReviewWaiverDate'],
                DualCoreLink_Import_Config::META_OWNER_WAIVER_REASON =>
                    $record['ownerReviewWaiverReason'],
            ];
        }
        $expected_meta_keys = DualCoreLink_Import_Config::meta_keys_for(
            (string) ($record['locale'] ?? ''),
            (string) ($record['batch'] ?? '')
        );
        $actual_meta_keys = array_keys($meta);
        sort($expected_meta_keys, SORT_STRING);
        sort($actual_meta_keys, SORT_STRING);
        if (!$expected_meta_keys || $actual_meta_keys !== $expected_meta_keys) {
            throw new DualCoreLink_Import_Exception(
                'Renderer meta fields do not match locale write capability.',
                DualCoreLink_Import_Config::EXIT_PREFLIGHT
            );
        }
        return [
            'source_id' => $source_id,
            'identity' => sprintf(
                '%s:%d:%s:%s',
                $post_type,
                $source_id,
                $record['locale'],
                $record['localizedSlug']
            ),
            'post_type' => $post_type,
            'slug' => $record['localizedSlug'],
            'status' => 'draft',
            'core' => [
                'post_title' => $record['translatedTitle'],
                'post_name' => $record['localizedSlug'],
                'post_excerpt' => $record['translatedDescription'],
                'post_content' => self::render($record),
                'post_status' => 'draft',
            ],
            'acf' => $acf,
            'meta' => $meta,
        ];
    }
}
