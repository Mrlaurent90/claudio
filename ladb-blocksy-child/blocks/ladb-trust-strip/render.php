<?php
defined('ABSPATH') || exit;

$i1t = esc_html($attributes['item1Title'] ?? 'Devis gratuit');
$i1s = esc_html($attributes['item1Sub']   ?? 'réponse en 2 minutes');
$i2t = esc_html($attributes['item2Title'] ?? 'Montpellier + 30 km');
$i2s = esc_html($attributes['item2Sub']   ?? 'intervention dans l\'heure');

// SVG icons inline
$icon_devis = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';
$icon_zone  = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
?>
<section class="ladb-trust" aria-label="Engagements LADB">
  <div class="container">
    <div class="ladb-trust__row">
      <span class="ladb-trust__item ladb-trust__item--lead">
        <span class="ic"><?php echo $icon_devis; ?></span>
        <span>
          <strong><?php echo $i1t; ?></strong>
          <em><?php echo $i1s; ?></em>
        </span>
      </span>
      <span class="ladb-trust__item ladb-trust__item--lead">
        <span class="ic"><?php echo $icon_zone; ?></span>
        <span>
          <strong><?php echo $i2t; ?></strong>
          <em><?php echo $i2s; ?></em>
        </span>
      </span>
    </div>
  </div>
</section>
