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
- **Footer**: Cleaner 4-column layout (Brand, Product, Compare, Company)
- **NEVER** duplicate links in header (no double Partner/Partner Program)

### Claims & Data
- **NEVER** fabricate ratings, review counts, or statistics
- **NEVER** claim features that don't exist
- **NEVER** invent AI model versions (GPT-5, Claude 4, etc.)
- **NEVER** use unattributed testimonials (no "Anonymous Shopify merchant")
- **NEVER** compare reviews/ratings when we have few or none - focus on features

### Post-Launch State (CURRENT STATUS)
LocaleFlow is NOW LIVE on Shopify App Store:
- **App Store URL**: https://apps.shopify.com/locale-flow
- **CTA Text**: "Start translating"
- **CTA Target**: App store link for regular users
- Partner program is for agency partners only, not main CTA
- **NEVER** show "Coming Soon" or fake review counts
- Focus on FEATURES, not social proof until we have reviews

### Competitor Data
- Only use verifiable data from actual app store listings
- Include date when data was last verified
- Mark uncertain data with "~" or "approx"
- Handle null/missing ratings gracefully (display "N/A")
- **NEVER** compare our reviews to competitors when we have few/none

### CTA Patterns
**Regular Users:**
- Text: "Install LocaleFlow from the Shopify App Store and start translating today."
- Button: "Start translating" -> `https://apps.shopify.com/locale-flow`

**Partners/Agencies:**
- Text: "Join our partner program for revenue share..."
- Button: "Become a Partner" -> `/partners#partner-form`

### Footer Link Registry
Protected by `.claude/hooks/footer-protection.sh`. All links below must remain in footer.

**Core Links:**
- /compare
- /roi-calculator
- /blog
- /partners
- /privacy
- /terms

**Comparison Blog Posts (SEO):**
- /blog/localeflow-vs-langify
- /blog/localeflow-vs-weglot
- /blog/localeflow-vs-transcy
- /blog/localeflow-vs-translate-and-adapt

**Comparison Pages (SEO):**
- /compare/hextom
- /compare/t-lab
- /compare/transtore
- /compare/vt-labs
- /compare/locales-ai
- /compare/ciwi
- /compare/langwill
- /compare/liquid-translator

When adding new comparison pages or vs blog posts, add to footer too.

---

## Hook System

LocaleFlow website has automated hooks matching Signkit's pattern:

**Location:** `.claude/settings.local.json`

**Active Hooks:**
| Hook | Trigger | Purpose |
|------|---------|---------|
| footer-protection.sh | PreToolUse (Edit/Write) | **BLOCKS** edits that remove required links from Footer.astro |
| auto-format.sh | PostToolUse (Edit/Write) | Auto-formats Astro/TS/TSX files with Prettier |

---

## Proactive Triggers

| When You See | Do This |
|--------------|---------|
| Creating `/compare/*.astro` | Add to /compare index grid AND Footer.astro |
| Creating `/blog/*-vs-*.md` | Add to Footer.astro comparison links grid |
| Any rating/review claim | Verify source or remove - never fabricate |
| "Get Early Access" CTA | Change to "Start translating" -> app store |
| Pre-launch messaging | Update to post-launch messaging |
| Editing Footer.astro | Hook will BLOCK if any of 18 required links removed |
| Review/rating comparisons | Remove if we have few reviews - focus on features |

---

## Website Expert Agent

Specialized agent at `/agents/website-expert.md` with:
- CORRECT/WRONG patterns for content
- Protected files list
- Key files registry
- Deployment checklist

Consult this agent for any website content or structure questions.

---

*Last updated: January 2, 2026*
