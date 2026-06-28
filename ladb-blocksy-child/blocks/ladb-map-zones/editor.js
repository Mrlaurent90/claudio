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

  registerBlockType('ladb/map-zones', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#0B1A33', padding: '24px', borderRadius: '8px', color: '#fff' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'Titre de la carte', initialOpen: true },
            el(TextControl, { label: 'Ville principale', value: attrs.cardTitle, onChange: function(v){ set({ cardTitle: v }); } }),
            el(TextControl, { label: 'Rayon (ex: + 30 km)', value: attrs.cardSubtitle, onChange: function(v){ set({ cardSubtitle: v }); } }),
            el(TextControl, { label: 'Libellé du pin', value: attrs.pinLabel, onChange: function(v){ set({ pinLabel: v }); } }),
            el(TextControl, { label: 'Texte légende', value: attrs.legendText, onChange: function(v){ set({ legendText: v }); } })
          ),
          el(PanelBody, { title: 'Images', initialOpen: false },
            el('p', { style: { fontSize: '12px', color: '#A9B5CB' } }, 'Image de la carte (ex: carte-metropole.jpg)'),
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(m){ set({ mapImageId: m.id, mapImageUrl: m.url }); },
                allowedTypes: ['image'], value: attrs.mapImageId,
                render: function(ref) {
                  return el(Button, { onClick: ref.open, variant: 'secondary' }, attrs.mapImageUrl ? 'Changer la carte' : 'Choisir la carte');
                }
              })
            ),
            el('p', { style: { fontSize: '12px', color: '#A9B5CB', marginTop: '12px' } }, 'Photo incrustée (polaroid)'),
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(m){ set({ insetImageId: m.id, insetImageUrl: m.url }); },
                allowedTypes: ['image'], value: attrs.insetImageId,
                render: function(ref) {
                  return el(Button, { onClick: ref.open, variant: 'secondary' }, attrs.insetImageUrl ? 'Changer la photo' : 'Choisir la photo incrustée');
                }
              })
            ),
            el(TextControl, { label: 'Légende photo incrustée', value: attrs.insetCaption, onChange: function(v){ set({ insetCaption: v }); } })
          ),
          el(PanelBody, { title: 'Zones (chips)', initialOpen: false },
            el(TextareaControl, { label: 'Villes séparées par des virgules', value: attrs.zonesText, onChange: function(v){ set({ zonesText: v }); } })
          ),
          el(PanelBody, { title: 'Liens services', initialOpen: false },
            el(TextControl, { label: 'Service 1 — libellé', value: attrs.service1Label, onChange: function(v){ set({ service1Label: v }); } }),
            el(TextControl, { label: 'Service 1 — URL', value: attrs.service1Href, onChange: function(v){ set({ service1Href: v }); } }),
            el(TextControl, { label: 'Service 2 — libellé', value: attrs.service2Label, onChange: function(v){ set({ service2Label: v }); } }),
            el(TextControl, { label: 'Service 2 — URL', value: attrs.service2Href, onChange: function(v){ set({ service2Href: v }); } }),
            el(TextControl, { label: 'Service 3 — libellé', value: attrs.service3Label, onChange: function(v){ set({ service3Label: v }); } }),
            el(TextControl, { label: 'Service 3 — URL', value: attrs.service3Href, onChange: function(v){ set({ service3Href: v }); } })
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc Carte des zones LADB'),
          el('p', { style: { color: '#fff', fontWeight: '700', margin: '0 0 8px' } }, attrs.cardTitle + ' ' + attrs.cardSubtitle),
          el('p', { style: { color: '#A9B5CB', fontSize: '12px', margin: 0 } }, (attrs.zonesText || '').split(',').filter(Boolean).length + ' zones configurées')
        )
      );
    },
    save: function () { return null; }
  });
})();
