"use client";

import { useTransform, type MotionValue } from "framer-motion";

/**
 * Piecewise-linear scroll interpolation, evaluated in a transformer function.
 *
 * Use this instead of `useTransform(progress, inputRange, outputRange)` for any
 * numeric value driven by a pinned section's scroll progress.
 *
 * The reason is not style. When the input and output are plain numeric arrays,
 * Framer Motion can lift them out as static keyframes and hand the property to
 * the browser as a native WAAPI animation driven by a `ViewTimeline`. For
 * `opacity` it does exactly that, and the ViewTimeline it builds does not
 * reproduce `offset: ["start start", "end end"]` on a tall sticky section: with
 * the chapter at 86% of its real scroll progress the generated timeline sat at
 * 72%, so the Home to Plasence crossfade drifted out of step with the
 * transforms beside it and ran backwards as the reader scrolled down.
 *
 * A transformer function has no keyframes to extract, so the value stays on
 * Framer's own frame loop and reads exactly the same progress as everything
 * else in the scene. The cost is one function call per value per frame, which
 * is what the transforms in this chapter already do.
 */
export function useScrub(
  progress: MotionValue<number>,
  input: readonly number[],
  output: readonly number[],
): MotionValue<number> {
  return useTransform(progress, (value) => {
    const last = input.length - 1;
    if (value <= input[0]) return output[0];
    if (value >= input[last]) return output[last];
    for (let i = 1; i <= last; i += 1) {
      if (value > input[i]) continue;
      const span = input[i] - input[i - 1];
      const t = span === 0 ? 0 : (value - input[i - 1]) / span;
      return output[i - 1] + (output[i] - output[i - 1]) * t;
    }
    return output[last];
  });
}
