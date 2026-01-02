# Skill: SEO Footer Links Strategy

## Purpose
Maximize internal linking for SEO by including comparison/content pages in footer.

## Why It Works
1. **Internal linking** - Every page links to comparison pages via footer
2. **Crawlability** - Search engines discover all pages easily
3. **Link equity** - Footer links pass PageRank to target pages
4. **User discovery** - Visitors find relevant content

## Implementation Pattern

### Footer Structure
```
┌─────────────────────────────────────────────────────────┐
│  Brand     Product        Compare           Company     │
│  Logo      Features       All Comparisons   Contact     │
│  Tagline   How It Works   ROI Calculator    Privacy     │
│            Blog           ─────────────     Terms       │
│            Partners       vs Competitor A               │
│                           vs Competitor B               │
│                           vs Competitor C               │
│                           ...                           │
└─────────────────────────────────────────────────────────┘
```

### Visual Hierarchy
- **Primary links**: Normal text (text-sm, text-gray-500)
- **Comparison links**: Smaller, lighter (text-xs, text-gray-400)
- **Separator**: Thin border between primary and comparison links
- **Grid layout**: 2-column for comparison links

### Code Pattern (Astro/Tailwind)
```astro
<!-- Primary Links -->
<ul class="space-y-3">
  <li><a href="/compare" class="text-gray-500 text-sm">All Comparisons</a></li>
</ul>

<!-- Comparison Grid -->
<div class="mt-4 pt-4 border-t border-gray-200">
  <div class="grid grid-cols-2 gap-x-4 gap-y-2">
    <a href="/compare/x" class="text-gray-400 text-xs">vs X</a>
    <a href="/compare/y" class="text-gray-400 text-xs">vs Y</a>
  </div>
</div>
```

### Hook Protection
Protect footer links with a PreToolUse hook that blocks removal:

```bash
REQUIRED_LINKS=(
    "/compare"
    "/compare/competitor-a"
    "/blog/product-vs-competitor"
    # ... all SEO-critical links
)
```

## Maintenance Rules
1. When adding new `/compare/*.astro` page -> Add to footer
2. When adding new `/blog/*-vs-*.md` post -> Add to footer
3. Update hook protection with new links
4. Document in CLAUDE.md Footer Link Registry

---

*Created: January 2, 2026*
