<?php
defined('ABSPATH') || exit;

/* -----------------------------------------------------------------------
 * Remove unused WordPress features
 * --------------------------------------------------------------------- */
add_action('init', function () {
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rest_output_link_wp_head', 10);
    remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
    remove_action('template_redirect', 'rest_output_link_header', 11);
});

/* -----------------------------------------------------------------------
 * Disable wp-embed script
 * --------------------------------------------------------------------- */
add_action('wp_footer', function () {
    wp_deregister_script('wp-embed');
}, 100);

/* -----------------------------------------------------------------------
 * Add DNS prefetch for Google Fonts
 * --------------------------------------------------------------------- */
add_action('wp_head', function () {
    echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">' . "\n";
    echo '<link rel="dns-prefetch" href="//fonts.gstatic.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}, 2);

/* -----------------------------------------------------------------------
 * Add loading="lazy" to content images automatically
 * --------------------------------------------------------------------- */
add_filter('the_content', function (string $content): string {
    if (is_admin()) {
        return $content;
    }
    return preg_replace('/<img(?![^>]*loading=)/i', '<img loading="lazy"', $content);
});

/* -----------------------------------------------------------------------
 * Set title tag support
 * --------------------------------------------------------------------- */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('html5', ['script', 'style', 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption']);
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('wp-block-styles');
});
