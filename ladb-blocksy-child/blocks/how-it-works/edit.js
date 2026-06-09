import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, ResponsiveWrapper } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow, heading, description,
		bgImageId, bgImageUrl,
		step1Number, step1Title, step1Desc,
		step2Number, step2Title, step2Desc,
		step3Number, step3Title, step3Desc,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'ladb-how-it-works',
		style: bgImageUrl ? { backgroundImage: `url(${ bgImageUrl })` } : {},
	} );

	const steps = [
		[ step1Number, step1Title, step1Desc, '1' ],
		[ step2Number, step2Title, step2Desc, '2' ],
		[ step3Number, step3Title, step3Desc, '3' ],
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title="Photo de fond">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( m ) => setAttributes( { bgImageId: m.id, bgImageUrl: m.url } ) }
							allowedTypes={ [ 'image' ] }
							value={ bgImageId }
							render={ ( { open } ) => (
								<div>
									{ bgImageUrl && (
										<ResponsiveWrapper naturalWidth={ 1200 } naturalHeight={ 400 }>
											<img src={ bgImageUrl } alt="" style={ { width: '100%' } } />
										</ResponsiveWrapper>
									) }
									<Button variant="secondary" onClick={ open } style={ { marginTop: '8px' } }>
										{ bgImageUrl ? 'Changer' : 'Choisir une image' }
									</Button>
									{ bgImageUrl && (
										<Button variant="link" isDestructive onClick={ () => setAttributes( { bgImageId: undefined, bgImageUrl: '' } ) } style={ { marginTop: '4px' } }>Supprimer</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody title="Étapes — numéros">
					<TextControl label="Numéro étape 1" value={ step1Number } onChange={ v => setAttributes( { step1Number: v } ) } />
					<TextControl label="Numéro étape 2" value={ step2Number } onChange={ v => setAttributes( { step2Number: v } ) } />
					<TextControl label="Numéro étape 3" value={ step3Number } onChange={ v => setAttributes( { step3Number: v } ) } />
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="ladb-how-it-works__overlay" />
				<div className="ladb-how-it-works__inner ladb-container">
					<div className="ladb-how-it-works__header">
						<RichText tagName="span" className="ladb-eyebrow" value={ eyebrow } onChange={ v => setAttributes( { eyebrow: v } ) } placeholder="Eyebrow…" />
						<RichText tagName="h2" className="ladb-how-it-works__heading" value={ heading } onChange={ v => setAttributes( { heading: v } ) } placeholder="Titre…" />
						<RichText tagName="p" className="ladb-how-it-works__desc" value={ description } onChange={ v => setAttributes( { description: v } ) } placeholder="Description…" />
					</div>
					<div className="ladb-how-it-works__steps">
						{ steps.map( ( [ num, title, desc, idx ] ) => (
							<div key={ idx } className="ladb-how-it-works__step">
								<span className="ladb-how-it-works__num">{ num }</span>
								<RichText tagName="h3" className="ladb-how-it-works__step-title" value={ title } onChange={ v => setAttributes( { [ `step${ idx }Title` ]: v } ) } placeholder="Titre étape…" />
								<RichText tagName="p" className="ladb-how-it-works__step-desc" value={ desc } onChange={ v => setAttributes( { [ `step${ idx }Desc` ]: v } ) } placeholder="Description…" />
							</div>
						) ) }
					</div>
				</div>
			</div>
		</>
	);
}
