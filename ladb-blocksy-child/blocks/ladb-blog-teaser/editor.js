(function () {
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps     = wp.blockEditor.useBlockProps;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var PanelBody         = wp.components.PanelBody;
  var TextControl       = wp.components.TextControl;
  var TextareaControl   = wp.components.TextareaControl;
  var RangeControl      = wp.components.RangeControl;

  registerBlockType('ladb/blog-teaser', {
    edit: function (props) {
      var attrs = props.attributes;
      var set   = props.setAttributes;
      var bp    = useBlockProps({ style: { background: '#0B1A33', padding: '24px', borderRadius: '8px', color: '#fff' } });

      return el('div', bp,
        el(InspectorControls, null,
          el(PanelBody, { title: 'Contenu', initialOpen: true },
            el(TextControl, { label: 'Eyebrow', value: attrs.sectionEyebrow, onChange: function(v){ set({ sectionEyebrow: v }); } }),
            el(TextControl, { label: 'Titre H3', value: attrs.sectionTitle, onChange: function(v){ set({ sectionTitle: v }); } }),
            el(TextareaControl, { label: 'Introduction', value: attrs.sectionIntro, onChange: function(v){ set({ sectionIntro: v }); } })
          ),
          el(PanelBody, { title: 'Articles', initialOpen: true },
            el(TextControl, {
              label: 'Slug de catégorie (vide = tous)',
              value: attrs.categorySlug,
              help: 'Ex: vitrerie, serrurerie, miroiterie. Laissez vide pour tous les articles.',
              onChange: function(v){ set({ categorySlug: v }); }
            }),
            el(RangeControl, {
              label: 'Nombre d\'articles',
              value: attrs.postsCount,
              min: 1, max: 8,
              onChange: function(v){ set({ postsCount: v }); }
            }),
            el(TextControl, { label: 'URL "Voir tous les articles"', value: attrs.allPostsUrl, onChange: function(v){ set({ allPostsUrl: v }); } }),
            el(TextControl, { label: 'Libellé du lien', value: attrs.allPostsLabel, onChange: function(v){ set({ allPostsLabel: v }); } })
          )
        ),
        el('div', { style: { borderLeft: '3px solid #D9A066', paddingLeft: '12px' } },
          el('p', { style: { color: '#D9A066', fontWeight: '700', margin: '0 0 4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.4px' } }, '⬡ Bloc Blog Teaser LADB'),
          el('p', { style: { color: '#fff', fontWeight: '700', margin: '0 0 4px' } }, attrs.sectionTitle),
          el('p', { style: { color: '#A9B5CB', fontSize: '12px', margin: 0 } },
            attrs.postsCount + ' dernier' + (attrs.postsCount > 1 ? 's' : '') + ' article' + (attrs.postsCount > 1 ? 's' : '') +
            (attrs.categorySlug ? ' · catégorie : ' + attrs.categorySlug : ' · toutes catégories') +
            ' — rendu dynamique en front-end'
          )
        )
      );
    },
    save: function () { return null; }
  });
})();
