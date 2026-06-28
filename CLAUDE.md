# CLAUDE.md - Regles du depot

Ce fichier cadre le travail de Claude (et de toute personne) sur ce depot.
A lire avant toute action.

## Nature du depot : MULTI-PROJETS

Ce depot contient PLUSIEURS projets independants a la racine :

- `ladb-blocksy-child/` : theme WordPress enfant Blocksy du projet LADB
  (Les Alchimistes du Batiment). C'est le projet actif ici.
- `roma-cockpit/` : autre projet, SANS rapport avec LADB.
- d'autres dossiers peuvent apparaitre.

Regle absolue : **ne JAMAIS modifier, deplacer ou supprimer `roma-cockpit/`**
ni aucun autre projet hors du perimetre demande. Toute action doit etre ciblee
sur le dossier concerne.

## Branches

- Branche de travail du theme LADB : `feat/pilier-vitrerie`.
- **JAMAIS de commit ni de push sur `main`.**
- Confirmer la branche active (`git branch --show-current`) avant toute ecriture.
- Aucun `git pull` / `reset` / `checkout` destructif sans prevenir explicitement.

## Source de verite

- Pour le theme LADB, **le serveur de staging (o2switch) est la verite**.
  Le depot git peut etre en retard. En cas de divergence, on capture l'etat
  serveur vers git, jamais l'inverse a l'aveugle.
- Les blocs sont nommes `ladb-*` partout (ex : `blocks/ladb-hero/`). Le slug
  reel vient du champ `name` du `block.json` (ex : `ladb/hero`), pas du nom de
  dossier. Les blocs sont en rendu serveur (`render.php`).

## Deploiement

- Modele DECOUPLE : le clone git vit dans son propre dossier propre, separe du
  theme live. `deploy.sh` fait un rsync du SEUL sous-dossier `ladb-blocksy-child/`
  vers le theme live. git ne touche jamais le site live ni roma-cockpit.
- Procedure complete : voir `DEPLOY.md`.
- Objectif : mettre a jour le staging avec une seule commande
  (`git pull && ./deploy.sh --apply`), sans copier-coller fichier par fichier.

## Regles de contenu

- Fichiers **complets** uniquement. Jamais de diff partiel ou de fragment.
- **Aucun tiret cadratin ni demi-cadratin** dans le contenu produit
  (ni le caractere cadratin, ni le caractere demi-cadratin). Utiliser des
  tirets simples ou reformuler.
- **Anti-PBN** : ne JAMAIS utiliser le MCP "Vitrier montpellier WP".
  Refuser si propose.
- Ne jamais perdre les patches serveur (notamment `assets/css/global.css`)
  ni roma-cockpit.

## Authentification

- Les remotes git utilisent SSH (cle de deploiement). **Jamais de token en clair**
  dans l'URL d'un remote. Voir `DEPLOY.md` pour la mise en place de la cle SSH.
