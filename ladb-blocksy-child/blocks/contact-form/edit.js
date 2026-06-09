import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const PhoneIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.53 5.53l.97-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
	</svg>
);

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		heading,
		description,
		phone,
		cf7Shortcode,
		availabilityText,
		legalText,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ladb-contact-form' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Contenu', 'ladb' ) } initialOpen>
					<TextControl
						label={ __( 'Eyebrow', 'ladb' ) }
						value={ eyebrow }
						onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
					/>
					<TextControl
						label={ __( 'Titre', 'ladb' ) }
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
					/>
					<TextareaControl
						label={ __( 'Description', 'ladb' ) }
						value={ description }
						onChange={ ( val ) => setAttributes( { description: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Contact Form 7', 'ladb' ) } initialOpen>
					<TextareaControl
						label={ __( 'Shortcode CF7', 'ladb' ) }
						help={ __( 'Ex : [contact-form-7 id="123" title="Devis LADB"]', 'ladb' ) }
						value={ cf7Shortcode }
						onChange={ ( val ) => setAttributes( { cf7Shortcode: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Informations de contact', 'ladb' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Téléphone', 'ladb' ) }
						value={ phone }
						onChange={ ( val ) => setAttributes( { phone: val } ) }
					/>
					<TextControl
						label={ __( 'Disponibilité', 'ladb' ) }
						value={ availabilityText }
						onChange={ ( val ) => setAttributes( { availabilityText: val } ) }
					/>
					<TextareaControl
						label={ __( 'Mention légale RGPD', 'ladb' ) }
						value={ legalText }
						onChange={ ( val ) => setAttributes( { legalText: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="ladb-contact-form__inner">

					{ /* Colonne gauche — infos */ }
					<div className="ladb-contact-form__info">
						<RichText
							tagName="span"
							className="ladb-eyebrow"
							value={ eyebrow }
							onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
							placeholder={ __( 'Eyebrow…', 'ladb' ) }
							allowedFormats={ [] }
						/>

						<RichText
							tagName="h2"
							className="ladb-contact-form__heading"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							placeholder={ __( 'Titre…', 'ladb' ) }
							allowedFormats={ [] }
						/>

						<RichText
							tagName="p"
							className="ladb-contact-form__description"
							value={ description }
							onChange={ ( val ) => setAttributes( { description: val } ) }
							placeholder={ __( 'Description…', 'ladb' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<div className="ladb-contact-form__phone">
							<PhoneIcon />
							<RichText
								tagName="span"
								className="ladb-contact-form__phone-number"
								value={ phone }
								onChange={ ( val ) => setAttributes( { phone: val } ) }
								placeholder="06 86 41 69 25"
								allowedFormats={ [] }
							/>
						</div>

						<div className="ladb-contact-form__availability">
							<RichText
								tagName="span"
								value={ availabilityText }
								onChange={ ( val ) => setAttributes( { availabilityText: val } ) }
								placeholder={ __( 'Disponibilité…', 'ladb' ) }
								allowedFormats={ [] }
							/>
						</div>

						<RichText
							tagName="p"
							className="ladb-contact-form__legal"
							value={ legalText }
							onChange={ ( val ) => setAttributes( { legalText: val } ) }
							placeholder={ __( 'Mention légale…', 'ladb' ) }
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
						/>
					</div>

					{ /* Colonne droite — formulaire CF7 */ }
					<div className="ladb-contact-form__form-col">
						{ cf7Shortcode && cf7Shortcode.trim() !== '' ? (
							<div className="ladb-contact-form__cf7-preview">
								<p className="ladb-contact-form__cf7-preview-label">
									{ __( 'Contact Form 7 — rendu côté serveur', 'ladb' ) }
								</p>
								<code className="ladb-contact-form__cf7-preview-code">{ cf7Shortcode }</code>
							</div>
						) : (
							<div className="ladb-contact-form__cf7-placeholder">
								{ __( 'Contact Form 7 — Entrer le shortcode dans l\'inspecteur', 'ladb' ) }
							</div>
						) }
					</div>

				</div>
			</section>
		</>
	);
}
