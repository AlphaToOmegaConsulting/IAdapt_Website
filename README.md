# Blog IA - TPE & Indépendants

> Site statique minimaliste sur l'intelligence artificielle appliquée aux petites entreprises

## 🎯 Objectif

Blog éducatif et vitrine de services d'intégration IA pour les TPE toulousaines. Double mission : éduquer les dirigeants souhaitant explorer l'IA et générer des leads pour les services d'accompagnement.

## 🏗️ Architecture

```
/
├── index.html                 # Page d'accueil
├── entreprises.html           # Liste des acteurs IA
├── outils.html               # Outils d'intégration
├── applications.html         # Cas d'usage métier
├── contact.html              # Formulaire de contact
├── entreprises/              # Pages dédiées par entreprise
│   ├── openai.html
│   ├── anthropic.html
│   └── ...
├── outils/                   # Pages dédiées par outil
│   ├── n8n.html
│   ├── vscode.html
│   └── github.html
├── applications/             # Pages par cas d'usage
│   ├── email.html
│   ├── crm.html
│   ├── web.html
│   └── reseaux-sociaux.html
└── assets/
    ├── css/style.css
    ├── js/app.js
    └── img/
```

## 🎨 Design System

### Variables CSS principales
```css
/* Palette dark */
--color-bg: #0D1117
--color-primary: #3B82F6
--color-secondary: #06B6D4

/* Spacing */
--space-1 à --space-8 (4px à 72px)

/* Typography fluid */
--fs-1 à --fs-5 (responsive)
```

### Conventions de nommage

**Fichiers :** 
- Minuscules avec tirets : `reseaux-sociaux.html`
- Pas d'accents dans les URLs

**CSS :**
- BEM simplifié : `.card`, `.card__title`, `.card--featured`
- Utilitaires : `.text-center`, `.mb-4`

**JavaScript :**
- camelCase pour variables : `contactForm`
- kebab-case pour data attributes : `data-filter`

## 🛠️ Technologies

- **HTML5** sémantique
- **CSS3** natif avec custom properties
- **JavaScript** vanilla (ES6+)
- **Fonts** : Poppins (titres) + Roboto (texte)
- **Hébergement** : GitHub Pages

## 🚀 Développement

### Prérequis
- Navigateur moderne
- Éditeur de code (VS Code recommandé)
- Live Server ou équivalent pour le développement

### Installation
```bash
git clone [url-repo]
cd blog-ia
# Ouvrir avec Live Server ou servir localement
```

### Structure du workflow
1. Développer sur branche `dev`
2. Tester sur différents navigateurs
3. Valider HTML/CSS (W3C)
4. Merger sur `main` pour déploiement auto

## ✅ Standards qualité

### Accessibilité
- Contrastes WCAG AA minimum
- Navigation clavier complète
- Alt text sur toutes les images
- Structure sémantique H1-H6

### Performance
- Images optimisées (WebP quand possible)
- CSS/JS minifiés en production
- Lazy loading des images
- Lighthouse score > 90

### SEO
- Title et description uniques par page
- Balises Open Graph
- Sitemap.xml généré
- URLs parlantes

## 📱 Responsive

- **Mobile-first** approach
- Breakpoints : 640px, 1024px
- Tests obligatoires sur iOS Safari, Chrome Android
- Zoom jusqu'à 400% supporté

## 🔄 Déploiement

**Automatique via GitHub Pages :**
- Push sur `main` → déploiement auto
- URL : `https://[username].github.io/blog-ia`
- Domaine custom : `iadapt.app` (configuré dans settings)

## 📊 Suivi

- **Analytics** : Google Analytics 4
- **Search Console** : Monitoring indexation
- **Lighthouse CI** : Audits automatiques

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature : `git checkout -b feat/nouvelle-page`
3. Commit : `git commit -m "feat: ajouter page anthropic"`
4. Push : `git push origin feat/nouvelle-page`
5. Créer une Pull Request

## 📄 Licence

MIT - Usage libre pour projets éducatifs et commerciaux

---

**Contact :** [email] | **Demo :** [iadapt.app]