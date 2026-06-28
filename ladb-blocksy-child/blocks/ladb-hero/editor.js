(function () {
  var el = wp.element.createElement;
  var __ = wp.i18n.__;
  var registerBlockType   = wp.blocks.registerBlockType;
  var useBlockProps       = wp.blockEditor.useBlockProps;
  var InspectorControls   = wp.blockEditor.InspectorControls;
  var MediaUpload         = wp.blockEditor.MediaUpload;
  var MediaUploadCheck    = wp.blockEditor.MediaUploadCheck;
  var PanelBody           = wp.components.PanelBody;
  var TextControl         = wp.components.TextControl;
  var TextareaControl     = wp.components.TextareaControl;
  var Button              = wp.components.Button;

  registerBlockType('ladb/hero', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#0B1A33', padding: '24px', borderRadius: '8px', color: '#fff' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'Titre & accroche', initialOpen: true },
            el(TextControl, { label: 'Kicker (ligne au-dessus du titre)', value: attrs.kicker, onChange: function(v){ set({ kicker: v }); } }),
            el(TextControl, { label: 'Ligne 1 du titre', value: attrs.headlineL1, onChange: function(v){ set({ headlineL1: v }); } }),
            el(TextControl, { label: 'Ligne 2 du titre (grande, cuivrée)', value: attrs.headlineL2, onChange: function(v){ set({ headlineL2: v }); } }),
            el(TextControl, { label: 'Ligne 3 du titre (italique clair)', value: attrs.headlineL3, onChange: function(v){ set({ headlineL3: v }); } }),
            el(TextareaControl, { label: 'Accroche (lede)', value: attrs.lede, onChange: function(v){ set({ lede: v }); } })
          ),
          el(PanelBody, { title: 'CTAs', initialOpen: false },
            el(TextControl, { label: 'Libellé bouton principal', value: attrs.ctaPrimaryLabel, onChange: function(v){ set({ ctaPrimaryLabel: v }); } }),
            el(TextControl, { label: 'URL bouton principal', value: attrs.ctaPrimaryUrl, onChange: function(v){ set({ ctaPrimaryUrl: v }); } }),
            el(TextControl, { label: 'Numéro de téléphone (chiffres)', value: attrs.ctaPhone, onChange: function(v){ set({ ctaPhone: v }); } }),
            el(TextControl, { label: 'Libellé bouton téléphone', value: attrs.ctaPhoneLabel, onChange: function(v){ set({ ctaPhoneLabel: v }); } })
          ),
          el(PanelBody, { title: 'Photo artisan', initialOpen: false },
            el(MediaUploadCheck, null,
              el(MediaUpload, {
                onSelect: function(media) { set({ photoId: media.id, photoUrl: media.url, photoAlt: media.alt || '' }); },
                allowedTypes: ['image'],
                value: attrs.photoId,
                render: function(ref) {
                  return el('div', null,
                    attrs.photoUrl && el('img', { src: attrs.photoUrl, alt: attrs.photoAlt, style: { maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' } }),
                    el(Button, { onClick: ref.open, variant: 'secondary', style: { marginBottom: '4px' } }, attrs.photoUrl ? 'Changer la photo' : 'Choisir une photo'),
                    attrs.photoUrl && el(Button, { onClick: function(){ set({ photoId: 0, photoUrl: '', photoAlt: '' }); }, variant: 'link', isDestructive: true }, 'Supprimer')
                  );
                }
              })
            ),
            el(TextControl, { label: 'Texte alternatif photo', value: attrs.photoAlt, onChange: function(v){ set({ photoAlt: v }); } })
          ),
          el(PanelBody, { title: 'Badge live & localisation', initialOpen: false },
            el(TextControl, { label: 'Badge disponibilité', value: attrs.liveBadge, onChange: function(v){ set({ liveBadge: v }); } }),
            el(TextControl, { label: 'Localisation', value: attrs.location, onChange: function(v){ set({ location: v }); } })
          ),
          el(PanelBody, { title: 'Marqueurs statistiques', initialOpen: false },
            el(TextControl, { label: 'Marqueur 1 — nombre', value: attrs.marker1N, onChange: function(v){ set({ marker1N: v }); } }),
            el(TextControl, { label: 'Marqueur 1 — libellé', value: attrs.marker1Label, onChange: function(v){ set({ marker1Label: v }); } }),
            el(TextControl, { label: 'Marqueur 2 — nombre', value: attrs.marker2N, onChange: function(v){ set({ marker2N: v }); } }),
            el(TextControl, { label: 'Marqueur 2 — libellé', value: attrs.marker2Label, onChange: function(v){ set({ marker2Label: v }); } }),
            el(TextControl, { label: 'Marqueur 3 — nombre', value: attrs.marker3N, onChange: function(v){ set({ marker3N: v }); } }),
            el(TextControl, { label: 'Marqueur 3 — libellé', value: attrs.marker3Label, onChange: function(v){ set({ marker3Label: v }); } })
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc Hero LADB'),
          el('h2', { style: { color: '#fff', margin: '0 0 8px', fontSize: '28px' } }, attrs.headlineL1 + ' ' + attrs.headlineL2),
          el('p', { style: { color: '#A9B5CB', margin: '0 0 8px', fontSize: '14px' } }, attrs.lede),
          attrs.photoUrl && el('img', { src: attrs.photoUrl, alt: attrs.photoAlt, style: { maxHeight: '120px', borderRadius: '6px', opacity: '.8' } }),
          !attrs.photoUrl && el('div', { style: { background: '#14233F', border: '1px dashed rgba(217,160,102,.4)', borderRadius: '8px', padding: '20px', textAlign: 'center', color: 'rgba(217,160,102,.6)', fontSize: '12px' } }, '↑ Ajouter la photo artisan dans la colonne de droite')
        )
      );
    },
    save: function () { return null; }
  });
})();
