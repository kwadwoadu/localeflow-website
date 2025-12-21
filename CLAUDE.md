# LocaleFlow Website

## Project Context
Landing pages for LocaleFlow - a Shopify translation app. Two main pages:
1. **Partner Program** (`/partners`) - For agency partnerships
2. **Marketing** (`/`) - For merchants

## Tech Stack
- **Framework**: Astro (static site generator)
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **Forms**: Cloudflare Workers (or Formspree fallback)

## Pages

### Partner Page (`/partners`)
Target: Shopify agencies
Goal: Convert to partner program signup
Content source: `/growth/landing-page/requirements.md`

### Marketing Page (`/`)
Target: Shopify merchants
Goal: Drive to Shopify App Store listing

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment
- **URL**: localeflowapp.com
- **Platform**: Cloudflare Pages
- **Build command**: `npm run build`
- **Output directory**: `dist`

## Content Guidelines
- Keep copy concise and benefit-focused
- Use real numbers (50+ merchants, 20-30% revenue share)
- Mobile-first design
- Fast loading (<1s target)

## Form Submissions
Partner signup forms should collect:
- Full name (required)
- Email (required)
- Agency name (required)
- Agency website (required)
- Shopify partner status (optional)
- Number of Shopify clients (optional)

---

*Last updated: December 5, 2025*
