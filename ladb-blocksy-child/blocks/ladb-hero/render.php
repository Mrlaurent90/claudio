<?php
defined('ABSPATH') || exit;

// Breadcrumb dynamique — reflète la hiérarchie de la page courante
$bc_post_id = get_the_ID() ?: 0;
$bc_ancestors = $bc_post_id ? array_reverse(get_ancestors($bc_post_id, 'page')) : [];
$bc_items = [['label' => 'Accueil', 'url' => home_url('/')]];
foreach ($bc_ancestors as $bc_anc) {
    $bc_items[] = ['label' => get_the_title($bc_anc), 'url' => get_permalink($bc_anc)];
}
if ($bc_post_id) {
    $bc_items[] = ['label' => get_the_title($bc_post_id), 'url' => ''];
}

$kicker       = esc_html($attributes['kicker']          ?? 'Vitrerie · Serrurerie · Miroiterie');
$hl1          = esc_html($attributes['headlineL1']       ?? 'Votre');
$hl2          = esc_html($attributes['headlineL2']       ?? 'vitrier');
$hl3          = esc_html($attributes['headlineL3']       ?? 'à Montpellier, 24h/24.');
$lede         = esc_html($attributes['lede']             ?? '');
$cta_pl       = esc_html($attributes['ctaPrimaryLabel']  ?? 'Demander mon devis');
$cta_pu       = esc_url($attributes['ctaPrimaryUrl']     ?? '#contact');
$cta_phone    = preg_replace('/\D/', '', $attributes['ctaPhone'] ?? '0686416925');
$cta_phone_d  = esc_html(preg_replace('/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/', '$1 $2 $3 $4 $5', $cta_phone));
$cta_phl      = esc_html($attributes['ctaPhoneLabel']    ?? 'Être rappelé');
$photo_id     = absint($attributes['photoId']            ?? 0);
$photo_url    = esc_url($attributes['photoUrl']          ?? '');
$photo_alt    = esc_attr(
    ($photo_id > 0 ? get_post_meta($photo_id, '_wp_attachment_image_alt', true) : '')
    ?: ($attributes['photoAlt'] ?? 'Artisan vitrier LADB au travail')
);
$live_badge   = esc_html($attributes['liveBadge']        ?? 'On décroche 24h/24');
$location     = esc_html($attributes['location']         ?? 'Montpellier — Hérault (34)');
$m1n  = esc_html($attributes['marker1N']     ?? '‹24h');
$m1l  = esc_html($attributes['marker1Label'] ?? 'Intervention sous 24h');
$m1s  = esc_html($attributes['marker1Sub']   ?? '01 · Réactivité');
$m2n  = esc_html($attributes['marker2N']     ?? '10');
$m2l  = esc_html($attributes['marker2Label'] ?? 'Ans de garantie décennale');
$m2s  = esc_html($attributes['marker2Sub']   ?? '02 · Engagement');
$m3n  = esc_html($attributes['marker3N']     ?? '47');
$m3l  = esc_html($attributes['marker3Label'] ?? 'Avis Google · note 5 / 5');
$m3s  = esc_html($attributes['marker3Sub']   ?? '03 · Confiance');
?>
<section class="ladb-hero" id="accueil">
  <div class="ladb-hero__grain" aria-hidden="true"></div>
  <div class="container ladb-hero__inner">

    <nav class="ladb-breadcrumb" aria-label="Fil d'Ariane">
      <?php foreach ($bc_items as $bc_i => $bc_item): ?>
        <?php if ($bc_i > 0): ?><span class="ladb-breadcrumb__sep" aria-hidden="true">›</span><?php endif; ?>
        <?php if ($bc_item['url']): ?>
          <a href="<?php echo esc_url($bc_item['url']); ?>"><?php echo esc_html($bc_item['label']); ?></a>
        <?php else: ?>
          <span aria-current="page"><?php echo esc_html($bc_item['label']); ?></span>
        <?php endif; ?>
      <?php endforeach; ?>
    </nav>

    <div class="ladb-hero__top">
      <div class="ladb-hero__est">
        <span class="ladb-hero__live"><span class="dot"></span><?php echo $live_badge; ?></span>
        <span class="rule" aria-hidden="true"></span>
        <span><?php echo $location; ?></span>
      </div>
    </div>

    <div class="ladb-hero__body">
      <div>
        <div class="ladb-hero__kicker"><?php echo $kicker; ?></div>
        <h1 class="ladb-hero__title">
          <span class="l1"><?php echo $hl1; ?></span>
          <span class="l2"><?php echo $hl2; ?></span>
          <span class="l3"><?php echo $hl3; ?></span>
        </h1>
        <p class="ladb-hero__lede"><?php echo $lede; ?></p>
        <div class="ladb-hero__ctas">
          <a class="ladb-btn ladb-btn--primary" href="<?php echo $cta_pu; ?>"><?php echo $cta_pl; ?> →</a>
          <a class="ladb-btn ladb-btn--secondary" href="tel:<?php echo esc_attr($cta_phone); ?>">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>
            </svg>
            <?php echo $cta_phl; ?>
          </a>
        </div>
      </div>

      <div class="ladb-hero__photo ladb-hero__photo--real" aria-label="Photo artisan LADB">
        <?php if ($photo_url): ?>
        <img
          src="<?php echo $photo_url; ?>"
          alt="<?php echo $photo_alt; ?>"
          class="ladb-hero__photoImg"
          width="600" height="700"
          loading="eager"
          fetchpriority="high"
        />
        <?php endif; ?>
        <div class="ladb-hero__photoOverlay" aria-hidden="true"></div>
        <div class="ladb-hero__photocap">
          <span class="dot" aria-hidden="true"></span>Artisan vitrier · Montpellier 34
        </div>
        <div class="ladb-hero__photobadge">
          <div class="t">Dépannage &amp; réparation —<br>nos artisans sont à votre service.</div>
        </div>
      </div>
    </div>

    <div class="ladb-hero__bottom">
      <div class="ladb-hero__hair" aria-hidden="true"></div>
      <div class="ladb-hero__markers" aria-label="Chiffres clés LADB">
        <div class="ladb-hero__marker">
          <span class="n" aria-label="Moins de 24 heures"><?php echo $m1n; ?></span>
          <div><span class="l"><?php echo $m1l; ?></span><span class="s"><?php echo $m1s; ?></span></div>
        </div>
        <div class="ladb-hero__marker">
          <span class="n"><?php echo $m2n; ?></span>
          <div><span class="l"><?php echo $m2l; ?></span><span class="s"><?php echo $m2s; ?></span></div>
        </div>
        <div class="ladb-hero__marker">
          <span class="n"><?php echo $m3n; ?></span>
          <div><span class="l"><?php echo $m3l; ?></span><span class="s"><?php echo $m3s; ?></span></div>
        </div>
      </div>
    </div>
  </div>
</section>