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

  registerBlockType('ladb/photo-banner', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#060D1A', padding: '24px', borderRadius: '8px', color: '#fff', minHeight: '160px', position: 'relative', overflow: 'hidden' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'Photo', initialOpen: true },
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(m){ set({ photoId: m.id, photoUrl: m.url, photoAlt: m.alt || '' }); },
                allowedTypes: ['image'],
                value: attrs.photoId,
                render: function(ref) {
                  return el('div', null,
                    attrs.photoUrl && el('img', { src: attrs.photoUrl, style: { maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' } }),
                    el(Button, { onClick: ref.open, variant: 'secondary' }, attrs.photoUrl ? 'Changer la photo' : 'Choisir la photo'),
                    attrs.photoUrl && el(Button, { onClick: function(){ set({ photoId: 0, photoUrl: '' }); }, variant: 'link', isDestructive: true, style: { marginLeft: '8px' } }, 'Supprimer')
                  );
                }
              })
            ),
            el(TextControl, { label: 'Alt de la photo', value: attrs.photoAlt, onChange: function(v){ set({ photoAlt: v }); } }),
            el(TextControl, { label: 'Légende (en haut à gauche)', value: attrs.capLabel, onChange: function(v){ set({ capLabel: v }); } })
          ),
          el(PanelBody, { title: 'Texte', initialOpen: false },
            el(TextControl, { label: 'Début du titre', value: attrs.titleMain, onChange: function(v){ set({ titleMain: v }); } }),
            el(TextControl, { label: 'Mot accentué (cuivre)', value: attrs.titleAccent, onChange: function(v){ set({ titleAccent: v }); } }),
            el(TextControl, { label: 'Fin du titre', value: attrs.titleEnd, onChange: function(v){ set({ titleEnd: v }); } }),
            el(TextareaControl, { label: 'Sous-titre (droite)', value: attrs.subtitle, onChange: function(v){ set({ subtitle: v }); } })
          )
        ),
        el('div', { style: { position: 'relative', zIndex: 2 } },
          attrs.photoUrl && el('img', { src: attrs.photoUrl, alt: attrs.photoAlt, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: '.3', borderRadius: '8px' } }),
          el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px', position: 'relative', zIndex: 3 } },
            el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc Bannière Photo LADB'),
            el('p', { style: { color: '#fff', margin: '0', fontSize: '22px', fontWeight: '700' } },
              attrs.titleMain + ' ',
              el('em', { style: { color: '#D9A066' } }, attrs.titleAccent),
              el('br', null),
              attrs.titleEnd
            ),
            !attrs.photoUrl && el('p', { style: { color: 'rgba(217,160,102,.5)', fontSize: '12px', marginTop: '8px' } }, '↑ Choisir une photo dans la colonne de droite')
          )
        )
      );
    },
    save: function () { return null; }
  });
})();
