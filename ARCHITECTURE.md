# 🏗️ Architecture IAdapt Blog IA - Sources de Vérité

## 📋 Vue d'ensemble

Ce document définit les responsabilités et sources de vérité pour chaque composant du projet IAdapt Blog IA après refactorisation vers l'architecture modulaire avec CSS Cascade Layers.

## 🎨 CSS - Sources de Vérité

### **Variables et Configuration**
- **Fichier :** `styles/tokens.css` 
- **Responsabilité :** TOUTES les variables CSS (couleurs, espacements, polices, transitions)
- **Règle :** Modification uniquement dans ce fichier

### **Styles de Base**
- **Fichier :** `styles/base.css`
- **Responsabilité :** Reset CSS, typographie de base, utilitaires généraux
- **Contenu :** Body, headings, liens, focus states, skip links

### **Système de Mise en Page**
- **Fichier :** `styles/layout.css`
- **Responsabilité :** Grilles, containers, utilitaires de layout
- **Contenu :** `.container`, `.section`, `.hero`, `.cards`, responsive grid

### **Composants UI**

#### Boutons
- **Fichier :** `styles/components/buttons.css`
- **Responsabilité :** TOUS les styles de boutons
- **Contenu :** `.btn`, `.btn--primary`, `.btn--secondary`, variants

#### Header & Navigation
- **Fichier :** `styles/components/header.css`
- **Responsabilité :** Header principal, navigation, menu mobile
- **Contenu :** `.navbar`, `.nav-links`, `.burger`, `.brand`

#### Footer
- **Fichier :** `styles/components/footer.css`
- **Responsabilité :** Footer et éléments associés
- **Contenu :** `.footer`, `.footer-content`, liens sociaux

#### Cartes et Conteneurs
- **Fichier :** `styles/components/cards.css`
- **Responsabilité :** Système de cartes, contenus
- **Contenu :** `.card`, `.meta`

#### Alerts
- **Fichier :** `styles/components/alerts.css`
- **Responsabilité :** Messages d'alerte
- **Contenu :** `.alert`, variants (success, error, info, warn)

#### Media Grid
- **Fichier :** `styles/components/media-grid.css`
- **Responsabilité :** Grilles média 60/40
- **Contenu :** `.media-grid`, `.media-grid__content`, `.media-grid__media`

#### Accordéons
- **Fichier :** `styles/components/accordion.css`
- **Responsabilité :** Composants accordéon
- **Contenu :** `.accordion`, `.accordion__item`, interactions

### **Utilitaires**
- **Fichier :** `styles/utilities.css`
- **Responsabilité :** Classes utilitaires (spacing, couleurs, texte)
- **Contenu :** `.mt-*`, `.text-*`, `.filters`, `.chip`

### **Responsive Design**
- **Fichier :** `styles/responsive.css`
- **Responsabilité :** Media queries globales, adaptations mobile
- **Contenu :** Breakpoints, adaptations cross-composants

### **Overrides**
- **Fichier :** `styles/overrides.css`
- **Responsabilité :** Cas exceptionnels uniquement
- **Contenu :** Styles spécifiques qui ne peuvent pas être ailleurs

## 🔧 JavaScript - Sources de Vérité

### **Utilitaires Partagés**
- **Fichier :** `scripts/utils.js`
- **Responsabilité :** TOUS les utilitaires réutilisables
- **API :** `window.IAdaptUtils`
- **Contenu :** `debounce`, `throttle`, `AnimationManager`, DOM helpers

### **Application Principale**
- **Fichier :** `scripts/main.js`
- **Responsabilité :** Initialisation, navigation, gestion d'état
- **API :** `window.IAdaptApp`
- **Contenu :** Configuration, scroll spy, navigation mobile, état global

### **Composants UI**
- **Fichier :** `scripts/components.js`
- **Responsabilité :** Logique des composants interactifs
- **Dépendances :** `window.IAdaptApp`, `window.IAdaptUtils`
- **Contenu :** Accordéons, filtres, accessibilité

## 🏗️ Build System

### **PostCSS Pipeline**
- **Point d'entrée :** `styles/index.css`
- **Output :** `site.css` (fichier unique minifié)
- **Plugins :** postcss-import, cssnano
- **Commandes :** `npm run build`, `npm run watch`

### **CSS Cascade Layers**
Ordre strict des layers :
1. `tokens` - Variables et design system
2. `base` - Reset et typographie de base
3. `layout` - Système de mise en page
4. `components` - Composants UI
5. `utilities` - Classes utilitaires
6. `overrides` - Cas exceptionnels

## 📜 Règles Strictes

### ❌ **INTERDICTIONS**

1. **CSS dans JavaScript**
   - ❌ JAMAIS d'injection de styles via `createElement('style')`
   - ❌ JAMAIS de styles inline dans JS

2. **Duplication de Code**
   - ❌ JAMAIS de fonction utilitaire dupliquée
   - ❌ JAMAIS de variable CSS redéfinie
   - ❌ JAMAIS de composant défini dans plusieurs fichiers

3. **Responsabilités Croisées**
   - ❌ PAS de styles de boutons hors de `buttons.css`
   - ❌ PAS de layouts hors de `layout.css`
   - ❌ PAS de variables hors de `tokens.css`

### ✅ **BONNES PRATIQUES**

1. **Ajout de Nouvelles Fonctionnalités**
   ```
   Nouveau bouton → components/buttons.css
   Nouveau layout → layout.css
   Nouvelle variable → tokens.css
   Nouvel utilitaire → utils.js
   ```

2. **Ordre de Chargement des Scripts**
   ```html
   1. scripts/utils.js (utilitaires)
   2. scripts/main.js (app principale)
   3. scripts/components.js (composants)
   ```

3. **Build Process**
   ```bash
   npm run build    # Build production
   npm run watch    # Mode développement
   ```

## 🔍 Comment Identifier les Violations

### **Signes d'Alerte**
- Code CSS dans un fichier JS
- Même classe définie dans 2+ fichiers CSS
- Fonction avec même nom dans 2+ fichiers JS
- Styles inline dans HTML (`style="..."`)

### **Outils de Validation**
```bash
# Rechercher duplications CSS
grep -r "\.btn {" styles/
grep -r "\.card {" styles/

# Rechercher injections CSS
grep -r "createElement.*style" scripts/
grep -r "innerHTML.*<style" scripts/

# Rechercher fonctions dupliquées  
grep -r "function debounce" scripts/
```

## 🚀 Workflow de Développement

### **Ajout d'un Nouveau Composant**
1. Identifier la responsabilité (bouton/layout/animation/etc.)
2. Modifier le fichier source de vérité approprié
3. Rebuild avec `npm run build`
4. Tester sur toutes les tailles d'écran
5. Vérifier qu'aucune duplication n'a été créée

### **Modification d'un Style Existant**
1. Identifier le fichier source de vérité
2. Modifier UNIQUEMENT dans ce fichier
3. Rebuild et tester l'impact sur tous les composants
4. Vérifier responsive + accessibilité

### **Debug de Conflit CSS**
1. Vérifier l'ordre des CSS Cascade Layers
2. S'assurer qu'une seule définition existe
3. Utiliser les DevTools pour identifier la source
4. Corriger dans le fichier source de vérité

## 📊 Architecture Finale

```
/
├── package.json              # Config PostCSS
├── postcss.config.js         # Plugins PostCSS
├── site.css                  # CSS compilé (généré)
├── styles/                   # Sources CSS modulaires
│   ├── index.css            # Point d'entrée
│   ├── tokens.css           # Variables
│   ├── base.css             # Reset + typo
│   ├── layout.css           # Layouts
│   ├── utilities.css        # Utilitaires
│   ├── responsive.css       # Media queries
│   ├── overrides.css        # Cas exceptionnels
│   └── components/          # Composants
│       ├── buttons.css
│       ├── cards.css
│       ├── alerts.css
│       ├── media-grid.css
│       ├── accordion.css
│       ├── header.css
│       └── footer.css
└── scripts/                 # JavaScript modulaire
    ├── utils.js             # Utilitaires
    ├── main.js              # App principale
    └── components.js        # Composants UI
```

---

**🎯 Cette architecture garantit :**
- 🔒 **Pas de duplication** - Une seule source de vérité par fonctionnalité
- 🧩 **Modularité parfaite** - Chaque fichier a une responsabilité claire
- 🚀 **Maintenance facile** - Savoir exactement où modifier chaque élément
- 📈 **Évolutivité** - Ajout simple de nouveaux composants
- ⚡ **Performance** - CSS compilé et optimisé automatiquement

**⚠️ Respecter cette architecture est OBLIGATOIRE pour maintenir la qualité du code !**