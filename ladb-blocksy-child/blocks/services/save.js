import { useBlockProps, RichText } from '@wordpress/block-editor';

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
		<rect x="3" y="3" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
		<line x1="3" y1="10" x2="14" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		<line x1="14" y1="3" x2="25" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		<line x1="25" y1="16" x2="18" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
		<path
			d="M9 12V8a5 5 0 0 1 10 0v4"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		<rect x="5" y="12" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
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
		<rect x="5" y="2" width="18" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
		<rect x="8.5" y="5.5" width="11" height="17" rx="1" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 1.5" />
		<line x1="10" y1="8" x2="13" y2="11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
	</svg>
);

const ICON_MAP = {
	glass: <IconGlass />,
	lock: <IconLock />,
	mirror: <IconMirror />,
};

/* ── Flèche pour le lien ──────────────────────────────────── */

const ArrowIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
		focusable="false"
	>
		<path
			d="M3 8h10M9 4l4 4-4 4"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

/* ── Carte statique ───────────────────────────────────────── */

function SaveCard( { n, attributes } ) {
	const icon      = attributes[ `card${ n }Icon` ] || 'glass';
	const title     = attributes[ `card${ n }Title` ];
	const desc      = attributes[ `card${ n }Description` ];
	const linkText  = attributes[ `card${ n }LinkText` ];
	const linkUrl   = attributes[ `card${ n }LinkUrl` ];

	const bullets = [ 1, 2, 3, 4 ]
		.map( ( b ) => attributes[ `card${ n }Bullet${ b }` ] )
		.filter( Boolean );

	return (
		<article className="ladb-services__card">
			<div className="ladb-services__card-icon" aria-hidden="true">
				{ ICON_MAP[ icon ] ?? ICON_MAP.glass }
			</div>

			<RichText.Content
				tagName="h3"
				className="ladb-services__card-title"
				value={ title }
			/>

			<RichText.Content
				tagName="p"
				className="ladb-services__card-desc"
				value={ desc }
			/>

			{ bullets.length > 0 && (
				<ul className="ladb-services__bullets" role="list">
					{ bullets.map( ( text, idx ) => (
						<li key={ idx } className="ladb-services__bullet">{ text }</li>
					) ) }
				</ul>
			) }

			{ linkUrl && linkText && (
				<a href={ linkUrl } className="ladb-services__link">
					{ linkText }
					<ArrowIcon />
				</a>
			) }
		</article>
	);
}

/* ── Save principal ───────────────────────────────────────── */

export default function Save( { attributes } ) {
	const { eyebrow, heading, description } = attributes;

	const blockProps = useBlockProps.save( { className: 'ladb-services' } );

	return (
		<section { ...blockProps }>
			<div className="ladb-services__inner">
				<header className="ladb-services__header">
					<RichText.Content
						tagName="span"
						className="ladb-services__eyebrow"
						value={ eyebrow }
					/>
					<RichText.Content
						tagName="h2"
						className="ladb-services__heading"
						value={ heading }
					/>
					<RichText.Content
						tagName="p"
						className="ladb-services__desc"
						value={ description }
					/>
				</header>

				<div className="ladb-services__grid">
					{ [ 1, 2, 3 ].map( ( n ) => (
						<SaveCard key={ n } n={ n } attributes={ attributes } />
					) ) }
				</div>
			</div>
		</section>
	);
}
