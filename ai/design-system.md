# Design system usage for AI tools

## Where the design system lives

See architecture/registry.md for canonical location.
This repo contains all atoms, molecules, organisms, templates, and foundations.

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