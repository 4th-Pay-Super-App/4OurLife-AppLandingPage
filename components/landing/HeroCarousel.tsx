"use client";

import { useCallback, useEffect, useState } from "react";
import { CAROUSEL_SLIDES } from "./content";
import DeviceFrame from "./DeviceFrame";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const SLIDE_INTERVAL_MS = 5000;

/**
 * Rotating captures of the app in the hero.
 *
 * Autoplay pauses on hover, on touch, while the tab is in the background, and
 * for visitors who ask for reduced motion — in that last case the carousel
 * stays on the first screen and the dots become the only way through, which is
 * the point: nothing moves unless the visitor moves it.
 */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Bumped on every manual selection so the interval effect re-runs and the
     timer starts over. Without it the running interval keeps its original
     schedule, and a slide the visitor just picked can be replaced a fraction
     of a second later. */
  const [timerEpoch, setTimerEpoch] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const autoplaying = !reduceMotion && !paused;

  useEffect(() => {
    if (!autoplaying) return;

    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % CAROUSEL_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [autoplaying, timerEpoch]);

  // A carousel advancing in a hidden tab wastes battery and lands the visitor
  // on an arbitrary slide when they come back.
  useEffect(() => {
    const onVisibilityChange = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setTimerEpoch((epoch) => epoch + 1);
  }, []);

  const active = CAROUSEL_SLIDES[index];

  return (
    <div
      className="phone-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      aria-roledescription="carousel"
      aria-label="App screens"
    >
      <DeviceFrame
        screens={CAROUSEL_SLIDES}
        activeIndex={index}
        sizes="(max-width: 768px) 230px, 280px"
        /* The home screen is the hero's largest paint on mobile, where the
           visual sits above the headline. */
        priority
      />

      <p className="phone-carousel-caption">{active.label}</p>

      <div className="phone-carousel-dots">
        {CAROUSEL_SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            className={`dot${i === index ? " active" : ""}`}
            aria-label={`Show ${slide.label}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        {`Showing screen ${index + 1} of ${CAROUSEL_SLIDES.length}: ${active.label}`}
      </p>
    </div>
  );
}
