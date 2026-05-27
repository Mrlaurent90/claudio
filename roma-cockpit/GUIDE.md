# GUIDE — Roma Cockpit (architecture & enseignement)

Document d'apprentissage pour comprendre l'appli et la faire évoluer.
Pour l'état d'avancement, les tâches en cours et la méthode de travail, voir **HANDOFF.md**.

---

## 1. C'est quoi cette appli ?

Un "cockpit" de voyage mobile-first pour un séjour à **Rome (31 mai → 4 juin 2026)** :
planning jour par jour, carte interactive des lieux, décisions à trancher, réservations,
budget, checklist, etc. Conçue pour être consultée sur téléphone pendant le voyage.

- **Thème** : sombre, premium, chaleureux (tons terracotta/or/olive). Contenu **en français**.
- **Mono-voyage** : tout le contenu vit dans un seul fichier de données (voir §4).
- **URL** : `/{tripId}` — ex. `/roma-31mai-7f3k9`. Le `tripId` non devinable sert d'identifiant
  d'URL et de clé Supabase.

## 2. Stack technique

| Élément | Choix |
|---|---|
| Framework | **Next.js 15** (App Router), **React 19** |
| Langage | TypeScript |
| Style | Tailwind (classes utilitaires) + styles inline pour les cas dynamiques |
| Carte | **Leaflet** (tuiles CARTO dark), importé en dynamique `ssr:false` |
| Animations | framer-motion |
| Persistance | **Supabase** (optionnel) + miroir `localStorage` |
| PWA | service worker dans `public/` (installable, offline) |

## 3. Carte des fichiers

```
app/
  layout.tsx            Layout racine + métadonnées PWA
  page.tsx              Redirige "/" vers "/{tripId}"
  [tripId]/page.tsx     Vérifie le tripId puis rend <CockpitApp/>
  globals.css           Thème (variables CSS couleurs : ink, clay, gold, olive…)

components/
  CockpitApp.tsx        SHELL principal : état global, scroll-spy, nav. Compose toutes les sections.
  Header.tsx            En-tête + progression du séjour
  now/NowCard.tsx       "En ce moment" (calcule l'étape courante pendant le voyage)
  planning/Planning.tsx Section Planning : cartes d'étapes (StepCard) + photo héros (StepHero)
  map/TripMap.tsx       Section Carte : Leaflet, marqueurs, trajets, filtres, recentrage
  decisions/Decisions.tsx  "Ce qu'il reste à décider" (option A/B, choix synchronisé)
  resas/Resas.tsx       Réservations + statuts (ST_META)
  budget/Budget.tsx     Budget cible + lignes
  premium/Premium.tsx   Idées premium / insolites
  checklist/Checklist.tsx  Checklist cochable (synchronisée)
  alerts/Alerts.tsx     Rappels/avertissements globaux
  nav/BottomNav.tsx     Barre de navigation basse (ancres de section)
  ui/SectionHead.tsx    Titre de section réutilisable

lib/
  types.ts     TOUTES les interfaces du domaine (TravelData, Day, Step, Place, …)
  geo.ts       haversineKm, walkKm (≈ +détour), walkMinutes, fmtDist
  now.ts       computeNow() : où on en est dans le séjour à l'instant T
  links.ts     PLACE_QUERIES → googleMapsFiche() ; uberLink()
  supabase.ts  Client Supabase (null si non configuré → mode local)
  sync.ts      useTripSync() : charge/sauve l'état dynamique (local + Supabase realtime)

data/
  travelData.ts  SOURCE UNIQUE DE VÉRITÉ (tout le contenu + la table PHOTO)

public/           Icônes PWA, manifest, service worker, + assets images locaux
```

## 4. Le modèle de données (le cœur)

Tout part de **`data/travelData.ts`**, typé par `TravelData` (`lib/types.ts`). Modifier ce
fichier suffit à mettre à jour toute l'appli. Structure :

- `tripId`, `meta` (titre, dates, logement, start/end ISO)
- `categories` : `Record<CategoryKey, {label, color, emo}>` — **la palette officielle**.
  Clés : `payant, exterieur, fontaine, statue, chill, pano, food, bar, transport`.
- `days[]` : chaque `Day` a `moments[]` (Matin/Après-midi/Soirée…), chaque `Moment` a `steps[]`.
  Un `Step` = `{ t, cat, title, desc, logi?, fixed?, badges?, img? }`.
- `places[]` : marqueurs de la carte. `Place` = `{ n, cat, day, lat, lng, info, t?, img?, home? }`.
  `home: true` = le logement (toujours affiché, point de départ des trajets).
- `decisions[]`, `resas[]`, `budget`, `premium[]`, `checklist`, `alerts[]`.

> ⚠️ **Planning ≠ Carte.** Les `steps` (planning) et les `places` (carte) sont deux listes
> distinctes. Un même lieu peut être un step ET un place (souvent), mais la carte peut être
> plus granulaire (ex. les statues individuelles) et certains steps n'ont pas de place.
> Quand tu ajoutes un lieu visible partout, pense aux **deux** listes.

### État statique vs dynamique
- **Statique** (itinéraire, lieux, budget…) : vit dans `travelData.ts`, jamais synchronisé.
- **Dynamique** (cases cochées, statut des résas, choix des décisions) : géré par `useTripSync`,
  stocké dans `localStorage` et, si configuré, dans Supabase (table `trip_state`, realtime).
  Voir `SyncState` dans `types.ts`. Sans variables d'env Supabase, l'appli marche en local-only.

## 5. Le système de PHOTOS (important)

Objectif : **chaque lieu a un visuel**, sans photo hors-sujet ni image cassée.

- En haut de `travelData.ts` : un helper `wiki(file)` qui construit une URL Wikimedia
  `Special:FilePath/<file>?width=1000`, et une **table `PHOTO`** (slug → URL). C'est la **source
  unique** : on change une URL ici et le planning ET la carte se mettent à jour.
- Les `Step.img` et `Place.img` référencent `PHOTO.<slug>` (ex. `img: PHOTO.trevi`).
- **Repli en cascade** (dans `StepHero` côté planning, et dans `popupHtml`/home côté carte) :
  1. si `img` présent et charge → photo + dégradé sombre ;
  2. sinon (pas d'`img` OU image en erreur `onError`) → **aplat de la couleur de la catégorie +
     emoji**. Donc une étape "générique" (repas, transfert, balade) ou une URL cassée affiche
     proprement un aplat, jamais un trou.
- **Photo locale** : pour le logement, `PHOTO.airbnb = "/airbnb-terrasse.jpg"` pointe vers
  `public/airbnb-terrasse.jpg`. Déposer une image à ce chemin suffit.

### Ajouter/corriger une photo
1. Trouver le **vrai nom de fichier** sur Wikimedia Commons (page du fichier → "Nom du fichier").
2. Ajouter/éditer une entrée dans `PHOTO` : `monSlug: wiki("Nom_Exact_Du_Fichier.jpg")`.
   (les espaces deviennent `_`, encoder les caractères spéciaux : `'` → `%27`, `à` → `%C3%A0`).
3. Référencer `img: PHOTO.monSlug` dans le step et/ou le place concerné.

## 6. La CARTE (`components/map/TripMap.tsx`)

- Leaflet chargé en dynamique (`ssr:false`) car il touche `window`.
- **Marqueurs numérotés** : `stopIcon(fill, ring, n)` → remplissage = **couleur de la catégorie**,
  anneau = **couleur du jour** (`DAY_COLORS`), numéro en noir/blanc choisi par **luminance**
  (`numColor`) pour rester lisible.
- **Ordre des numéros** : `visibleStops(day)` filtre par jour + catégories actives puis **trie par
  heure `t`** → la numérotation et le tracé suivent la chronologie réelle.
- **Trajets** : une polyline pointillée par jour, partant du logement.
- **Filtres catégories** : sous la carte, réutilisent les couleurs/emoji de `categories`.
- **Pas de saut de page** : les boutons J1–J5 de la carte ne pilotent QUE l'état local de la carte
  (ils n'appellent pas `setActiveDay` du parent), sinon le Planning au-dessus se re-rendrait et
  ferait "sauter" la page. La synchro Planning → carte (clic sur un jour du planning) marche
  toujours via la prop `activeDay`.
- **Mouvement minimal** : changer de jour/catégorie redessine SANS recentrer (`draw(false)`).
  Le **bouton "🎯 Recentrer"** (overlay bas-droite) recadre l'itinéraire à la demande. Le fit
  initial se fait une fois au montage.
- **Badge jour** : overlay en haut, à la couleur du jour.

## 7. Liens externes (`lib/links.ts`)

- `PLACE_QUERIES` : table `nom affiché (step.title ou place.n) → nom officiel italien`.
  `googleMapsFiche(label)` renvoie une URL `maps/search` qui tombe direct sur la fiche
  (horaires, avis). Un libellé absent de la table = pas de bouton (c'est ainsi que les étapes
  génériques comme "Dîner simple" n'ont pas de lien).
- `uberLink(dropoff?)` : lien universel qui ouvre l'appli Uber (pickup = position actuelle),
  avec destination pré-remplie si on lui passe `{lat,lng,name}`. Utilisé sur les étapes et
  popups de catégorie `transport`.

## 8. Conventions & style

- **Contenu en français**, ton concret et chaleureux.
- **Palette = `categories` + `DAY_COLORS`** : ne pas inventer de nouvelles couleurs, réutiliser.
- Composants `"use client"` quand ils ont de l'état/interaction.
- Préférer **éditer `travelData.ts`** pour tout changement de contenu.
- Toujours faire passer `npm run build` (il lance ESLint) avant de pousser.

## 9. Recettes (how-to)

**Ajouter un lieu visible partout :**
1. `data/travelData.ts` → ajouter un `Step` dans le bon `Day/Moment` (avec `cat`, `t`, `img?`).
2. Ajouter le `Place` correspondant dans `places[]` (mêmes `cat`/`t`, + `lat`/`lng`).
3. Si photo : ajouter le slug dans `PHOTO` et référencer `img: PHOTO.x`.
4. Si lieu identifiable : ajouter une entrée dans `PLACE_QUERIES` (`lib/links.ts`) pour le bouton
   Google Maps.

**Ajouter une décision ("à valider") :** pousser un objet dans `decisions[]`
(`{id, title, urg: "hi"|"mid"|"lo", a, b, reco, impact[]}`).

**Acter/retirer une réservation :** éditer `resas[]` (statuts : `resa` Réservé, `todo` À réserver,
`conf` À confirmer, `opt` Optionnel — voir `ST_META` dans `Resas.tsx`).

**Changer une couleur/emoji de catégorie :** une seule édition dans `categories` se propage partout.
