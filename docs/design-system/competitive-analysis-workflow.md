<!-- type: workflow -->

# Competitive Analysis Workflow

## When to Use This

Use competitive analysis when building a product for a specific market. Study competitors to:
- Learn what UI patterns are industry standard
- Identify gaps in the competitive landscape
- Map competitor UIs to design system components
- Find opportunities to design better

**Example scenarios:**
- Building a new SaaS dashboard (study Asana, Linear, Notion)
- Creating an e-commerce site (study Shopify, WooCommerce competitors)
- Building a content platform (study Medium, Substack competitors)
- Designing a B2B tool (study industry leaders)

---

## The Process (5 Steps)

### Step 1: Select Competitors

Choose 3-5 competitors to analyze.

**Selection criteria:**
- ✅ Direct competitors (same market, same users)
- ✅ Market leaders (industry standard patterns)
- ✅ Different approaches (diverse design philosophies)
- ❌ Avoid: Small/niche players with poor UX

**Example (SaaS dashboard):**
- Asana (team collaboration)
- Linear (issue tracking)
- Notion (knowledge base)
- Monday.com (project management)
- Jira (enterprise workflow)

---

### Step 2: Mirror Competitor Sites

Create local copies of competitor websites so you can study them offline.

**Tools:**
- **HTTrack Website Copier** (free, open-source)
  ```bash
  httrack https://asana.com -O ./asana-mirror
  ```
- **wget** (command-line)
  ```bash
  wget -r https://asana.com
  ```
- **Wayback Machine Archive** (https://web.archive.org/)

**What to capture:**
- Marketing homepage
- Product pages
- Feature documentation
- UI patterns and components
- Typography, colors, spacing
- Interaction patterns (hover, focus, animations)

---

### Step 3: Identify UI Patterns

For each competitor, document:
1. **Navigation patterns** (sidebar, top nav, breadcrumbs)
2. **Data display** (tables, cards, grids)
3. **Forms and inputs** (multi-step, validation, error states)
4. **Interactions** (modals, dropdowns, popovers)
5. **Animations** (transitions, entrance/exit, feedback)
6. **Typography** (hierarchy, font choices)
7. **Color usage** (brand, semantic colors, contrast)
8. **Mobile adaptation** (responsive breakpoints, touch targets)

**Document in a table:**

| Pattern | Asana | Linear | Notion | Notes |
|---------|-------|--------|--------|-------|
| **Top Navigation** | Fixed, dark | Sticky, light | Varies | Asana most prominent |
| **Sidebar** | Collapsible | Persistent | Sidebar focus | All have sidebar |
| **Data Table** | Sortable, filterable | Minimal rows | Card view | Asana most featured |
| **Buttons** | Rounded, colored | Minimal, subtle | Ghost dominant | Different philosophies |
| **Forms** | Step-by-step | Single page | Modal-based | Different approaches |
| **Colors** | Blue primary | Blue primary | Multicolored | Blue seems standard |

---

### Step 4: Map to Design System

For each pattern, identify which design system components could implement it:

```markdown
## Asana Dashboard Navigation

**Pattern:** Fixed sidebar with collapsible sections

**Design System Match:**
- Sidebar component: ✅ Block available (application-shells/)
- Collapse component: ✅ shadcn Collapsible
- Button styles: ✅ shadcn Button with ghost variant
- Icons: ✅ Lucide React

**Gaps:** None for this pattern

**Implementation:** Use sidebar block + customize with custom data
```

---

### Step 5: Report and Build

Create a competitive analysis report:

```markdown
# Competitive Analysis Report

## Market Landscape

**Analyzed:** Asana, Linear, Notion, Monday.com, Jira
**Date:** 2026-04-09
**Goal:** Understand SaaS dashboard patterns

## Top 5 UI Patterns

1. **Persistent Sidebar Navigation**
   - All competitors use collapsible sidebar
   - Sections group related items
   - Design system: ✅ Available (application-shells/)

2. **Tabular Data Display**
   - Sortable columns, inline editing
   - Design system: ✅ Custom DataGrid available

3. **Floating Modals for Workflows**
   - Create, edit, settings in modals
   - Design system: ✅ shadcn Dialog

4. **Keyboard Shortcuts**
   - Cmd/Ctrl+K opens search
   - Design system: ✅ Build with shadcn Command

5. **Status Badges and Indicators**
   - Visual status (assigned, due, blocked)
   - Design system: ✅ shadcn Badge + custom indicators

## Implementation Recommendation

Use design system for all core patterns.
Build custom components for:
- Inline editing in tables (unique to product)
- Custom kanban board (workflow-specific)
- Real-time collaboration indicators (real-time feature)

**Estimated effort:** 3-4 weeks with design system
```

---

## Detailed Analysis Template

For each competitor, create a detailed breakdown:

```markdown
## Asana Detailed Analysis

### Navigation Pattern
- **Type:** Fixed sidebar with floating panel
- **Width:** ~250px (collapsible to ~60px)
- **Items:** 6-8 main, 20+ sub-items
- **Behavior:** Click to navigate, hover to reveal text
- **Mobile:** Hamburger menu, hidden sidebar

### Data Table
- **Sortable:** Yes (click header)
- **Filterable:** Yes (filter button)
- **Editable:** Yes (click cell to edit)
- **Selection:** Checkboxes on each row
- **Columns:** Configurable

### Color Palette
- **Primary:** #0066CC (blue)
- **Text:** #151515 (dark gray)
- **Borders:** #CCCCCC (light gray)
- **Success:** #36B37E (green)
- **Error:** #EF2D34 (red)

### Typography
- **Font:** -apple-system, Segoe UI, sans-serif
- **Headings:** 24px, 600 weight
- **Body:** 13px, 400 weight
- **Monospace:** Monaco (code)

### Interactions
- **Hover:** Background color subtle shift
- **Focus:** Outline ring (2px)
- **Click:** Instant (no fake delays)
- **Animation:** 200ms easing
```

---

## SWOT Analysis Per Competitor

For strategic insight, create SWOT for each:

```markdown
## Asana SWOT

**Strengths:**
- Polished UI with cohesive design
- Excellent keyboard navigation
- Smart defaults (minimal configuration needed)
- Strong brand consistency

**Weaknesses:**
- Complex information hierarchy (overwhelming)
- Limited customization options
- Dark colors reduce readability
- Steep learning curve for new users

**Opportunities:**
- Simplify navigation (too many options)
- Lighter color scheme option
- Better mobile experience
- More transparent pricing

**Threats:**
- Linear is simpler (winning customers on simplicity)
- Notion is more flexible (winning on customization)
- Competitors have better dark mode
```

---

## Building Your Better Version

After analysis, identify opportunities:

```markdown
## Our Approach: Better Than Competitors

**Linear's Strength:** Simplicity → Our version: Simple + Powerful
- Use Linear's minimalist nav pattern
- Add customization Linear lacks
- Keep their clean aesthetic

**Asana's Strength:** Completeness → Our version: Complete + Intuitive
- Use Asana's feature-rich approach
- Improve information hierarchy
- Better defaults

**Notion's Strength:** Flexibility → Our version: Flexible + Guiding
- Use Notion's block paradigm
- Add templates (reduce customization burden)
- Better for beginners
```

---

## Using Competitive Analysis Results

### For Design Decisions

```
Q: Should we use sidebar or top nav?
A: Analysis shows 95% of competitors use sidebar.
   Recommendation: Use sidebar pattern.
   Design system: ✅ Available block
```

### For Feature Prioritization

```
Q: What features are table must-haves?
A: All competitors have: sort, filter, selection
   Some have: inline editing, multi-select actions
   Recommendation: Include all above
   Design system: ✅ Custom DataGrid has all
```

### For Visual Design

```
Q: What color should our primary action be?
A: Competitor analysis:
   - Asana: #0066CC (blue)
   - Linear: #0D66D0 (blue)
   - Notion: #0A7EA4 (blue-ish)
   Recommendation: Use blue as industry standard
   Design system: ✅ --color-primary is blue
```

---

## Documenting Findings

Create a permanent record:

**Location:** `global-docs/docs/competitive-analysis/`

**Files to create:**
- `market-overview.md` (all competitors, summary)
- `asana-analysis.md` (detailed)
- `linear-analysis.md` (detailed)
- ... (one per competitor)
- `recommendations.md` (implementation strategy)

**Reference in:** `design-system-shadcn-tailwind/DESIGN-SYSTEM-CHECKLIST.md`

---

## Connecting to Phase 5 Templates

After competitive analysis, your insights inform which templates to recreate:

```
Q: Should we recreate the "Asana-like" dashboard?
A: Yes, if our market needs similar features
   No, if competitors have different patterns

Q: Which template best matches?
A: Magic UI SaaS (similar layout)
   Fintech (similar data complexity)
```

---

## Further Reading

- **Template Catalog:** `templates-catalog.md`
- **Component Decision Tree:** `component-decision-tree.md`
- **Design System Principles:** `philosophy.md`
