<?php
defined('ABSPATH') || exit;

/* -----------------------------------------------------------------------
 * Enqueue styles & scripts
 * --------------------------------------------------------------------- */
add_action('wp_enqueue_scripts', function () {
    // Parent Blocksy style
    wp_enqueue_style(
        'blocksy-parent-style',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme('blocksy')->get('Version')
    );

    // Google Fonts — Hanken Grotesk (body)
    wp_enqueue_style(
        'ladb-google-fonts',
        'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap',
        [],
        null
    );

    // Global LADB styles (tokens + all components)
    wp_enqueue_style(
        'ladb-global',
        get_stylesheet_directory_uri() . '/assets/css/global.css',
        ['blocksy-parent-style'],
        '1.0.0'
    );

    // Mobile CTA styles
    wp_enqueue_style(
        'ladb-mobile-cta',
        get_stylesheet_directory_uri() . '/assets/css/mobile-cta.css',
        ['ladb-global'],
        '1.0.0'
    );

    // Frontend JS (FAQ accordion + mobile CTA)
    wp_enqueue_script(
        'ladb-frontend',
        get_stylesheet_directory_uri() . '/assets/js/frontend.js',
        [],
        '1.0.0',
        true
    );
});

/* -----------------------------------------------------------------------
 * Preload Bricolage Grotesque (LCP font)
 * --------------------------------------------------------------------- */
add_action('wp_head', function () {
    $font_url = get_stylesheet_directory_uri() . '/assets/fonts/BricolageGrotesque-VariableFont_opsz_wdth_wght.ttf';
    echo '<link rel="preload" href="' . esc_url($font_url) . '" as="font" type="font/ttf" crossorigin>' . "\n";
}, 1);

/* -----------------------------------------------------------------------
 * Register block category "LADB"
 * --------------------------------------------------------------------- */
add_filter('block_categories_all', function (array $categories): array {
    array_unshift($categories, [
        'slug'  => 'ladb',
        'title' => 'LADB',
        'icon'  => null,
    ]);
    return $categories;
});

/* -----------------------------------------------------------------------
 * Register editor styles so blocks look right in Gutenberg
 * --------------------------------------------------------------------- */
add_action('after_setup_theme', function () {
    add_editor_style([
        'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap',
        get_stylesheet_directory_uri() . '/assets/css/global.css',
    ]);
});

/* -----------------------------------------------------------------------
 * Load includes
 * --------------------------------------------------------------------- */
require_once get_stylesheet_directory() . '/inc/blocks.php';
require_once get_stylesheet_directory() . '/inc/schema.php';
require_once get_stylesheet_directory() . '/inc/performance.php';
require_once get_stylesheet_directory() . '/inc/mobile-cta.php';

/* -----------------------------------------------------------------------
 * Register block PATTERN category "LADB"
 * --------------------------------------------------------------------- */
add_action('init', function () {
    register_block_pattern_category('ladb', ['label' => 'LADB']);
});

/* -----------------------------------------------------------------------
 * Auto-load block patterns from /patterns/ folder (classic theme)
 * --------------------------------------------------------------------- */
add_action('init', function () {
    $patterns_dir = get_stylesheet_directory() . '/patterns/';
    if (!is_dir($patterns_dir)) {
        return;
    }
    foreach (glob($patterns_dir . '*.php') as $pattern_file) {
        $pattern_data = get_file_data($pattern_file, [
            'title'       => 'Title',
            'slug'        => 'Slug',
            'description' => 'Description',
            'categories'  => 'Categories',
        ]);
        if (empty($pattern_data['slug'])) {
            continue;
        }
        ob_start();
        include $pattern_file;
        $pattern_content = ob_get_clean();
        register_block_pattern($pattern_data['slug'], [
            'title'       => $pattern_data['title'],
            'description' => $pattern_data['description'],
            'categories'  => array_map('trim', explode(',', $pattern_data['categories'])),
            'content'     => $pattern_content,
        ]);
    }
}, 11);
