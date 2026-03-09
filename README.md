## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
```

## Configuration

**Éditez `src/config.js`**

## Structure

```
src/
├── components/       # Composants réutilisables
│   ├── Navbar        # Navigation sticky
│   ├── Footer        # Pied de page
│   ├── MatrixRain    # Animation canvas
│   ├── ProjectCard   # Carte de projet GitHub
│   ├── SkillBar      # Barre de compétence animée
│   ├── Timeline      # Timeline parcours
│   └── ScrollReveal  # Wrapper d'animation au scroll
├── pages/            # Pages (sans styles inline)
│   ├── Home          # Hero + terminal animé
│   ├── Projects      # Grille GitHub avec filtres
│   ├── Skills        # Barres + badges technos
│   ├── Journey       # Timeline alternée
│   └── About         # Profil + stats GitHub
├── hooks/            # Hooks personnalisés
│   ├── useGithub     # API GitHub (repos, profil)
│   └── useScrollReveal
├── styles/           # Styles globaux
│   ├── globals.css   # Reset + variables CSS
│   └── animations.css
└── config.js         # ← CONFIGURATION CENTRALE
```