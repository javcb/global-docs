<!-- type: explanation -->

# Design System Philosophy

## Why This System Exists

A private, proprietary, AI-ready design system built so that any Claude or Cursor session can produce visually consistent, token-compliant, accessible, mobile-first UI on demand — without cleanup, without one-off components, without mystery.

The goal is not a component library. The goal is a factory floor: give an AI the blueprints and it builds the right thing every time.

---

## Core Principles

### 1. Consistency over speed

Every output traces back to one token file. Color, spacing, radius, typography — all controlled. A session six months from now produces output that matches a session today. No divergence, no "I'll fix this later" UI debt.

### 2. Provenance over mystery

Every file knows where it came from:
- **shadcn** = unstyled Radix primitives + tokens
- **Tailwind UI** = production-grade blocks, token-swapped
- **Cruip/Magic UI** = templates, analyzed and adapted
- **Custom** = built by us to fill gaps

When something breaks, you know exactly where to look. No surprise dependencies, no hidden integrations.

### 3. Shop before you build

The catalog exists to be used. Before any AI writes a single JSX element:
1. Check `component-inventory.md` — does a component exist?
2. Check `src/blocks/INDEX.md` — is there a block?
3. Only build custom if neither covers it.

Duplicate components are a system failure, not a feature.

### 4. Accessibility is acceptance criteria

Mobile-first, WCAG AA, keyboard nav, prefers-reduced-motion — these are not polish items. They are the definition of done. Every component, block, and page must meet this bar before commit.

Why? Because accessibility is about respect. Your app is used by people with different abilities, on different devices, with different preferences. Treating it as an afterthought is shipping a broken experience.

### 5. The flywheel model

Each project that uses the system makes it better:
- **Gaps found** → new components added
- **Patterns identified** → new blocks documented
- **Workflows refined** → prompts improved
- **Pain points surfaced** → architecture adjusted

The system compounds in value with every use.

### 6. AI-legible by design

Documentation is written for Claude and Cursor, not just humans.

`component-inventory.md`, `usage-for-ai.md`, `INDEX.md` — these exist so AI tools produce accurate output without hallucinating components or importing from the wrong place. If Claude reads your documentation and builds the wrong thing, the documentation failed.

---

## What the System Is NOT

- **Not a published npm package.** This is private, internal infrastructure.
- **Not a shared library for multiple teams.** It's built for your profile/org.
- **Not a replacement for product judgment.** AI builds what you design, not what's "best."
- **Not fully automated.** Human review before every commit.

---

## The Three-Layer Model

See: `docs/design-system/architecture.md` for complete explanation.

**Layer 1: Radix UI** — Accessibility primitives, behavior, keyboard nav, focus management
**Layer 2: shadcn/ui** — Radix + Tailwind + tokens = styled, token-compliant components
**Layer 3: Blocks** — Tailwind UI, Cruip, Magic UI = full patterns, sections, pages
**Custom:** Components that fill gaps layers 1-3 don't cover

---

## How This Philosophy Shapes Decisions

### Why framer-motion, not CSS animations?

Framer-motion is declarative and composable. You describe what you want, it handles performance, browser compatibility, and accessibility. AI-generated CSS animations are fragile and often inaccessible. Framer makes it hard to do it wrong.

### Why tokens, not Tailwind classes?

Tailwind is a utility framework. Tokens are a design language. Tokens let you change the entire app's color scheme in one file. Utility classes scattered across 50 files mean 50 places to update.

### Why blocks exist?

Because a "button" or "card" is tiny. A real app is made of sections: hero + CTA, feature grid, pricing table, testimonials. Blocks are that middle ground — small enough to be specific, large enough to be valuable.

### Why provenance matters?

Because you need to know: is this shadcn read-only code? Can I modify it? Did this come from Tailwind UI (probably shouldn't edit it)? Or is it custom (fair game)? Provenance answers that question instantly.

---

## Success Looks Like

- ✅ New session builds UI without asking "where should this button come from?"
- ✅ Output is production-ready on day one
- ✅ Every page respects dark mode, tokens, and mobile constraints
- ✅ Accessibility is never a surprise — it's automatic
- ✅ When you need a new pattern, you know exactly where to look (blocks) or what to build (custom component)
- ✅ UI updates happen at the token level, not file-by-file

---

## Further Reading

- **Architecture:** `docs/design-system/architecture.md`
- **Using with AI:** `docs/design-system/ai-usage-guide.md`
- **Token reference:** `docs/design-system/token-system.md`
- **Component decisions:** `docs/design-system/component-guide.md`
- **Repository map:** `docs/design-system/repo-map.md`
