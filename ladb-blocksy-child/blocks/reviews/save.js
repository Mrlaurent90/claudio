import { useBlockProps, RichText } from '@wordpress/block-editor';

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
	<span className="ladb-reviews__stars" aria-label="5 étoiles sur 5">
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

export default function Save( { attributes } ) {
	const {
		eyebrow, heading, score, reviewCount, googleUrl,
		review1Initials, review1Name, review1Date, review1City, review1Quote,
		review2Initials, review2Name, review2Date, review2City, review2Quote,
		review3Initials, review3Name, review3Date, review3City, review3Quote,
	} = attributes;

	const blockProps = useBlockProps.save( { className: 'ladb-reviews' } );

	const reviews = [
		{ initials: review1Initials, name: review1Name, date: review1Date, city: review1City, quote: review1Quote },
		{ initials: review2Initials, name: review2Name, date: review2Date, city: review2City, quote: review2Quote },
		{ initials: review3Initials, name: review3Name, date: review3Date, city: review3City, quote: review3Quote },
	];

	return (
		<section { ...blockProps }>
			<div className="ladb-reviews__inner">

				<header className="ladb-reviews__header">
					<RichText.Content
						tagName="span"
						className="ladb-reviews__eyebrow"
						value={ eyebrow }
					/>
					<RichText.Content
						tagName="h2"
						className="ladb-reviews__heading"
						value={ heading }
					/>
				</header>

				<div className="ladb-reviews__score-band">
					<div className="ladb-reviews__score-left">
						<RichText.Content
							tagName="span"
							className="ladb-reviews__score-number"
							value={ score }
						/>
						<FiveStars />
					</div>
					<div className="ladb-reviews__score-right">
						<span className="ladb-reviews__verified">
							<RichText.Content tagName="span" value={ reviewCount } />
							{ ' avis vérifiés' }
						</span>
						{ googleUrl && (
							<a
								href={ googleUrl }
								className="ladb-btn ladb-btn--ghost ladb-reviews__google-btn"
								target="_blank"
								rel="noopener noreferrer"
							>
								Voir sur Google
							</a>
						) }
					</div>
				</div>

				<div className="ladb-reviews__grid">
					{ reviews.map( ( review, idx ) => (
						<ReviewCard
							key={ idx }
							initials={ review.initials }
							name={ review.name }
							date={ review.date }
							city={ review.city }
							quote={ review.quote }
						/>
					) ) }
				</div>

			</div>
		</section>
	);
}
