# LADB Blocksy Child — Guide d'installation

## Prérequis

- WordPress 6.9+
- Thème parent **Blocksy** installé et activé
- Plugin **Contact Form 7** installé
- PHP 7.4+ (migration vers 8.2 prévue)

## Installation

1. Uploader le dossier `ladb-blocksy-child/` dans `/wp-content/themes/`
2. Dans WP Admin → Apparence → Thèmes → activer **LADB Blocksy Child**
3. Créer une page d'accueil, lui assigner le template **Front Page**
4. Dans WP Admin → Réglages → Lecture → sélectionner la page en "Page d'accueil statique"

## Configuration Contact Form 7

1. Installer Contact Form 7
2. Créer un formulaire "Devis LADB" avec les champs : nom, téléphone, type d'intervention, message
3. Copier le shortcode `[contact-form-7 id="XX"]` dans l'attribut `cf7Shortcode` du bloc `ladb/contact-form`

## Polices

Les polices doivent être placées dans `assets/fonts/` :
- `BricolageGrotesque-Variable.woff2`
- `HankenGrotesk-Variable.woff2`

Sources gratuites : Google Fonts (télécharger la version variable).

## Blocs disponibles

| Slug | Section |
|------|---------|
| `ladb/hero` | Hero principal |
| `ladb/trust-strip` | Bande de réassurance |
| `ladb/services` | 3 métiers |
| `ladb/how-it-works` | Comment ça marche |
| `ladb/reviews` | Avis Google |
| `ladb/faq` | FAQ accordéon |
| `ladb/contact-form` | Formulaire devis |
| `ladb/zone-map` | Zone d'intervention |
| `ladb/blog-teaser` | 4 derniers articles |
| `ladb/photo-banner` | Photo plein cadre |

## Build

Les assets JS des blocs sont pré-compilés dans `blocks/[nom]/build/`. Pas besoin de Node.js en local.

Pour recompiler (si modifications des sources) :
```bash
npm install
npm run build
```
