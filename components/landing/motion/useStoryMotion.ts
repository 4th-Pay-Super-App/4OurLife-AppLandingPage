"use client";

import { useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { STAGGER } from "./tokens";

export type ScrollDirection = 1 | -1;

/**
 * Reports which way the user is scrolling.
 *
 * Used to make chapter transitions direction-aware: content arriving while
 * scrolling down slides up from below, content arriving while scrolling up
 * drops in from above. Without this, reversing direction mid-story looks
 * identical to continuing — a subtle but very noticeable "cheap" tell.
 *
 * A small dead-zone (`threshold`) prevents direction flicker when the scroll
 * position oscillates by a pixel or two.
 */
export function useScrollDirection(threshold = 6): ScrollDirection {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<ScrollDirection>(1);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - last.current;
    if (Math.abs(delta) < threshold) return;
    last.current = latest;
    const next: ScrollDirection = delta > 0 ? 1 : -1;
    setDirection((current) => (current === next ? current : next));
  });

  return direction;
}

export type ChapterState = {
  /** Index of the chapter currently on screen. */
  index: number;
  /** 0..1 progress within the active chapter slot. */
  within: number;
  /**
   * 0..1 progress through the *handover window* at the end of the slot.
   * Animating the device settle against this makes swaps feel physical.
   */
  swap: number;
};

/**
 * Fraction of each chapter slot given over to the handover into the next
 * chapter. Shared so the paced index and the device settle stay in lockstep.
 */
export const CHAPTER_DWELL = 0.22;

/** Progress through the handover window, as a function of overall progress. */
function handoverAt(value: number, count: number, dwell: number) {
  const raw = Math.min(0.999999, Math.max(0, value)) * count;
  const within = raw - Math.floor(raw);
  const windowStart = 1 - dwell;
  return within > windowStart ? (within - windowStart) / dwell : 0;
}

/**
 * Maps raw scroll progress to a paced chapter index.
 *
 * The old implementation was `Math.floor(progress * count)`, which flips the
 * chapter the instant the boundary is crossed — equal weight to every moment,
 * no dwell, and fast scrollers blow through chapters faster than the exit
 * animation can play, causing visible gaps with `AnimatePresence mode="wait"`.
 *
 * Here the chapter index only advances once the handover window is more than
 * half complete, so each chapter visibly *holds* a beat before changing over.
 */
export function usePacedChapter(progress: MotionValue<number>, count: number, dwell = CHAPTER_DWELL): ChapterState {
  const [state, setState] = useState<ChapterState>({ index: 0, within: 0, swap: 0 });

  useMotionValueEvent(progress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(0.999999, latest));
    const raw = clamped * count;
    const index = Math.min(count - 1, Math.floor(raw));
    const within = raw - index;

    // The next chapter is only revealed past the halfway mark of the handover,
    // which is what creates the dwell.
    const handover = handoverAt(clamped, count, dwell);
    const effective = handover > 0.5 ? Math.min(count - 1, index + 1) : index;
    const swap = handover > 0.5 ? (handover - 0.5) / 0.5 : handover;

    setState((current) =>
      current.index === effective && Math.abs(current.swap - swap) < 0.004
        ? current
        : { index: effective, within, swap },
    );
  });

  return state;
}

/**
 * A continuous "settle" scale for the device stage.
 *
 * The device compresses slightly as a handover completes and springs back,
 * which makes each swap feel tactile rather than switched.
 *
 * Derived directly from scroll progress rather than from `usePacedChapter`'s
 * `swap`: that value lives in React state and is throttled to avoid needless
 * re-renders, so animating from it would step. The sine shape matters too — it
 * returns to 1 at both ends of the window, so the dip is seamless across
 * chapter boundaries instead of snapping back.
 */
export function useChapterSettle(
  progress: MotionValue<number>,
  count: number,
  depth = 0.028,
  dwell = CHAPTER_DWELL,
) {
  return useTransform(progress, (value) => 1 - Math.sin(handoverAt(value, count, dwell) * Math.PI) * depth);
}

/** Shared variants for staggering a list of items into view. */
export function staggerChildren(delayChildren = 0) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: STAGGER.item, delayChildren } },
  };
}

export function staggerItem(distance = 22) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
}