# LADB Blocksy Child — Guide d'installation

Thème enfant Blocksy pour **Les Alchimistes du Bâtiment** (LADB) — artisan vitrier, serrurier, miroitier à Montpellier.

---

## Prérequis

- WordPress **6.9.x**
- Thème parent **Blocksy** installé et activé (téléchargeable sur wordpress.org/themes/blocksy)
- Plugin **Contact Form 7** installé et activé

---

## Installation du thème

1. Compressez le dossier `ladb-blocksy-child/` en `.zip`
2. **Admin WP → Apparence → Thèmes → Ajouter → Téléverser un thème**
3. Choisissez le `.zip` → Installer → **Activer**

> ⚠ Si Blocksy n'est pas encore installé, installez-le d'abord (Admin → Apparence → Thèmes → Ajouter → rechercher "Blocksy").

---

## Configuration de la page d'accueil

### 1. Créer la page d'accueil

1. **Admin → Pages → Ajouter**
2. Titre : `Accueil`
3. Template : `Page d'accueil` (ou "Default")
4. Publiez la page

### 2. Définir la page statique

1. **Admin → Réglages → Lecture**
2. Cochez "Une page statique"
3. Page d'accueil : sélectionnez "Accueil"
4. Enregistrez

### 3. Ajouter les blocs sur la page d'accueil

Éditez la page "Accueil" avec Gutenberg et ajoutez les blocs dans cet ordre :

| # | Bloc | Description |
|---|------|-------------|
| 1 | **LADB Hero** | Titre principal, photo artisan, CTAs, stats |
| 2 | **LADB Trust Strip** | Bandeau crème — devis gratuit + zone |
| 3 | **LADB Services** | 3 cartes vitrerie / serrurerie / miroiterie |
| 4 | **LADB Comment ça marche** | 3 étapes avec fond photo |
| 5 | **LADB Avis Google** | 3 témoignages + score 5/5 |
| 6 | **LADB FAQ** | Accordéon FAQ avec fond photo |
| 7 | **LADB Section Contact** | Formulaire CF7 + carte zones + blog |
| 8 | **LADB Bannière photo** | Photo pleine largeur Peyrou |

Tous les blocs se trouvent dans la catégorie **LADB** du sélecteur de blocs.

---

## Configuration du formulaire Contact Form 7

### Créer le formulaire

1. **Admin → Contact → Add New**
2. Titre : `Devis LADB`
3. Copiez le contenu du champ `form_fields` depuis `cf7-import.json` dans l'onglet **Form**
4. Onglet **Mail** → configurez l'expéditeur et le destinataire : `contact@ladb.fr`
5. Enregistrez → notez le **numéro d'ID** affiché (ex : `123`)

### Brancher l'ID dans le bloc

1. Éditez la page d'accueil dans Gutenberg
2. Cliquez sur le bloc "**LADB Section Contact**"
3. Dans la colonne de droite → panneau **Formulaire Contact Form 7**
4. Collez l'ID du formulaire

---

## Configurer un plugin SMTP (obligatoire en production)

Sur o2switch mutualisé, les emails CF7 risquent d'aller en spam. Installez **WP Mail SMTP** ou **FluentSMTP** :

1. Admin → Extensions → Ajouter → installer WP Mail SMTP
2. Configurez avec votre compte OVH / Gmail / SMTP o2switch
3. Testez l'envoi avant la mise en ligne

---

## Ajouter les images

Pour chaque bloc, cliquez sur le bloc dans l'éditeur → colonne de droite → choisissez les images depuis la médiathèque.

| Bloc | Image recommandée |
|------|-------------------|
| Hero | `vitrier-montpellier.jpg` |
| Comment ça marche | `montpellier-bg.jpg` |
| FAQ | `vitre-cassee-bg.webp` |
| Section Contact → carte | `carte-metropole.jpg` |
| Section Contact → photo incrustée | `montpellier-comedie-nuit.jpg` |
| Bannière photo | `montpellier-peyrou.jpeg` |

Les images source sont dans `assets/images/`. Uploadez-les dans la médiathèque WordPress (Admin → Médias → Ajouter).

---

## Personnaliser l'en-tête (Blocksy Customizer)

1. **Admin → Apparence → Personnaliser**
2. **Header** :
   - Logo : uploadez `assets/images/logo-light.svg`
   - Couleur de fond : `#0B1A33` avec opacité 86%
   - Sticky header : activé
   - Téléphone visible sur desktop : `06 86 41 69 25`
3. **Colors** : Primary color → `#B87333`

---

## Pages de services (94 pages)

Pour les pages de services (`/service/vitrerie/`, etc.) :

1. Créez la page avec le template par défaut
2. Ajoutez les blocs appropriés :
   - **LADB Hero** (avec H1 spécifique à la page)
   - **LADB Services** (ou sous-ensemble)
   - **LADB FAQ** (questions spécifiques au service)
   - **LADB Section Contact** (même formulaire, sans le blog)
   - **LADB Bannière photo**

> Pour le SEO : H1 unique par page, pas "MONTPELLIER" seul en H1, title tag descriptif.

---

## Structure du thème

```
ladb-blocksy-child/
├── style.css              # Déclaration du thème enfant
├── functions.php          # Enqueue CSS/JS, include fichiers
├── theme.json             # Design tokens WP
├── front-page.php         # Template page d'accueil
├── footer.php             # Footer custom (override Blocksy)
├── README.md              # Ce guide
├── cf7-import.json        # Config formulaire CF7
├── assets/
│   ├── fonts/             # Bricolage Grotesque (local)
│   ├── css/
│   │   ├── global.css     # Tokens + tous les composants
│   │   └── mobile-cta.css # CTA mobile fixe
│   ├── js/
│   │   └── frontend.js    # FAQ accordion + smooth scroll
│   └── images/            # Images livrées avec le thème
├── inc/
│   ├── blocks.php         # Enregistrement des blocs
│   ├── schema.php         # JSON-LD LocalBusiness
│   ├── performance.php    # Optimisations CWV
│   └── mobile-cta.php     # Barre CTA mobile
└── blocks/
    ├── ladb-hero/
    ├── ladb-trust-strip/
    ├── ladb-services/
    ├── ladb-how-it-works/
    ├── ladb-reviews/
    ├── ladb-faq/
    ├── ladb-contact-form/  # Section contact complète
    ├── ladb-map-zones/     # Carte zones (standalone)
    ├── ladb-blog-teaser/   # Teaser blog dynamique
    └── ladb-photo-banner/  # Bannière pleine largeur
```

---

## Ce qui est inclus

- **10 blocs Gutenberg custom** avec champs éditables, sans page builder
- **Design system complet** : bleu nuit `#0B1A33`, cuivre `#B87333→#D9A066`, crème `#FAF8F4`
- **Fonts** : Bricolage Grotesque (local, variable) + Hanken Grotesk (Google Fonts)
- **Schema LocalBusiness** JSON-LD automatique sur toutes les pages
- **FAQ Schema** JSON-LD automatique depuis le bloc FAQ
- **Mobile CTA fixe** (Appeler + Devis gratuit) caché sur desktop
- **Performance** : font-display:swap, preload Bricolage, lazy-load images, DNS prefetch GFonts
- **Footer custom** : 4 colonnes, fond sombre, réseaux sociaux
- **Accordion FAQ** vanilla JS (~60 lignes, zéro jQuery)
- **Blog teaser dynamique** via WP_Query, catégorie configurable, fallback propre

---

## Support & maintenance

Pour toute modification de contenu, éditez les blocs directement dans Gutenberg — chaque champ est libellé clairement dans la colonne de droite.

Pour les modifications de design, éditez `assets/css/global.css`. Les variables CSS sont en début de fichier (section `:root`).
