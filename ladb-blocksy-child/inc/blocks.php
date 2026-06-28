<?php
defined('ABSPATH') || exit;

/**
 * Register all LADB custom blocks.
 * Each block uses a PHP render callback — no build step required.
 */
add_action('init', function () {
    $blocks_dir = get_stylesheet_directory() . '/blocks/';

    $blocks = [
        'ladb-hero',
        'ladb-trust-strip',
        'ladb-services',
        'ladb-how-it-works',
        'ladb-reviews',
        'ladb-faq',
        'ladb-contact-form',
        'ladb-map-zones',
        'ladb-blog-teaser',
        'ladb-photo-banner',
        'ladb-pillar-services',
        'ladb-garanties',
        'ladb-realisations',
        'ladb-team',
        'ladb-equipe',
    ];

    foreach ($blocks as $block) {
        $block_path = $blocks_dir . $block;
        if (is_dir($block_path)) {
            register_block_type($block_path);
        }
    }
});
