<?php
defined( 'ABSPATH' ) || exit;

$eyebrow   = esc_html( $attributes['eyebrow']  ?? 'Notre équipe' );
$heading   = esc_html( $attributes['heading']  ?? 'L’équipe Les Alchimistes du Bâtiment' );
$cta_label = esc_html( $attributes['ctaLabel'] ?? 'Découvrir l’équipe' );
$cta_url   = esc_url(  $attributes['ctaUrl']   ?? '/a-propos/' );
$members   = $attributes['members'] ?? [];

$wrapper = get_block_wrapper_attributes( [ 'class' => 'ladb-team' ] );
?>
<section <?php echo $wrapper; ?>>
  <div class="ladb-team__inner">
    <p class="ladb-team__eyebrow"><?php echo $eyebrow; ?></p>
    <h2 class="ladb-team__heading"><?php echo $heading; ?></h2>

    <div class="ladb-team__grid">
      <?php foreach ( $members as $member ) :
        $name    = esc_html( $member['name']     ?? '' );
        $role    = esc_html( $member['role']     ?? '' );
        $initial = esc_html( mb_substr( $name, 0, 1 ) );
        $img_url = esc_url(  $member['imageUrl'] ?? '' );
        $img_alt = esc_attr( $member['imageAlt'] ?? ( $name . ', ' . $role . ' chez LADB Montpellier' ) );
      ?>
      <div class="ladb-team__card">
        <div class="ladb-team__photo">
          <?php if ( $img_url ) : ?>
            <img src="<?php echo $img_url; ?>" alt="<?php echo $img_alt; ?>" loading="lazy" />
          <?php else : ?>
            <div class="ladb-team__initial" aria-hidden="true"><?php echo $initial; ?></div>
          <?php endif; ?>
        </div>
        <p class="ladb-team__name"><?php echo $name; ?></p>
        <p class="ladb-team__role"><?php echo $role; ?></p>
      </div>
      <?php endforeach; ?>
    </div>

    <?php if ( $cta_url ) : ?>
    <div class="ladb-team__cta">
      <a href="<?php echo $cta_url; ?>" class="ladb-team__cta-link"><?php echo $cta_label; ?></a>
    </div>
    <?php endif; ?>
  </div>
</section>
