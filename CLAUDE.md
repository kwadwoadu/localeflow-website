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

### Footer Link Registry (NEVER REMOVE)
All these links MUST remain in Footer.astro. Protected by `.claude/hooks/footer-protection.sh`.

**Comparison Pages:**
- /compare
- /roi-calculator
- /compare/hextom
- /compare/t-lab
- /compare/transtore
- /compare/langwill
- /compare/ciwi
- /compare/locales-ai
- /compare/vt-labs
- /compare/liquid-translator

**Blog vs Posts:**
- /blog/localeflow-vs-weglot
- /blog/localeflow-vs-langify
- /blog/localeflow-vs-transcy
- /blog/localeflow-vs-translate-and-adapt

When adding new comparison pages or vs blog posts, ALWAYS add to footer too.

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
| Creating `/compare/*.astro` | ALSO add link to Footer.astro Resources section |
| Creating `/blog/*-vs-*.md` | ALSO add link to Footer.astro Resources section |
| Any rating/review claim | Verify source or remove - never fabricate |
| "Start Free Trial" CTA | Change to "Get Early Access" (pre-launch) |
| Link to apps.shopify.com | Change to /partners#partner-form |
| Editing Footer.astro | Hook will BLOCK if required links removed |
| Content with claims | Check against Content Rules above |

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
