import { useBlockProps, RichText } from '@wordpress/block-editor';

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

export default function Save( { attributes } ) {
	const {
		heading,
		mapImageUrl,
		mapImageAlt,
		mapPin,
		cities,
		chip1Label, chip1Url,
		chip2Label, chip2Url,
		chip3Label, chip3Url,
	} = attributes;

	const blockProps = useBlockProps.save( { className: 'ladb-zone-map' } );

	const chips = [
		{ label: chip1Label, url: chip1Url },
		{ label: chip2Label, url: chip2Url },
		{ label: chip3Label, url: chip3Url },
	];

	return (
		<section { ...blockProps }>
			<div className="ladb-zone-map__inner">

				{ /* Colonne carte */ }
				<div className="ladb-zone-map__map">
					<div className="ladb-zone-map__map-frame">
						{ mapImageUrl && (
							<img
								src={ mapImageUrl }
								alt={ mapImageAlt }
								className="ladb-zone-map__map-img"
								loading="lazy"
								decoding="async"
							/>
						) }
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
					<RichText.Content
						tagName="h2"
						className="ladb-zone-map__heading"
						value={ heading }
					/>

					{ cities && cities.length > 0 && (
						<ul className="ladb-zone-map__cities">
							{ cities.map( ( city, index ) => (
								<li key={ index } className="ladb-zone-map__city">
									{ city.url ? (
										<a
											href={ city.url }
											className="ladb-zone-map__city-link"
										>
											{ city.name }
										</a>
									) : (
										<span className="ladb-zone-map__city-text">
											{ city.name }
										</span>
									) }
								</li>
							) ) }
						</ul>
					) }

					<div className="ladb-zone-map__chips">
						{ chips.map( ( chip, index ) =>
							chip.label ? (
								chip.url ? (
									<a
										key={ index }
										href={ chip.url }
										className="ladb-zone-map__chip"
									>
										{ chip.label }
									</a>
								) : (
									<span key={ index } className="ladb-zone-map__chip">
										{ chip.label }
									</span>
								)
							) : null
						) }
					</div>
				</div>

			</div>
		</section>
	);
}
