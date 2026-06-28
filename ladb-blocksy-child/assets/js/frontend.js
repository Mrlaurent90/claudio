(function () {
  'use strict';

  /* -----------------------------------------------------------------------
   * FAQ accordion
   * --------------------------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll('[data-faq-item]');
    items.forEach(function (item) {
      var btn = item.querySelector('.ladb-faq__btn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        // Close all
        items.forEach(function (i) { i.classList.remove('is-open'); });
        // Open clicked (toggle)
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
   * Mobile CTA — add body class so content gets bottom padding
   * --------------------------------------------------------------------- */
  function initMobileCta() {
    var cta = document.querySelector('.ladb-mobilecta');
    if (!cta) return;
    document.body.classList.add('ladb-has-mobilecta');
  }

  /* -----------------------------------------------------------------------
   * Smooth scroll for anchor links
   * --------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  /* -----------------------------------------------------------------------
   * Header phone link — inject before the CTA (desktop row)
   * --------------------------------------------------------------------- */
  function initHeaderTel() {
    var cta = document.querySelector(
      '[data-header="type-1"] [data-device="desktop"] [data-id="button"]'
    );
    if (!cta || document.querySelector('.ladb-header-tel')) return;
    var a = document.createElement('a');
    a.href = 'tel:0686416925';
    a.className = 'ladb-header-tel';
    a.setAttribute('aria-label', 'Appeler le 06 86 41 69 25');
    a.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>' +
      '</svg><span>06 86 41 69 25</span>';
    cta.parentNode.insertBefore(a, cta);
  }
	
	
  document.addEventListener('DOMContentLoaded', function () {
    initFaq();
    initMobileCta();
    initSmoothScroll();
    initHeaderTel();
  });
})();
