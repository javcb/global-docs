# Pattern Harvest Workflow

**Version:** 2026-04-10  
**Status:** Operational  

**Invoked by:** `harvest pattern [pattern] from [url or app name]`

---

## Overview

A workflow for observing a UI pattern in a live app or reference URL, producing a specification, building the component in the design system, writing a Storybook story, and updating the inventory.

---

## Phase 1 — Pattern Observation

### Goal:
Document exactly what the pattern does, looks like, and how it behaves.

### Steps:

1. **Access the source** (URL or locally running app)

2. **Observe and document the pattern:**

#### Interaction Spec
- **Default state:** What does it look like at rest?
- **Hover state:** What changes on hover?
- **Active/pressed state:** How does it look when selected?
- **Focus state:** Keyboard navigation indicator?
- **Loading state:** Is there a loading indicator?
- **Empty state:** What if there's no content?
- **Error state:** How are errors communicated?

#### Visual Spec
- **Dimensions and proportions:** Width, height, aspect ratios (approximate measurements)
- **Colors used:** Map each color to nearest design system token
- **Typography:** Font size, weight, color, line-height
- **Spacing:** Internal padding, gaps between elements, margins
- **Borders and radius:** Border width, color, border-radius values
- **Shadows:** Depth, direction, blur, spread
- **Gradients or backgrounds:** Any special treatment?
- **Animation:** What animates? Timing, easing, duration?

#### Behavior Spec
- **What triggers state changes?** Click? Hover? Focus? Keyboard?
- **Any keyboard interaction patterns?** Tab order? Arrow keys? Escape?
- **Any accessibility patterns?** ARIA roles, labels, live regions?
- **Any responsive behavior** differences at mobile?
- **Any performance considerations?** Lazy loading? Virtualization?

### Output: 
Create `PATTERN-SPEC-[name].md` with all sections above documented. Include screenshots if possible.

---

## Phase 2 — Component Build

### Goal:
Build the component using design system tokens and patterns.

### Steps:

1. **Check shop-first:**
   - Does this pattern already exist in `magic/`, `ui/`, or `blocks/`?
   - If yes: document the gap between existing and observed
   - Propose enhancement to existing component rather than new build
   - If no: proceed to build

2. **Determine correct location:**
   ```
   Animated/interactive with motion → src/components/magic/
   Static primitive (input variant, button variant) → src/components/ui/
   Full section pattern → src/blocks/
   ```

3. **Build the component:**
   - Use design system tokens throughout (NO hardcoded values)
   - Implement all states documented in Phase 1
   - Add TypeScript props interface with JSDoc comments
   - Ensure keyboard accessibility (focus states, keyboard handlers)
   - Ensure screen reader compatibility (aria labels, roles, live regions)
   - Use `forwardRef` for DOM-wrapping components
   - Set `displayName` for debugging

4. **Test the component:**
   ```bash
   npm run typecheck      # must pass
   npm run build          # must pass
   ```

---

## Phase 3 — Storybook Story

### Goal:
Create comprehensive Storybook stories for the component.

### Story file structure:
```
File: [ComponentName].stories.tsx
Location: same directory as component
```

### Stories to include:

1. **Default story** — Shows the component at rest

2. **All variant states** — Each interaction state from Phase 1:
   - Hover
   - Active/pressed
   - Focus
   - Loading
   - Empty
   - Error

3. **Interactive controls** (via `argTypes`) for key props:
   - Size variants (if applicable)
   - Color variants (if applicable)
   - State toggles

4. **Accessibility story** — Keyboard navigation demonstration:
   - Tab through the component
   - Show focus indicators
   - Demonstrate ARIA attributes

5. **Mobile viewport story** — Show component at 375px width

### Verification:
```bash
npm run storybook    # Launch and verify story appears
npm run build-storybook    # Must compile without errors
```

---

## Phase 4 — Inventory Update

### Goal:
Make the new component discoverable in the design system.

### Steps:

1. **Add component to `component-inventory.md`:**

   | Component | Location | Type | Description | Harvested From | Use Case |
   |-----------|----------|------|-------------|----------------|----------|
   | PatternName | src/components/magic/ | Animation | Describes it | Source URL | When to use |

2. **If it's a block, add to `src/blocks/INDEX.md`:**
   - Block ID
   - Block name
   - Description
   - Key variants

3. **If it's a magic component, add to `src/components/magic/README.md`** (if it exists)

4. **Commit all changes:**
   ```bash
   git add .
   git commit -m "feat: harvest [pattern-name] from [source]"
   git push
   ```

### Output Example:
```markdown
## PatternName

**Source:** [URL or app name]  
**Location:** src/components/magic/PatternName/  
**Type:** Interactive animation  
**Use Case:** When you need to [specific use case]

### Key Props
- `variant`: 'default' | 'compact' | 'expanded'
- `size`: 'sm' | 'md' | 'lg'
- `animated`: boolean

### Accessibility
- Keyboard navigable: ✅
- Screen reader tested: ✅
- ARIA roles: button, dialog, region (as applicable)

### Story
See PatternName.stories.tsx for interactive examples
```

---

## Completion Signal

```
Pattern harvest complete — [component path] — story written — inventory updated
```

---

## Checklist Before Marking Complete

- [ ] PATTERN-SPEC-[name].md exists with all sections
- [ ] Component file has TypeScript interface + JSDoc
- [ ] Component uses only design system tokens (no hardcoded values)
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Story file exists with ≥5 stories
- [ ] `npm run build-storybook` passes
- [ ] component-inventory.md updated
- [ ] Commit pushed to main
- [ ] PATTERN-SPEC-[name].md in repo root or PATTERNS/ directory

---

## Troubleshooting

**Component uses hardcoded color:**
- Find all hex values: `grep -r "#[0-9a-fA-F]" src/components/[ComponentName]/`
- Replace with design system token: `var(--color-primary)` or className `bg-primary`

**Story won't compile:**
- Check imports are correct: `import { PatternName } from "@/components/magic/PatternName"`
- Ensure component exports correctly: `export { PatternName }`
- Run TypeScript check: `npm run typecheck -- PatternName.stories.tsx`

**Component doesn't look right at mobile:**
- Screenshot at 375px
- Compare against source at 375px
- Check for responsive padding issues (sections bleeding to edge?)
- May need `theme-override.css` for mobile-specific overrides
