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
- **Project name**: `localeflow`
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **IMPORTANT**: Deployments are **MANUAL** via wrangler:
  ```bash
  npm run build && wrangler pages deploy dist --project-name=localeflow
  ```

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

## Content Rules (NEVER VIOLATE)

### Navigation
- **Header nav**: Core pages only (Features, How It Works, Blog, Partners, Contact)
- **Footer**: All pages including tools, comparisons, resources
- **NEVER** duplicate links in header (no double Partner/Partner Program)

### Claims & Data
- **NEVER** fabricate ratings, review counts, or statistics
- **NEVER** claim features/trials that don't exist
- **NEVER** invent AI model versions (GPT-5, Claude 4, etc.)
- **NEVER** use unattributed testimonials (no "Anonymous Shopify merchant")
- If LocaleFlow isn't on Shopify App Store yet, don't link there

### Pre-Launch State (CURRENT STATUS)
Until LocaleFlow is live on Shopify App Store:
- No star ratings or review counts for LocaleFlow
- No "free trial" claims
- CTAs should be "Get Early Access" or "Join Waitlist"
- Link to `/partners#partner-form`, not app store
- Display "Coming Soon" or "Full metaobject support" instead of ratings

### Competitor Data
- Only use verifiable data from actual app store listings
- Include date when data was last verified
- Mark uncertain data with "~" or "approx"
- Handle null/missing ratings gracefully (display "N/A")

### CTA Patterns
**Pre-launch (now):**
- Text: "Be first to try LocaleFlow when we launch."
- Button: "Get Early Access" → `/partners#partner-form`

**Post-launch (future):**
- Text: "Start your 7-day free trial..."
- Button: "Start Free Trial" → `https://apps.shopify.com/localeflow`

---

*Last updated: January 2, 2026*
