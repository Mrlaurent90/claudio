import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ResponsiveWrapper } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { imageId, imageUrl, imageAlt, caption, heading, subtext } = attributes;
	const blockProps = useBlockProps( { className: 'ladb-photo-banner' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Image">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { imageId: media.id, imageUrl: media.url, imageAlt: media.alt } ) }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<div>
									{ imageUrl && (
										<ResponsiveWrapper naturalWidth={ 1200 } naturalHeight={ 600 }>
											<img src={ imageUrl } alt={ imageAlt } style={ { width: '100%', display: 'block' } } />
										</ResponsiveWrapper>
									) }
									<Button variant="secondary" onClick={ open } style={ { marginTop: '8px' } }>
										{ imageUrl ? 'Changer l\'image' : 'Choisir une image' }
									</Button>
									{ imageUrl && (
										<Button variant="link" isDestructive onClick={ () => setAttributes( { imageId: undefined, imageUrl: '', imageAlt: '' } ) } style={ { marginTop: '4px' } }>
											Supprimer
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<figure className="ladb-photo-banner__figure">
					{ imageUrl
						? <img src={ imageUrl } alt={ imageAlt } className="ladb-photo-banner__img" />
						: <div className="ladb-photo-banner__placeholder">Choisir une image dans l'inspecteur →</div>
					}
					<RichText
						tagName="figcaption"
						className="ladb-photo-banner__caption"
						value={ caption }
						onChange={ v => setAttributes( { caption: v } ) }
						placeholder="Légende…"
					/>
				</figure>
				<div className="ladb-photo-banner__content">
					<RichText
						tagName="h3"
						className="ladb-photo-banner__heading"
						value={ heading }
						onChange={ v => setAttributes( { heading: v } ) }
						placeholder="Titre (un mot en <em>italique</em>)…"
					/>
					<RichText
						tagName="p"
						className="ladb-photo-banner__subtext"
						value={ subtext }
						onChange={ v => setAttributes( { subtext: v } ) }
						placeholder="Sous-texte à droite…"
					/>
				</div>
			</div>
		</>
	);
}
