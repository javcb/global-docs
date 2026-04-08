# AI Instructions Supplement — design-system

Read universal-rules.md before this file.
This file adds design-system-specific rules only.

## What This Repo Is
A token-first UI component library built in layers:
  Layer 0: Design tokens (complete ✅)
  Layer 1: 25 primitive components (complete ✅)
  Layer 2: Composite components (in progress)
  Layer 3: Page pattern templates (not started)

Always check DESIGN-SYSTEM-CHECKLIST.md for current status.

## Required Reading (in order after universal-rules.md)
1. DESIGN-SYSTEM-CHECKLIST.md — current layer status
2. tokens/README.md — token architecture, all token rules
3. docs/usage-for-ai.md — component usage patterns
4. docs/component-conventions.md — file structure, naming

## Design System Specific Rules
1. NEVER use concrete Tailwind color classes.
   Forbidden: bg-blue-600, text-slate-900, border-gray-200
   Required: bg-primary, text-neutral-900, border-neutral-300
2. Never hardcode hex values in component files.
3. Every component: cva() for variants, cn() for composition.
4. Every DOM-wrapping component: forwardRef + displayName.
5. Every new component requires all three files:
   [Name].tsx + [Name].stories.tsx + index.ts
6. Every new component added to components/ui/index.ts.
7. Respect layer order — do not implement Layer N+1 items
   until all Layer N items are ✅ in the checklist.

## Stack (this repo)
- Next.js 15, React 19, TypeScript strict
- Tailwind CSS v4 with @theme (no tailwind.config.js)
- Storybook 8 via @storybook/nextjs
- Vitest + React Testing Library
