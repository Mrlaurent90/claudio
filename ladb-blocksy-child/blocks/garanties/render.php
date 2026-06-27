<?php
/**
 * render.php — ladb/garanties
 *
 * Grille "Pourquoi nous choisir" : N cartes icone + titre + description.
 * Layout : icone a gauche, contenu a droite (flex row par carte).
 * $attributes injecte par register_block_type().
 */
defined( 'ABSPATH' ) || exit;

$eyebrow = $attributes['eyebrow'] ?? '';
$heading = $attributes['heading'] ?? '';
$intro   = $attributes['intro']   ?? '';
$items   = $attributes['items']   ?? [];

if ( empty( $items ) ) {
	return;
}

if ( ! function_exists( 'ladb_garanties_icon' ) ) {
	function ladb_garanties_icon( string $slug ): string {
		$a = 'xmlns="http://www.w3.org/2000/svg" width="22" height="22"'
		   . ' viewBox="0 0 22 22" fill="none" stroke="currentColor"'
		   . ' stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
		   . ' aria-hidden="true" focusable="false"';

		$icons = [

			/* Garantie decennale : bouclier + coche */
			'shield-check' => '<svg ' . $a . '>
				<path d="M11 2l8 3v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V5z"/>
				<path d="M7.5 11l2.5 2.5 4.5-4.5"/>
			</svg>',

			/* Devis gratuit : document + lignes */
			'document' => '<svg ' . $a . '>
				<rect x="3" y="3" width="16" height="16" rx="2"/>
				<path d="M7 8h8M7 12h5"/>
			</svg>',

			/* Intervention rapide : horloge */
			'clock' => '<svg ' . $a . '>
				<circle cx="11" cy="11" r="9"/>
				<path d="M11 6v5l3 3"/>
			</svg>',

			/* Materiaux pro : 4 carreaux de verre */
			'squares' => '<svg ' . $a . '>
				<rect x="4"  y="4"  width="6" height="6"/>
				<rect x="12" y="4"  width="6" height="6"/>
				<rect x="4"  y="12" width="6" height="6"/>
				<rect x="12" y="12" width="6" height="6"/>
			</svg>',

			/* Equipe formee : profil + verification */
			'team' => '<svg ' . $a . '>
				<circle cx="8" cy="7" r="3"/>
				<path d="M2 19c0-3 2-5 6-5"/>
				<circle cx="15" cy="14" r="4"/>
				<path d="M13.5 13.5l3 3"/>
			</svg>',

			/* Avis Google : etoile pleine */
			'star' => '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
			          viewBox="0 0 22 22" fill="currentColor" stroke="none"
			          aria-hidden="true" focusable="false">
				<path d="M11 2l2.39 5.26L19 8.27l-4 3.9 1 5.83L11 15l-5 3 1-5.83-4-3.9 5.61-1.01z"
				      opacity=".9"/>
			</svg>',
		];

		return $icons[ $slug ] ?? '';
	}
}

$wrapper = get_block_wrapper_attributes( [ 'class' => 'ladb-garanties' ] );
?>
<section <?php echo $wrapper; ?>>
	<div class="ladb-garanties__inner">

		<?php if ( $eyebrow ) : ?>
			<span class="ladb-section-kicker"><?php echo esc_html( $eyebrow ); ?></span>
		<?php endif; ?>

		<?php if ( $heading ) : ?>
			<h2 class="ladb-section-h2"><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>

		<?php if ( $intro ) : ?>
			<p class="ladb-garanties__intro"><?php echo esc_html( $intro ); ?></p>
		<?php endif; ?>

		<div class="ladb-garanties__grid" role="list">
			<?php foreach ( $items as $item ) :
				$icon  = $item['icon']        ?? '';
				$title = $item['title']       ?? '';
				$desc  = $item['description'] ?? '';
				$svg   = ladb_garanties_icon( $icon );
			?>
			<div class="ladb-garanties__card" role="listitem">

				<?php if ( $svg ) : ?>
				<div class="ladb-garanties__icon" aria-hidden="true">
					<?php echo $svg; ?>
				</div>
				<?php endif; ?>

				<div class="ladb-garanties__content">
					<h3 class="ladb-garanties__title"><?php echo esc_html( $title ); ?></h3>
					<?php if ( $desc ) : ?>
					<p class="ladb-garanties__desc"><?php echo esc_html( $desc ); ?></p>
					<?php endif; ?>
				</div>

			</div>
			<?php endforeach; ?>
		</div>

	</div>
</section>
