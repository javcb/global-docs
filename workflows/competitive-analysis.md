# Competitive Analysis Workflow

**Version:** 2026-04-10  
**Status:** Operational  

**Invoked by:** `analyze competitors for [industry] in [location]`

---

## Overview

A four-phase workflow for analyzing competitors in a given industry and location, identifying design patterns, UX gaps, and opportunities mappable to the design system.

---

## Phase A — Landscape Discovery

### Goal: 
Identify key competitors and document their basic information.

### Steps:

1. **Identify 5-8 competitors** in the specified industry + location

2. **For each competitor, record:**
   - Company name and primary URL
   - Product/service category
   - Apparent target customer
   - Pricing model (if visible)
   - Tech stack signals (from page source, job listings, careers page)

3. **Output:** Competitor landscape table in `COMPETITIVE-ANALYSIS-[industry]-[date].md`

   | Company | URL | Category | Target | Pricing | Tech Stack |
   |---------|-----|----------|--------|---------|-----------|
   | Company A | url | SaaS | Enterprise | Per-seat | Next.js, Tailwind |
   | Company B | url | SaaS | SMB | Freemium | Vue, Bootstrap |

---

## Phase B — UX and Design Audit

### Goal:
Understand the visual identity, layout patterns, and interaction approach of each competitor.

### For each competitor, analyze and document:

#### Visual Identity
- **Color palette:** primary, secondary, accent colors
- **Typography:** headline font, body font, weight usage patterns
- **Overall style:** minimal / bold / corporate / playful / etc.

#### Layout Patterns
- **Hero approach:** headline-first / visual-first / demo-first?
- **Navigation style:** minimal / mega-menu / sticky / transparent?
- **Social proof placement and type:** logos / testimonials / numbers / case studies?
- **CTA strategy:** single CTA / multiple CTAs / inline vs section-level?
- **Pricing page pattern:** per-seat / flat / freemium / contact-only?
- **Footer complexity:** minimal / full / mega-footer?

#### Interaction and Motion
- **Scroll animations:** present? subtle or dramatic?
- **Hover states:** active (clear feedback) or minimal?
- **Any notable micro-interactions:** button feedback, loaders, transitions?
- **Parallax or depth effects?**

#### Mobile Experience
- **Does layout hold at 375px?** Any layout breaks?
- **Mobile-specific navigation patterns?** Mobile menu, hamburger, bottom nav?
- **Touch target sizes adequate?** (min 44px)
- **Performance on mobile?** (observable lag or smooth?)

### Output: 
Add detailed audit table per competitor to report:

| Competitor | Color Palette | Typography | Hero Type | Navigation | Mobile Optimized? |
|-----------|---------------|-----------|-----------|-----------|------------------|
| Company A | Bold primary + accent | Serif headline, sans body | Visual-first | Sticky mega-menu | ✅ |
| Company B | Minimal gray scale | Sans throughout | Headline-first | Simple hamburger | ⚠️ |

---

## Phase C — Gap and Opportunity Mapping

### Goal:
Identify which patterns are table stakes vs differentiators vs white space.

### Steps:

1. **Identify patterns used by ≥3 competitors** (table stakes)

2. **Identify patterns used by only 1-2** (differentiators)

3. **Identify patterns NOT used by any** (white space / opportunity)

4. **Note which patterns map cleanly** to existing design system components

5. **Note which patterns would require new components** to implement

### Output: 
Gap map table:

| Pattern | # Competitors Using | In DS? | Opportunity Level | Design System Fit |
|---------|-------------------|--------|------------------|-----------------|
| Animated hero with scroll | 5/6 | ✅ (BlurFade) | Table stakes | Perfect |
| Interactive pricing calculator | 2/6 | ❌ | Differentiator | High build effort |
| Live demo embed | 0/6 | ❌ | White space | Medium build effort |
| Testimonial carousel | 5/6 | ✅ (Marquee) | Table stakes | Perfect |
| Gradient background hero | 4/6 | ✅ (CSS) | Table stakes | Easy |

---

## Phase D — Recommendations

### Goal:
Surface actionable insights for design system investment and positioning.

### Recommendations to include:

1. **Top 3 design system components** worth building based on gaps
   - Which gaps are repeated across competitors?
   - Which would have highest reuse potential?

2. **Top 3 layout patterns** worth adding to blocks library
   - Which section patterns appear repeatedly?
   - Which are missing from current blocks/INDEX.md?

3. **Visual identity observations**
   - What tone dominates the space? (modern / minimal / playful / serious?)
   - Is there room to zig while competitors zag?
   - What visual language would stand out?

4. **Suggested positioning**
   - Based on gaps, where does differentiation opportunity lie?
   - Color/typography/motion story to recommend?

### Example Recommendations:

```markdown
## Top 3 Components to Build
1. Interactive Pricing Calculator (only 2/6 have it - differentiator)
2. Advanced FAQ Accordion (5/6 have something - table stakes)
3. Live Chat Widget (1/6 have it - rare, could be unique)

## Top 3 Layout Patterns
1. Hero with Split Media + Text (4/6 use, our blocks don't cover)
2. Three-Column Feature Grid with Icons (5/6 use, we have basic version)
3. Customer Logos in Marquee (4/6 use, we have Marquee component)

## Visual Identity Insights
**Dominant tone:** Modern, minimal, with subtle motion. None use bold colors.
**Opportunity:** We could use richer color palette to stand out while remaining professional.

## Positioning Recommendation
Competitors are converging on "minimal + motion". Stand out with "intentional color + 
strategic motion". Use 3-color palette instead of gray scale. This aligns with our 
existing tokens and doesn't require new design system work.
```

---

## Completion Signal

```
Competitive analysis complete — [report path] — [N] competitors analyzed — 
[N] gaps identified — [N] recommendations
```

---

## Output Structure

Final `COMPETITIVE-ANALYSIS-[industry]-[date].md` should include:
- [ ] Phase A: Landscape Discovery table
- [ ] Phase B: Detailed audit tables per competitor
- [ ] Phase C: Gap mapping table
- [ ] Phase D: Recommendations section
- [ ] Summary: top insights in 3-5 bullets
