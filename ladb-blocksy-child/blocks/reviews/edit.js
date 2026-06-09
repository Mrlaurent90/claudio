import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const StarIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		aria-hidden="true"
		focusable="false"
	>
		<path
			fill="#E1AA6E"
			d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
		/>
	</svg>
);

const FiveStars = () => (
	<span className="ladb-reviews__stars" aria-label={ __( '5 étoiles sur 5', 'ladb' ) }>
		<StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
	</span>
);

const ReviewCard = ( { initials, name, date, city, quote } ) => (
	<article className="ladb-reviews__card">
		<header className="ladb-reviews__card-header">
			<span className="ladb-reviews__avatar" aria-hidden="true">{ initials }</span>
			<div className="ladb-reviews__meta">
				<span className="ladb-reviews__name">{ name }</span>
				<span className="ladb-reviews__city">{ city }</span>
			</div>
		</header>
		<div className="ladb-reviews__card-rating">
			<FiveStars />
			<span className="ladb-reviews__date">{ date }</span>
		</div>
		<blockquote className="ladb-reviews__quote">
			<p>{ '« ' }{ quote }{ ' »' }</p>
		</blockquote>
	</article>
);

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow, heading, score, reviewCount, googleUrl,
		review1Initials, review1Name, review1Date, review1City, review1Quote,
		review2Initials, review2Name, review2Date, review2City, review2Quote,
		review3Initials, review3Name, review3Date, review3City, review3Quote,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ladb-reviews' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Lien Google', 'ladb' ) } initialOpen>
					<TextControl
						label={ __( 'URL Google Business (lien "Voir sur Google")', 'ladb' ) }
						value={ googleUrl }
						onChange={ ( val ) => setAttributes( { googleUrl: val } ) }
						placeholder="https://g.page/…"
					/>
					<TextControl
						label={ __( 'Score affiché', 'ladb' ) }
						value={ score }
						onChange={ ( val ) => setAttributes( { score: val } ) }
					/>
					<TextControl
						label={ __( 'Nombre d\'avis', 'ladb' ) }
						value={ reviewCount }
						onChange={ ( val ) => setAttributes( { reviewCount: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Avis 1', 'ladb' ) } initialOpen={ false }>
					<TextControl label={ __( 'Initiales', 'ladb' ) } value={ review1Initials } onChange={ ( val ) => setAttributes( { review1Initials: val } ) } />
					<TextControl label={ __( 'Nom', 'ladb' ) } value={ review1Name } onChange={ ( val ) => setAttributes( { review1Name: val } ) } />
					<TextControl label={ __( 'Date', 'ladb' ) } value={ review1Date } onChange={ ( val ) => setAttributes( { review1Date: val } ) } />
					<TextControl label={ __( 'Ville', 'ladb' ) } value={ review1City } onChange={ ( val ) => setAttributes( { review1City: val } ) } />
					<TextControl label={ __( 'Citation', 'ladb' ) } value={ review1Quote } onChange={ ( val ) => setAttributes( { review1Quote: val } ) } />
				</PanelBody>

				<PanelBody title={ __( 'Avis 2', 'ladb' ) } initialOpen={ false }>
					<TextControl label={ __( 'Initiales', 'ladb' ) } value={ review2Initials } onChange={ ( val ) => setAttributes( { review2Initials: val } ) } />
					<TextControl label={ __( 'Nom', 'ladb' ) } value={ review2Name } onChange={ ( val ) => setAttributes( { review2Name: val } ) } />
					<TextControl label={ __( 'Date', 'ladb' ) } value={ review2Date } onChange={ ( val ) => setAttributes( { review2Date: val } ) } />
					<TextControl label={ __( 'Ville', 'ladb' ) } value={ review2City } onChange={ ( val ) => setAttributes( { review2City: val } ) } />
					<TextControl label={ __( 'Citation', 'ladb' ) } value={ review2Quote } onChange={ ( val ) => setAttributes( { review2Quote: val } ) } />
				</PanelBody>

				<PanelBody title={ __( 'Avis 3', 'ladb' ) } initialOpen={ false }>
					<TextControl label={ __( 'Initiales', 'ladb' ) } value={ review3Initials } onChange={ ( val ) => setAttributes( { review3Initials: val } ) } />
					<TextControl label={ __( 'Nom', 'ladb' ) } value={ review3Name } onChange={ ( val ) => setAttributes( { review3Name: val } ) } />
					<TextControl label={ __( 'Date', 'ladb' ) } value={ review3Date } onChange={ ( val ) => setAttributes( { review3Date: val } ) } />
					<TextControl label={ __( 'Ville', 'ladb' ) } value={ review3City } onChange={ ( val ) => setAttributes( { review3City: val } ) } />
					<TextControl label={ __( 'Citation', 'ladb' ) } value={ review3Quote } onChange={ ( val ) => setAttributes( { review3Quote: val } ) } />
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="ladb-reviews__inner">

					<header className="ladb-reviews__header">
						<RichText
							tagName="span"
							className="ladb-reviews__eyebrow"
							value={ eyebrow }
							onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
							placeholder={ __( 'Eyebrow…', 'ladb' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="h2"
							className="ladb-reviews__heading"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							placeholder={ __( 'Titre section…', 'ladb' ) }
							allowedFormats={ [] }
						/>
					</header>

					<div className="ladb-reviews__score-band">
						<div className="ladb-reviews__score-left">
							<RichText
								tagName="span"
								className="ladb-reviews__score-number"
								value={ score }
								onChange={ ( val ) => setAttributes( { score: val } ) }
								placeholder="5.0"
								allowedFormats={ [] }
							/>
							<FiveStars />
						</div>
						<div className="ladb-reviews__score-right">
							<span className="ladb-reviews__verified">
								<RichText
									tagName="span"
									value={ reviewCount }
									onChange={ ( val ) => setAttributes( { reviewCount: val } ) }
									placeholder="47"
									allowedFormats={ [] }
								/>
								{ ' ' }{ __( 'avis vérifiés', 'ladb' ) }
							</span>
							{ googleUrl && (
								<span className="ladb-btn ladb-btn--ghost ladb-reviews__google-btn">
									{ __( 'Voir sur Google', 'ladb' ) }
								</span>
							) }
							{ ! googleUrl && (
								<span className="ladb-reviews__google-btn-hint">
									{ __( '← Renseignez l\'URL Google pour afficher le bouton', 'ladb' ) }
								</span>
							) }
						</div>
					</div>

					<div className="ladb-reviews__grid">
						<ReviewCard
							initials={ review1Initials }
							name={ review1Name }
							date={ review1Date }
							city={ review1City }
							quote={ review1Quote }
						/>
						<ReviewCard
							initials={ review2Initials }
							name={ review2Name }
							date={ review2Date }
							city={ review2City }
							quote={ review2Quote }
						/>
						<ReviewCard
							initials={ review3Initials }
							name={ review3Name }
							date={ review3Date }
							city={ review3City }
							quote={ review3Quote }
						/>
					</div>

				</div>
			</section>
		</>
	);
}
