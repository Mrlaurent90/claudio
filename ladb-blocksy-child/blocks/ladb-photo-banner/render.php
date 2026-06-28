<?php
defined('ABSPATH') || exit;

$photo_id     = absint($attributes['photoId']      ?? 0);
$photo_url    = esc_url($attributes['photoUrl']    ?? '');
$photo_alt    = esc_attr(
    ($photo_id > 0 ? get_post_meta($photo_id, '_wp_attachment_image_alt', true) : '')
    ?: ($attributes['photoAlt'] ?? '')
);
$cap_label    = esc_html($attributes['capLabel']   ?? 'Montpellier · Promenade du Peyrou');
$title_main   = esc_html($attributes['titleMain']  ?? 'Votre artisan à');
$title_accent = esc_html($attributes['titleAccent']?? 'Montpellier');
$title_end    = esc_html($attributes['titleEnd']   ?? 'et 30 km autour.');
$subtitle_raw = $attributes['subtitle'] ?? "Vitrerie · Serrurerie · Miroiterie\nIntervention <24h · Garantie décennale";
$subtitle     = nl2br(esc_html($subtitle_raw));
?>
<figure class="ladb-contact-photo" aria-label="<?php echo esc_attr($cap_label); ?>">
  <?php if ($photo_url): ?>
  <img
    class="ladb-contact-photo__img"
    src="<?php echo $photo_url; ?>"
    alt="<?php echo $photo_alt; ?>"
    width="1400"
    height="700"
    loading="lazy"
  />
  <?php endif; ?>
  <div class="ladb-contact-photo__overlay" aria-hidden="true"></div>
  <div class="ladb-contact-photo__grain" aria-hidden="true"></div>
  <figcaption class="ladb-contact-photo__cap">
    <span class="dot" aria-hidden="true"></span><?php echo $cap_label; ?>
  </figcaption>
  <div class="ladb-contact-photo__title">
    <h3>
      <?php echo $title_main; ?> <em><?php echo $title_accent; ?></em><br>
      <?php echo $title_end; ?>
    </h3>
    <span class="sub"><?php echo $subtitle; ?></span>
  </div>
</figure>