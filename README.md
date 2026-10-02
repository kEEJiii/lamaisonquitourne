# La Maison qui Tourne

Site statique Astro. Hébergé gratuitement sur Cloudflare Pages.

## Commandes

| Commande | Effet |
|---|---|
| `npm install` | Installe les dépendances (une seule fois) |
| `npm run dev` | Lance le site en local sur http://localhost:4321 |
| `npm run build` | Génère le site dans `dist/` |
| `npm run preview` | Prévisualise le site généré |

## Publier un article

1. Créer un fichier dans `src/content/articles/`, par exemple `mon-article.md`
2. Le nom du fichier devient l'adresse : `/articles/mon-article/`
3. Coller l'en-tête ci-dessous, puis écrire en markdown
4. `git add . && git commit -m "nouvel article" && git push`

Cloudflare reconstruit et met en ligne automatiquement en une minute environ.

### En-tête obligatoire

```yaml
---
title: "Le titre de l'article"
description: "Une phrase de résumé. Sert aussi de description Google."
pubDate: 2026-09-15
category: "Sécurité & présence"
etat: "tourne"
etatLabel: "Tourne depuis 8 mois"
tags: ["alarme", "aqara"]
draft: false
---
```

### Catégories autorisées

Toute autre valeur fera échouer le build, volontairement.

- `Le pont HomeKit`
- `Sécurité & présence`
- `Chauffage & confort`
- `Matériel & réseau`
- `Extérieur`

### Valeurs d'état

- `tourne` — pastille verte
- `bricole` — pastille jaune
- `abandonne` — pastille grise

Mettre `draft: true` garde l'article hors ligne.

## Déploiement initial

### 1. Envoyer le code sur GitHub

```bash
git init
git add .
git commit -m "premier jet"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/lamaisonquitourne.git
git push -u origin main
```

### 2. Connecter Cloudflare Pages

1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Sélectionner le dépôt
3. Paramètres de build :
   - Framework preset : **Astro**
   - Build command : `npm run build`
   - Build output directory : `dist`
4. **Save and Deploy**

Le site est en ligne sur `xxx.pages.dev` en deux minutes.

### 3. Brancher le domaine

1. Dans Cloudflare : **Add a site** → `lamaisonquitourne.fr`
2. Cloudflare affiche deux serveurs de noms
3. Dans l'espace client OVH : **Noms de domaine** → `lamaisonquitourne.fr` → **Serveurs DNS** → remplacer par ceux de Cloudflare
4. Attendre la propagation (de 15 minutes à 24 heures)
5. Retour dans Pages → **Custom domains** → ajouter `lamaisonquitourne.fr` et `www.lamaisonquitourne.fr`

Le certificat HTTPS est généré automatiquement.

### 4. Activer les statistiques

Cloudflare → **Web Analytics** → ajouter le site. Sans cookie, donc sans bandeau de consentement.

## Ce qui reste à faire

- [ ] Compléter les mentions légales (nom et adresse du responsable de publication — obligatoire)
- [ ] Remplir les trous de la page À propos (surface, année de construction)
- [ ] Terminer le premier article (captures d'écran, versions, ponts secondaires)
- [ ] Créer la micro-entreprise avant d'activer la page Prestations
- [ ] Ouvrir les comptes d'affiliation une fois deux articles publiés

## Structure

```
src/
├── content/articles/     ← les articles, en markdown
├── pages/                ← les pages fixes
├── layouts/              ← gabarits
├── components/           ← en-tête, pied, cartes, puce d'état
├── styles/global.css     ← toutes les couleurs et polices
└── content.config.ts     ← schéma des articles
public/                   ← logos, favicons, robots.txt
```

Pour changer une couleur ou une police, tout est en haut de `src/styles/global.css`.

## Compteurs de lecture

Le déploiement Workers utilise `src/server/worker.js`, le binding d’assets `ASSETS`
et le Durable Object SQLite `ArticleViews`. La migration `article-views-v1` crée
le stockage au déploiement ; aucun identifiant de base ni secret n’est nécessaire.
Les totaux démarrent à zéro et restent persistants entre déploiements.

- `GET /api/views/<slug>` consulte le total sans l’incrémenter.
- `POST /api/views/<slug>` ajoute une lecture ; les requêtes doivent provenir du site.
- Les tuiles lisent uniquement. Un article compte au plus une fois par session et
  par navigateur lorsque `sessionStorage` est disponible.
- Les chiffres sont indicatifs, sans détection exhaustive des robots ou fraude.
- Aucun numéro n’est affiché si le service ne répond pas. Aucun faux total n’est utilisé.
- `npm run build` met à jour la liste des articles publiés autorisés par l’API.
- `node --test tests/views.test.js` vérifie les règles de l’API.
- `npx wrangler dev --local` permet de tester stockage et API sur le port local affiché.

La configuration actuelle vise Cloudflare **Workers Builds**, pas Pages.
La commande de déploiement est `npx wrangler deploy` après `npm run build`.
Ne pas supprimer ou renommer le binding/la classe ni réinitialiser la migration
pour conserver les nombres de vues.

## SEO et images de partage

Chaque article publié expose des données structurées `BlogPosting` (titre,
description, URL canonique, auteur Alex lié à la page À propos et date de publication).
La date de modification est ajoutée uniquement lorsque `updatedDate` est renseigné.
Le prénom de l’auteur est également affiché dans l’en-tête de l’article.

`src/pages/og/[slug].png.ts` génère automatiquement une image PNG de 1200 × 630
pour chaque article publié lors du build. Elle reprend le titre, la catégorie,
le logo et les couleurs du blog. Les balises Open Graph et Twitter utilisent
cette même image. Les brouillons n’ont pas d’image publique.

La génération utilise Satori et Resvg au build ; elle n’ajoute aucun JavaScript
au navigateur. La police Bricolage Grotesque est embarquée avec sa licence OFL
pour éviter de dépendre du réseau ou des polices installées sur le serveur.
