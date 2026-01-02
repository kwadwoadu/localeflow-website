# LocaleFlow Website Changelog

## [2026-01-02] Post-Launch Content Overhaul

**Type:** Feature
**Commits:** f3b6c92, fa600db, 0c1e281, f83dbd4

### Summary
Major content update to transition website from pre-launch to post-launch state. LocaleFlow is now live on Shopify App Store.

### Changes
- Updated all CTAs: "Get Early Access" -> "Start translating" -> app store
- Removed Social Proof row from comparison tables (no review comparisons)
- Removed "Coming Soon" stat boxes from all compare pages
- Redesigned footer: clean 4-column layout with 12 SEO comparison links
- Updated footer-protection hook: now enforces 18 required links
- Updated CLAUDE.md and website-expert.md with post-launch rules

### Files Changed
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/compare/ComparisonTable.tsx`
- `src/components/compare/VsComparison.tsx`
- `src/data/competitors.ts`
- `src/pages/compare/*.astro` (8 files)
- `src/pages/compare/index.astro`
- `src/pages/roi-calculator.astro`
- `.claude/hooks/footer-protection.sh`
- `CLAUDE.md`
- `agents/website-expert.md`

### Patterns Extracted
- `skills/post-launch-transition.md` - Checklist for pre->post-launch content updates
- `skills/seo-footer-links.md` - SEO internal linking via footer

### Key Principle
**"Never look weak"** - Don't compare metrics (reviews, ratings) where you're at a disadvantage. Focus on features instead.

---

*Last updated: January 2, 2026*
