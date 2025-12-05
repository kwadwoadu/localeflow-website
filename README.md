# LocaleFlow Website

Landing pages for LocaleFlow - Shopify translation app.

## Pages

- `/` - Marketing page for merchants
- `/partners` - Partner program page for agencies

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Cloudflare Pages](https://pages.cloudflare.com) - Hosting

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment

Deployed automatically via Cloudflare Pages on push to `main`.

**Live URL**: https://localeflow.pages.dev

## Project Structure

```
src/
├── pages/
│   ├── index.astro      # Marketing page
│   └── partners.astro   # Partner program page
├── layouts/
│   └── BaseLayout.astro # Shared layout
├── components/          # Reusable components
└── styles/
    └── global.css       # Global styles
```
