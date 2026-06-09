import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const PhoneIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.53 5.53l.97-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
	</svg>
);

export default function Edit( { attributes, setAttributes } ) {
	const {
		kicker, headingLine1, headingLine2, headingLine3, lede,
		cta1Label, cta1Url, cta2Label, cta2Url, phone,
		imageId, imageUrl, imageAlt, imageCaption, imageBadge,
		marker1Value, marker1Label, marker1Sub,
		marker2Value, marker2Label, marker2Sub,
		marker3Value, marker3Label, marker3Sub,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ladb-hero' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Liens CTA', 'ladb' ) } initialOpen>
					<TextControl
						label={ __( 'URL bouton primaire', 'ladb' ) }
						value={ cta1Url }
						onChange={ ( val ) => setAttributes( { cta1Url: val } ) }
					/>
					<TextControl
						label={ __( 'URL bouton ghost', 'ladb' ) }
						value={ cta2Url }
						onChange={ ( val ) => setAttributes( { cta2Url: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Marqueurs statistiques', 'ladb' ) } initialOpen={ false }>
					<TextControl label={ __( 'Marqueur 1 — Valeur', 'ladb' ) } value={ marker1Value } onChange={ ( val ) => setAttributes( { marker1Value: val } ) } />
					<TextControl label={ __( 'Marqueur 1 — Label', 'ladb' ) } value={ marker1Label } onChange={ ( val ) => setAttributes( { marker1Label: val } ) } />
					<TextControl label={ __( 'Marqueur 1 — Sous-label', 'ladb' ) } value={ marker1Sub } onChange={ ( val ) => setAttributes( { marker1Sub: val } ) } />
					<TextControl label={ __( 'Marqueur 2 — Valeur', 'ladb' ) } value={ marker2Value } onChange={ ( val ) => setAttributes( { marker2Value: val } ) } />
					<TextControl label={ __( 'Marqueur 2 — Label', 'ladb' ) } value={ marker2Label } onChange={ ( val ) => setAttributes( { marker2Label: val } ) } />
					<TextControl label={ __( 'Marqueur 2 — Sous-label', 'ladb' ) } value={ marker2Sub } onChange={ ( val ) => setAttributes( { marker2Sub: val } ) } />
					<TextControl label={ __( 'Marqueur 3 — Valeur', 'ladb' ) } value={ marker3Value } onChange={ ( val ) => setAttributes( { marker3Value: val } ) } />
					<TextControl label={ __( 'Marqueur 3 — Label', 'ladb' ) } value={ marker3Label } onChange={ ( val ) => setAttributes( { marker3Label: val } ) } />
					<TextControl label={ __( 'Marqueur 3 — Sous-label', 'ladb' ) } value={ marker3Sub } onChange={ ( val ) => setAttributes( { marker3Sub: val } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Photo artisan', 'ladb' ) } initialOpen={ false }>
					<TextControl label={ __( 'Texte alternatif', 'ladb' ) } value={ imageAlt } onChange={ ( val ) => setAttributes( { imageAlt: val } ) } />
					<TextControl label={ __( 'Badge photo', 'ladb' ) } value={ imageBadge } onChange={ ( val ) => setAttributes( { imageBadge: val } ) } />
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="ladb-hero__inner">
					<div className="ladb-hero__content">
						<RichText
							tagName="span"
							className="ladb-eyebrow"
							value={ kicker }
							onChange={ ( val ) => setAttributes( { kicker: val } ) }
							placeholder={ __( 'Kicker…', 'ladb' ) }
							allowedFormats={ [] }
						/>

						<h1 className="ladb-hero__h1" id="ladb-hero-heading">
							<RichText
								tagName="span"
								className="ladb-hero__h1-line"
								value={ headingLine1 }
								onChange={ ( val ) => setAttributes( { headingLine1: val } ) }
								placeholder={ __( 'Ligne 1…', 'ladb' ) }
								allowedFormats={ [] }
							/>
							<RichText
								tagName="span"
								className="ladb-hero__h1-line"
								value={ headingLine2 }
								onChange={ ( val ) => setAttributes( { headingLine2: val } ) }
								placeholder={ __( 'Ligne 2…', 'ladb' ) }
								allowedFormats={ [] }
							/>
							<RichText
								tagName="span"
								className="ladb-hero__h1-line ladb-hero__h1-line--accent"
								value={ headingLine3 }
								onChange={ ( val ) => setAttributes( { headingLine3: val } ) }
								placeholder={ __( 'Ligne 3 (italique cuivre)…', 'ladb' ) }
								allowedFormats={ [] }
							/>
						</h1>

						<RichText
							tagName="p"
							className="ladb-hero__lede"
							value={ lede }
							onChange={ ( val ) => setAttributes( { lede: val } ) }
							placeholder={ __( 'Accroche…', 'ladb' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<div className="ladb-hero__ctas">
							<RichText
								tagName="span"
								className="ladb-btn ladb-btn--primary"
								value={ cta1Label }
								onChange={ ( val ) => setAttributes( { cta1Label: val } ) }
								placeholder={ __( 'Bouton primaire…', 'ladb' ) }
								allowedFormats={ [] }
							/>
							<RichText
								tagName="span"
								className="ladb-btn ladb-btn--ghost"
								value={ cta2Label }
								onChange={ ( val ) => setAttributes( { cta2Label: val } ) }
								placeholder={ __( 'Bouton ghost…', 'ladb' ) }
								allowedFormats={ [] }
							/>
						</div>

						<div className="ladb-hero__phone">
							<PhoneIcon />
							<RichText
								tagName="span"
								className="ladb-hero__phone-number"
								value={ phone }
								onChange={ ( val ) => setAttributes( { phone: val } ) }
								placeholder="06 86 41 69 25"
								allowedFormats={ [] }
							/>
						</div>
					</div>

					<div className="ladb-hero__media">
						<div className="ladb-hero__image-wrap">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											imageId: media.id,
											imageUrl: media.url,
											imageAlt: media.alt || imageAlt,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ imageId }
									render={ ( { open } ) => (
										<>
											{ imageUrl ? (
												<img
													src={ imageUrl }
													alt={ imageAlt }
													className="ladb-hero__image"
													onClick={ open }
												/>
											) : (
												<Button
													className="ladb-hero__image-placeholder"
													onClick={ open }
													variant="secondary"
												>
													{ __( 'Choisir la photo artisan', 'ladb' ) }
												</Button>
											) }
										</>
									) }
								/>
							</MediaUploadCheck>

							{ imageBadge && (
								<span className="ladb-hero__badge">{ imageBadge }</span>
							) }
						</div>

						{ imageCaption && (
							<RichText
								tagName="figcaption"
								className="ladb-hero__caption"
								value={ imageCaption }
								onChange={ ( val ) => setAttributes( { imageCaption: val } ) }
								placeholder={ __( 'Légende photo…', 'ladb' ) }
								allowedFormats={ [] }
							/>
						) }

						<div className="ladb-hero__markers">
							{ [ 1, 2, 3 ].map( ( n, idx ) => (
								<>
									{ idx > 0 && <span className="ladb-hero__marker-sep" aria-hidden="true">|</span> }
									<div key={ n } className="ladb-hero__marker">
										<span className="ladb-hero__marker-value">{ attributes[ `marker${ n }Value` ] }</span>
										<span className="ladb-hero__marker-label">{ attributes[ `marker${ n }Label` ] }</span>
										<span className="ladb-hero__marker-sub">{ attributes[ `marker${ n }Sub` ] }</span>
									</div>
								</>
							) ) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
