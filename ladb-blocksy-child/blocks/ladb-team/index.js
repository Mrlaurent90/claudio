(function () {
  var registerBlockType = wp.blocks.registerBlockType;
  var el = wp.element.createElement;

  registerBlockType('ladb/team', {
    edit: function (props) {
      var attrs = props.attributes;
      var members = attrs.members || [];
      return el(
        'div',
        { style: { background: '#fff', border: '1px solid #e0e0e0', padding: '32px', borderRadius: '4px', textAlign: 'center' } },
        el('p', { style: { color: '#b87333', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' } }, attrs.eyebrow || 'Notre équipe'),
        el('p', { style: { fontWeight: 700, fontSize: '1.2rem', color: '#0d1b2a', margin: '0 0 16px' } }, attrs.heading || 'L’équipe'),
        el('p', { style: { color: '#888', fontSize: '0.85rem', margin: 0 } }, members.length + ' membre(s) — rendu côté serveur')
      );
    },
    save: function () { return null; }
  });
})();
