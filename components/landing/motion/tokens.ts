/**
 * Motion tokens — the single source of truth for how the landing page moves.
 *
 * Everything animated on the landing page should pull its curve, duration and
 * stagger from here so the whole page reads as one continuous piece of motion
 * rather than a set of unrelated effects.
 */

/** Cubic-bezier curves. Framer Motion accepts these as a 4-number tuple. */
export const EASE = {
  /** Long exponential-out. The signature "premium" curve — fast start, slow settle. */
  signature: [0.16, 1, 0.3, 1],
  /** The curve already used across the story sections. Kept for visual continuity. */
  story: [0.22, 1, 0.36, 1],
  /** Snappy in-out for hover / press feedback. */
  micro: [0.4, 0, 0.2, 1],
} as const;

/** Durations in seconds. */
export const DUR = {
  /** Masked headline reveals — deliberately slow so the text feels like it lands. */
  reveal: 1,
  /** Chapter / screen handovers in the pinned stories. */
  story: 0.62,
  /** Hover, press and other micro-interactions. */
  micro: 0.26,
  /** How long a chapter holds before handing over to the next one. */
  dwell: 0.18,
} as const;

/** Stagger offsets in seconds, expressed per element type. */
export const STAGGER = {
  /** Between lines of a masked headline. */
  line: 0.085,
  /** Between sibling items entering a viewport (cards, chips, links). */
  item: 0.07,
  /** Between the internal pieces of a chapter (index, eyebrow, title, body). */
  chapter: 0.06,
} as const;

/**
 * Spring configs. Scroll-driven values use these to smooth the raw scroll
 * position (which is what makes trackpad scrolling feel stepped today).
 */
export const SPRING = {
  /** Default smoothing for scroll-linked motion. */
  smooth: { stiffness: 110, damping: 24, mass: 0.6 },
  /** Heavier, floatier smoothing for background morphs and parallax layers. */
  lazy: { stiffness: 70, damping: 26, mass: 0.8 },
  /** Magnetic pull toward the cursor. */
  magnet: { stiffness: 200, damping: 22, mass: 0.5 },
  /** Press / tap feedback. */
  press: { stiffness: 420, damping: 30 },
  /** Device "settle" overshoot after a chapter handover. */
  settle: { stiffness: 260, damping: 20, mass: 0.7 },
} as const;

/** Shared viewport config so every `whileInView` fires at the same moment. */
export const VIEWPORT = {
  once: true,
  amount: 0.3,
} as const;

/**
 * The exact scroll-offset pairs used across the landing page.
 *
 * Declared as a literal union (rather than `string[]`) because Framer Motion
 * only accepts specific literals here — `"start start"`, `"end end"` etc. are
 * enumerated members of its offset type, and widening to `string` breaks it.
 */
export type ScrollOffsetPair =
  | ["start start", "end end"]
  | ["start end", "end start"]
  | ["start end", "end end"];

/** Scroll offsets used by `useScroll({ target, offset })`. */
export const SCROLL_OFFSET: Record<"pinned" | "through" | "enter", ScrollOffsetPair> = {
  /** Progress runs from "element top hits viewport top" to "element bottom hits viewport bottom". */
  pinned: ["start start", "end end"],
  /** Progress runs while the element travels through the viewport. */
  through: ["start end", "end start"],
  /** Progress runs from entering to the element's bottom reaching the viewport bottom. */
  enter: ["start end", "end end"],
};