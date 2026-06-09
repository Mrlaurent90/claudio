<?php
defined( 'ABSPATH' ) || exit;

// Preload fonts critiques
add_action( 'wp_head', 'ladb_preload_fonts', 1 );
function ladb_preload_fonts() {
	$fonts = [
		'BricolageGrotesque-Variable.woff2',
		'HankenGrotesk-Variable.woff2',
	];
	foreach ( $fonts as $font ) {
		$url = get_stylesheet_directory_uri() . '/assets/fonts/' . $font;
		echo '<link rel="preload" href="' . esc_url( $url ) . '" as="font" type="font/woff2" crossorigin>' . "\n";
	}
}

// Désactiver les scripts/styles Blocksy inutilisés sur la HP
add_action( 'wp_enqueue_scripts', 'ladb_disable_blocksy_bloat', 100 );
function ladb_disable_blocksy_bloat() {
	if ( is_front_page() ) {
		// Désactiver Blocksy animations si elles sont enqueued
		wp_dequeue_script( 'blocksy-animations' );
		wp_dequeue_style( 'blocksy-animations' );
	}
}

// Supprimer emojis WP (économise ~20ko)
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

// Supprimer oEmbed
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );

// Supprimer DNS prefetch par défaut
remove_action( 'wp_head', 'wp_resource_hints', 2 );
