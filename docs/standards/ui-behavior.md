<!-- type: reference -->

# UI behavior standards

## Purpose

These standards apply to any site, app, or UI built under this system.
AI tools must follow these without being reminded on each project.

## State persistence

- Any UI element with collapsible, expandable, or toggle state across page
  navigations must persist that state using localStorage
- Key naming: use a descriptive key prefixed by app name, e.g. "global-docs-sidebar-state"
- On page load: restore state before first render to avoid visible layout flicker
- Default state must be explicitly defined and applied when no stored state exists
- The currently active item (current page, current route) must always be visible
  and its parent section always expanded, regardless of stored state

## Navigation

- Active page must be visually indicated in the nav (highlighted, bold, or accented)
- Sidebar or nav must not flash or reflow visibly on page load
- Nav state should be managed in one shared JS file, not per-page scripts

## Scroll position

- Do not reset scroll position unexpectedly on navigation
- For single-page apps: restore scroll position on back navigation where possible

## Zoom and font scaling

- Never override or interfere with browser zoom or user font size settings
- Use relative units (rem, em, %) not fixed px for font sizes and spacing
  so user zoom preferences are respected

## Responsive behavior

- All sites and apps must be readable on both desktop and mobile
- Sidebar should collapse to a hamburger menu on mobile viewports (below 768px)
- Content max-width should be respected on wide screens (e.g. max-width: 860px centered)

## Accessibility basics

- All interactive elements must be keyboard navigable
- Color contrast must meet WCAG AA minimum
- Never rely on color alone to convey meaning
