"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, type Stat } from "./content";

const COUNT_DURATION_MS = 1500;

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function format(stat: Stat, value: number): string {
  if (stat.decimal) return value.toFixed(1);
  return Math.floor(value).toLocaleString("en-GB") + (stat.suffix ?? "");
}

/**
 * Counts each figure up once, the first time the bar scrolls into view.
 *
 * The final value is rendered server-side, so the numbers are in the HTML for
 * crawlers and for anyone without JavaScript; the animation only replaces them
 * while it runs.
 */
export default function StatsBar() {
  const [progress, setProgress] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      start ??= timestamp;
      const elapsed = Math.min((timestamp - start) / COUNT_DURATION_MS, 1);
      setProgress(easeOutQuart(elapsed));
      if (elapsed < 1) frame = requestAnimationFrame(step);
      else setProgress(null);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setProgress(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="stats-bar" id="stats" aria-label="4 Our Life by the numbers">
      <div ref={gridRef} className="container stats-grid">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const value = progress === null ? stat.target : stat.target * progress;
          return (
            <div className="stat-item" key={stat.label}>
              <Icon className="stat-icon" />
              <div className="stat-number">{format(stat, value)}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
