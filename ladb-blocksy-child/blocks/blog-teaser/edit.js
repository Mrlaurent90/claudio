import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		heading,
		description,
		viewAllText,
		viewAllUrl,
		categorySlug,
		postsCount,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ladb-blog-teaser ladb-blog-teaser--editor' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'En-tête de section', 'ladb' ) } initialOpen>
					<TextControl
						label={ __( 'Eyebrow', 'ladb' ) }
						value={ eyebrow }
						onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
					/>
					<TextControl
						label={ __( 'Titre h2', 'ladb' ) }
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
					/>
					<TextControl
						label={ __( 'Description', 'ladb' ) }
						value={ description }
						onChange={ ( val ) => setAttributes( { description: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Lien « Voir tous »', 'ladb' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Texte du bouton', 'ladb' ) }
						value={ viewAllText }
						onChange={ ( val ) => setAttributes( { viewAllText: val } ) }
					/>
					<TextControl
						label={ __( 'URL du bouton', 'ladb' ) }
						value={ viewAllUrl }
						onChange={ ( val ) => setAttributes( { viewAllUrl: val } ) }
						type="url"
						placeholder="https://…"
					/>
				</PanelBody>
				<PanelBody title={ __( 'Articles', 'ladb' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Slug de catégorie (vide = tous)', 'ladb' ) }
						value={ categorySlug }
						onChange={ ( val ) => setAttributes( { categorySlug: val } ) }
						placeholder="ex : vitrage"
					/>
					<RangeControl
						label={ __( "Nombre d'articles", 'ladb' ) }
						value={ postsCount }
						onChange={ ( val ) => setAttributes( { postsCount: val } ) }
						min={ 1 }
						max={ 6 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="ladb-blog-teaser__editor-placeholder">
					<span className="ladb-blog-teaser__editor-icon" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<rect x="3" y="3" width="7" height="7" rx="1" />
							<rect x="14" y="3" width="7" height="7" rx="1" />
							<rect x="3" y="14" width="7" height="7" rx="1" />
							<rect x="14" y="14" width="7" height="7" rx="1" />
						</svg>
					</span>
					<p className="ladb-blog-teaser__editor-label">
						{ __( "Blog teaser dynamique — configurer dans l'inspecteur", "ladb" ) }
					</p>
					<ul className="ladb-blog-teaser__editor-summary">
						{ heading && <li><strong>{ __( 'Titre :', 'ladb' ) }</strong> { heading }</li> }
						<li>
							<strong>{ __( 'Articles :', 'ladb' ) }</strong>{ ' ' }
							{ postsCount }{ categorySlug ? ` — catégorie : ${ categorySlug }` : ' — tous' }
						</li>
						{ viewAllUrl && (
							<li><strong>{ __( 'Lien :', 'ladb' ) }</strong> { viewAllUrl }</li>
						) }
					</ul>
				</div>
			</div>
		</>
	);
}
