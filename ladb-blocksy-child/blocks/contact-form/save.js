import { useBlockProps, RichText } from '@wordpress/block-editor';

const PhoneIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.53 5.53l.97-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
	</svg>
);

export default function Save( { attributes } ) {
	const {
		eyebrow,
		heading,
		description,
		phone,
		cf7Shortcode,
		availabilityText,
		legalText,
	} = attributes;

	const blockProps = useBlockProps.save( { className: 'ladb-contact-form' } );

	return (
		<section { ...blockProps }>
			<div className="ladb-contact-form__inner">

				{ /* Colonne gauche — infos */ }
				<div className="ladb-contact-form__info">
					<RichText.Content
						tagName="span"
						className="ladb-eyebrow"
						value={ eyebrow }
					/>

					<RichText.Content
						tagName="h2"
						className="ladb-contact-form__heading"
						value={ heading }
					/>

					<RichText.Content
						tagName="p"
						className="ladb-contact-form__description"
						value={ description }
					/>

					{ phone && (
						<a
							href={ `tel:${ phone.replace( /\s/g, '' ) }` }
							className="ladb-contact-form__phone"
						>
							<PhoneIcon />
							<span className="ladb-contact-form__phone-number">{ phone }</span>
						</a>
					) }

					{ availabilityText && (
						<div className="ladb-contact-form__availability">
							<span>{ availabilityText }</span>
						</div>
					) }

					<RichText.Content
						tagName="p"
						className="ladb-contact-form__legal"
						value={ legalText }
					/>
				</div>

				{ /* Colonne droite — shortcode CF7, parsé par WordPress via do_shortcode() */ }
				{ cf7Shortcode && (
					<div className="ladb-contact-form__form-col">
						<div
							className="ladb-contact-form__cf7"
							dangerouslySetInnerHTML={ { __html: cf7Shortcode } }
						/>
					</div>
				) }

			</div>
		</section>
	);
}
