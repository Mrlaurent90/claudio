(function (blocks, element, blockEditor, components) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var MediaUpload = blockEditor.MediaUpload;
    var MediaUploadCheck = blockEditor.MediaUploadCheck;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var TextareaControl = components.TextareaControl;
    var Button = components.Button;

    blocks.registerBlockType('ladb/equipe', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, { title: 'Texte', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            value: attributes.sectionEyebrow,
                            onChange: function (val) { setAttributes({ sectionEyebrow: val }); }
                        }),
                        el(TextControl, {
                            label: 'Titre',
                            value: attributes.sectionTitle,
                            onChange: function (val) { setAttributes({ sectionTitle: val }); }
                        }),
                        el(TextareaControl, {
                            label: 'Paragraphe 1',
                            value: attributes.para1,
                            onChange: function (val) { setAttributes({ para1: val }); }
                        }),
                        el(TextareaControl, {
                            label: 'Paragraphe 2',
                            value: attributes.para2,
                            onChange: function (val) { setAttributes({ para2: val }); }
                        })
                    ),
                    el(PanelBody, { title: 'Photo équipe', initialOpen: false },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function (media) {
                                    setAttributes({
                                        photoId: media.id,
                                        photoUrl: media.url,
                                        photoAlt: media.alt || ''
                                    });
                                },
                                allowedTypes: ['image'],
                                value: attributes.photoId,
                                render: function (obj) {
                                    return el(Button, {
                                        onClick: obj.open,
                                        variant: attributes.photoId ? 'secondary' : 'primary'
                                    }, attributes.photoId ? 'Changer la photo' : 'Choisir une photo');
                                }
                            })
                        ),
                        attributes.photoUrl
                            ? el('div', { style: { marginTop: '8px' } },
                                el('img', { src: attributes.photoUrl, style: { maxWidth: '100%', borderRadius: '8px' } }),
                                el(Button, {
                                    onClick: function () { setAttributes({ photoId: 0, photoUrl: '', photoAlt: '' }); },
                                    variant: 'link',
                                    isDestructive: true,
                                    style: { display: 'block', marginTop: '4px' }
                                }, 'Supprimer la photo')
                              )
                            : null
                    )
                ),
                el('div', { key: 'preview', style: { padding: '16px', background: '#1a1a1a', borderRadius: '8px' } },
                    el('p', { style: { color: '#d9a066', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' } }, attributes.sectionEyebrow || "L'équipe"),
                    el('h2', { style: { color: '#fff', margin: '0 0 12px', fontSize: '22px' } }, attributes.sectionTitle || "L'équipe derrière les Alchimistes"),
                    attributes.para1 ? el('p', { style: { color: '#aaa', margin: '0 0 8px', fontSize: '14px' } }, attributes.para1) : null,
                    attributes.para2 ? el('p', { style: { color: '#aaa', margin: '0', fontSize: '14px' } }, attributes.para2) : null,
                    attributes.photoUrl
                        ? el('img', { src: attributes.photoUrl, alt: attributes.photoAlt, style: { maxWidth: '200px', marginTop: '12px', borderRadius: '8px' } })
                        : el('p', { style: { color: '#666', fontSize: '12px', fontStyle: 'italic', marginTop: '12px' } }, '[Motif hexagonal décoratif — visible côté public]')
                )
            ];
        }
    });
}(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components));