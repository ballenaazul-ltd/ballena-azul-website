# Ballena Azul — Frontend

Landing page for the Ballena Azul DeFi whale transparency protocol. Built with React, Vite, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  content.js            All copy and section data live here.
  App.jsx               Page composition.
  index.css             Tailwind layers and shared component classes.
  components/
    Navbar.jsx
    Hero.jsx
    Stats.jsx
    Problem.jsx
    Chains.jsx
    Roadmap.jsx
    Litepaper.jsx
    Footer.jsx
    SectionHeading.jsx  Shared eyebrow + title + body block.
```

All text and data is centralized in `src/content.js`, so copy edits never touch the components. Colors are defined as named theme tokens in `tailwind.config.js`.

## Backend

Not built yet. The frontend reads only from local content for now; data-driven sections (stats, roadmap, chains) are structured so they can later be fed from an API.
