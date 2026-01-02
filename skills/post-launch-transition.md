# Skill: Post-Launch Content Transition

## Purpose
Systematically update website content from pre-launch to post-launch state.

## When to Use
When a product goes live and website still has pre-launch messaging.

## Checklist

### 1. CTAs
- [ ] Change "Get Early Access" / "Join Waitlist" -> "Start [action]"
- [ ] Update CTA links from signup forms -> app store/product
- [ ] Update supporting text (e.g., "Be first to try..." -> "Install today...")

### 2. Social Proof
- [ ] Remove review/rating comparisons if you have few/none
- [ ] Remove "Coming Soon" placeholders
- [ ] Focus on FEATURES until you have real social proof
- [ ] Never compare metrics where you're at a disadvantage

### 3. Components to Check
- [ ] Header CTA button
- [ ] Hero sections on all pages
- [ ] Comparison tables (remove Social Proof row)
- [ ] Individual comparison pages
- [ ] Blog post CTAs
- [ ] Footer CTAs

### 4. Documentation
- [ ] Update CLAUDE.md with post-launch rules
- [ ] Update agent files with new patterns
- [ ] Update any PRDs to mark as complete

## Anti-Patterns

**WRONG:**
```
"Coming Soon" | "N/A" | "0+ reviews"
"Get Early Access" -> /signup-form
Comparing our 0 reviews to competitor's 1,231 reviews
```

**CORRECT:**
```
"Start translating" -> https://apps.shopify.com/your-app
Focus on features, pricing, capabilities - not reviews
```

## Example Files Changed (LocaleFlow)
- Header.astro - CTA button
- VsComparison.tsx - Removed review comparison section
- ComparisonTable.tsx - Removed SOCIAL PROOF row
- 8 compare/*.astro pages - Removed stat boxes
- CLAUDE.md - Updated content rules

---

*Created: January 2, 2026*
