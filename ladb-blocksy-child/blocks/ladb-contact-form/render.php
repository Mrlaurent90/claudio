<?php
defined('ABSPATH') || exit;

// ═══════════════════════════════════════════════════════════════════════
// CARTE DES ZONES — images tirées de la médiathèque WP
$mapImageUrl   = wp_get_attachment_image_url(4593, 'full') ?: ''; // carte principale
$map_inset_url = wp_get_attachment_image_url(4595, 'full') ?: ''; // inset ville
// ═══════════════════════════════════════════════════════════════════════

// ── Bloc Contact : attributs Gutenberg ──────────────────────────────────
$eyebrow    = esc_html($attributes['sectionEyebrow']   ?? 'Demander un devis');
$title      = esc_html($attributes['sectionTitle']     ?? 'Décrivez votre besoin, on vous répond en 2 minutes');
$intro      = esc_html($attributes['sectionIntro']     ?? '');
$cf7_id     = absint($attributes['cf7FormId']          ?? 0);
$phone      = preg_replace('/\D/', '', $attributes['phoneNumber'] ?? '0686416925');
$phone_d    = esc_html($attributes['phoneDisplay']     ?? '06 86 41 69 25');
$phone_desc = esc_html($attributes['phoneDesc']        ?? '');
$avail      = esc_html($attributes['availabilityText'] ?? 'Disponible maintenant');
$legal      = esc_html($attributes['legalText']        ?? '');

// ── Carte des zones : variables PHP ─────────────────────────────────────
$map_card_title  = 'Montpellier';
$map_card_sub    = '+ 30 km';
$map_pin_label   = 'Montpellier · siège';
$map_legend_text = 'Couverture <24h · Montpellier Métropole';
$map_inset_cap   = '● Comédie · 21h47';
$map_s1l = 'Vitrerie';   $map_s1h = '/service/vitrerie-herault/';
$map_s2l = 'Serrurerie'; $map_s2h = '/service/serrurerie-herault/';
$map_s3l = 'Miroiterie'; $map_s3h = '/service/miroiterie-herault/';

$phone_icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';
?>
<section class="ladb-section ladb-contact-section" id="contact">
  <div class="ladb-contact-section__grain" aria-hidden="true"></div>

  <div class="container ladb-contact-section__inner">
    <div class="ladb-section__head">
      <span class="ladb-eyebrow"><?php echo $eyebrow; ?></span>
      <h2><?php echo $title; ?></h2>
      <p><?php echo $intro; ?></p>
    </div>

    <div class="ladb-contact">
      <!-- ─── CF7 Form ──────────────────────────────────────────────── -->
      <div class="ladb-cf7-wrapper">
        <?php if ($cf7_id > 0 && function_exists('wpcf7_contact_form')): ?>
          <?php echo do_shortcode('[contact-form-7 id="' . $cf7_id . '"]'); ?>
        <?php else: ?>
          <div style="padding:20px;text-align:center;color:#A9B5CB;border:1px dashed rgba(217,160,102,.3);border-radius:10px;">
            <p style="margin:0 0 8px;font-weight:600;color:#D9A066;">Formulaire Contact Form 7</p>
            <?php if (!function_exists('wpcf7_contact_form')): ?>
              <p style="margin:0;font-size:13px;">Plugin <strong>Contact Form 7</strong> non activé. Installez-le, puis renseignez l'ID du formulaire dans les options du bloc.</p>
            <?php else: ?>
              <p style="margin:0;font-size:13px;">ID du formulaire CF7 non renseigné — ouvrez ce bloc dans l'éditeur.</p>
            <?php endif; ?>
          </div>
        <?php endif; ?>
        <?php if ($legal): ?>
        <p class="ladb-form__legal" style="margin-top:10px;font-size:11px;color:var(--fg-mute);text-align:center;"><?php echo $legal; ?></p>
        <?php endif; ?>
      </div>

      <!-- ─── Sidebar : carte téléphone + carte des zones ─────────── -->
      <div class="ladb-contact__side">

        <!-- Carte téléphone -->
        <div class="ladb-contactcard">
          <span class="ladb-eyebrow">Urgence ou question rapide</span>
          <a href="tel:<?php echo esc_attr($phone); ?>" class="tel">
            <?php echo $phone_icon; ?>
            <?php echo $phone_d; ?>
          </a>
          <?php if ($phone_desc): ?>
          <p><?php echo $phone_desc; ?></p>
          <?php endif; ?>
          <div class="hours">
            <span class="dot" aria-hidden="true"></span>
            <?php echo $avail; ?>
          </div>
        </div>

        <!-- Carte des zones — flex:1 pour remplir la hauteur restante du sidebar -->
        <div class="ladb-mapcard" style="flex: 1;">
          <span class="ladb-eyebrow">Zone d'intervention</span>
          <div class="ladb-mapcard__title">
            <?php echo esc_html($map_card_title); ?>
            <span><?php echo esc_html($map_card_sub); ?></span>
          </div>

          <div class="ladb-map" role="img" aria-label="Carte de Montpellier Métropole — zones d'intervention LADB">
            <?php if ($mapImageUrl): ?>
            <img
              class="ladb-map__img"
              src="<?php echo esc_url($mapImageUrl); ?>"
              alt="Carte Montpellier Métropole"
              width="600" height="480"
              loading="lazy"
            />
            <?php endif; ?>
            <div class="ladb-map__overlay" aria-hidden="true"></div>

            <a href="#contact" class="ladb-map__pin" style="top:50%;left:48%;" aria-label="<?php echo esc_attr($map_pin_label); ?>">
              <span class="ladb-map__pinDot" aria-hidden="true"></span>
              <span class="ladb-map__pinLabel"><?php echo esc_html($map_pin_label); ?></span>
            </a>

            <?php if ($map_inset_url): ?>
            <div class="ladb-map__inset" aria-hidden="true">
              <img src="<?php echo esc_url($map_inset_url); ?>" alt="" width="112" height="72" loading="lazy" />
              <span class="ladb-map__insetCap"><?php echo esc_html($map_inset_cap); ?></span>
            </div>
            <?php endif; ?>

            <div class="ladb-map__legend" aria-hidden="true">
              <span class="dot"></span> <?php echo esc_html($map_legend_text); ?>
            </div>
          </div>

          <!-- Chips villes — spans sans lien (pages communes à créer plus tard) -->
          <div class="ladb-mapcard__chips">
            <span class="ladb-chip">Montpellier</span>
            <span class="ladb-chip">Lattes</span>
            <span class="ladb-chip">Juvignac</span>
            <span class="ladb-chip">Saint-Gély-du-Fesc</span>
            <span class="ladb-chip">Castelnau-le-Lez</span>
            <span class="ladb-chip">Le Crès</span>
            <span class="ladb-chip">Pérols</span>
            <span class="ladb-chip ladb-chip--more">+ 4 villes</span>
          </div>

          <div class="ladb-mapcard__services">
            <a href="<?php echo esc_url($map_s1h); ?>" class="ladb-chip ladb-chip--service"><?php echo esc_html($map_s1l); ?></a>
            <a href="<?php echo esc_url($map_s2h); ?>" class="ladb-chip ladb-chip--service"><?php echo esc_html($map_s2l); ?></a>
            <a href="<?php echo esc_url($map_s3h); ?>" class="ladb-chip ladb-chip--service"><?php echo esc_html($map_s3l); ?></a>
          </div>
        </div>

      </div><!-- /.ladb-contact__side -->
    </div><!-- /.ladb-contact -->

  </div><!-- /.container -->
</section>