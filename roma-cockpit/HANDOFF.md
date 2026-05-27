# HANDOFF — Roma Cockpit

À lire en premier pour reprendre le développement (nouvelle conversation / supervision Claude.ai).
Pour comprendre l'architecture en détail, voir **GUIDE.md**.

---

## 1. En une phrase

Cockpit de voyage mobile (Next.js 15 / React 19 / Leaflet) pour un séjour à Rome
(31 mai → 4 juin 2026). Tout le contenu vit dans `data/travelData.ts`. Appli dans le
sous-dossier **`roma-cockpit/`** du repo `Mrlaurent90/claudio`.

## 2. Où tester (déjà en place)

- **Vercel branché** sur `Mrlaurent90/claudio`, **Root Directory = `roma-cockpit`**.
- **Prod** (branche `main`) : `https://claudio-green-rho.vercel.app`
- **Preview** : chaque push sur une branche crée un déploiement de preview automatique.
- En local : `cd roma-cockpit && npm install && npm run dev` → `http://localhost:3000/roma-31mai-7f3k9`

## 3. Workflow de développement (à respecter)

1. **Brancher** : développer sur la branche `claude/rome-cockpit-maps-links-JbEC2`
   (créer la branche localement si besoin). Ne jamais pousser sur une autre branche sans accord.
2. **Construire** : `cd roma-cockpit && npm run build` (lance aussi ESLint) avant chaque push.
3. **Pousser** la branche → vérifier le rendu sur le **Preview Vercel**.
4. **Fusionner dans `main` uniquement après validation** explicite de Lolo. La fusion redéploie la prod.
5. Le proprio aime un **récap après chaque section** et valider avant le merge final.

## 4. Contraintes de l'environnement cloud (IMPORTANT)

L'agent tourne dans un conteneur éphémère **sans accès réseau libre** :
- **Wikimedia est bloqué (HTTP 403)** → impossible de **vérifier les noms de fichiers photos**
  depuis le conteneur. La vérif se fait **visuellement sur le Preview Vercel** (les images se
  chargent dans le navigateur du client, pas dans le conteneur).
- **Pas de navigateur** dans le conteneur → pas de capture d'écran possible côté agent.
- **API Vercel bloquée** → l'agent ne peut pas déployer lui-même ; c'est le compte Vercel de Lolo
  (déjà connecté) qui déploie automatiquement au push.

➡️ Conséquence pratique : toute vérif "est-ce que ça s'affiche / est-ce la bonne image" passe par
**Lolo qui regarde le Preview** et renvoie les points à corriger.

## 5. Ce qui a été fait (historique des lots)

- **Lot A** — Liens "fiche Google Maps" par lieu (carte + planning), via noms officiels italiens.
- **Lot B** — Nouveaux lieux (San Clemente, Pyramide de Cestius, Cimetière protestant, Fontana
  dell'Acqua Paola, marqueur Fontana del Pantheon), option "rooftop sunset".
- **Lot C** — Nettoyage carte : suppression des pastilles "~X min", badge jour en overlay,
  compteur + légende déplacés sous la carte, carte agrandie.
- **Lot D** — Une **photo ou un aplat catégorie pour chaque lieu** : table `PHOTO` centralisée,
  repli `StepHero`, vignettes dans les popups carte.
- **Lot E** — (mergé) :
  - *Contenu* : Galleria Borghese **retirée partout** (sold-out) en gardant **Villa Borghese (parc)** ;
    dîner tonton **acté mercredi soir** (fixe, résa "Réservé", décision retirée) ;
    fontaines **Triton + Api** ajoutées (J1 soir) ; 6 statues parlantes vérifiées.
  - *UX carte* : plus de saut de page au changement de jour (découplage carte/planning) ;
    **numérotation strictement chronologique** ; plus de recentrage auto + **bouton "Recentrer"**.
  - *Marqueurs* : couleur par catégorie + **numéro lisible** (noir/blanc selon contraste).
  - *Photos* : photos des 3 statues restantes ; **hook photo logement** (`/airbnb-terrasse.jpg`).
  - *Transport* : liens **"Ouvrir Uber"** sur les étapes/popups transport ; décisions **MTP** (aller
    à l'aéroport de Montpellier) et **FCO → Airbnb** (arrivée).

État git au moment du handoff : `main` contient les lots A→E. Branche de dev =
`claude/rome-cockpit-maps-links-JbEC2`.

## 6. À FAIRE / en suspens

1. **Vérif photos (prioritaire)** — Les noms de fichiers Wikimedia ajoutés aux lots D/E sont des
   **paris non vérifiés** (réseau bloqué). Sur le Preview, repérer les lieux qui s'affichent en
   **aplat de couleur** (= fichier introuvable) et corriger le slug dans la table `PHOTO`
   (`data/travelData.ts`). Les plus à risque : Pasquino, Ponte Sant'Angelo, San Clemente,
   Palazzo Spada, Tortues, Babuino, Marforio, Basilique St-Pierre, Pincio, Jardin des Orangers,
   Pyramide, Cimetière, Acqua Paola, Triton, Api, et les 3 statues (Madama Lucrezia, Abate Luigi,
   Il Facchino).
2. **Photo Airbnb** — déposer l'image réelle dans `roma-cockpit/public/airbnb-terrasse.jpg`
   (puis push). En attendant : aplat doré, jamais cassé.
3. **Idées d'amélioration ouvertes** : faire ressortir davantage la couleur catégorie des marqueurs
   si souhaité ; affiner les comportements de recentrage ; enrichir les fiches.

## 7. Pour superviser depuis Claude.ai (mode d'emploi)

Donner ce contexte à la nouvelle conversation :
- **Repo** `Mrlaurent90/claudio`, appli dans `roma-cockpit/`. Lire `GUIDE.md` puis `HANDOFF.md`.
- **Brancher** sur `claude/rome-cockpit-maps-links-JbEC2`, builder (`npm run build`), pousser,
  tester sur le Preview Vercel, **merge `main` après validation seulement**.
- **Contraintes** : Wikimedia/navigateur/API Vercel bloqués dans le conteneur → vérif visuelle via
  le Preview, par l'humain.
- **Source unique de contenu** : `data/travelData.ts` (+ table `PHOTO`). Réutiliser la palette
  `categories`, écrire en français, garder le thème sombre premium.
- **Méthode attendue** : pour les tâches multi-volets, procéder par sections, faire un **récap après
  chaque section**, lister avant d'ajouter (ex. lieux/fontaines), et ne fusionner qu'après accord.

### Prompt de démarrage suggéré (à coller)
> Tu reprends le développement de l'appli "Roma Cockpit" (Next.js, dossier `roma-cockpit/` du repo
> `Mrlaurent90/claudio`). Lis d'abord `roma-cockpit/GUIDE.md` et `roma-cockpit/HANDOFF.md`. Développe
> sur la branche `claude/rome-cockpit-maps-links-JbEC2`, fais `npm run build` avant de pousser, et ne
> fusionne dans `main` qu'après ma validation (je teste sur le Preview Vercel). Tout le contenu est
> dans `data/travelData.ts`. Voici ma demande : …
