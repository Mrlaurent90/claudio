<?php
defined( 'ABSPATH' ) || exit;

$eyebrow = esc_html( $attributes['eyebrow'] ?? 'Nos chantiers' );
$heading = esc_html( $attributes['heading'] ?? 'Réalisations à Montpellier et environs' );
$items   = $attributes['items'] ?? [];

$wrapper = get_block_wrapper_attributes( [ 'class' => 'ladb-realisations' ] );
?>
<section <?php echo $wrapper; ?>>
  <div class="ladb-realisations__inner">
    <p class="ladb-realisations__eyebrow"><?php echo $eyebrow; ?></p>
    <h2 class="ladb-realisations__heading"><?php echo $heading; ?></h2>

    <div class="ladb-realisations__track">
      <?php foreach ( $items as $item ) :
        $chantier  = esc_html( $item['chantier'] ?? '' );
        $lieu      = esc_html( $item['lieu'] ?? '' );
        $image_url = esc_url( $item['imageUrl'] ?? '' );
        $image_alt = esc_attr( $item['imageAlt'] ?? ( $chantier . ( $lieu ? ' · ' . $lieu : '' ) ) );
      ?>
      <div class="ladb-realisations__card">
        <div class="ladb-realisations__photo">
          <?php if ( $image_url ) : ?>
            <img src="<?php echo $image_url; ?>" alt="<?php echo $image_alt; ?>" loading="lazy" />
          <?php else : ?>
            <div class="ladb-realisations__placeholder" aria-hidden="true">
              <span>photo chantier</span>
            </div>
          <?php endif; ?>
        </div>
        <div class="ladb-realisations__caption">
          <?php if ( $chantier ) : ?>
            <p class="ladb-realisations__chantier"><?php echo $chantier; ?></p>
          <?php endif; ?>
          <?php if ( $lieu ) : ?>
            <p class="ladb-realisations__lieu"><?php echo $lieu; ?></p>
          <?php endif; ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <p class="ladb-realisations__hint" aria-hidden="true">Glissez pour voir nos chantiers &rarr;</p>
  </div>
</section>
