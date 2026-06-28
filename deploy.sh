#!/usr/bin/env bash
#
# deploy.sh - Deploiement DECOUPLE du theme LADB vers le staging o2switch.
#
# Principe : ce depot git vit dans son propre dossier propre, SEPARE du theme live.
# Ce script fait un rsync du SEUL sous-dossier "ladb-blocksy-child/" vers le theme
# live. git ne touche jamais le site live, ni roma-cockpit, ni les autres themes.
#
# Workflow type (sur le serveur, depuis le clone git propre) :
#     git pull
#     ./deploy.sh            # dry-run : montre ce qui changerait, n'ecrit rien
#     ./deploy.sh --apply    # applique reellement le rsync
#     ./deploy.sh --apply --prune   # applique ET supprime cote live les fichiers
#                                   # absents du depot (a utiliser apres un dry-run)
#
# Securite :
#   - dry-run par defaut. Aucune ecriture sans --apply.
#   - rsync cible UNIQUEMENT le dossier du theme. roma-cockpit et les autres
#     themes du serveur ne sont jamais dans le perimetre.
#   - --delete (prune) desactive par defaut. Active seulement via --prune.
#   - les fichiers de dev (node_modules, .git, package*.json, webpack, .gitignore)
#     sont exclus : le theme live reste propre.
#
set -euo pipefail

# Dossier ou se trouve ce script (= racine du depot git).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source : le sous-dossier du theme dans le depot. Le slash final est important.
SRC="${SCRIPT_DIR}/ladb-blocksy-child/"

# Destination : le theme live sur o2switch. Surchargeable via la variable
# d'environnement LADB_LIVE_THEME si le chemin change.
DEST="${LADB_LIVE_THEME:-${HOME}/myTiger-Preprod/aa46-10c4783ab242.wptiger.fr/wp-content/themes/ladb-blocksy-child/}"

# Parsing des options.
APPLY=0
PRUNE=0
for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=1 ;;
    --prune) PRUNE=1 ;;
    -h|--help)
      grep '^#' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Option inconnue : $arg" >&2
      echo "Usage : ./deploy.sh [--apply] [--prune]" >&2
      exit 2
      ;;
  esac
done

# Verifications de base.
if [ ! -d "$SRC" ]; then
  echo "ERREUR : dossier source introuvable : $SRC" >&2
  exit 1
fi
if [ ! -d "$DEST" ]; then
  echo "ERREUR : dossier theme live introuvable : $DEST" >&2
  echo "Verifie le chemin ou exporte LADB_LIVE_THEME=/chemin/vers/le/theme/" >&2
  exit 1
fi

# Exclusions : on n'envoie jamais l'outillage de dev ni les fichiers git.
EXCLUDES=(
  --exclude '.git/'
  --exclude '.gitignore'
  --exclude 'node_modules/'
  --exclude 'package.json'
  --exclude 'package-lock.json'
  --exclude 'webpack.config.js'
  --exclude '.DS_Store'
)

# Options rsync. -a (archive), -h (lisible), -i (itemise les changements).
RSYNC_OPTS=(-a -h -i)

# --delete uniquement si --prune demande.
if [ "$PRUNE" -eq 1 ]; then
  RSYNC_OPTS+=(--delete)
fi

# Dry-run par defaut.
MODE="DRY-RUN (aucune ecriture)"
if [ "$APPLY" -eq 1 ]; then
  MODE="APPLY (ecriture reelle)"
else
  RSYNC_OPTS+=(--dry-run)
fi

echo "============================================================"
echo " Deploiement theme LADB"
echo "   Mode   : $MODE"
echo "   Prune  : $([ "$PRUNE" -eq 1 ] && echo 'OUI (--delete)' || echo 'non')"
echo "   Source : $SRC"
echo "   Cible  : $DEST"
echo "============================================================"

rsync "${RSYNC_OPTS[@]}" "${EXCLUDES[@]}" "$SRC" "$DEST"

echo "============================================================"
if [ "$APPLY" -eq 1 ]; then
  echo " Termine. Theme live mis a jour."
else
  echo " Dry-run termine. Rien n'a ete ecrit."
  echo " Relance avec --apply pour appliquer."
fi
echo "============================================================"
