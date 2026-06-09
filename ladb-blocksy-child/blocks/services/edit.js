import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/* ── Icônes SVG inline ─────────────────────────────────────── */

const IconGlass = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 28 28"
		fill="none"
		aria-hidden="true"
		focusable="false"
	>
		{/* Cadre vitre */}
		<rect x="3" y="3" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
		{/* Diagonale de brisure */}
		<line x1="3" y1="10" x2="14" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		<line x1="14" y1="3" x2="25" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		<line x1="25" y1="16" x2="18" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		{/* Éclat secondaire */}
		<line x1="14" y1="3" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<line x1="10" y1="14" x2="3" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const IconLock = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 28 28"
		fill="none"
		aria-hidden="true"
		focusable="false"
	>
		{/* Anse du cadenas */}
		<path
			d="M9 12V8a5 5 0 0 1 10 0v4"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		{/* Corps du cadenas */}
		<rect x="5" y="12" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
		{/* Trou de serrure */}
		<circle cx="14" cy="18" r="1.75" fill="currentColor" />
		<line x1="14" y1="19.75" x2="14" y2="22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
	</svg>
);

const IconMirror = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 28 28"
		fill="none"
		aria-hidden="true"
		focusable="false"
	>
		{/* Cadre miroir */}
		<rect x="5" y="2" width="18" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
		{/* Reflet intérieur — rectangle imbriqué */}
		<rect x="8.5" y="5.5" width="11" height="17" rx="1" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 1.5" />
		{/* Éclat de reflet */}
		<line x1="10" y1="8" x2="13" y2="11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
	</svg>
);

const ICON_MAP = {
	glass: <IconGlass />,
	lock: <IconLock />,
	mirror: <IconMirror />,
};

const ICON_OPTIONS = [
	{ label: __( 'Vitre (glass)', 'ladb' ), value: 'glass' },
	{ label: __( 'Cadenas (lock)', 'ladb' ), value: 'lock' },
	{ label: __( 'Miroir (mirror)', 'ladb' ), value: 'mirror' },
];

/* ── Carte en édition ──────────────────────────────────────── */

function EditCard( { n, attributes, setAttributes } ) {
	const icon       = attributes[ `card${ n }Icon` ];
	const title      = attributes[ `card${ n }Title` ];
	const desc       = attributes[ `card${ n }Description` ];
	const linkText   = attributes[ `card${ n }LinkText` ];

	return (
		<div className="ladb-services__card">
			<div className="ladb-services__card-icon">
				{ ICON_MAP[ icon ] ?? ICON_MAP.glass }
			</div>

			<RichText
				tagName="h3"
				className="ladb-services__card-title"
				value={ title }
				onChange={ ( val ) => setAttributes( { [ `card${ n }Title` ]: val } ) }
				placeholder={ __( 'Titre de la carte…', 'ladb' ) }
				allowedFormats={ [] }
			/>

			<RichText
				tagName="p"
				className="ladb-services__card-desc"
				value={ desc }
				onChange={ ( val ) => setAttributes( { [ `card${ n }Description` ]: val } ) }
				placeholder={ __( 'Description courte…', 'ladb' ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
			/>

			<ul className="ladb-services__bullets">
				{ [ 1, 2, 3, 4 ].map( ( b ) => {
					const bullet = attributes[ `card${ n }Bullet${ b }` ];
					return bullet ? (
						<li key={ b } className="ladb-services__bullet">{ bullet }</li>
					) : null;
				} ) }
			</ul>

			{ linkText && (
				<span className="ladb-services__link">
					{ linkText }
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
				</span>
			) }
		</div>
	);
}

/* ── Panneau inspecteur pour une carte ────────────────────── */

function CardPanel( { n, label, attributes, setAttributes } ) {
	const set = ( key, val ) => setAttributes( { [ `card${ n }${ key }` ]: val } );

	return (
		<PanelBody title={ label } initialOpen={ false }>
			<SelectControl
				label={ __( 'Icône', 'ladb' ) }
				value={ attributes[ `card${ n }Icon` ] }
				options={ ICON_OPTIONS }
				onChange={ ( val ) => set( 'Icon', val ) }
			/>
			<TextControl
				label={ __( 'Bullet 1', 'ladb' ) }
				value={ attributes[ `card${ n }Bullet1` ] }
				onChange={ ( val ) => set( 'Bullet1', val ) }
			/>
			<TextControl
				label={ __( 'Bullet 2', 'ladb' ) }
				value={ attributes[ `card${ n }Bullet2` ] }
				onChange={ ( val ) => set( 'Bullet2', val ) }
			/>
			<TextControl
				label={ __( 'Bullet 3', 'ladb' ) }
				value={ attributes[ `card${ n }Bullet3` ] }
				onChange={ ( val ) => set( 'Bullet3', val ) }
			/>
			<TextControl
				label={ __( 'Bullet 4', 'ladb' ) }
				value={ attributes[ `card${ n }Bullet4` ] }
				onChange={ ( val ) => set( 'Bullet4', val ) }
			/>
			<TextControl
				label={ __( 'Texte du lien', 'ladb' ) }
				value={ attributes[ `card${ n }LinkText` ] }
				onChange={ ( val ) => set( 'LinkText', val ) }
			/>
			<TextControl
				label={ __( 'URL du lien', 'ladb' ) }
				value={ attributes[ `card${ n }LinkUrl` ] }
				onChange={ ( val ) => set( 'LinkUrl', val ) }
				type="url"
				placeholder="https://"
			/>
		</PanelBody>
	);
}

/* ── Composant Edit principal ──────────────────────────────── */

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, description } = attributes;

	const blockProps = useBlockProps( { className: 'ladb-services' } );

	return (
		<>
			<InspectorControls>
				<CardPanel
					n={ 1 }
					label={ __( 'Carte 1 — Vitrier', 'ladb' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<CardPanel
					n={ 2 }
					label={ __( 'Carte 2 — Serrurier', 'ladb' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<CardPanel
					n={ 3 }
					label={ __( 'Carte 3 — Miroitier', 'ladb' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="ladb-services__inner">
					<header className="ladb-services__header">
						<RichText
							tagName="span"
							className="ladb-services__eyebrow"
							value={ eyebrow }
							onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
							placeholder={ __( 'Eyebrow…', 'ladb' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="h2"
							className="ladb-services__heading"
							value={ heading }
							onChange={ ( val ) => setAttributes( { heading: val } ) }
							placeholder={ __( 'Titre de section…', 'ladb' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="p"
							className="ladb-services__desc"
							value={ description }
							onChange={ ( val ) => setAttributes( { description: val } ) }
							placeholder={ __( 'Description de section…', 'ladb' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
					</header>

					<div className="ladb-services__grid">
						{ [ 1, 2, 3 ].map( ( n ) => (
							<EditCard
								key={ n }
								n={ n }
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						) ) }
					</div>
				</div>
			</section>
		</>
	);
}
