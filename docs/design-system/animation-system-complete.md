<!-- type: reference -->

# Complete Animation System Guide

## Overview

The design system's animation system is built on **framer-motion** with **token-based timing** and **automatic accessibility support**. This ensures animations are smooth, performant, and respect user preferences.

**Core principle:** Animations should delight, not distract. They inform the user's mental model, not break it.

---

## Why framer-motion

### framer-motion Advantages

**✅ Declarative** — You describe the outcome, not the steps:
```typescript
// What you want: fade in from top
<motion.div animate={{ opacity: 1, y: 0 }}>

// Not: keyframes, timers, transitions
```

**✅ JavaScript-driven** — Responds to state changes:
```typescript
const [isOpen, setIsOpen] = useState(false)
<motion.div animate={{ height: isOpen ? 'auto' : 0 }}>
  {/* Height responds to isOpen state */}
</motion.div>
```

**✅ Performant** — Uses GPU acceleration (transform + opacity only):
```typescript
// Optimized (GPU-accelerated)
animate={{ x: 100, opacity: 0.5 }}

// Avoid (CPU-heavy)
animate={{ width: 100, height: 100 }}  // Layout shift
```

**✅ Accessible** — Respects prefers-reduced-motion automatically:
```typescript
// Automatic (no extra code needed)
<motion.div animate={{ x: 100 }}>
  {/* Disabled if user has prefers-reduced-motion */}
</motion.div>
```

**✅ React-native** — Works with hooks and state:
```typescript
const controls = useAnimation()

useEffect(() => {
  controls.start({ opacity: 1 })  // Trigger animation on mount
}, [])
```

---

## Animation Tokens

Animations are controlled by three types of tokens: **durations**, **easings**, and **springs**.

### Duration Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--duration-instant` | 0ms | Disabled (prefers-reduced-motion) |
| `--duration-fast` | 150ms | Quick feedback (hover, focus) |
| `--duration-normal` | 300ms | Standard animations |
| `--duration-slow` | 500ms | Page transitions |
| `--duration-lazy` | 1000ms | Entrance, storytelling |

**Using durations:**
```typescript
<motion.div
  transition={{
    duration: parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--duration-normal')
    ) / 1000  // CSS values in ms, framer-motion expects seconds
  }}
/>

// Better: Use animation variants (already have durations built in)
<motion.div variants={fadeInUp} initial="hidden" animate="visible" />
```

### Easing Tokens

Easing controls acceleration and deceleration.

| Token | Cubic Bezier | Feel | Use |
|-------|--------------|------|-----|
| `--ease-linear` | (0, 0, 1, 1) | Constant speed | Progress bars |
| `--ease-in` | (0.4, 0, 1, 1) | Accelerating | Exit animations |
| `--ease-out` | (0, 0, 0.2, 1) | Decelerating | Entrance animations |
| `--ease-in-out` | (0.4, 0, 0.2, 1) | Smooth | Symmetric animations |
| `--ease-bounce` | (0.68, -0.55, 0.265, 1.55) | Bouncy | Playful entrances |

**Using easings:**
```typescript
<motion.div
  transition={{
    ease: [0, 0, 0.2, 1]  // cubic-bezier values
    // or
    ease: "easeOut"       // framer-motion shorthand
  }}
/>
```

### Spring Configurations

Springs provide physics-based motion (more natural than linear timings).

| Config | Stiffness | Damping | Feel |
|--------|-----------|---------|------|
| Smooth | 100 | 15 | Gentle, flowing |
| Bounce | 200 | 10 | Lively, bouncy |
| Stiff | 300 | 30 | Snappy, quick |

**Using springs:**
```typescript
<motion.div
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 15
  }}
/>
```

**When to use:**
- **Springs:** Interactive elements (buttons, draggables, user-triggered)
- **Timings:** Entrance animations, page transitions, looping animations

---

## Animation Variants (15+)

The design system exports 15+ pre-built animation variants from `src/lib/animation.ts`.

### Entrance Animations

These animate things coming into view.

```typescript
// Simple fade
fadeIn

// Directional fades (fade + slide)
fadeInUp
fadeInDown
fadeInLeft
fadeInRight

// Scale-based
scaleIn
scaleInBounce

// Slide-based
slideInLeft
slideInRight
slideInUp
slideInDown

// Rotation
rotateIn

// Blur reveal
blurReveal
```

**Usage:**
```typescript
import { fadeInUp } from "@/lib/animation"
import { motion } from "framer-motion"

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
  Content fades in and slides up
</motion.div>
```

### Container Patterns

For animating lists of items.

```typescript
staggerContainer  // Container that staggeres children
staggerItem       // Individual item (used with container)
```

**Usage:**
```typescript
import { staggerContainer, staggerItem } from "@/lib/animation"

<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.name}
    </motion.div>
  ))}
</motion.div>

// Result: Each item animates in sequence (0ms, 100ms, 200ms, etc.)
```

### Scroll Animations

For animations triggered by scroll.

```typescript
scrollReveal  // Triggers when scrolled into view
```

**Usage:**
```typescript
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { scrollReveal } from "@/lib/animation"
import { motion } from "framer-motion"

const { ref, isInView } = useScrollAnimation()

<motion.div
  ref={ref}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  variants={scrollReveal}
>
  This animates when scrolled into view
</motion.div>
```

---

## When to Animate: Decision Tree

### Level 1: Simple Hover/Focus

**Use:** CSS transitions (built-in, no framer-motion needed)

```css
/* In globals.css or component styles */
button {
  transition: all 300ms ease-out;  /* Automatic on all properties */
}

button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);  /* Subtle lift */
}
```

**When:** Button hovers, focus states, simple state changes

---

### Level 2: Enter/Exit Animation

**Use:** framer-motion with animation variant

```typescript
import { fadeInUp } from "@/lib/animation"
import { motion } from "framer-motion"

<motion.div initial="hidden" animate="visible" variants={fadeInUp}>
  Content fades in and slides up
</motion.div>
```

**When:** Modal opens, page loads, content reveals

---

### Level 3: Scroll-Triggered Animation

**Use:** `useScrollAnimation` hook + variant

```typescript
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { fadeInUp } from "@/lib/animation"

const { ref, isInView } = useScrollAnimation()

<motion.div
  ref={ref}
  animate={isInView ? "visible" : "hidden"}
  variants={fadeInUp}
>
  Animates when scrolled into view
</motion.div>
```

**When:** Hero section, feature highlights, timeline entries

**Options:**
```typescript
const { ref, isInView } = useScrollAnimation({
  threshold: 0.2,      // Trigger at 20% visible
  once: false,         // Re-trigger every time in view
  margin: "0px 0px -100px 0px"  // Trigger 100px before visible
})
```

---

### Level 4: Staggered List Animations

**Use:** staggerContainer + staggerItem

```typescript
import { staggerContainer, staggerItem } from "@/lib/animation"

<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

**When:** Lists, grids, menu items appear

---

### Level 5: Pre-built Magic UI Effects

**Use:** Magic components for complex animations

```typescript
import { BlurFade, Marquee, FadeText } from "@/components/magic"

// Blur reveal effect
<BlurFade>
  <h1>Heading with blur reveal</h1>
</BlurFade>

// Scrolling content loop
<Marquee>
  <div>Logo 1</div>
  <div>Logo 2</div>
  {/* ... repeats infinitely ... */}
</Marquee>

// Word-by-word fade
<FadeText text="Animate this text" splitBy="word" />
```

**Available:**
- `BlurFade` — Blur-out to sharp reveal
- `BorderBeam` — Rotating gradient border
- `Marquee` — Horizontally scrolling loop
- `FadeText` — Word/char-by-char fade
- `NumberTicker` — Animated counting
- `ShimmerButton` — Traveling shimmer
- `SparklesText` — Text with sparkles

---

### Level 6: Number Animation

**Use:** NumberTicker for animated counting

```typescript
import { NumberTicker } from "@/components/magic"

<div>
  <NumberTicker value={1000} />+ customers
</div>

// Advanced
<NumberTicker
  value={1234}
  prefix="$"
  suffix=".00"
  duration={2}
/>
```

---

### Level 7: Text Animation

**Use:** FadeText for animated text reveals

```typescript
import { FadeText } from "@/components/magic"

<FadeText
  text="Animate this text"
  splitBy="word"  // or "char"
  duration={1}
/>
```

---

### Level 8: Custom Animation

**Use:** Extend lib/animation.ts with custom variants

If the above 7 levels don't cover it:

1. Create variant in `lib/animation.ts`:
   ```typescript
   export const myCustomAnimation = {
     hidden: { opacity: 0, rotate: -180 },
     visible: { opacity: 1, rotate: 0 }
   }
   ```

2. Use in component:
   ```typescript
   import { myCustomAnimation } from "@/lib/animation"
   
   <motion.div variants={myCustomAnimation} initial="hidden" animate="visible" />
   ```

3. Document in Storybook story

---

## The 7 Magic Components

### BlurFade

Content reveals with blur-out effect.

```typescript
<BlurFade>
  <h1>Heading</h1>
</BlurFade>

// With props
<BlurFade delay={0.1} duration={0.8}>
  Content blurs then sharpens
</BlurFade>
```

**Use:** Hero headlines, feature reveals

---

### BorderBeam

Rotating gradient beam around border.

```typescript
<BorderBeam>
  <div className="border border-primary rounded-lg p-md">
    Content with animated border
  </div>
</BorderBeam>
```

**Use:** Featured cards, highlight boxes

---

### Marquee

Horizontally scrolling/looping content.

```typescript
<Marquee>
  <div>Logo 1</div>
  <div>Logo 2</div>
  <div>Logo 3</div>
  {/* Repeats infinitely */}
</Marquee>

// Vertical scrolling
<Marquee direction="up">
  {/* Scrolls up */}
</Marquee>
```

**Use:** Logo grids, testimonials, infinite lists

---

### FadeText

Word-by-word or character-by-character fade.

```typescript
<FadeText
  text="Hello world"
  splitBy="word"   // or "char"
/>
```

**Use:** Headlines, intros, emphasis

---

### NumberTicker

Animated number counting.

```typescript
<NumberTicker value={1000} />

// With formatting
<NumberTicker
  value={1234567}
  prefix="$"
  suffix="M"
/>
```

**Use:** Stat cards, KPI displays, metrics

---

### ShimmerButton

Button with traveling shimmer effect.

```typescript
<ShimmerButton>
  Click me
</ShimmerButton>
```

**Use:** CTA buttons, emphasis buttons

---

### SparklesText

Text with animated sparkles.

```typescript
<SparklesText text="Magic text with sparkles" />
```

**Use:** Highlights, emphasis, magical effects

---

## Prefers-Reduced-Motion Handling

**Automatic:** All animation variants respect `prefers-reduced-motion` without extra code.

```css
/* In animation-tokens.css */
@media (prefers-reduced-motion: reduce) {
  --duration-instant: 0ms;
  --duration-fast: 0ms;
  --duration-normal: 0ms;
  --duration-slow: 0ms;
  --duration-lazy: 0ms;
}
```

**Result:** Animations complete instantly for users with motion preferences.

**Testing:**
```bash
npm run storybook
# Look for "WithReducedMotion" variant in animation stories
```

---

## Component Animation Guidelines

### Best Practices

✅ **Do:**
- Use GPU-accelerated properties (transform, opacity)
- Respect duration tokens
- Include dark mode variant in Storybook
- Test prefers-reduced-motion
- Keep animations under 500ms (unless intentional)
- Use springs for interactive, easings for entrances

❌ **Don't:**
- Animate layout properties (width, height, padding)
- Create infinite looping animations (user annoyance)
- Use animations without purpose (distraction)
- Ignore prefers-reduced-motion
- Mix springs and easings in same animation

### Performance Checklist

- [ ] Animation uses transform/opacity only
- [ ] Duration is 150-500ms (or intentional)
- [ ] No layout shifts during animation
- [ ] Respects prefers-reduced-motion
- [ ] Tested at 60fps (browser devtools)
- [ ] Tested on low-end devices
- [ ] Accessibility considered (keyboard nav unaffected)

---

## Testing Animations in Storybook

Every animation component must have stories:

```typescript
// Component.stories.tsx
export const Default = () => <Component />

export const WithReducedMotion = () => (
  <div style={{ '--duration-normal': '0ms' } as React.CSSProperties}>
    <Component />
  </div>
)

export const Slow = () => (
  <div style={{ '--duration-normal': '1000ms' } as React.CSSProperties}>
    <Component />
  </div>
)
```

**In Storybook:**
1. Open Storybook
2. Find animation component
3. Click "WithReducedMotion" story
4. Verify animation completes instantly
5. Click "Default" story
6. Watch animation play normally

---

## Common Animation Mistakes

### ❌ Mistake 1: Animating Layout Properties

```typescript
// Wrong: layout shift causes jank
<motion.div animate={{ width: 100, height: 100 }}>

// Right: use transform instead
<motion.div animate={{ scale: 1.5 }}>
```

### ❌ Mistake 2: No Prefers-Reduced-Motion Support

```typescript
// Wrong: ignores user preference
<motion.div animate={{ x: 100 }} transition={{ duration: 0.5 }}>

// Right: use tokens (automatic)
<motion.div variants={slideInRight} initial="hidden" animate="visible">
```

### ❌ Mistake 3: Hardcoded Duration

```typescript
// Wrong
transition={{ duration: 0.3 }}

// Right: reference token
transition={{ 
  duration: parseFloat(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--duration-normal')
  ) / 1000
}}

// Best: use pre-built variants
variants={fadeInUp}
```

### ❌ Mistake 4: Infinite Looping

```typescript
// Wrong: annoying
<motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity }}>

// Right: only loop when intentional (loading spinner, decorative)
<motion.div animate={{ rotate: 360 }}>
```

---

## Advanced: Custom Animation Variants

Extend the animation system by adding variants:

### Step 1: Add to lib/animation.ts

```typescript
export const mySlideIn = {
  hidden: {
    opacity: 0,
    x: -100,
    skewX: 10
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}
```

### Step 2: Use in Component

```typescript
import { mySlideIn } from "@/lib/animation"

<motion.div variants={mySlideIn} initial="hidden" animate="visible">
  Content with custom animation
</motion.div>
```

### Step 3: Add Storybook Story

```typescript
export const WithCustomAnimation = () => (
  <motion.div variants={mySlideIn} initial="hidden" animate="visible">
    Custom animation example
  </motion.div>
)
```

---

## Performance Monitoring

Track animation performance:

```typescript
// In browser devtools
1. Open DevTools (F12)
2. Rendering tab → Show rendering stats
3. Watch FPS during animation
4. Goal: 60 FPS (avoid drops below 50 FPS)
```

**Optimization:**
- If FPS drops below 50: Use transform/opacity only
- If animation feels janky: Increase duration (let it breathe)
- If animation feels slow: Decrease duration (up to 500ms)

---

## Further Reading

- **Animation Tokens:** `token-system-complete.md#animation-tokens`
- **Component Decision Tree:** `component-decision-tree.md#animation-component-decision-tree`
- **Testing Strategy:** `testing-strategy.md`
- **Accessibility:** `accessibility-and-mobile.md`
