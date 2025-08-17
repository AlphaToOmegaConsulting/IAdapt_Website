# IAdapt Blog IA - Frontend Development

## Architecture: CSS Modulaire avec Build Pipeline
- CSS modulaire dans styles/ avec CSS Cascade Layers
- JavaScript vanilla avec namespace pattern (IAdaptApp, IAdaptUtils)
- Build automatisé PostCSS → site.css unique et optimisé

## Build System:
```bash
npm run build    # Compile styles/index.css → site.css (production)
npm run watch    # Mode développement avec surveillance
```

## Structure des Pages:
1. Header (navigation sticky + mobile)
2. Hero (présentation)
3. Sections de contenu (cartes, media-grid, accordéons)
4. Footer (liens, contact, réseaux sociaux)

## CSS Cascade Layers (ordre strict):
1. `tokens` - Variables design system
2. `base` - Reset, typographie
3. `layout` - Grilles, containers
4. `components` - Boutons, cartes, header, footer, etc.
5. `utilities` - Classes d'aide, spacing
6. `overrides` - Cas exceptionnels uniquement

## JavaScript Modules:
- `scripts/utils.js` → `window.IAdaptUtils` (debounce, DOM helpers, animations)
- `scripts/main.js` → `window.IAdaptApp` (navigation, scroll, état)
- `scripts/components.js` → Accordéons, filtres (dépend des 2 précédents)

## Pages du site:
- index.html (accueil)
- entreprises.html (acteurs IA)
- applications.html (cas d'usage)
- contact.html (contact & services)
- composants.html (documentation interne)

## Commandes utiles:
- `npm run build` : Build CSS production
- `npm run watch` : Développement avec auto-rebuild

## Priorités:
- Performance (CSS optimisé automatiquement)
- Accessibilité WCAG AA (skip links, focus, ARIA)
- SEO optimisé
- Responsive mobile-first

## Conventions:
- Pas de partials HTML (header/footer intégrés directement)
- Chargement : utils.js → main.js → components.js
- CSS : Une seule responsabilité par fichier, sources de vérité définies