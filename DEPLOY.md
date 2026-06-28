# DEPLOY.md - Deploiement du theme LADB vers le staging o2switch

Modele de deploiement DECOUPLE. Le clone git vit dans son propre dossier propre,
separe du theme live. Un `deploy.sh` rsync le sous-dossier `ladb-blocksy-child/`
vers le theme live. git ne touche jamais le site live ni roma-cockpit.

```
[depot git propre]                          [theme live]
~/deploy/claudio/                           ~/myTiger-Preprod/.../wp-content/themes/
  ladb-blocksy-child/   --- rsync --->        ladb-blocksy-child/
  roma-cockpit/         (jamais touche)
  deploy.sh
```

Chemin du theme live (par defaut dans `deploy.sh`) :
`~/myTiger-Preprod/aa46-10c4783ab242.wptiger.fr/wp-content/themes/ladb-blocksy-child/`

---

## 1. Mise en place initiale (une seule fois)

### 1.1 Re-authentification git via cle SSH (jamais de token en clair)

Le token GitHub precedent a ete revoque. On passe par une cle SSH de deploiement.

Sur le serveur o2switch (Terminal cPanel ou SSH) :

```bash
# Generer une cle dediee au deploiement (sans passphrase pour l'automatisation)
ssh-keygen -t ed25519 -C "o2switch-ladb-deploy" -f ~/.ssh/ladb_deploy -N ""

# Afficher la cle PUBLIQUE a copier dans GitHub
cat ~/.ssh/ladb_deploy.pub
```

Dans GitHub : repo `Mrlaurent90/claudio` > Settings > Deploy keys > Add deploy key.
Coller la cle publique. Laisser "Allow write access" DECOCHE (lecture seule suffit
pour `git pull`).

Configurer SSH pour utiliser cette cle avec GitHub :

```bash
cat >> ~/.ssh/config <<'EOF'

Host github-ladb
  HostName github.com
  User git
  IdentityFile ~/.ssh/ladb_deploy
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config
```

### 1.2 Cloner le depot dans un dossier PROPRE (separe du theme live)

```bash
mkdir -p ~/deploy
cd ~/deploy
git clone git@github-ladb:Mrlaurent90/claudio.git
cd claudio
git checkout feat/pilier-vitrerie
```

Verifier que le remote utilise bien SSH (pas de token) :

```bash
git remote -v
# doit afficher : git@github-ladb:Mrlaurent90/claudio.git
```

### 1.3 Verifier que rsync est disponible

```bash
which rsync || echo "rsync absent : contacter le support o2switch"
```

---

## 2. Deploiement courant (a chaque mise a jour)

Depuis le clone propre (`~/deploy/claudio`) :

```bash
git pull                 # recupere la derniere version depuis GitHub
./deploy.sh              # DRY-RUN : montre ce qui changerait, n'ecrit rien
./deploy.sh --apply      # applique reellement le rsync vers le theme live
```

Pour supprimer cote live les fichiers qui n'existent plus dans le depot
(a faire apres avoir verifie le dry-run) :

```bash
./deploy.sh --apply --prune
```

Le script exclut automatiquement l'outillage de dev (`node_modules`, `.git`,
`package*.json`, `webpack.config.js`, `.gitignore`) : le theme live reste propre.

Si le chemin du theme live change, surcharger via variable d'environnement :

```bash
LADB_LIVE_THEME=/chemin/vers/le/theme/ ./deploy.sh --apply
```

---

## 3. Option : deploiement automatique via GitHub Action (push-to-deploy)

Un workflow est livre dans `.github/workflows/deploy-staging.yml`, **desactive par
defaut** (declenchement manuel uniquement). Une fois active, un simple `git push`
met a jour le staging tout seul.

Pour l'activer :

1. Generer une cle SSH dediee a l'Action (peut etre la meme demarche qu'au 1.1,
   mais une cle SEPAREE est recommandee). Ajouter la cle PUBLIQUE en authorized_keys
   sur o2switch :

   ```bash
   cat ~/.ssh/ladb_deploy_ci.pub >> ~/.ssh/authorized_keys
   ```

2. Dans GitHub : repo > Settings > Secrets and variables > Actions > New repository
   secret. Creer :
   - `O2SWITCH_SSH_KEY`  : la cle PRIVEE (`~/.ssh/ladb_deploy_ci`)
   - `O2SWITCH_HOST`     : l'hote SSH o2switch
   - `O2SWITCH_USER`     : l'utilisateur SSH
   - `O2SWITCH_THEME_PATH` : chemin absolu du theme live sur le serveur

3. Dans `.github/workflows/deploy-staging.yml`, decommenter le bloc `push:` de la
   section `on:` pour declencher sur push de la branche.

Tant que les secrets ne sont pas crees et le bloc `push:` non decommente, l'Action
ne fait rien automatiquement : le `deploy.sh` manuel reste la voie nominale.
