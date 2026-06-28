<?php
defined('ABSPATH') || exit;

$theme_uri = get_stylesheet_directory_uri();
$year      = date('Y');

$url_fb = 'https://www.facebook.com/profile.php?id=61570704484153';
$url_ig = 'https://www.instagram.com/lesalchimistesdubatiment/';
$url_tt = 'https://www.tiktok.com/@les.alchimistes.d';
?>
<footer class="ladb-footer" itemscope itemtype="https://schema.org/WPFooter" role="contentinfo">
  <img
    class="ladb-footer__bg"
    src="<?php echo esc_url($theme_uri . '/assets/images/montpellier-comedie-nuit.jpg'); ?>"
    alt=""
    aria-hidden="true"
    width="1400"
    height="600"
    loading="lazy"
  />
  <div class="ladb-footer__overlay" aria-hidden="true"></div>

  <div class="container ladb-footer__inner">
    <div class="ladb-footer__grid">

      <!-- Brand column -->
      <div class="ladb-footer__brand">
        <img
          src="<?php echo esc_url($theme_uri . '/assets/images/logo-light.svg'); ?>"
          alt="LADB · Les Alchimistes du Bâtiment"
          height="64"
        />
        <p>Artisan vitrier, serrurier et miroitier à Montpellier. Intervention en moins de 24h, garantie décennale, devis gratuit.</p>
        <div class="ladb-footer__socials">
          <a href="<?php echo esc_url($url_fb); ?>" class="ladb-social" aria-label="Facebook LADB" rel="noopener noreferrer" target="_blank">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v6.9A10 10 0 0 0 22 12z"/></svg>
          </a>
          <a href="<?php echo esc_url($url_ig); ?>" class="ladb-social" aria-label="Instagram LADB" rel="noopener noreferrer" target="_blank">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 .1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.2 1.4C1.1 2.8.7 3.5.4 4.3c-.3.8-.5 1.7-.6 3C-.3 8.7 0 9.1 0 12c0 3.3 0 3.7.1 5 .1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6C8.3 24 8.7 24 12 24s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.5 1.1 20.8.7 20 .4c-.8-.3-1.7-.5-3-.6C15.7 0 15.3 0 12 0z"/><circle cx="18.4" cy="5.6" r="1.4"/><path d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>
          </a>
          <a href="<?php echo esc_url($url_tt); ?>" class="ladb-social" aria-label="TikTok LADB" rel="noopener noreferrer" target="_blank">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 6.3c-1.6 0-3-1.4-3-3V3h-3.4v13.3a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1a6 6 0 1 0 6 6V9.2a6.3 6.3 0 0 0 3.7 1.2V7c-.2 0-.4-.4-.6-.7z"/></svg>
          </a>
        </div>
      </div>

      <!-- Prestations -->
      <nav aria-label="Prestations LADB">
        <p class="ladb-footer__coltitle">Prestations</p>
        <ul>
          <li><a href="/service/vitrerie/">Vitrerie</a></li>
          <li><a href="/service/serrurerie/">Serrurerie</a></li>
          <li><a href="/service/miroiterie/">Miroiterie</a></li>
          <li><a href="/service/vitrerie/">Verre sur mesure</a></li>
          <li><a href="/service/urgence-vitrerie-montpellier/">Urgences 24/7</a></li>
        </ul>
      </nav>

      <!-- Zones -->
      <nav aria-label="Zones d'intervention LADB">
        <p class="ladb-footer__coltitle">Zones</p>
        <ul>
          <li><a href="/service/vitrerie-herault/">Vitrerie en Hérault</a></li>
          <li><a href="/service/serrurerie-herault/">Serrurerie en Hérault</a></li>
          <li><a href="/service/miroiterie-herault/">Miroiterie en Hérault</a></li>
        </ul>
      </nav>

      <!-- Contact & Blog -->
      <nav aria-label="Contact et informations LADB">
        <p class="ladb-footer__coltitle">Contact &amp; Blog</p>
        <ul>
          <li>
            <a href="tel:0686416925" style="color:var(--copper-light);font-family:var(--font-display);font-weight:700;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:-2px;margin-right:6px"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
              06 86 41 69 25
            </a>
          </li>
          <li>
            <a href="mailto:hello@lesalchimistesdubatiment.fr">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:-2px;margin-right:6px"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              hello@lesalchimistesdubatiment.fr
            </a>
          </li>
          <li>
            <a href="/contact/">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:-2px;margin-right:6px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Contact
            </a>
          </li>
          <li>
            <a href="/devis-gratuit/">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:-2px;margin-right:6px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Demander un devis
            </a>
          </li>
          <li>
            <a href="/blog/">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:-2px;margin-right:6px"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Le blog
            </a>
          </li>
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:-2px;margin-right:6px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            24/7 toute l'année
          </li>
        </ul>
      </nav>

    </div><!-- /.ladb-footer__grid -->

    <div class="ladb-footer__bottom">
      <span>© <?php echo esc_html($year); ?> LADB — Les Alchimistes du Bâtiment.</span>
      <span>
        <a href="/contact/">Contact</a> ·
        <a href="/mentions-legales/">Mentions légales</a> ·
        <a href="/cgv/">CGV</a> ·
        Garantie décennale
      </span>
    </div>
  </div><!-- /.ladb-footer__inner -->
</footer>

<?php wp_footer(); ?>
</body>
</html>