import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, bgImageId, bgImageUrl, items } = attributes;

	const blockProps = useBlockProps( {
		className: 'ladb-faq',
		style: bgImageUrl
			? { backgroundImage: `url(${ bgImageUrl })` }
			: undefined,
	} );

	/* ── Helpers items ── */

	function updateItem( index, field, value ) {
		const next = items.map( ( item, i ) =>
			i === index ? { ...item, [ field ]: value } : item
		);
		setAttributes( { items: next } );
	}

	function removeItem( index ) {
		setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );
	}

	function addItem() {
		setAttributes( {
			items: [ ...items, { question: '', answer: '' } ],
		} );
	}

	return (
		<>
			{ /* ── Panneau latéral ── */ }
			<InspectorControls>
				<PanelBody title={ __( 'Image de fond', 'ladb' ) } initialOpen>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									bgImageId: media.id,
									bgImageUrl: media.url,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ bgImageId }
							render={ ( { open } ) => (
								<>
									{ bgImageUrl && (
										<img
											src={ bgImageUrl }
											alt={ __( 'Aperçu fond', 'ladb' ) }
											style={ {
												width: '100%',
												height: '80px',
												objectFit: 'cover',
												marginBottom: '8px',
												borderRadius: '4px',
											} }
										/>
									) }
									<Button
										variant="secondary"
										onClick={ open }
										style={ { width: '100%', justifyContent: 'center' } }
									>
										{ bgImageUrl
											? __( 'Changer l\'image de fond', 'ladb' )
											: __( 'Choisir une image de fond', 'ladb' ) }
									</Button>
									{ bgImageUrl && (
										<Button
											variant="tertiary"
											isDestructive
											onClick={ () =>
												setAttributes( { bgImageId: undefined, bgImageUrl: '' } )
											}
											style={ { width: '100%', justifyContent: 'center', marginTop: '4px' } }
										>
											{ __( 'Supprimer l\'image', 'ladb' ) }
										</Button>
									) }
								</>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody title={ __( 'Questions / Réponses', 'ladb' ) } initialOpen={ false }>
					{ items.map( ( item, index ) => (
						<div
							key={ index }
							style={ {
								border: '1px solid #ddd',
								borderRadius: '4px',
								padding: '12px',
								marginBottom: '12px',
								background: '#fafafa',
							} }
						>
							<p style={ { margin: '0 0 8px', fontWeight: 600, fontSize: '12px', color: '#555' } }>
								{ __( 'Question', 'ladb' ) } { index + 1 }
							</p>
							<TextControl
								label={ __( 'Question', 'ladb' ) }
								value={ item.question }
								onChange={ ( val ) => updateItem( index, 'question', val ) }
								placeholder={ __( 'Votre question…', 'ladb' ) }
							/>
							<div style={ { marginBottom: '8px' } }>
								<label
									style={ {
										display: 'block',
										fontSize: '11px',
										fontWeight: 500,
										marginBottom: '4px',
										color: '#1e1e1e',
									} }
								>
									{ __( 'Réponse', 'ladb' ) }
								</label>
								<textarea
									value={ item.answer }
									onChange={ ( e ) => updateItem( index, 'answer', e.target.value ) }
									placeholder={ __( 'Votre réponse…', 'ladb' ) }
									rows={ 4 }
									style={ {
										width: '100%',
										boxSizing: 'border-box',
										padding: '6px 8px',
										fontSize: '13px',
										border: '1px solid #757575',
										borderRadius: '2px',
										resize: 'vertical',
									} }
								/>
							</div>
							<Button
								variant="tertiary"
								isDestructive
								onClick={ () => removeItem( index ) }
								style={ { width: '100%', justifyContent: 'center' } }
							>
								{ __( 'Supprimer cette question', 'ladb' ) }
							</Button>
						</div>
					) ) }

					<Button
						variant="primary"
						onClick={ addItem }
						style={ { width: '100%', justifyContent: 'center' } }
					>
						{ __( '+ Ajouter une question', 'ladb' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			{ /* ── Canvas ── */ }
			<section { ...blockProps }>
				<div className="ladb-faq__overlay" aria-hidden="true" />

				<div className="ladb-faq__inner">
					<header className="ladb-faq__header">
						<RichText
							tagName="span"
							className="ladb-faq__eyebrow"
							value={ eyebrow }
							onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
							placeholder={ __( 'Eyebrow…', 'ladb' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="h2"
							className="ladb-faq__heading"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							placeholder={ __( 'Titre section…', 'ladb' ) }
							allowedFormats={ [] }
						/>
					</header>

					<dl className="ladb-faq__list">
						{ items.map( ( item, index ) => (
							<div key={ index } className="ladb-faq__item is-open">
								<dt>
									<span className="ladb-faq__question ladb-faq__question--preview">
										{ item.question || __( '(question vide)', 'ladb' ) }
									</span>
								</dt>
								<dd className="ladb-faq__answer">
									{ item.answer || __( '(réponse vide)', 'ladb' ) }
								</dd>
							</div>
						) ) }

						{ items.length === 0 && (
							<p style={ { color: 'rgba(250,248,244,0.5)', textAlign: 'center', padding: '2rem 0' } }>
								{ __( 'Ajoutez des questions via le panneau latéral.', 'ladb' ) }
							</p>
						) }
					</dl>
				</div>
			</section>
		</>
	);
}
