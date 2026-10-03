"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./motion.module.css";
import { SPRING } from "./tokens";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Kept small so text never looks skewed. */
  tilt?: number;
  /** Highlight radius in px (mirrored into CSS via a custom property). */
  radius?: number;
};

/**
 * Card treatment combining a pointer-tracked spotlight with a subtle 3D tilt.
 *
 * Both effects are driven off one pointer handler:
 * - The spotlight is a CSS radial-gradient on a `::after` overlay, positioned
 *   through custom properties. Changing a custom property repaints far less
 *   than rewriting a gradient string on the element itself.
 * - The tilt is spring-damped so it settles instead of snapping to the cursor.
 *
 * The `::after` overlay sits at `z-index: -1` inside an `isolation: isolate`
 * stacking context, which paints it above the card's own background but below
 * its content — so the highlight never washes out the text.
 *
 * Guards: disabled for reduced motion and coarse pointers, where a hover state
 * is meaningless and the perspective transform only costs composite time.
 */
export default function Spotlight({
  children,
  className = "",
  tilt = 2,
  radius = 340,
}: SpotlightProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Rotation on both axes, spring-damped for a natural settle.
  const rotateX = useSpring(0, SPRING.magnet);
  const rotateY = useSpring(0, SPRING.magnet);

  // Spotlight centre as percentages, fed into the CSS gradient via vars.
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotXPercent = useMotionTemplate`${spotX}%`;
  const spotYPercent = useMotionTemplate`${spotY}%`;
  const spotRadius = useMotionTemplate`${radius}px`;

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      spotX.set(px * 100);
      spotY.set(py * 100);
      rotateY.set((px - 0.5) * tilt * 2);
      rotateX.set((0.5 - py) * tilt * 2);
    },
    [rotateX, rotateY, spotX, spotY, tilt],
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${styles.spotlight} ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        {
          rotateX,
          rotateY,
          // Small perspective so the tilt reads as depth without distortion.
          transformPerspective: 900,
          // Custom properties consumed by the `::after` overlay.
          "--spot-x": spotXPercent,
          "--spot-y": spotYPercent,
          "--spot-r": spotRadius,
        } as CSSProperties
      }
    >
      {children}
    </motion.div>
  );
}