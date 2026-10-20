"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * `useLayoutEffect` would warn during SSR, but the measurement has to land
 * before the browser paints the hydrated tree.
 */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The scene conditions, as one query.
 *
 * This string must stay identical to the media query that opens the THE SCENE
 * block in `home.module.css`. The stylesheet decides the layout, this decides
 * whether motion values are attached to it, and the two only line up because
 * they ask the same question. Reduced motion is tested here rather than through
 * Framer's `useReducedMotion` so that both answers come from one place and
 * resolve synchronously.
 */
const SCENE = "(min-width: 901px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

export type StageMode =
  /** Pinned stage, scroll-scrubbed device travel. */
  | "scene"
  /** Ordinary document flow: every act becomes its own stacked block. */
  | "flow";

/**
 * Whether this viewport runs the scroll choreography.
 *
 * Returns "flow" on the server and on the first client render, then upgrades
 * once the media query can be read. That upgrade is invisible: the stylesheet
 * has already painted the scene layout at the resting state of act 1, so all
 * this adds is the motion. It must never be used to decide anything the reader
 * can see before hydration, because for the first second or two of a cold load
 * it is "flow" on every device.
 */
export function useStageMode(): StageMode {
  const [scene, setScene] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia(SCENE);
    const sync = () => setScene(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return scene ? "scene" : "flow";
}
