# Gung Ho Website

A React + Vite marketing website for **Gung Ho** with:
- Multi-page routing (home, about, services, contact)
- Centralized content in `en.json`
- SEO setup (meta tags, Open Graph, Twitter cards, JSON-LD, sitemap, robots)
- Tailwind v4 styling with a shared primary color system

## Tech Stack

- React 18
- Vite 6
- TypeScript
- Tailwind CSS 4
- React Router
- Radix/UI utility libraries

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Type-check and build production bundle
- `npm run preview` - Preview the built app locally

## Project Structure

```text
src/
  components/
    Seo.tsx
    Navbar.tsx
    Footer.tsx
  locales/
    en.json
  pages/
    home/
    about/
    contact/
    services/
      event-management/
      marketing-services/
  routes/
    index.tsx
  styles/
    index.css
    theme.css
public/
  robots.txt
  sitemap.xml
index.html
```

## Routing

Routes are defined in `src/routes/index.tsx`:

- `/`
- `/about`
- `/event-management`
- `/marketing-services`
- `/contact`

## Content and Localization

All UI text/content is centralized in:

- `src/locales/en.json`

Use this file to update:
- Navigation labels
- Page headings and descriptions
- Contact details and address
- SEO text values

## SEO

SEO is configured at two levels:

1. **Global** (`index.html`)
   - Base meta tags
   - Open Graph + Twitter tags
   - JSON-LD structured data

2. **Per page** (`src/components/Seo.tsx`)
   - Dynamic canonical URL
   - Dynamic meta description/keywords
   - Dynamic Open Graph + Twitter metadata
   - Browser tab title set to `Gung Ho`

Crawler files:
- `public/robots.txt`
- `public/sitemap.xml` (configured for `https://gungho.in`)

## Branding and Theme

- Favicon/logo is set in `index.html` from `src/assets/images/gungho-logo.png`
- Global primary color is defined in `src/styles/theme.css`
- UI components use the shared `primary` token for consistency

## Contact Location

Configured address and map are used in both footer and contact page via `en.json`:
