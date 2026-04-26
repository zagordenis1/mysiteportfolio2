# Denys Zahorovskyi Portfolio

Modern bilingual portfolio website for **Denys Zahorovskyi**, a 2nd-year Software Engineering student at Zhytomyr Polytechnic.

## Stack

- Next.js 14 App Router with static export
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- `next-themes` for dark/light mode
- Custom Ukrainian/English i18n
- GitHub Actions deployment to GitHub Pages

## Features

- Responsive senior-level landing portfolio design
- Ukrainian and English language switcher
- Dark/light theme switcher
- Hero, About, Skills, Portfolio, and Contacts sections
- Scroll reveal animations and polished hover states
- SEO metadata, Open Graph, sitemap, robots, and JSON-LD
- Easy project updates through `src/i18n/dictionaries.ts`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Add a new project

Project cards are localized in `src/i18n/dictionaries.ts`.

1. Add the Ukrainian project to `dictionaries.uk.projects.items`.
2. Add the English version to `dictionaries.en.projects.items`.
3. Include `title`, `description`, `tech`, `repo`, and optional `demo`.

The UI will render the new card automatically.
