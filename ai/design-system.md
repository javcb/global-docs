# Design system usage for AI tools

## Where the design system lives

See architecture/registry.md for canonical location.
This repo contains all atoms, molecules, organisms, templates, and foundations.

## Status

Build and catalog state: see [architecture/registry.md](../architecture/registry.md).
Named components and tokens may still be incomplete.

## Interim rule (while design system is being built)

Until the design system is complete and documented with named components,
AI tools building any UI must:

1. Use only Tailwind utility classes — no custom component classes
2. Do not invent a component system or name components arbitrarily
3. Document every distinct UI pattern used (e.g. card layout, nav structure,
   button style) as a comment in the code marked: DESIGN-SYSTEM-CANDIDATE
4. Mark the project README with: "Design system pending — UI patterns
   are Tailwind-only and will be refactored when design system is complete"
5. Flag this status in the project's AI-INSTRUCTIONS.md status field

This ensures UI work done now is auditable and migratable when the
design system is ready, rather than being a tangle to unpick.

## Rule

Do not create new UI components from scratch unless a component does not exist in the design system.
Always use existing components by their documented names and variants.

## Inspiration

UI/UX work should reflect the design standards of top-tier product companies such as Apple and Netflix:
- clean hierarchy
- minimal clutter
- strong spacing and visual rhythm
- restrained color use
- obvious calls to action
- accessibility first

## How to reference components in prompts

Use exact names from the design system repo:
- "Use the PrimaryButton atom, large variant"
- "Use the DataTable organism with sortable columns"
- "Apply the DashboardLayout template"

Do not:
- Invent new components when an existing one will work
- Apply arbitrary colors, font sizes, or spacing outside the documented tokens
- Mix design systems from different kits without checking compatibility

## If a component is missing

Flag it. Do not invent it.
Note it in ai/future-ideas.md for later addition to the design system.

## Foundations to follow always

- Colors: use only documented color tokens
- Typography: use only documented type scale
- Spacing: use only documented spacing scale
- All defined in design-system/foundations/