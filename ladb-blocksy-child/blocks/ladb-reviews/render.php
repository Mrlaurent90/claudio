<?php
defined('ABSPATH') || exit;

$eyebrow     = esc_html($attributes['sectionEyebrow'] ?? 'Témoignages');
$title       = esc_html($attributes['sectionTitle']   ?? '47 avis Google · note 5/5');
$intro       = esc_html($attributes['sectionIntro']   ?? '');
$score       = esc_html($attributes['scoreValue']     ?? '5,0');
$count       = esc_html($attributes['scoreCount']     ?? '47');
$reviews_url = esc_url($attributes['allReviewsUrl']   ?? '#');

$reviews = [
  [
    'initials' => esc_html($attributes['review1Initials'] ?? 'CM'),
    'name'     => esc_html($attributes['review1Name']     ?? 'Claire M.'),
    'when'     => esc_html($attributes['review1When']     ?? 'il y a 2 semaines'),
    'where'    => esc_html($attributes['review1Where']    ?? 'Montpellier — Antigone'),
    'av_bg'    => esc_attr($attributes['review1AvBg']     ?? '#1A73E8'),
    'quote'    => esc_html($attributes['review1Quote']    ?? ''),
  ],
  [
    'initials' => esc_html($attributes['review2Initials'] ?? 'RT'),
    'name'     => esc_html($attributes['review2Name']     ?? 'Raphaël T.'),
    'when'     => esc_html($attributes['review2When']     ?? 'il y a 1 mois'),
    'where'    => esc_html($attributes['review2Where']    ?? 'Castelnau-le-Lez'),
    'av_bg'    => esc_attr($attributes['review2AvBg']     ?? '#9C27B0'),
    'quote'    => esc_html($attributes['review2Quote']    ?? ''),
  ],
  [
    'initials' => esc_html($attributes['review3Initials'] ?? 'ÉB'),
    'name'     => esc_html($attributes['review3Name']     ?? 'Émilie B.'),
    'when'     => esc_html($attributes['review3When']     ?? 'il y a 2 mois'),
    'where'    => esc_html($attributes['review3Where']    ?? 'Lattes'),
    'av_bg'    => esc_attr($attributes['review3AvBg']     ?? '#E8710A'),
    'quote'    => esc_html($attributes['review3Quote']    ?? ''),
  ],
];

$star_svg   = '<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true"><path d="M12 2 9.2 8.6 2 9.3l5.5 4.8L5.8 21 12 17.3 18.2 21l-1.7-6.9L22 9.3l-7.2-.7L12 2z"/></svg>';
$stars5_20  = str_repeat(str_replace('{size}', '20', $star_svg), 5);
$stars5_15  = str_repeat(str_replace('{size}', '15', $star_svg), 5);
$google_g   = '<svg width="{size}" height="{size}" viewBox="0 0 48 48" aria-hidden="true" style="flex-shrink:0"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.3l-6.2-5.3c-2 1.5-4.6 2.5-7.3 2.5-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.3C40.8 35.3 44 30.1 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
$google_g_36 = str_replace('{size}', '36', $google_g);
$google_g_20 = str_replace('{size}', '20', $google_g);
$verified_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="#1A73E8" aria-label="Avis local vérifié"><path d="M12 1 3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4zm-2 16-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"/></svg>';
?>
<section class="ladb-section" id="avis">
  <div class="container">
    <div class="ladb-section__head">
      <span class="ladb-eyebrow"><?php echo $eyebrow; ?></span>
      <h2><?php echo $title; ?></h2>
      <p><?php echo $intro; ?></p>
    </div>

    <div class="ladb-reviews__head">
      <div class="ladb-reviews__score">
        <?php echo $google_g_36; ?>
        <div class="ladb-reviews__scoreInner">
          <div class="ladb-reviews__scoreRow">
            <span class="big"><?php echo $score; ?></span>
            <span class="ladb-reviews__starsLg" aria-label="5 étoiles"><?php echo $stars5_20; ?></span>
          </div>
          <div class="meta">basé sur <strong><?php echo $count; ?> avis Google</strong></div>
        </div>
      </div>
      <a class="ladb-btn ladb-btn--outline ladb-btn--sm" href="<?php echo $reviews_url; ?>" target="_blank" rel="noreferrer noopener">
        <?php echo $google_g_20; ?> Voir tous les avis
      </a>
    </div>

    <div class="ladb-reviews__grid">
      <?php foreach ($reviews as $r): ?>
      <article class="ladb-review ladb-review--google">
        <div class="ladb-review__head">
          <div class="ladb-review__top">
            <div class="ladb-review__av" style="background:<?php echo $r['av_bg']; ?>" aria-hidden="true"><?php echo $r['initials']; ?></div>
            <div class="ladb-review__who">
              <div class="ladb-review__nm">
                <?php echo $r['name']; ?>
                <?php echo $verified_svg; ?>
              </div>
              <div class="ladb-review__meta"><?php echo $r['when']; ?><?php echo $r['where'] ? ' · ' . $r['where'] : ''; ?></div>
            </div>
          </div>
          <?php echo $google_g_20; ?>
        </div>
        <div class="ladb-review__stars" aria-label="5 étoiles sur 5"><?php echo $stars5_15; ?></div>
        <p class="ladb-review__quote"><?php echo $r['quote']; ?></p>
        <div class="ladb-review__footer">
          <span>Avis Google · LADB Montpellier</span>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
