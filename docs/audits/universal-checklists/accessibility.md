# Universal Checklist — Accessibility

Reference from repo-local audit-process.md files.
Based on WCAG 2.1 AA. Checklist ID prefix: A11Y

## A11Y-1: Semantic Structure
- One <h1> per page/view
- Heading levels not skipped (h1 → h2 → h3)
- Landmark elements used: header, nav, main, footer
- Lists use ul/ol, not divs with margin
PASS = all present

## A11Y-2: Interactive Elements
- All interactive elements reachable by keyboard (Tab)
- focus-visible:ring on all focusable elements
  (never focus: — must be focus-visible:)
- Disabled state: pointer-events-none + opacity-50
- Touch targets minimum 44×44px
PASS = all present

## A11Y-3: Form Controls
- Every input has an associated label (htmlFor)
- Required fields use aria-hidden asterisk
- Error messages reference input via aria-describedby
- Native inputs present in DOM (sr-only, not display:none)
PASS = all present

## A11Y-4: ARIA Patterns
- Icon-only buttons have aria-label
- Custom checkboxes: native input sr-only,
  visual wrapper aria-hidden="true"
- Custom radios: same pattern as checkbox
- Toggle: role="switch" + aria-checked on input
- Decorative icons: aria-hidden="true"
PASS = all present

## A11Y-5: Color and Contrast
- Body text: 4.5:1 minimum contrast ratio
- Large text (24px+): 3:1 minimum
- Color is never the only signal
  (pair with icon, label, or pattern)
PASS = all ratios met
