import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const ICONS = [
	{ label: 'Bouclier', value: 'shield' },
	{ label: 'Étoile', value: 'star' },
	{ label: 'Horloge', value: 'clock' },
	{ label: 'Carte', value: 'map' },
	{ label: 'Téléphone', value: 'phone' },
	{ label: 'Clé', value: 'key' },
];

function Icon( { name } ) {
	const icons = {
		shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
		star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
		clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
		map: <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
		phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.27 6.27l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
		key: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
	};
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			{ icons[ name ] || icons.shield }
		</svg>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { item1Icon, item1Title, item1Subtitle, item2Icon, item2Title, item2Subtitle } = attributes;
	const blockProps = useBlockProps( { className: 'ladb-trust-strip' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Item 1">
					<SelectControl label="Icône" value={ item1Icon } options={ ICONS } onChange={ v => setAttributes( { item1Icon: v } ) } />
				</PanelBody>
				<PanelBody title="Item 2">
					<SelectControl label="Icône" value={ item2Icon } options={ ICONS } onChange={ v => setAttributes( { item2Icon: v } ) } />
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="ladb-trust-strip__inner ladb-container">
					{ [ [ item1Icon, item1Title, item1Subtitle, 'item1' ], [ item2Icon, item2Title, item2Subtitle, 'item2' ] ].map( ( [ icon, title, subtitle, key ] ) => (
						<div key={ key } className="ladb-trust-strip__item">
							<span className="ladb-trust-strip__icon"><Icon name={ icon } /></span>
							<div className="ladb-trust-strip__text">
								<RichText
									tagName="strong"
									className="ladb-trust-strip__title"
									value={ title }
									onChange={ v => setAttributes( { [ key + 'Title' ]: v } ) }
									placeholder="Titre fort…"
								/>
								<RichText
									tagName="p"
									className="ladb-trust-strip__subtitle"
									value={ subtitle }
									onChange={ v => setAttributes( { [ key + 'Subtitle' ]: v } ) }
									placeholder="Sous-titre…"
								/>
							</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
