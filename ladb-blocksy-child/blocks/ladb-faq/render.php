<?php
defined('ABSPATH') || exit;

$eyebrow  = esc_html($attributes['sectionEyebrow'] ?? 'FAQ');
$title    = esc_html($attributes['sectionTitle']   ?? 'Vos questions, nos réponses');
$bg_url   = esc_url($attributes['bgPhotoUrl']      ?? '');
$faq_items = $attributes['faqItems'] ?? [];

// FAQ schema → JSON-LD unique, injecté en footer (méthode recommandée par Google).
// C'est la SEULE déclaration FAQ de la page : la microdata inline a été retirée du markup
// ci-dessous pour éviter le doublon FAQPage.
$faq_schema_items = [];
foreach ($faq_items as $item) {
    $faq_schema_items[] = [
        '@type'          => 'Question',
        'name'           => $item['q'] ?? '',
        'acceptedAnswer' => [
            '@type' => 'Answer',
            'text'  => $item['a'] ?? '',
        ],
    ];
}
if (!empty($faq_schema_items)) {
    add_action('wp_footer', function () use ($faq_schema_items) {
        $schema = ['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $faq_schema_items];
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }, 15);
}
?>
<section class="ladb-section ladb-faq-section" id="faq">
  <?php if ($bg_url): ?>
  <img
    class="ladb-faq-section__bg"
    src="<?php echo $bg_url; ?>"
    alt=""
    aria-hidden="true"
    width="1400"
    height="700"
    loading="lazy"
  />
  <?php endif; ?>
  <div class="ladb-faq-section__overlay" aria-hidden="true"></div>
  <div class="container">
    <div class="ladb-section__head">
      <span class="ladb-eyebrow"><?php echo $eyebrow; ?></span>
      <h2><?php echo $title; ?></h2>
    </div>
    <div class="ladb-faq" role="list">
      <?php foreach ($faq_items as $i => $item):
        $q = esc_html($item['q'] ?? '');
        $a = esc_html($item['a'] ?? '');
        if (!$q) continue;
      ?>
      <div
        class="ladb-faq__item"
        data-faq-item
        role="listitem"
      >
        <button
          class="ladb-faq__btn"
          aria-expanded="false"
          aria-controls="faq-body-<?php echo esc_attr($i); ?>"
        >
          <span><?php echo $q; ?></span>
          <span class="ladb-faq__plus" aria-hidden="true">+</span>
        </button>
        <div
          class="ladb-faq__body"
          id="faq-body-<?php echo esc_attr($i); ?>"
        >
          <p><?php echo $a; ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>