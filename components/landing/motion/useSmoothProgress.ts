"use client";

import { useScroll, useSpring, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { SCROLL_OFFSET, SPRING, type ScrollOffsetPair } from "./tokens";

type SpringConfig = { stiffness: number; damping: number; mass: number };

/** Options accepted by `useSmoothProgress`. */
export type SmoothProgressOptions = {
  offset?: ScrollOffsetPair;
  spring?: SpringConfig;
  /** Set false to bypass smoothing (e.g. reduced motion). */
  enabled?: boolean;
};

/** Spring config that effectively disables smoothing (used when opted out). */
const INSTANT: SpringConfig = { stiffness: 1000, damping: 100, mass: 0.1 };

/**
 * A scroll progress value that has been run through a spring.
 *
 * This is the single biggest improvement to how the page "feels": every
 * scroll-linked transform previously read `scrollYProgress` directly, so the
 * product, orbit and background morph inherited the raw stepping of the input
 * device. The spring lets motion coast to a stop instead of snapping.
 */
export function useSmoothProgress<T extends HTMLElement>(
  target: React.RefObject<T | null>,
  options: SmoothProgressOptions = {},
): MotionValue<number> {
  const { offset = SCROLL_OFFSET.pinned, spring = SPRING.smooth, enabled = true } = options;

  const { scrollYProgress } = useScroll({ target, offset });

  // Hooks must run unconditionally, so the spring always runs; when smoothing
  // is disabled it uses a near-rigid config instead of being skipped.
  return useSpring(scrollYProgress, enabled ? spring : INSTANT);
}

/**
 * Smooths an arbitrary MotionValue (not just scroll progress). Useful for
 * pointer positions feeding magnetic / parallax effects.
 */
export function useSmoothedValue(value: MotionValue<number>, spring: SpringConfig = SPRING.smooth) {
  return useSpring(value, spring);
}

/**
 * Convenience: a ref plus its smoothed scroll progress in one call, so
 * components don't have to create and thread the ref themselves.
 */
export function useSectionProgress<T extends HTMLElement>(options: SmoothProgressOptions = {}) {
  const ref = useRef<T>(null);
  const progress = useSmoothProgress(ref, options);
  return [ref, progress] as const;
}