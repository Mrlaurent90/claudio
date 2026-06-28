(function () {
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps     = wp.blockEditor.useBlockProps;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var PanelBody         = wp.components.PanelBody;
  var TextControl       = wp.components.TextControl;
  var TextareaControl   = wp.components.TextareaControl;

  registerBlockType('ladb/reviews', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#0B1A33', padding: '24px', borderRadius: '8px', color: '#fff' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'En-tête section', initialOpen: true },
            el(TextControl, { label: 'Eyebrow', value: attrs.sectionEyebrow, onChange: function(v){ set({ sectionEyebrow: v }); } }),
            el(TextControl, { label: 'Titre H2', value: attrs.sectionTitle, onChange: function(v){ set({ sectionTitle: v }); } }),
            el(TextareaControl, { label: 'Introduction', value: attrs.sectionIntro, onChange: function(v){ set({ sectionIntro: v }); } }),
            el(TextControl, { label: 'Score global (ex: 5,0)', value: attrs.scoreValue, onChange: function(v){ set({ scoreValue: v }); } }),
            el(TextControl, { label: 'Nombre d\'avis', value: attrs.scoreCount, onChange: function(v){ set({ scoreCount: v }); } }),
            el(TextControl, { label: 'URL "Voir tous les avis"', value: attrs.allReviewsUrl, onChange: function(v){ set({ allReviewsUrl: v }); } })
          ),
          el(PanelBody, { title: 'Avis 1', initialOpen: false },
            el(TextControl, { label: 'Initiales', value: attrs.review1Initials, onChange: function(v){ set({ review1Initials: v }); } }),
            el(TextControl, { label: 'Nom', value: attrs.review1Name, onChange: function(v){ set({ review1Name: v }); } }),
            el(TextControl, { label: 'Date', value: attrs.review1When, onChange: function(v){ set({ review1When: v }); } }),
            el(TextControl, { label: 'Ville', value: attrs.review1Where, onChange: function(v){ set({ review1Where: v }); } }),
            el(TextControl, { label: 'Couleur avatar (hex)', value: attrs.review1AvBg, onChange: function(v){ set({ review1AvBg: v }); } }),
            el(TextareaControl, { label: 'Texte de l\'avis', value: attrs.review1Quote, onChange: function(v){ set({ review1Quote: v }); } })
          ),
          el(PanelBody, { title: 'Avis 2', initialOpen: false },
            el(TextControl, { label: 'Initiales', value: attrs.review2Initials, onChange: function(v){ set({ review2Initials: v }); } }),
            el(TextControl, { label: 'Nom', value: attrs.review2Name, onChange: function(v){ set({ review2Name: v }); } }),
            el(TextControl, { label: 'Date', value: attrs.review2When, onChange: function(v){ set({ review2When: v }); } }),
            el(TextControl, { label: 'Ville', value: attrs.review2Where, onChange: function(v){ set({ review2Where: v }); } }),
            el(TextControl, { label: 'Couleur avatar (hex)', value: attrs.review2AvBg, onChange: function(v){ set({ review2AvBg: v }); } }),
            el(TextareaControl, { label: 'Texte de l\'avis', value: attrs.review2Quote, onChange: function(v){ set({ review2Quote: v }); } })
          ),
          el(PanelBody, { title: 'Avis 3', initialOpen: false },
            el(TextControl, { label: 'Initiales', value: attrs.review3Initials, onChange: function(v){ set({ review3Initials: v }); } }),
            el(TextControl, { label: 'Nom', value: attrs.review3Name, onChange: function(v){ set({ review3Name: v }); } }),
            el(TextControl, { label: 'Date', value: attrs.review3When, onChange: function(v){ set({ review3When: v }); } }),
            el(TextControl, { label: 'Ville', value: attrs.review3Where, onChange: function(v){ set({ review3Where: v }); } }),
            el(TextControl, { label: 'Couleur avatar (hex)', value: attrs.review3AvBg, onChange: function(v){ set({ review3AvBg: v }); } }),
            el(TextareaControl, { label: 'Texte de l\'avis', value: attrs.review3Quote, onChange: function(v){ set({ review3Quote: v }); } })
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc Avis Google LADB'),
          el('p', { style: { color: '#fff', fontWeight: '700', margin: '0 0 12px' } }, attrs.sectionTitle),
          el('div', { style: { display: 'flex', gap: '12px' } },
            [
              { name: attrs.review1Name, quote: attrs.review1Quote },
              { name: attrs.review2Name, quote: attrs.review2Quote },
              { name: attrs.review3Name, quote: attrs.review3Quote }
            ].map(function(r, i) {
              return el('div', { key: i, style: { flex: 1, background: '#fff', borderRadius: '8px', padding: '12px', color: '#3C4043', fontSize: '12px' } },
                el('strong', { style: { display: 'block', marginBottom: '4px', color: '#202124' } }, r.name),
                el('span', null, (r.quote || '').substring(0, 80) + '…')
              );
            })
          )
        )
      );
    },
    save: function () { return null; }
  });
})();
