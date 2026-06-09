import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const PinIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
	</svg>
);

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		mapImageId,
		mapImageUrl,
		mapImageAlt,
		mapPin,
		cities,
		chip1Label, chip1Url,
		chip2Label, chip2Url,
		chip3Label, chip3Url,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ladb-zone-map' } );

	function updateCity( index, field, value ) {
		const updated = cities.map( ( city, i ) =>
			i === index ? { ...city, [ field ]: value } : city
		);
		setAttributes( { cities: updated } );
	}

	function removeCity( index ) {
		setAttributes( { cities: cities.filter( ( _, i ) => i !== index ) } );
	}

	function addCity() {
		setAttributes( { cities: [ ...cities, { name: '', url: '' } ] } );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Carte', 'ladb' ) } initialOpen>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									mapImageId: media.id,
									mapImageUrl: media.url,
									mapImageAlt: media.alt || mapImageAlt,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ mapImageId }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary" style={ { marginBottom: '8px' } }>
									{ mapImageUrl
										? __( 'Remplacer la carte', 'ladb' )
										: __( 'Choisir la carte', 'ladb' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<TextControl
						label={ __( 'Texte alternatif', 'ladb' ) }
						value={ mapImageAlt }
						onChange={ ( val ) => setAttributes( { mapImageAlt: val } ) }
					/>
					<TextControl
						label={ __( 'Texte badge / pin', 'ladb' ) }
						value={ mapPin }
						onChange={ ( val ) => setAttributes( { mapPin: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Villes', 'ladb' ) } initialOpen={ false }>
					{ cities.map( ( city, index ) => (
						<div
							key={ index }
							style={ {
								borderBottom: '1px solid #e0e0e0',
								paddingBottom: '8px',
								marginBottom: '8px',
							} }
						>
							<TextControl
								label={ `${ __( 'Ville', 'ladb' ) } ${ index + 1 } — ${ __( 'Nom', 'ladb' ) }` }
								value={ city.name }
								onChange={ ( val ) => updateCity( index, 'name', val ) }
							/>
							<TextControl
								label={ __( 'URL (optionnel)', 'ladb' ) }
								value={ city.url }
								onChange={ ( val ) => updateCity( index, 'url', val ) }
							/>
							<Button
								onClick={ () => removeCity( index ) }
								variant="secondary"
								isDestructive
							>
								{ __( 'Supprimer', 'ladb' ) }
							</Button>
						</div>
					) ) }
					<Button
						onClick={ addCity }
						variant="primary"
						style={ { marginTop: '8px' } }
					>
						{ __( 'Ajouter une ville', 'ladb' ) }
					</Button>
				</PanelBody>

				<PanelBody title={ __( 'Chips service', 'ladb' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Chip 1 — Label', 'ladb' ) }
						value={ chip1Label }
						onChange={ ( val ) => setAttributes( { chip1Label: val } ) }
					/>
					<TextControl
						label={ __( 'Chip 1 — URL', 'ladb' ) }
						value={ chip1Url }
						onChange={ ( val ) => setAttributes( { chip1Url: val } ) }
					/>
					<TextControl
						label={ __( 'Chip 2 — Label', 'ladb' ) }
						value={ chip2Label }
						onChange={ ( val ) => setAttributes( { chip2Label: val } ) }
					/>
					<TextControl
						label={ __( 'Chip 2 — URL', 'ladb' ) }
						value={ chip2Url }
						onChange={ ( val ) => setAttributes( { chip2Url: val } ) }
					/>
					<TextControl
						label={ __( 'Chip 3 — Label', 'ladb' ) }
						value={ chip3Label }
						onChange={ ( val ) => setAttributes( { chip3Label: val } ) }
					/>
					<TextControl
						label={ __( 'Chip 3 — URL', 'ladb' ) }
						value={ chip3Url }
						onChange={ ( val ) => setAttributes( { chip3Url: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="ladb-zone-map__inner">

					{ /* Colonne carte */ }
					<div className="ladb-zone-map__map">
						<div className="ladb-zone-map__map-frame">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											mapImageId: media.id,
											mapImageUrl: media.url,
											mapImageAlt: media.alt || mapImageAlt,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ mapImageId }
									render={ ( { open } ) => (
										mapImageUrl ? (
											<img
												src={ mapImageUrl }
												alt={ mapImageAlt }
												className="ladb-zone-map__map-img"
												onClick={ open }
												style={ { cursor: 'pointer' } }
											/>
										) : (
											<Button
												className="ladb-zone-map__map-placeholder"
												onClick={ open }
												variant="secondary"
											>
												{ __( 'Choisir la carte', 'ladb' ) }
											</Button>
										)
									) }
								/>
							</MediaUploadCheck>
							{ mapPin && (
								<span className="ladb-zone-map__pin">
									<PinIcon />
									{ mapPin }
								</span>
							) }
						</div>
					</div>

					{ /* Colonne texte */ }
					<div className="ladb-zone-map__content">
						<RichText
							tagName="h2"
							className="ladb-zone-map__heading"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							placeholder={ __( "Zone d'intervention…", 'ladb' ) }
							allowedFormats={ [] }
						/>

						<ul className="ladb-zone-map__cities">
							{ cities.map( ( city, index ) => (
								<li key={ index } className="ladb-zone-map__city">
									{ city.url ? (
										<a href={ city.url } className="ladb-zone-map__city-link">
											{ city.name }
										</a>
									) : (
										<span className="ladb-zone-map__city-text">{ city.name }</span>
									) }
								</li>
							) ) }
						</ul>

						<div className="ladb-zone-map__chips">
							{ chip1Label && (
								<span className="ladb-zone-map__chip">{ chip1Label }</span>
							) }
							{ chip2Label && (
								<span className="ladb-zone-map__chip">{ chip2Label }</span>
							) }
							{ chip3Label && (
								<span className="ladb-zone-map__chip">{ chip3Label }</span>
							) }
						</div>
					</div>

				</div>
			</section>
		</>
	);
}
