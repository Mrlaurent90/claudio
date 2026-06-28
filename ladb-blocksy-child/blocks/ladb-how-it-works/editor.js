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
  var Button            = wp.components.Button;

  registerBlockType('ladb/how-it-works', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#0B1A33', padding: '24px', borderRadius: '8px', color: '#fff' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'En-tête section', initialOpen: true },
            el(TextControl, { label: 'Eyebrow', value: attrs.sectionEyebrow, onChange: function(v){ set({ sectionEyebrow: v }); } }),
            el(TextControl, { label: 'Titre H2', value: attrs.sectionTitle, onChange: function(v){ set({ sectionTitle: v }); } }),
            el(TextareaControl, { label: 'Introduction', value: attrs.sectionIntro, onChange: function(v){ set({ sectionIntro: v }); } })
          ),
          el(PanelBody, { title: 'Photo de fond', initialOpen: false },
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(media){ set({ bgPhotoId: media.id, bgPhotoUrl: media.url }); },
                allowedTypes: ['image'],
                value: attrs.bgPhotoId,
                render: function(ref) {
                  return el('div', null,
                    attrs.bgPhotoUrl && el('img', { src: attrs.bgPhotoUrl, style: { maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' } }),
                    el(Button, { onClick: ref.open, variant: 'secondary' }, attrs.bgPhotoUrl ? 'Changer' : 'Choisir une photo de fond')
                  );
                }
              })
            )
          ),
          el(PanelBody, { title: 'Étape 1', initialOpen: false },
            el(TextControl, { label: 'Numéro', value: attrs.step1N, onChange: function(v){ set({ step1N: v }); } }),
            el(TextControl, { label: 'Titre', value: attrs.step1Title, onChange: function(v){ set({ step1Title: v }); } }),
            el(TextareaControl, { label: 'Description', value: attrs.step1Desc, onChange: function(v){ set({ step1Desc: v }); } })
          ),
          el(PanelBody, { title: 'Étape 2', initialOpen: false },
            el(TextControl, { label: 'Numéro', value: attrs.step2N, onChange: function(v){ set({ step2N: v }); } }),
            el(TextControl, { label: 'Titre', value: attrs.step2Title, onChange: function(v){ set({ step2Title: v }); } }),
            el(TextareaControl, { label: 'Description', value: attrs.step2Desc, onChange: function(v){ set({ step2Desc: v }); } })
          ),
          el(PanelBody, { title: 'Étape 3', initialOpen: false },
            el(TextControl, { label: 'Numéro', value: attrs.step3N, onChange: function(v){ set({ step3N: v }); } }),
            el(TextControl, { label: 'Titre', value: attrs.step3Title, onChange: function(v){ set({ step3Title: v }); } }),
            el(TextareaControl, { label: 'Description', value: attrs.step3Desc, onChange: function(v){ set({ step3Desc: v }); } })
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc Comment ça marche'),
          el('p', { style: { color: '#fff', margin: '0 0 12px', fontWeight: '700' } }, attrs.sectionTitle),
          el('div', { style: { display: 'flex', gap: '12px' } },
            [attrs.step1Title, attrs.step2Title, attrs.step3Title].map(function(t, i) {
              return el('div', { key: i, style: { flex: 1, background: 'rgba(6,13,26,.8)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '8px', padding: '12px' } },
                el('div', { style: { color: '#D9A066', fontWeight: '800', fontSize: '24px' } }, ['01','02','03'][i]),
                el('div', { style: { color: '#fff', fontWeight: '700', marginTop: '4px', fontSize: '14px' } }, t)
              );
            })
          )
        )
      );
    },
    save: function () { return null; }
  });
})();
