"use client";

import { cancelFrame, frame } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import "lenis/dist/lenis.css";

/**
 * Wraps the landing page in a Lenis smooth-scroll instance.
 *
 * Lenis drives the browser's *native* scroll position, so `position: sticky`
 * (used by every pinned section on this page), anchor links and accessibility
 * all keep working exactly as before — it only changes how the scroll position
 * is interpolated between frames.
 *
 * Two important details:
 * - `root` makes the instance globally reachable via `useLenis()` from anywhere,
 *   which is how other components trigger eased programmatic scrolls.
 * - `autoRaf: false` hands the render loop to Framer Motion's `frame.update`.
 *   Running Lenis on its own rAF loop next to Framer's produces a visible
 *   one-frame-late jitter between scroll-driven transforms and scroll position.
 *
 * Lenis honours `prefers-reduced-motion` on its own (it forces `lerp: 1` and
 * makes programmatic scrolls jump instantly), so no extra guard is needed here.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        // Low lerp => longer glide. 0.09 is the sweet spot between "premium"
        // and "laggy" on a trackpad.
        lerp: 0.09,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        smoothWheel: true,
        autoResize: true,
        overscroll: false,
        // The page is full of in-page hashes (#features, #business, ...).
        // Lenis intercepts anchor clicks, so they must be enabled explicitly.
        // The offset clears the fixed pill navigation.
        anchors: { offset: -96 },
      }}
    >
      {children}
    </ReactLenis>
  );
}