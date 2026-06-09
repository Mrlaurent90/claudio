<?php
defined( 'ABSPATH' ) || exit;

require_once get_stylesheet_directory() . '/inc/blocks.php';
require_once get_stylesheet_directory() . '/inc/schema.php';
require_once get_stylesheet_directory() . '/inc/performance.php';
require_once get_stylesheet_directory() . '/inc/mobile-cta.php';

// Catégorie de blocs personnalisée dans l'éditeur
add_filter( 'block_categories_all', 'ladb_register_block_category', 10, 2 );
function ladb_register_block_category( $categories ) {
	return array_merge(
		[
			[
				'slug'  => 'ladb',
				'title' => 'LADB — Blocs',
				'icon'  => null,
			],
		],
		$categories
	);
}

add_action( 'wp_enqueue_scripts', 'ladb_enqueue_assets' );
function ladb_enqueue_assets() {
	// Hérite du parent Blocksy
	wp_enqueue_style(
		'ladb-parent-style',
		get_template_directory_uri() . '/style.css',
		[],
		wp_get_theme( 'blocksy' )->get( 'Version' )
	);
	wp_enqueue_style(
		'ladb-global',
		get_stylesheet_directory_uri() . '/assets/css/global.css',
		[ 'ladb-parent-style' ],
		'1.0.0'
	);
	wp_enqueue_style(
		'ladb-mobile-cta',
		get_stylesheet_directory_uri() . '/assets/css/mobile-cta.css',
		[ 'ladb-global' ],
		'1.0.0'
	);
	wp_enqueue_script(
		'ladb-frontend',
		get_stylesheet_directory_uri() . '/assets/js/frontend.js',
		[],
		'1.0.0',
		true
	);
}
