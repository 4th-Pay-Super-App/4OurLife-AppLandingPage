"use client";

import Grainient from "./Grainient";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * The hero's atmospheric wash: a React Bits Grainient, carried over from the
 * premium-landing-page branch with the same palette and settings it was tuned
 * with there.
 *
 * `speed: 0` and `grainAnimated: false` make it a still image — it renders
 * once and the component parks its animation frame, so the page is not paying
 * for a WebGL loop behind a landing hero. Grainient itself also honours
 * `prefers-reduced-motion`, pauses off-screen via IntersectionObserver, and
 * stops when the tab is hidden.
 *
 * It is split out of `Landing` so the rest of the page can stay a server
 * component: this is the only part that needs the client.
 */
export default function HeroBackdrop() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="hero-grainient" aria-hidden="true">
      <Grainient
        className="hero-grainient-canvas"
        /* Required: Grainient is plain JS with no default for `style`, so
           TypeScript infers it as non-optional. All the styling is in the
           class. */
        style={{}}
        colors={["#f6f8f6", "#e3f0e6", "#bdddc7", "#78b88c", "#1f7a4b"]}
        angle={48}
        flow={0.22}
        silk={0.12}
        grainAmount={0.025}
        grainSize={1}
        grainAnimated={false}
        speed={0}
        contrast={0.82}
        saturation={0.82}
        interactive={false}
        clickSwirl={false}
        /* Grainient's own reduced-motion check covers the ongoing animation
           but not its 1.6s intro fade, so that is switched off here too. */
        intro={!reduceMotion}
        dpr={1}
      />
    </div>
  );
}
