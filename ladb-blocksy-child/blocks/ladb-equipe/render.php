<?php
defined('ABSPATH') || exit;

$eyebrow   = esc_html($attributes['sectionEyebrow'] ?? "L'équipe");
$title     = esc_html($attributes['sectionTitle']   ?? "L'équipe derrière les Alchimistes");
$para1     = esc_html($attributes['para1']          ?? '');
$para2     = esc_html($attributes['para2']          ?? '');
$photo_id  = absint($attributes['photoId']          ?? 0);
$photo_url = esc_url($attributes['photoUrl']        ?? '');
$photo_alt = esc_attr(
    ($photo_id > 0 ? get_post_meta($photo_id, '_wp_attachment_image_alt', true) : '')
    ?: ($attributes['photoAlt'] ?? "L'équipe LADB, artisans à Montpellier")
);

$has_photo = $photo_url !== '';
?>
<section class="ladb-section" id="equipe">
    <div class="container">
        <div class="ladb-equipe__inner">

            <div class="ladb-equipe__text">
                <div class="ladb-section__head">
                    <?php if ($eyebrow) : ?>
                        <span class="ladb-eyebrow"><?php echo $eyebrow; ?></span>
                    <?php endif; ?>
                    <h2><?php echo $title; ?></h2>
                </div>
                <div class="ladb-equipe__body">
                    <?php if ($para1) : ?><p><?php echo $para1; ?></p><?php endif; ?>
                    <?php if ($para2) : ?><p><?php echo $para2; ?></p><?php endif; ?>
                </div>
            </div>

            <?php if ($has_photo) : ?>
                <figure class="ladb-equipe__photo">
                    <img src="<?php echo $photo_url; ?>" alt="<?php echo $photo_alt; ?>" loading="lazy" />
                </figure>
            <?php else : ?>
                <div class="ladb-equipe__deco" aria-hidden="true">
                    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="130,10 240,72 240,188 130,250 20,188 20,72" stroke="rgba(217,160,102,0.6)" stroke-width="1.5" fill="none"/>
                        <polygon points="130,35 218,85 218,175 130,225 42,175 42,85" stroke="rgba(217,160,102,0.4)" stroke-width="1.5" fill="none"/>
                        <polygon points="130,60 196,98 196,162 130,200 64,162 64,98" stroke="rgba(217,160,102,0.25)" stroke-width="1.5" fill="none"/>
                        <polygon points="130,85 174,111 174,149 130,175 86,149 86,111" stroke="rgba(217,160,102,0.15)" stroke-width="1.5" fill="none"/>
                        <circle cx="130" cy="130" r="8" fill="rgba(217,160,102,0.5)"/>
                        <line x1="130" y1="10" x2="130" y2="250" stroke="rgba(217,160,102,0.1)" stroke-width="1"/>
                        <line x1="20" y1="72" x2="240" y2="188" stroke="rgba(217,160,102,0.1)" stroke-width="1"/>
                        <line x1="240" y1="72" x2="20" y2="188" stroke="rgba(217,160,102,0.1)" stroke-width="1"/>
                    </svg>
                </div>
            <?php endif; ?>

        </div>
    </div>
</section>