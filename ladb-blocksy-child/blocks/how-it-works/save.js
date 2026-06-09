import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		eyebrow, heading, description,
		bgImageUrl,
		step1Number, step1Title, step1Desc,
		step2Number, step2Title, step2Desc,
		step3Number, step3Title, step3Desc,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'ladb-how-it-works',
		style: bgImageUrl ? { backgroundImage: `url(${ bgImageUrl })` } : {},
	} );

	const steps = [
		[ step1Number, step1Title, step1Desc, '1' ],
		[ step2Number, step2Title, step2Desc, '2' ],
		[ step3Number, step3Title, step3Desc, '3' ],
	];

	return (
		<div { ...blockProps }>
			<div className="ladb-how-it-works__overlay" aria-hidden="true" />
			<div className="ladb-how-it-works__inner ladb-container">
				<div className="ladb-how-it-works__header">
					<RichText.Content tagName="span" className="ladb-eyebrow" value={ eyebrow } />
					<RichText.Content tagName="h2" className="ladb-how-it-works__heading" value={ heading } />
					<RichText.Content tagName="p" className="ladb-how-it-works__desc" value={ description } />
				</div>
				<div className="ladb-how-it-works__steps">
					{ steps.map( ( [ num, title, desc, idx ] ) => (
						<div key={ idx } className="ladb-how-it-works__step">
							<span className="ladb-how-it-works__num" aria-hidden="true">{ num }</span>
							<RichText.Content tagName="h3" className="ladb-how-it-works__step-title" value={ title } />
							<RichText.Content tagName="p" className="ladb-how-it-works__step-desc" value={ desc } />
						</div>
					) ) }
				</div>
			</div>
		</div>
	);
}
