import { useBlockProps, RichText } from '@wordpress/block-editor';

const PhoneIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.53 5.53l.97-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
	</svg>
);

export default function Save( { attributes } ) {
	const {
		kicker, headingLine1, headingLine2, headingLine3, lede,
		cta1Label, cta1Url, cta2Label, cta2Url, phone,
		imageUrl, imageAlt, imageCaption, imageBadge,
		marker1Value, marker1Label, marker1Sub,
		marker2Value, marker2Label, marker2Sub,
		marker3Value, marker3Label, marker3Sub,
	} = attributes;

	const blockProps = useBlockProps.save( { className: 'ladb-hero' } );

	const markers = [
		{ value: marker1Value, label: marker1Label, sub: marker1Sub },
		{ value: marker2Value, label: marker2Label, sub: marker2Sub },
		{ value: marker3Value, label: marker3Label, sub: marker3Sub },
	];

	return (
		<section { ...blockProps }>
			<div className="ladb-hero__inner">
				<div className="ladb-hero__content">
					<RichText.Content
						tagName="span"
						className="ladb-eyebrow"
						value={ kicker }
					/>

					<h1 className="ladb-hero__h1" id="ladb-hero-heading">
						<RichText.Content
							tagName="span"
							className="ladb-hero__h1-line"
							value={ headingLine1 }
						/>
						<RichText.Content
							tagName="span"
							className="ladb-hero__h1-line"
							value={ headingLine2 }
						/>
						<RichText.Content
							tagName="span"
							className="ladb-hero__h1-line ladb-hero__h1-line--accent"
							value={ headingLine3 }
						/>
					</h1>

					<RichText.Content
						tagName="p"
						className="ladb-hero__lede"
						value={ lede }
					/>

					<div className="ladb-hero__ctas">
						{ cta1Label && (
							<a href={ cta1Url } className="ladb-btn ladb-btn--primary">
								<RichText.Content value={ cta1Label } />
							</a>
						) }
						{ cta2Label && (
							<a href={ cta2Url } className="ladb-btn ladb-btn--ghost">
								<RichText.Content value={ cta2Label } />
							</a>
						) }
					</div>

					{ phone && (
						<a href={ `tel:${ phone.replace( /\s/g, '' ) }` } className="ladb-hero__phone">
							<PhoneIcon />
							<span className="ladb-hero__phone-number">{ phone }</span>
						</a>
					) }
				</div>

				<div className="ladb-hero__media">
					{ imageUrl && (
						<figure className="ladb-hero__image-wrap">
							<img
								src={ imageUrl }
								alt={ imageAlt }
								className="ladb-hero__image"
								loading="eager"
								decoding="async"
							/>
							{ imageBadge && (
								<span className="ladb-hero__badge">{ imageBadge }</span>
							) }
							{ imageCaption && (
								<RichText.Content
									tagName="figcaption"
									className="ladb-hero__caption"
									value={ imageCaption }
								/>
							) }
						</figure>
					) }

					<div className="ladb-hero__markers" role="list">
						{ markers.map( ( m, idx ) => (
							<>
								{ idx > 0 && (
									<span className="ladb-hero__marker-sep" aria-hidden="true">|</span>
								) }
								<div key={ idx } className="ladb-hero__marker" role="listitem">
									<span className="ladb-hero__marker-value">{ m.value }</span>
									<span className="ladb-hero__marker-label">{ m.label }</span>
									<span className="ladb-hero__marker-sub">{ m.sub }</span>
								</div>
							</>
						) ) }
					</div>
				</div>
			</div>
		</section>
	);
}
