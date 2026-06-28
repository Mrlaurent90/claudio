(function () {
  var registerBlockType = wp.blocks.registerBlockType;
  var el = wp.element.createElement;

  registerBlockType('ladb/realisations', {
    edit: function (props) {
      var attrs = props.attributes;
      var count = (attrs.items || []).length;
      return el(
        'div',
        { style: { background: '#0d1b2a', color: '#fff', padding: '32px', borderRadius: '4px' } },
        el('p', { style: { color: '#b87333', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' } }, attrs.eyebrow || 'Nos chantiers'),
        el('p', { style: { fontWeight: 700, fontSize: '1.2rem', margin: '0 0 16px' } }, attrs.heading || 'Réalisations'),
        el('p', { style: { color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 } }, count + ' chantier(s) — carrousel rendu côté serveur')
      );
    },
    save: function () { return null; }
  });
})();
