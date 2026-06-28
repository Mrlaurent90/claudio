<?php
defined('ABSPATH') || exit;

$eyebrow   = esc_html($attributes['sectionEyebrow'] ?? 'Comment ça marche');
$title     = esc_html($attributes['sectionTitle']   ?? 'Du téléphone à la pose, en 24h chrono');
$intro     = esc_html($attributes['sectionIntro']   ?? '');
$bg_url    = esc_url($attributes['bgPhotoUrl']      ?? '');

$steps = [
  [ 'n' => esc_html($attributes['step1N'] ?? '01'), 'title' => esc_html($attributes['step1Title'] ?? 'Vous appelez'), 'desc' => esc_html($attributes['step1Desc'] ?? '') ],
  [ 'n' => esc_html($attributes['step2N'] ?? '02'), 'title' => esc_html($attributes['step2Title'] ?? 'Devis gratuit'), 'desc' => esc_html($attributes['step2Desc'] ?? '') ],
  [ 'n' => esc_html($attributes['step3N'] ?? '03'), 'title' => esc_html($attributes['step3Title'] ?? 'Intervention'), 'desc' => esc_html($attributes['step3Desc'] ?? '') ],
];
?>
<section class="ladb-section ladb-hiw-photo" id="comment-ca-marche">
  <?php if ($bg_url): ?>
  <img
    class="ladb-hiw-photo__bg"
    src="<?php echo $bg_url; ?>"
    alt=""
    aria-hidden="true"
    width="1400"
    height="700"
    loading="lazy"
  />
  <?php endif; ?>
  <div class="ladb-hiw-photo__overlay" aria-hidden="true"></div>
  <div class="container">
    <div class="ladb-section__head">
      <span class="ladb-eyebrow"><?php echo $eyebrow; ?></span>
      <h2><?php echo $title; ?></h2>
      <p><?php echo $intro; ?></p>
    </div>
    <div class="ladb-steps">
      <?php foreach ($steps as $i => $step): ?>
      <article class="ladb-step">
        <div class="ladb-step__n" aria-hidden="true"><?php echo $step['n']; ?></div>
        <h3><?php echo $step['title']; ?></h3>
        <p><?php echo $step['desc']; ?></p>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
