/* global wp */
/* ladb/garanties — index.js
 * IIFE sans compilation requise.
 */
( function () {
	'use strict';

	if ( ! window.wp || ! wp.blocks || ! wp.blockEditor ) {
		return;
	}

	var el            = wp.element.createElement;
	var useBlockProps = wp.blockEditor.useBlockProps;

	wp.blocks.registerBlockType( 'ladb/garanties', {
		edit: function ( props ) {
			var attrs = props.attributes;
			var blockProps = useBlockProps( {
				style: {
					background: '#FAF8F4',
					padding: '1.5rem 2rem',
					borderRadius: '8px',
					border: '1px dashed rgba(192,122,62,0.4)',
					textAlign: 'center',
				},
			} );
			return el( 'div', blockProps,
				el( 'p', {
					style: { color: '#C07A3E', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '6px' },
				}, 'LADB · Pourquoi nous choisir' ),
				el( 'p', {
					style: { color: 'rgba(11,26,51,0.5)', fontSize: '13px', margin: '0 0 4px' },
				}, attrs.heading || 'Grille garanties' ),
				el( 'p', {
					style: { color: 'rgba(11,26,51,0.3)', fontSize: '11px', margin: 0 },
				}, ( attrs.items ? attrs.items.length : 0 ) + ' cartes · rendu via render.php' )
			);
		},
		save: function () {
			return null;
		},
	} );
} )();
