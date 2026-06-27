/* global wp */
/* ladb/pillar-services — index.js
 * IIFE sans compilation requise : utilise wp.* globals charges par WordPress.
 * L'editeur affiche un placeholder ; le rendu front-end vient de render.php.
 */
( function () {
	'use strict';

	if ( ! window.wp || ! wp.blocks || ! wp.blockEditor ) {
		return;
	}

	var el            = wp.element.createElement;
	var useBlockProps = wp.blockEditor.useBlockProps;

	wp.blocks.registerBlockType( 'ladb/pillar-services', {
		edit: function ( props ) {
			var attrs = props.attributes;
			var blockProps = useBlockProps( {
				style: {
					background: '#0B1A33',
					padding: '1.5rem 2rem',
					borderRadius: '8px',
					border: '1px dashed rgba(225,170,110,0.4)',
					textAlign: 'center',
				},
			} );
			return el( 'div', blockProps,
				el( 'p', {
					style: {
						color: '#E1AA6E',
						fontWeight: '700',
						fontSize: '11px',
						textTransform: 'uppercase',
						letterSpacing: '.1em',
						marginBottom: '6px',
					},
				}, 'LADB · Prestations pilier' ),
				el( 'p', {
					style: { color: 'rgba(250,248,244,0.6)', fontSize: '13px', margin: '0 0 4px' },
				}, attrs.heading || 'Grille de prestations' ),
				el( 'p', {
					style: { color: 'rgba(250,248,244,0.3)', fontSize: '11px', margin: 0 },
				}, ( attrs.items ? attrs.items.length : 0 ) + ' cartes · rendu via render.php' )
			);
		},
		save: function () {
			return null; /* rendu via render.php */
		},
	} );
} )();
