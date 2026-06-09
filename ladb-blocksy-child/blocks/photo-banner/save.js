import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { imageUrl, imageAlt, caption, heading, subtext } = attributes;
	const blockProps = useBlockProps.save( { className: 'ladb-photo-banner' } );

	return (
		<div { ...blockProps }>
			<figure className="ladb-photo-banner__figure">
				{ imageUrl && <img src={ imageUrl } alt={ imageAlt } className="ladb-photo-banner__img" loading="lazy" /> }
				<RichText.Content tagName="figcaption" className="ladb-photo-banner__caption" value={ caption } />
			</figure>
			<div className="ladb-photo-banner__content">
				<RichText.Content tagName="h3" className="ladb-photo-banner__heading" value={ heading } />
				<RichText.Content tagName="p" className="ladb-photo-banner__subtext" value={ subtext } />
			</div>
		</div>
	);
}
