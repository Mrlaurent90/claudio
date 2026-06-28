<?php
defined('ABSPATH') || exit;

/**
 * Output the fixed mobile CTA bar via wp_footer.
 * Hidden on desktop via CSS (min-width:900px).
 */
add_action('wp_footer', function () {
    ?>
<div class="ladb-mobilecta" role="navigation" aria-label="Actions rapides mobile">
  <a href="tel:0686416925" class="ladb-mobilecta__call">
    <svg class="ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>
    </svg>
    Appeler
  </a>
  <a href="#contact" class="ladb-mobilecta__dev">
    <svg class="ic" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
    Devis gratuit
  </a>
</div>
    <?php
}, 20);
