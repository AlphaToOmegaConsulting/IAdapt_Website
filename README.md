# Blog IA - TPE & Indépendants

> Site statique avec architecture CSS modulaire et build pipeline automatisé

## 🎯 Objectif

Blog éducatif et vitrine de services d'intégration IA pour les TPE toulousaines. Double mission : éduquer les dirigeants souhaitant explorer l'IA et générer des leads pour les services d'accompagnement.

## 🏗️ Architecture Refactorisée

### **CSS Modulaire avec Cascade Layers**
- **Build System:** PostCSS avec compilation automatique
- **Output:** Fichier CSS unique optimisé (`site.css`)  
- **Organisation:** CSS Cascade Layers pour une priorité claire

### **JavaScript Vanilla avec Namespaces**
- **Pattern:** Modules autonomes sans bundler
- **APIs globales:** `IAdaptUtils`, `IAdaptApp`, `IAdaptComponents`
- **Chargement séquentiel:** utils → main → components

### Structure générale
```
/
├── package.json               # Config PostCSS + dépendances
├── postcss.config.js          # Configuration PostCSS
├── site.css                   # CSS compilé (généré automatiquement)
├── ARCHITECTURE.md            # Documentation architecture détaillée
├── CLAUDE.md                  # Guide développement
├── index.html                 # Page d'accueil
├── entreprises.html           # Liste des acteurs IA
├── applications.html          # Cas d'usage métier
├── contact.html               # Contact & services
├── composants.html            # Documentation interne des composants
├── styles/                    # Sources CSS modulaires
│   ├── index.css             # Point d'entrée avec @layer
│   ├── tokens.css            # Variables design system (44 vars)
│   ├── base.css              # Reset + typographie
│   ├── layout.css            # Grilles, containers, hero
│   ├── utilities.css         # Classes d'aide
│   ├── responsive.css        # Media queries
│   ├── overrides.css         # Cas exceptionnels
│   └── components/           # Composants UI modulaires
│       ├── buttons.css       # Système de boutons
│       ├── cards.css         # Cartes de contenu
│       ├── alerts.css        # Messages d'alerte
│       ├── media-grid.css    # Grilles média 60/40
│       ├── accordion.css     # Accordéons interactifs
│       ├── header.css        # Navigation + mobile
│       └── footer.css        # Footer + liens sociaux
└── scripts/                  # JavaScript modulaire
    ├── utils.js              # Utilitaires (debounce, DOM, animations)
    ├── main.js               # App principale (nav, scroll, état)
    └── components.js         # Composants (accordéons, filtres)
```

## 🚀 Développement

### Installation et Build
```bash
# Installation des dépendances
npm install

# Build production (génère site.css optimisé)
npm run build

# Mode développement avec surveillance
npm run watch
```

### CSS Cascade Layers (ordre strict)
1. **`tokens`** - Variables design system
2. **`base`** - Reset, typographie
3. **`layout`** - Grilles, containers
4. **`components`** - Boutons, cartes, header, footer, etc.
5. **`utilities`** - Classes d'aide, spacing
6. **`overrides`** - Cas exceptionnels uniquement

### JavaScript Namespaces
```javascript
// Utilitaires globaux
window.IAdaptUtils.debounce(func, delay)
window.IAdaptUtils.smoothScrollTo(target)

// Application principale
window.IAdaptApp.init()
window.IAdaptApp.closeMobileNav()

// Composants interactifs
window.IAdaptComponents.AccordionComponent.init()
```

## 🎨 Design System

### 44 variables CSS modulaires (styles/tokens.css)

```css
/* Palette couleurs (8 variables) */
--color-bg: #0D1117           /* Background principal */
--color-bg-secondary: #161B22  /* Background secondaire */
--color-text: #FFFFFF          /* Texte principal */
--color-text-secondary: #C9D1D9 /* Texte secondaire */
--color-primary: #3B82F6       /* Bleu principal */
--color-secondary: #06B6D4     /* Cyan secondaire */
--color-success: #22C55E       /* Vert succès */
--color-alert: #E11D48         /* Rouge alerte */

/* Espacements (8 variables) */
--space-1: 4px   --space-2: 8px   --space-3: 12px  --space-4: 16px
--space-5: 24px  --space-6: 32px  --space-7: 48px  --space-8: 72px

/* Rayons de bordure (4 variables) */
--radius-sm: 6px  --radius-md: 10px  --radius-lg: 16px  --radius-pill: 999px

/* Typographie fluide (5 variables) */
--fs-1: clamp(0.875rem, 0.8rem + 0.2vw, 1rem)      /* Small */
--fs-2: clamp(1rem, 0.95rem + 0.3vw, 1.125rem)     /* Base */
--fs-3: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)     /* H3 */
--fs-4: clamp(1.5rem, 1.3rem + 0.8vw, 2rem)        /* H2 */
--fs-5: clamp(2rem, 1.6rem + 1.6vw, 2.75rem)       /* H1 */

/* Élévations & bordures (5 variables) */
--elev-1, --elev-2, --elev-3, --border-soft, --border-strong

/* Layout */
--container: 1100px
```

## 🛠️ Technologies

### Core
- **PostCSS** pour le build CSS automatisé
- **CSS Cascade Layers** pour l'organisation modulaire
- **JavaScript Vanilla** avec pattern namespace
- **HTML5** sémantique sans système de partials
- **Fonts** : Poppins (titres) + Roboto (texte)

### Architecture AEGEE Inspirée
- **Sources de vérité uniques** pour chaque responsabilité
- **Séparation stricte** CSS / JavaScript
- **Modules autonomes** sans dépendances externes
- **Build pipeline** optimisé pour la production

## 📦 Bibliothèque de composants

Documentation interne accessible via `composants.html` pour référencer tous les éléments CSS et fonctions JavaScript disponibles.

### CSS Modulaire
- **Variables** : 44 propriétés custom dans tokens.css
- **Boutons** : système complet avec variantes (.btn, .btn-primary, etc.)
- **Cartes** : composants cards avec grid responsive
- **Layout** : containers, sections, grilles modulaires
- **Composants** : header, footer, accordéons, media-grid
- **Utilitaires** : spacing, text, accessibilité

### JavaScript Modulaire
- **IAdaptUtils** : debounce, throttle, DOM helpers, animations
- **IAdaptApp** : navigation, scroll handling, état global
- **IAdaptComponents** : accordéons, filtres, interactions

## ✅ Standards qualité

### Accessibilité
- Contrastes WCAG AA minimum
- Navigation clavier complète
- Skip links et focus management
- ARIA labels et structure sémantique

### Performance
- CSS compilé et minifié automatiquement
- Chargement séquentiel optimisé des scripts
- Images optimisées (WebP quand possible)
- Pas de dépendances externes lourdes

### SEO
- Title et description uniques par page
- Structure HTML sémantique
- URLs parlantes
- Meta tags appropriés

## 📱 Responsive

- **Mobile-first** approach
- Breakpoints : 640px, 768px, 1024px, 1200px
- CSS Grid et Flexbox pour layouts adaptatifs
- Typographie fluide avec clamp()
- Tests multi-devices obligatoires

## 🔄 Workflow de développement

### Ajout d'un nouveau composant
1. Identifier la catégorie (layout, component, utility)
2. Créer/modifier le fichier CSS approprié
3. Rebuild avec `npm run build`
4. Tester responsive et accessibilité
5. Documenter dans `composants.html`

### Modification d'un style existant
1. Localiser le fichier source de vérité (voir ARCHITECTURE.md)
2. Modifier uniquement dans ce fichier
3. Rebuild et valider l'impact global
4. Vérifier les CSS Cascade Layers

### Debug
1. Vérifier l'ordre des CSS Cascade Layers
2. Utiliser les DevTools pour identifier les conflits
3. S'assurer de l'unicité des définitions
4. Consulter ARCHITECTURE.md pour les sources de vérité

## 📊 Déploiement

### Build automatique
```bash
npm run build     # Production optimisée
npm run watch     # Développement continu
```

### Hébergement
- **GitHub Pages** avec domaine custom
- **Build automatique** sur push main
- **Intégration** formulaires via services externes

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature : `git checkout -b feat/nouvelle-feature`
3. Suivre l'architecture définie dans ARCHITECTURE.md
4. Commit : `git commit -m "feat: ajouter composant X"`
5. Push : `git push origin feat/nouvelle-feature`
6. Créer une Pull Request

## 📄 Documentation

- **ARCHITECTURE.md** : Architecture détaillée et sources de vérité
- **CLAUDE.md** : Guide rapide pour développement avec Claude Code
- **composants.html** : Bibliothèque de composants interactive
- **README.md** : Vue d'ensemble et guide utilisateur

---

**Architecture inspirée de AEGEE Toulouse** • **Build pipeline moderne** • **Performance optimisée**