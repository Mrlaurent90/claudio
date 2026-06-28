(function () {
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps     = wp.blockEditor.useBlockProps;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var PanelBody         = wp.components.PanelBody;
  var TextControl       = wp.components.TextControl;
  var TextareaControl   = wp.components.TextareaControl;

  registerBlockType('ladb/services', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#0B1A33', padding: '24px', borderRadius: '8px' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'En-tête section', initialOpen: true },
            el(TextControl, { label: 'Eyebrow', value: attrs.sectionEyebrow, onChange: function(v){ set({ sectionEyebrow: v }); } }),
            el(TextControl, { label: 'Titre H2', value: attrs.sectionTitle, onChange: function(v){ set({ sectionTitle: v }); } }),
            el(TextareaControl, { label: 'Introduction', value: attrs.sectionIntro, onChange: function(v){ set({ sectionIntro: v }); } })
          ),
          el(PanelBody, { title: 'Carte 1 — Vitrerie', initialOpen: false },
            el(TextControl, { label: 'Titre', value: attrs.card1Title, onChange: function(v){ set({ card1Title: v }); } }),
            el(TextareaControl, { label: 'Description', value: attrs.card1Desc, onChange: function(v){ set({ card1Desc: v }); } }),
            el(TextareaControl, { label: 'Liste (1 item par ligne)', value: attrs.card1Items, onChange: function(v){ set({ card1Items: v }); } }),
            el(TextControl, { label: 'Texte du lien', value: attrs.card1LinkText, onChange: function(v){ set({ card1LinkText: v }); } }),
            el(TextControl, { label: 'URL du lien', value: attrs.card1LinkHref, onChange: function(v){ set({ card1LinkHref: v }); } })
          ),
          el(PanelBody, { title: 'Carte 2 — Serrurerie', initialOpen: false },
            el(TextControl, { label: 'Titre', value: attrs.card2Title, onChange: function(v){ set({ card2Title: v }); } }),
            el(TextareaControl, { label: 'Description', value: attrs.card2Desc, onChange: function(v){ set({ card2Desc: v }); } }),
            el(TextareaControl, { label: 'Liste (1 item par ligne)', value: attrs.card2Items, onChange: function(v){ set({ card2Items: v }); } }),
            el(TextControl, { label: 'Texte du lien', value: attrs.card2LinkText, onChange: function(v){ set({ card2LinkText: v }); } }),
            el(TextControl, { label: 'URL du lien', value: attrs.card2LinkHref, onChange: function(v){ set({ card2LinkHref: v }); } })
          ),
          el(PanelBody, { title: 'Carte 3 — Miroiterie', initialOpen: false },
            el(TextControl, { label: 'Titre', value: attrs.card3Title, onChange: function(v){ set({ card3Title: v }); } }),
            el(TextareaControl, { label: 'Description', value: attrs.card3Desc, onChange: function(v){ set({ card3Desc: v }); } }),
            el(TextareaControl, { label: 'Liste (1 item par ligne)', value: attrs.card3Items, onChange: function(v){ set({ card3Items: v }); } }),
            el(TextControl, { label: 'Texte du lien', value: attrs.card3LinkText, onChange: function(v){ set({ card3LinkText: v }); } }),
            el(TextControl, { label: 'URL du lien', value: attrs.card3LinkHref, onChange: function(v){ set({ card3LinkHref: v }); } })
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc Services LADB'),
          el('p', { style: { color: '#fff', margin: '0 0 4px', fontWeight: '700' } }, attrs.sectionTitle),
          el('div', { style: { display: 'flex', gap: '12px', marginTop: '12px' } },
            ['card1Title', 'card2Title', 'card3Title'].map(function(key) {
              return el('div', { key: key, style: { flex: 1, background: '#161B24', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px', padding: '12px', color: '#D9A066', fontWeight: '700', fontSize: '14px' } }, attrs[key]);
            })
          )
        )
      );
    },
    save: function () { return null; }
  });
})();
