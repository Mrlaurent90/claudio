(function () {
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps     = wp.blockEditor.useBlockProps;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var PanelBody         = wp.components.PanelBody;
  var TextControl       = wp.components.TextControl;

  registerBlockType('ladb/trust-strip', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#FAF8F4', padding: '18px 24px' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'Élément 1', initialOpen: true },
            el(TextControl, { label: 'Titre', value: attrs.item1Title, onChange: function(v){ set({ item1Title: v }); } }),
            el(TextControl, { label: 'Sous-titre', value: attrs.item1Sub, onChange: function(v){ set({ item1Sub: v }); } })
          ),
          el(PanelBody, { title: 'Élément 2', initialOpen: false },
            el(TextControl, { label: 'Titre', value: attrs.item2Title, onChange: function(v){ set({ item2Title: v }); } }),
            el(TextControl, { label: 'Sous-titre', value: attrs.item2Sub, onChange: function(v){ set({ item2Sub: v }); } })
          )
        ),
        el('div', { style: { display: 'flex', gap: '24px', alignItems: 'center' } },
          el('span', { style: { color: '#B87333', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Trust Strip LADB'),
          el('span', { style: { color: '#1A1F2E', fontWeight: '700' } }, attrs.item1Title + ' · ' + attrs.item2Title)
        )
      );
    },
    save: function () { return null; }
  });
})();
