import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { eyebrow, heading, bgImageUrl, items } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'ladb-faq',
		style: bgImageUrl
			? { backgroundImage: `url(${ bgImageUrl })` }
			: undefined,
	} );

	return (
		<section { ...blockProps }>
			<div className="ladb-faq__overlay" aria-hidden="true" />

			<div className="ladb-faq__inner">
				<header className="ladb-faq__header">
					{ eyebrow && (
						<span className="ladb-faq__eyebrow">{ eyebrow }</span>
					) }
					{ heading && (
						<h2 className="ladb-faq__heading">{ heading }</h2>
					) }
				</header>

				<dl className="ladb-faq__list">
					{ items.map( ( item, index ) => (
						<div key={ index } className="ladb-faq__item">
							<dt>
								<button
									className="ladb-faq__question"
									aria-expanded="false"
									aria-controls={ `ladb-faq-answer-${ index }` }
									type="button"
								>
									{ item.question }
									<span className="ladb-faq__icon" aria-hidden="true" />
								</button>
							</dt>
							<dd
								className="ladb-faq__answer"
								id={ `ladb-faq-answer-${ index }` }
								hidden
							>
								{ item.answer }
							</dd>
						</div>
					) ) }
				</dl>
			</div>
		</section>
	);
}
