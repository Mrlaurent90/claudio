<?php
defined('ABSPATH') || exit;

$eyebrow = esc_html($attributes['sectionEyebrow'] ?? 'Nos prestations');
$title   = esc_html($attributes['sectionTitle']   ?? 'Un seul artisan, trois métiers maîtrisés');
$intro   = esc_html($attributes['sectionIntro']   ?? '');

$cards = [
  [
    'icon'     => 'vitrerie',
    'title'    => esc_html($attributes['card1Title']    ?? 'Vitrerie'),
    'desc'     => esc_html($attributes['card1Desc']     ?? ''),
    'items'    => array_filter(array_map('trim', explode("\n", $attributes['card1Items'] ?? ''))),
    'linkText' => esc_html($attributes['card1LinkText'] ?? 'Vitrerie à Montpellier'),
    'linkHref' => esc_url($attributes['card1LinkHref']  ?? '/service/vitrerie/'),
  ],
  [
    'icon'     => 'serrurerie',
    'title'    => esc_html($attributes['card2Title']    ?? 'Serrurerie'),
    'desc'     => esc_html($attributes['card2Desc']     ?? ''),
    'items'    => array_filter(array_map('trim', explode("\n", $attributes['card2Items'] ?? ''))),
    'linkText' => esc_html($attributes['card2LinkText'] ?? 'Serrurerie à Montpellier'),
    'linkHref' => esc_url($attributes['card2LinkHref']  ?? '/service/serrurerie/'),
  ],
  [
    'icon'     => 'miroiterie',
    'title'    => esc_html($attributes['card3Title']    ?? 'Miroiterie'),
    'desc'     => esc_html($attributes['card3Desc']     ?? ''),
    'items'    => array_filter(array_map('trim', explode("\n", $attributes['card3Items'] ?? ''))),
    'linkText' => esc_html($attributes['card3LinkText'] ?? 'Miroiterie à Montpellier'),
    'linkHref' => esc_url($attributes['card3LinkHref']  ?? '/service/miroiterie/'),
  ],
];

// Duotone service icons
$icons = [
  'vitrerie' => '<svg width="32" height="32" viewBox="0 0 46 46" fill="none" aria-hidden="true"><rect x="8" y="6" width="30" height="34" rx="2" fill="#16294A"/><rect x="8" y="6" width="15" height="17" fill="#E1AA6E" opacity="0.22"/><line x1="23" y1="6" x2="23" y2="40" stroke="#E1AA6E" stroke-width="1.6"/><line x1="8" y1="23" x2="38" y2="23" stroke="#E1AA6E" stroke-width="1.6"/><rect x="8" y="6" width="30" height="34" rx="2" stroke="#C07A3E" stroke-width="1.6"/></svg>',
  'serrurerie' => '<svg width="32" height="32" viewBox="0 0 46 46" fill="none" aria-hidden="true"><circle cx="17" cy="17" r="9" fill="#E1AA6E" opacity="0.18"/><circle cx="17" cy="17" r="9" stroke="#C07A3E" stroke-width="1.6"/><circle cx="17" cy="17" r="3.2" fill="#E1AA6E"/><path d="M23 23 L36 36" stroke="#FAF8F4" stroke-width="1.8" stroke-linecap="round"/><path d="M31 31 L35 27 M34 34 L38 30" stroke="#E1AA6E" stroke-width="1.8" stroke-linecap="round"/></svg>',
  'miroiterie' => '<svg width="32" height="32" viewBox="0 0 46 46" fill="none" aria-hidden="true"><rect x="13" y="5" width="20" height="32" rx="10" fill="#E1AA6E" opacity="0.16"/><rect x="13" y="5" width="20" height="32" rx="10" stroke="#C07A3E" stroke-width="1.6"/><path d="M19 12 L19 22" stroke="#E1AA6E" stroke-width="1.8" stroke-linecap="round"/><path d="M23 11 L23 16" stroke="#FAF8F4" stroke-width="1.4" stroke-linecap="round" opacity="0.5"/><line x1="18" y1="41" x2="28" y2="41" stroke="#E1AA6E" stroke-width="1.8" stroke-linecap="round"/></svg>',
];
?>
<section class="ladb-section" id="services">
  <div class="container">
    <div class="ladb-section__head">
      <span class="ladb-eyebrow"><?php echo $eyebrow; ?></span>
      <h2><?php echo $title; ?></h2>
      <p><?php echo $intro; ?></p>
    </div>
    <div class="ladb-services__grid">
      <?php foreach ($cards as $card): ?>
      <article class="ladb-service">
        <div class="ladb-service__ic" aria-hidden="true">
          <?php echo $icons[$card['icon']]; ?>
        </div>
        <h3><?php echo $card['title']; ?></h3>
        <p><?php echo $card['desc']; ?></p>
        <ul class="ladb-service__list" aria-label="Prestations <?php echo $card['title']; ?>">
          <?php foreach ($card['items'] as $item): ?>
          <li><?php echo esc_html($item); ?></li>
          <?php endforeach; ?>
        </ul>
        <a href="<?php echo $card['linkHref']; ?>" class="ladb-service__link"><?php echo $card['linkText']; ?></a>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
