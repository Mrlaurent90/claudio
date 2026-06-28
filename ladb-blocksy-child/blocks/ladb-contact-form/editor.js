(function () {
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps     = wp.blockEditor.useBlockProps;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var MediaUpload       = wp.blockEditor.MediaUpload;
  var MediaUploadCheck  = wp.blockEditor.MediaUploadCheck;
  var PanelBody         = wp.components.PanelBody;
  var TextControl       = wp.components.TextControl;
  var TextareaControl   = wp.components.TextareaControl;
  var RangeControl      = wp.components.RangeControl;
  var Button            = wp.components.Button;

  registerBlockType('ladb/contact-form', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#0B1A33', padding: '24px', borderRadius: '8px', color: '#fff' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'En-tête section', initialOpen: true },
            el(TextControl, { label: 'Eyebrow', value: attrs.sectionEyebrow, onChange: function(v){ set({ sectionEyebrow: v }); } }),
            el(TextControl, { label: 'Titre H2', value: attrs.sectionTitle, onChange: function(v){ set({ sectionTitle: v }); } }),
            el(TextareaControl, { label: 'Intro', value: attrs.sectionIntro, onChange: function(v){ set({ sectionIntro: v }); } })
          ),
          el(PanelBody, { title: 'Formulaire Contact Form 7', initialOpen: true },
            el('p', { style: { fontSize: '12px', color: '#A9B5CB', margin: '0 0 8px' } },
              'Admin WP → Contact → Forms → notez l\'ID du formulaire.'
            ),
            el(TextControl, {
              label: 'ID du formulaire CF7',
              type: 'number',
              value: attrs.cf7FormId ? String(attrs.cf7FormId) : '',
              onChange: function(v){ set({ cf7FormId: parseInt(v, 10) || 0 }); }
            }),
            el(TextControl, { label: 'Texte légal (sous le formulaire)', value: attrs.legalText, onChange: function(v){ set({ legalText: v }); } })
          ),
          el(PanelBody, { title: 'Carte téléphone', initialOpen: false },
            el(TextControl, { label: 'Numéro (chiffres)', value: attrs.phoneNumber, onChange: function(v){ set({ phoneNumber: v }); } }),
            el(TextControl, { label: 'Numéro affiché', value: attrs.phoneDisplay, onChange: function(v){ set({ phoneDisplay: v }); } }),
            el(TextareaControl, { label: 'Description', value: attrs.phoneDesc, onChange: function(v){ set({ phoneDesc: v }); } }),
            el(TextControl, { label: 'Statut disponibilité', value: attrs.availabilityText, onChange: function(v){ set({ availabilityText: v }); } })
          ),
          el(PanelBody, { title: 'Carte zones d\'intervention', initialOpen: false },
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(m){ set({ mapImageId: m.id, mapImageUrl: m.url }); },
                allowedTypes: ['image'], value: attrs.mapImageId,
                render: function(ref) {
                  return el(Button, { onClick: ref.open, variant: 'secondary' }, attrs.mapImageUrl ? 'Changer la carte' : 'Image de la carte');
                }
              })
            ),
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(m){ set({ mapInsetId: m.id, mapInsetUrl: m.url }); },
                allowedTypes: ['image'], value: attrs.mapInsetId,
                render: function(ref) {
                  return el(Button, { onClick: ref.open, variant: 'secondary', style: { marginTop: '8px' } }, attrs.mapInsetUrl ? 'Changer la photo incrustée' : 'Photo incrustée (polaroid)');
                }
              })
            ),
            el(TextControl, { label: 'Légende photo incrustée', value: attrs.mapInsetCaption, onChange: function(v){ set({ mapInsetCaption: v }); } }),
            el(TextareaControl, { label: 'Villes (séparées par des virgules)', value: attrs.mapZonesText, onChange: function(v){ set({ mapZonesText: v }); } })
          ),
          el(PanelBody, { title: 'Blog teaser', initialOpen: false },
            el(TextControl, { label: 'Eyebrow', value: attrs.blogEyebrow, onChange: function(v){ set({ blogEyebrow: v }); } }),
            el(TextControl, { label: 'Titre', value: attrs.blogTitle, onChange: function(v){ set({ blogTitle: v }); } }),
            el(TextareaControl, { label: 'Introduction', value: attrs.blogIntro, onChange: function(v){ set({ blogIntro: v }); } }),
            el(TextControl, { label: 'Catégorie (slug)', value: attrs.blogCategory, onChange: function(v){ set({ blogCategory: v }); } }),
            el(RangeControl, {
              label: 'Nombre d\'articles',
              value: attrs.blogCount, min: 1, max: 8,
              onChange: function(v){ set({ blogCount: v }); }
            }),
            el(TextControl, { label: 'URL "Voir tous les articles"', value: attrs.blogAllUrl, onChange: function(v){ set({ blogAllUrl: v }); } })
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Section Contact LADB (formulaire + map + blog)'),
          el('p', { style: { color: '#fff', fontWeight: '700', margin: '0 0 8px' } }, attrs.sectionTitle),
          el('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' } },
            el('div', { style: { background: '#161B24', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#A9B5CB' } },
              attrs.cf7FormId > 0
                ? '✓ CF7 ID: ' + attrs.cf7FormId
                : '⚠ CF7 ID manquant →'
            ),
            el('div', { style: { background: '#14233F', border: '1px solid rgba(255,255,255,.18)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#D9A066', fontWeight: '700' } }, '📞 ' + attrs.phoneDisplay),
            el('div', { style: { background: '#161B24', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#A9B5CB' } }, attrs.blogCount + ' articles blog')
          )
        )
      );
    },
    save: function () { return null; }
  });
})();
