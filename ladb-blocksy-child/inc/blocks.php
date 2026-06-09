<?php
defined( 'ABSPATH' ) || exit;

add_action( 'init', 'ladb_register_blocks' );
function ladb_register_blocks() {
	$blocks_dir = get_stylesheet_directory() . '/blocks';
	if ( ! is_dir( $blocks_dir ) ) {
		return;
	}
	foreach ( glob( $blocks_dir . '/*/block.json' ) as $block_json ) {
		$block_dir = dirname( $block_json );
		register_block_type( $block_dir );
	}
}
