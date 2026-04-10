# Pattern Harvest Workflow

Workflow for studying UI patterns from any source and implementing them as reusable design system blocks. Use this when you've identified a pattern that needs to become a permanent part of the design system.

## Overview

This workflow guides you through:
1. Capturing pattern details and variations
2. Extracting core design decisions
3. Building a reusable, token-compliant block
4. Validating against design system standards
5. Documenting for future reuse

**Scope:** Single pattern → Reusable component/block (not a full UI recreation)

**Time estimate:** 1-3 hours per pattern (depending on complexity)

---

## Phase 1: Pattern Extraction

### 1.1 Define the Pattern

What exactly are you harvesting?

**Bad:** "The pricing page"
**Good:** "Pricing tier cards with feature list and CTA button"

**Template:**
```
## Pattern Definition

**Name:** [Clear, descriptive name]

**Purpose:** [What problem does it solve?]
- Example: "Display pricing options with comparison"

**Context:** [Where/when is it used?]
- Example: "Pricing pages, enterprise comparison, feature tiers"

**Source:**
- Product: [Name]
- URL: [Link]
- Screenshot date: [YYYY-MM-DD]
```

### 1.2 Document All Variations

Capture every way the pattern can appear:

**Example for pricing cards:**
```
## Variations

### Variation 1: Standard Card
- Title (bold, large)
- Price (large number + currency)
- Description (subtitle)
- Feature list (bullets)
- CTA button
- Badge (optional: "Most Popular")

### Variation 2: Compact Card
- Title only
- Price
- Brief description
- CTA button only (no feature list)
- No badge

### Variation 3: Highlighted Card (Premium tier)
- Same as standard, plus:
- Different background color
- Colored accent border
- "Recommended" badge
```

### 1.3 Capture Visual Details

For each variation, document:

**Color & Styling:**
```
Background: Light gray/off-white (#f9fafb or similar)
Text color: Dark gray (#1f2937)
Accent color: Blue (#2563eb)
Border: 1px light gray
Shadow: subtle drop shadow (4px offset)
Padding: 24px (matches design system spacing)
```

**Typography:**
```
Title: 18px, bold (font-weight 600), line-height 1.5
Price: 32px, bold, accent color
Description: 14px, muted gray
Feature text: 14px, regular
```

**Spacing:**
```
Card padding: 24px
Item gap: 16px
Between sections: 20px
```

**Interactive States:**
```
Hover:
  - Background lightens slightly
  - Shadow increases
  - CTA button changes state

Focus:
  - Focus ring appears (2px solid accent)
  - Outline offset: 2px

Disabled:
  - Opacity: 50%
  - Cursor: not-allowed
```

### 1.4 Map Interactions

Document all user interactions:

```
## Interactions

### Hover
- Trigger: Cursor over card
- Effect: Background color change, shadow depth increase
- Duration: 200ms ease-out

### Click
- Trigger: User clicks CTA button
- Effect: Navigate or expand
- Related state: Button becomes "active"

### Keyboard
- Tab: Focus moves to card/button
- Enter: Activate CTA
- Space: Toggle selection (if applicable)
```

---

## Phase 2: Design System Assessment

### 2.1 Inventory Available Components

Use `docs/component-inventory.md` and `src/blocks/INDEX.md` to identify existing patterns:

```
Pattern: Pricing card with feature list

Existing components:
✅ Card (for container)
✅ Button (for CTA)
✅ Badge (for "Most Popular" label)
❓ Feature list format (need to check if existing list pattern)
```

### 2.2 Identify Customizations Needed

For each component used, note necessary customizations:

```
## Customizations

Card:
- [x] Use as-is (no customization needed)

Button:
- [x] Use primary variant
- [ ] Need custom size? No
- [ ] Need custom color? No

Feature list:
- [ ] Use existing list component (if exists)
- [ ] Need custom styling? Maybe
  - Consider: Should list be styled differently than standard ul?
  - Decision: Use standard ul with custom spacing classes
```

### 2.3 Token Compliance Check

Verify all colors and spacing use design system tokens:

**Checklist:**
- [ ] No #hex color values (use bg-primary, text-muted-foreground, etc.)
- [ ] No hardcoded pixel values in styles (use spacing scale: p-6, gap-4, etc.)
- [ ] No concrete Tailwind colors (use semantic classes)
- [ ] All animations use standard duration/easing

**Example compliance:**
```
❌ BAD:
const CardStyle = `
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

✅ GOOD:
<div className="bg-muted border border-primary-foreground/10 p-6 shadow-md">
```

---

## Phase 3: Implementation

### 3.1 Choose Component Type

Decide what to build:

**Option A: Layout Block** (in `src/blocks/`)
- Use for: Full patterns, page sections, layout arrangements
- File: `src/blocks/[category]/[SubCategory]/[block-name].tsx`
- Best for: Complex, multi-component patterns

**Option B: Reusable Component** (in `src/components/`)
- Use for: Atomic, single-purpose elements
- File: `src/components/[Name]/[Name].tsx`
- Best for: Simple, composable elements

**Option C: Wrapper/Variant** (enhance existing)
- Use for: Minor variations of existing components
- File: Modify existing component or create wrapper
- Best for: 80/20 reuse cases

### 3.2 Create Component Structure

For layout blocks, follow this structure:

```typescript
/**
 * @source [source-app]
 * @category [category]
 * @block [block-name]
 * @token-swapped [YYYY-MM-DD]
 * @original [path to original if applicable]
 */

interface CardProps {
  title: string
  price: string
  description?: string
  features: string[]
  isHighlighted?: boolean
  onSelect: () => void
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  isHighlighted,
  onSelect,
}: CardProps) {
  return (
    <div className={classNames(
      'rounded-lg border p-6 transition-all duration-200',
      isHighlighted ? 'border-primary bg-primary/5' : 'border-primary-foreground/10 bg-muted'
    )}>
      {/* Implementation */}
    </div>
  )
}
```

### 3.3 Implement With Design System

**Key Rules:**
1. Use only design system tokens (no #hex, no concrete colors)
2. Use semantic class names (primary, muted-foreground, etc.)
3. Responsive classes for multiple viewports
4. No hardcoded values (use Tailwind spacing scale)

**Example implementation:**
```tsx
export default function PricingCard({ title, price, features, isHighlighted, onSelect }) {
  return (
    <div className={classNames(
      'flex flex-col gap-6 rounded-lg border p-6 transition-all duration-200',
      isHighlighted
        ? 'border-primary bg-primary/5 shadow-lg'
        : 'border-primary-foreground/10 bg-muted hover:shadow-md'
    )}>
      
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-primary-foreground">
          {title}
        </h3>
        {isHighlighted && (
          <Badge variant="default" className="mt-2">
            Most Popular
          </Badge>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-primary">
          {price}
        </span>
        <span className="text-sm text-muted-foreground">/ month</span>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-primary-foreground">
            <CheckIcon className="size-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        onClick={onSelect}
        variant={isHighlighted ? 'default' : 'outline'}
        className="w-full"
      >
        Get Started
      </Button>
    </div>
  )
}
```

### 3.4 Add Stories File

Create `[component].stories.tsx` with examples:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import PricingCard from './PricingCard'

const meta = {
  title: 'Blocks/Pricing/Card',
  component: PricingCard,
  args: {
    title: 'Pro Plan',
    price: '$99',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    isHighlighted: false,
  },
} satisfies Meta<typeof PricingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {}

export const Highlighted: Story = {
  args: {
    isHighlighted: true,
  },
}

export const CompactView: Story = {
  args: {
    features: ['Feature 1', 'Feature 2'],
  },
}
```

---

## Phase 4: Validation

### 4.1 Token Compliance Audit

Run checks to ensure compliance:

**Manual review:**
```bash
# Check for hardcoded colors
grep -r "#[0-9A-Fa-f]\{6\}" src/components/YourComponent/

# Check for concrete color names
grep -r "bg-blue-\|text-red-\|border-gray-" src/components/YourComponent/

# Check for hardcoded pixel values in className
grep -r "p-\[" src/components/YourComponent/
```

**Automated check:** Run `npm run token-audit` if available

### 4.2 Visual Validation

- [ ] Matches source screenshot exactly (colors, spacing, sizing)
- [ ] Responsive at 320px, 768px, 1200px breakpoints
- [ ] No horizontal scrolling on mobile
- [ ] Text is readable (4.5:1 contrast on normal text)
- [ ] Interactive states (hover, focus, active) work correctly

### 4.3 Accessibility Check

- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter)
- [ ] Focus indicators are visible
- [ ] ARIA labels present where needed
- [ ] Color not sole indicator of state/information
- [ ] Touch targets are 44px+ (mobile)

**Screen reader test:**
```bash
# On macOS: System Preferences > Accessibility > VoiceOver (or use safari)
# On Windows: NVDA (free, open-source)
# On Linux: Orca

# Test: Navigate with Tab, verify content is announced correctly
```

### 4.4 Design System Rules Check

**Checklist:**
- [ ] No concrete Tailwind colors (bg-blue-600, text-gray-900, etc.)
- [ ] No hex values (#2563eb, #1f2937, etc.)
- [ ] No hardcoded spacing (style={{ padding: '24px' }})
- [ ] Uses cva for variants (if needed)
- [ ] forwardRef + displayName on DOM elements (if reusable component)
- [ ] Proper TypeScript types
- [ ] JSDoc comments for public props

---

## Phase 5: Documentation & Integration

### 5.1 Update Component Inventory

Add entry to `docs/component-inventory.md`:

```markdown
| [Component Name] | `@/components/[path]` or `src/blocks/[path]` | [Purpose and use case] |
```

### 5.2 Create Usage Documentation

Add section to `docs/usage-for-ai.md`:

```markdown
### PricingCard

**When to Use:**
- Displaying pricing plans with feature comparison
- Tier selection interfaces
- Pricing page layouts

**Basic Usage:**
\`\`\`tsx
import PricingCard from '@/components/PricingCard'

<PricingCard
  title="Pro Plan"
  price="$99"
  features={['Feature 1', 'Feature 2']}
  isHighlighted={true}
  onSelect={() => console.log('Selected')}
/>
\`\`\`

**Variants:**
- Standard: Basic card with features list
- Highlighted: Accent styling for recommended tier

**Don't Use When:**
- Displaying a single plan (use Card component instead)
- You need custom feature icons (extend the component)
```

### 5.3 Document Pattern in Block Index

If it's a block, verify it appears in `src/blocks/INDEX.md`:

```bash
# Run the index generator
npm run generate-block-index
```

### 5.4 Add Provenance Header

Ensure the component has proper provenance:

```typescript
/**
 * @source [original-source: tailwind-ui, custom, competitor, etc.]
 * @category [category]
 * @block [block-name] (if block)
 * @token-swapped [today's date]
 * @original [path to original if applicable]
 */
```

---

## Phase 6: Quality Assurance

### 6.1 Pre-Merge Checklist

Before committing:

- [ ] Component renders without errors
- [ ] Storybook stories compile and display correctly
- [ ] No console errors or warnings
- [ ] Tests pass (if applicable)
- [ ] TypeScript strict mode passes
- [ ] Code follows project conventions
- [ ] Accessibility tests pass
- [ ] Responsive design verified
- [ ] Token compliance verified
- [ ] Documentation is complete

### 6.2 Code Review Preparation

Prepare for developer review:

- [ ] Explain where pattern came from (source, why it's valuable)
- [ ] List all design system components used
- [ ] Note any customizations or exceptions
- [ ] Call out any gaps or limitations
- [ ] Provide screenshots of all variations
- [ ] Include accessibility test results

### 6.3 After Merge

- [ ] Update DESIGN-SYSTEM-CHECKLIST.md if major new capability
- [ ] Announce addition in team communication
- [ ] Monitor for issues in downstream usage

---

## Troubleshooting

### "The pattern uses a color that doesn't match any token"

**Solution:**
1. Check if semantic token exists that's close (primary, secondary, success, etc.)
2. If not, request new token from design team or create theme variant
3. Document the mismatch and rationale
4. Don't hardcode the color—use a token placeholder and mark as TODO

### "The pattern needs complex animations"

**Solution:**
1. Check if Framer Motion is available in the project
2. If not available, consider simpler CSS transitions as fallback
3. If critical, this becomes a blocker for Phase 3D intake
4. Document the animation requirement clearly

### "This pattern overlaps with an existing component"

**Solution:**
1. Review the existing component's capabilities
2. Determine if the new pattern is a variant of existing
3. Options:
   - Extend existing component with new prop
   - Create wrapper component around existing
   - Mark as duplicate and use existing pattern instead

### "Responsiveness is different from the source"

**Solution:**
1. Ask: Is the responsive behavior core to the pattern?
2. If no: Match your design system's breakpoints
3. If yes: Document the custom breakpoints and rationale
4. Verify readability at all breakpoints

---

## References

- **Token Compliance:** See `docs/token-audit-prompt.md`
- **Component Inventory:** See `docs/component-inventory.md` and `src/blocks/INDEX.md`
- **Accessibility Standards:** See `CLAUDE.md` "Accessibility and Mobile" section
- **For competitive analysis:** See `workflows/competitive-analysis.md`
- **Design conventions:** See `docs/component-conventions.md`
