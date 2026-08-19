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
