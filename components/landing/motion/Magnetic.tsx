"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";
import styles from "./motion.module.css";
import { SPRING } from "./tokens";

type MagneticProps = {
  children: ReactNode;
  /** How far (px) the element follows the cursor at the very edge. */
  strength?: number;
  className?: string;
  /** Element to render. Use "a"/"button" for interactive targets. */
  as?: "div" | "span" | "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

/**
 * Cursor-magnetic wrapper.
 *
 * The pointer offset from the element's centre is mapped onto a small spring-
 * damped translation, so the element leans toward the cursor and eases back on
 * exit. Kept deliberately subtle (default 8px) — the effect should be felt
 * rather than seen.
 *
 * Guards:
 * - Disabled entirely under `prefers-reduced-motion`.
 * - `pointer-events` are untouched and the movement is clamped, so the target
 *   is never harder to click than a static element.
 */
export default function Magnetic({
  children,
  strength = 8,
  className = "",
  as = "div",
  href,
  target,
  rel,
  onClick,
  ...rest
}: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING.magnet);
  const y = useSpring(rawY, SPRING.magnet);

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const relativeX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relativeY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      rawX.set(Math.max(-1, Math.min(1, relativeX)) * strength);
      rawY.set(Math.max(-1, Math.min(1, relativeY)) * strength);
    },
    [rawX, rawY, strength],
  );

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const Component = motion[as];

  // Reduced motion: render the child untouched, keeping the same element type
  // and props so nothing about the layout or semantics changes.
  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className} href={href} target={target} rel={rel} onClick={onClick} {...rest}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${styles.magnetic} ${className}`}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileTap={{ scale: 0.965 }}
      transition={SPRING.press}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Component>
  );
}