<?php
defined('ABSPATH') || exit;

$card_title    = esc_html($attributes['cardTitle']    ?? 'Montpellier');
$card_sub      = esc_html($attributes['cardSubtitle'] ?? '+ 30 km');
$map_url       = esc_url($attributes['mapImageUrl']   ?? '');
$inset_url     = esc_url($attributes['insetImageUrl'] ?? '');
$pin_label     = esc_html($attributes['pinLabel']     ?? 'Montpellier · siège');
$legend_text   = esc_html($attributes['legendText']   ?? 'Couverture <24h · Montpellier Métropole');
$inset_cap     = esc_html($attributes['insetCaption'] ?? '● Comédie · 21h47');
$zones_raw     = $attributes['zonesText'] ?? '';
$zones         = array_filter(array_map('trim', explode(',', $zones_raw)));
$s1l = esc_html($attributes['service1Label'] ?? 'Vitrerie');
$s1h = esc_url($attributes['service1Href']   ?? '/service/vitrerie-herault/');
$s2l = esc_html($attributes['service2Label'] ?? 'Serrurerie');
$s2h = esc_url($attributes['service2Href']   ?? '/service/serrurerie-herault/');
$s3l = esc_html($attributes['service3Label'] ?? 'Miroiterie');
$s3h = esc_url($attributes['service3Href']   ?? '/service/miroiterie-herault/');

$more = count($zones) > 7 ? count($zones) - 7 : 0;
?>
<div class="ladb-mapcard">
  <span class="ladb-eyebrow">Zone d'intervention</span>
  <div class="ladb-mapcard__title"><?php echo $card_title; ?> <span><?php echo $card_sub; ?></span></div>

  <div class="ladb-map" role="img" aria-label="Carte de Montpellier Métropole — zones d'intervention LADB">
    <?php if ($map_url): ?>
    <img
      class="ladb-map__img"
      src="<?php echo $map_url; ?>"
      alt="Carte Montpellier Métropole"
      width="600" height="480"
      loading="lazy"
    />
    <?php endif; ?>
    <div class="ladb-map__overlay" aria-hidden="true"></div>

    <a href="#contact" class="ladb-map__pin" style="top:50%;left:48%;" aria-label="<?php echo esc_attr($pin_label); ?>">
      <span class="ladb-map__pinDot" aria-hidden="true"></span>
      <span class="ladb-map__pinLabel"><?php echo $pin_label; ?></span>
    </a>

    <?php if ($inset_url): ?>
    <div class="ladb-map__inset" aria-hidden="true">
      <img src="<?php echo $inset_url; ?>" alt="" width="112" height="72" loading="lazy" />
      <span class="ladb-map__insetCap"><?php echo $inset_cap; ?></span>
    </div>
    <?php endif; ?>

    <div class="ladb-map__legend" aria-hidden="true">
      <span class="dot"></span> <?php echo $legend_text; ?>
    </div>
  </div>

  <div class="ladb-mapcard__chips">
    <?php foreach (array_slice($zones, 0, 7) as $zone): ?>
    <span class="ladb-chip"><?php echo esc_html($zone); ?></span>
    <?php endforeach; ?>
    <?php if ($more > 0): ?>
    <span class="ladb-chip ladb-chip--more">+ <?php echo $more; ?> villes →</span>
    <?php endif; ?>
  </div>

  <div class="ladb-mapcard__services">
    <a href="<?php echo $s1h; ?>" class="ladb-chip ladb-chip--service"><?php echo $s1l; ?></a>
    <a href="<?php echo $s2h; ?>" class="ladb-chip ladb-chip--service"><?php echo $s2l; ?></a>
    <a href="<?php echo $s3h; ?>" class="ladb-chip ladb-chip--service"><?php echo $s3l; ?></a>
  </div>
</div>
