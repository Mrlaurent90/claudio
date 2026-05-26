# Roma · Cockpit ✈️🇮🇹

Application de voyage **PWA installable, hors-ligne et synchronisée à deux** pour un séjour à Rome (31 mai → 4 juin 2026). Reconstruite à partir du cockpit HTML d'origine, en Next.js de qualité production.

## Stack

| Brique | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js 15** (App Router) + React 19 + TypeScript | Standard moderne, déploiement Vercel natif |
| Style | **TailwindCSS** | Rapide, palette terracotta tokenisée dans `tailwind.config.ts` |
| Animations | **Framer Motion** | Transitions fluides, micro-interactions |
| PWA / offline | **@ducanh2912/next-pwa** (Workbox) | Service worker + cache tuiles carte |
| Synchro temps réel | **Supabase** (Postgres + Realtime) | Synchro live + offline-first |
| Carte | **Leaflet / OpenStreetMap** | Gratuit, sans clé, tuiles cachables hors-ligne |

## Architecture

```
app/            Routes (App Router) + layout PWA + styles globaux
  [tripId]/     La page du voyage (id non-devinable dans l'URL = "auth")
components/     UI par section (planning, map, decisions, resas, budget…)
data/           travelData.ts → TOUT le contenu, typé, éditable ici
lib/            types, client Supabase, hook de synchro, logique "now"
public/         manifest PWA + icônes (service worker généré au build)
supabase/       schema.sql à coller dans Supabase
```

**Donnée vs présentation** : tout le contenu vit dans `data/travelData.ts`. Seul l'état qui bouge pendant le voyage (cases cochées, statuts de résa, décisions tranchées) est synchronisé via Supabase.

## Démarrage local

```bash
npm install
cp .env.local.example .env.local   # optionnel (voir Synchro)
npm run dev                        # http://localhost:3000
```

Sans clés Supabase, l'app tourne en **mode local** : tout fonctionne, l'état est gardé dans le navigateur (pas de synchro entre appareils).

## Activer la synchro à deux (Supabase)

1. Crée un projet gratuit sur [supabase.com](https://supabase.com).
2. **SQL Editor** → colle le contenu de `supabase/schema.sql` → *Run*.
3. **Project Settings → API** → copie `Project URL` et `anon public key`.
4. Renseigne-les dans `.env.local` :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```
5. Relance `npm run dev`. Les cases/statuts/décisions se synchronisent en direct, et les modifs faites hors-ligne se renvoient au retour du réseau.

## Déploiement (Vercel)

1. Pousse le repo sur GitHub.
2. Sur [vercel.com](https://vercel.com) → *New Project* → importe le repo (Root Directory = `roma-cockpit`).
3. Ajoute les deux variables `NEXT_PUBLIC_SUPABASE_*` dans *Environment Variables*.
4. *Deploy*. HTTPS automatique → installe l'app sur l'iPhone (Safari → Partager → *Sur l'écran d'accueil*).

## Installer sur iPhone

Ouvre l'URL dans **Safari** → bouton Partager → **Ajouter à l'écran d'accueil**. L'app s'ouvre en plein écran, sans barre Safari, et fonctionne hors-ligne une fois les pages et tuiles de carte visitées.

## Icônes

Placeholder généré par `scripts/gen-icons.mjs` (`node scripts/gen-icons.mjs`). Remplace `public/icons/*.png` par un vrai logo quand tu veux.
