(function () {
  var el = wp.element.createElement;
  var useState          = wp.element.useState;
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps     = wp.blockEditor.useBlockProps;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var MediaUpload       = wp.blockEditor.MediaUpload;
  var MediaUploadCheck  = wp.blockEditor.MediaUploadCheck;
  var PanelBody         = wp.components.PanelBody;
  var TextControl       = wp.components.TextControl;
  var TextareaControl   = wp.components.TextareaControl;
  var Button            = wp.components.Button;

  registerBlockType('ladb/faq', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var items = attrs.faqItems || [];
      var bp    = useBlockProps({ style: { background: '#060D1A', padding: '24px', borderRadius: '8px', color: '#fff' } });

      function updateItem(idx, field, value) {
        var updated = items.map(function(item, i) {
          if (i !== idx) return item;
          var copy = Object.assign({}, item);
          copy[field] = value;
          return copy;
        });
        set({ faqItems: updated });
      }
      function addItem() {
        set({ faqItems: items.concat([{ q: '', a: '' }]) });
      }
      function removeItem(idx) {
        set({ faqItems: items.filter(function(_, i){ return i !== idx; }) });
      }

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'En-tête & fond', initialOpen: true },
            el(TextControl, { label: 'Eyebrow', value: attrs.sectionEyebrow, onChange: function(v){ set({ sectionEyebrow: v }); } }),
            el(TextControl, { label: 'Titre H2', value: attrs.sectionTitle, onChange: function(v){ set({ sectionTitle: v }); } }),
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(media){ set({ bgPhotoId: media.id, bgPhotoUrl: media.url }); },
                allowedTypes: ['image'],
                value: attrs.bgPhotoId,
                render: function(ref) {
                  return el(Button, { onClick: ref.open, variant: 'secondary' }, attrs.bgPhotoUrl ? 'Changer la photo de fond' : 'Photo de fond');
                }
              })
            )
          ),
          el(PanelBody, { title: 'Questions & réponses (' + items.length + ')', initialOpen: false },
            items.map(function(item, idx) {
              return el('div', { key: idx, style: { borderTop: idx > 0 ? '1px solid rgba(255,255,255,.1)' : 'none', paddingTop: idx > 0 ? '12px' : '0', marginBottom: '12px' } },
                el('strong', { style: { display: 'block', marginBottom: '6px', color: '#D9A066', fontSize: '12px' } }, 'Q' + (idx + 1)),
                el(TextControl, { label: 'Question', value: item.q, onChange: function(v){ updateItem(idx, 'q', v); } }),
                el(TextareaControl, { label: 'Réponse', value: item.a, onChange: function(v){ updateItem(idx, 'a', v); } }),
                el(Button, { onClick: function(){ removeItem(idx); }, variant: 'link', isDestructive: true, style: { fontSize: '11px' } }, 'Supprimer cette question')
              );
            }),
            el(Button, { onClick: addItem, variant: 'secondary', style: { marginTop: '8px' } }, '+ Ajouter une question')
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc FAQ LADB — ' + items.length + ' questions'),
          el('p', { style: { color: '#fff', fontWeight: '700', margin: '0 0 12px' } }, attrs.sectionTitle),
          el('div', null,
            items.slice(0, 3).map(function(item, i) {
              return el('div', { key: i, style: { background: 'rgba(6,13,26,.55)', border: '1px solid rgba(255,255,255,.13)', borderRadius: '8px', padding: '10px 14px', marginBottom: '6px', fontSize: '13px', color: '#E8EDF5' } }, item.q || '(question vide)');
            }),
            items.length > 3 && el('div', { style: { color: '#A9B5CB', fontSize: '12px', marginTop: '4px' } }, '+ ' + (items.length - 3) + ' autres questions')
          )
        )
      );
    },
    save: function () { return null; }
  });
})();
