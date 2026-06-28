<?php
/**
 * render.php — ladb/pillar-services
 *
 * Rendu serveur de la grille de prestations pilier.
 * $attributes est injecte par register_block_type().
 *
 * Logique lien :
 *  - link_url renseigne -> <a href="...">
 *  - link_url vide      -> <span> (texte simple, page non encore creee)
 */
defined( 'ABSPATH' ) || exit;

$eyebrow = $attributes['eyebrow'] ?? '';
$heading = $attributes['heading'] ?? '';
$intro   = $attributes['intro']   ?? '';
$items   = $attributes['items']   ?? [];

if ( empty( $items ) ) {
	return;
}

/**
 * SVGs 32x32, stroke="currentColor" => couleur heritee via CSS.
 * Guard function_exists : bloc utilisable plusieurs fois par page.
 */
if ( ! function_exists( 'ladb_ps_icon' ) ) {
	function ladb_ps_icon( string $slug ): string {
		$a = 'xmlns="http://www.w3.org/2000/svg" width="32" height="32"'
		   . ' viewBox="0 0 32 32" fill="none" stroke="currentColor"'
		   . ' stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"'
		   . ' aria-hidden="true" focusable="false"';

		$icons = [

			/*
			 * vitre cassee : cadre plat + fissure zigzag unique.
			 * Pas de grille interieure — distinct de verriere.
			 */
			'vitre' => '<svg ' . $a . '>
				<rect x="3" y="3" width="26" height="26" rx="1.5"/>
				<path d="M13 3 L10 12 17 16 8 29"/>
			</svg>',

			/* double vitrage : cadre exterieur + cadre interieur */
			'double' => '<svg ' . $a . '>
				<rect x="2" y="2" width="28" height="28" rx="1.5"/>
				<rect x="7" y="7" width="18" height="18" rx="1"/>
			</svg>',

			/* survitrage : deux cadres decales */
			'survitrage' => '<svg ' . $a . '>
				<rect x="1" y="7" width="20" height="19" rx="1.5"/>
				<rect x="11" y="2" width="20" height="19" rx="1.5"/>
			</svg>',

			/* verre sur mesure : regle graduee */
			'mesure' => '<svg ' . $a . '>
				<rect x="2" y="12" width="28" height="8" rx="1.5"/>
				<line x1="7"  y1="12" x2="7"  y2="17"/>
				<line x1="12" y1="12" x2="12" y2="15"/>
				<line x1="17" y1="12" x2="17" y2="17"/>
				<line x1="22" y1="12" x2="22" y2="15"/>
				<line x1="27" y1="12" x2="27" y2="17"/>
			</svg>',

			/* urgence : eclair */
			'urgence' => '<svg ' . $a . '>
				<path d="M18 2 L7 18 h8 L14 30 25 14 h-8 Z"/>
			</svg>',

			/* chatiere : porte vitree + trappe basse + separateur */
			'chatiere' => '<svg ' . $a . '>
				<rect x="5" y="2" width="22" height="28" rx="1.5"/>
				<rect x="10" y="20" width="12" height="8" rx="1"/>
				<line x1="16" y1="20" x2="16" y2="28"/>
			</svg>',

			/* vitrine commerce : fronton + baie + porte */
			'vitrine' => '<svg ' . $a . '>
				<path d="M2 14 L6 5 h20 l4 9"/>
				<rect x="2" y="14" width="28" height="15" rx="1"/>
				<rect x="11" y="20" width="10" height="9"/>
			</svg>',

			/* effraction : bouclier + fissure interieure */
			'effraction' => '<svg ' . $a . '>
				<path d="M16 2 L3 7 v10 c0 7 6 11 13 13 7-2 13-6 13-13 V7 Z"/>
				<path d="M15 9 l-3 6 4 2-3 7"/>
			</svg>',

			/*
			 * verriere : toiture triangulaire + corps rectangulaire + croisillons.
			 * Profil d'atelier — distinct de vitre (fissure vs architecture).
			 */
			'verriere' => '<svg ' . $a . '>
				<path d="M16 2 L2 16 h28 Z"/>
				<rect x="4" y="16" width="24" height="14" rx="0"/>
				<line x1="16" y1="2"  x2="16" y2="30"/>
				<line x1="4"  y1="22" x2="28" y2="22"/>
			</svg>',
		];

		return $icons[ $slug ] ?? '';
	}
}

$wrapper = get_block_wrapper_attributes( [ 'class' => 'ladb-pillar-services' ] );
?>
<section <?php echo $wrapper; ?>>
	<div class="ladb-pillar-services__inner">

		<?php if ( $eyebrow ) : ?>
			<span class="ladb-section-kicker"><?php echo esc_html( $eyebrow ); ?></span>
		<?php endif; ?>

		<?php if ( $heading ) : ?>
			<h2 class="ladb-section-h2"><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>

		<?php if ( $intro ) : ?>
			<p class="ladb-pillar-services__intro"><?php echo esc_html( $intro ); ?></p>
		<?php endif; ?>

		<div class="ladb-pillar-services__grid" role="list">
			<?php foreach ( $items as $item ) :
				$icon  = $item['icon']        ?? '';
				$title = $item['title']       ?? '';
				$desc  = $item['description'] ?? '';
				$url   = trim( $item['link_url']  ?? '' );
				$label = $item['link_label']  ?? 'En savoir plus';
				$svg   = ladb_ps_icon( $icon );
			?>
			<article class="ladb-pillar-services__card" role="listitem">

				<?php if ( $svg ) : ?>
				<div class="ladb-pillar-services__icon" aria-hidden="true">
					<?php echo $svg; ?>
				</div>
				<?php endif; ?>

				<h3 class="ladb-pillar-services__title"><?php echo esc_html( $title ); ?></h3>

				<?php if ( $desc ) : ?>
				<p class="ladb-pillar-services__desc"><?php echo esc_html( $desc ); ?></p>
				<?php endif; ?>

				<?php if ( $url ) : ?>
				<a href="<?php echo esc_url( $url ); ?>"
				   class="ladb-pillar-services__link">
					<?php echo esc_html( $label ); ?>
				</a>
				<?php else : ?>
				<span class="ladb-pillar-services__link ladb-pillar-services__link--disabled">
					<?php echo esc_html( $label ); ?>
				</span>
				<?php endif; ?>

			</article>
			<?php endforeach; ?>
		</div>

	</div>
</section>
