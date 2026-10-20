"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, type ElementType, type ReactNode } from "react";
import styles from "./motion.module.css";
import { DUR, EASE, STAGGER } from "./tokens";

type RevealTextProps = {
  /** Plain text to reveal as a single line. */
  children?: ReactNode;
  /**
   * Explicit lines, preferred for multi-line headings — each entry becomes its
   * own mask and reveals in sequence. Authoring lines explicitly beats relying
   * on where the browser happens to wrap, which is not knowable up front.
   */
  lines?: ReactNode[];
  /** Render as this element. Defaults to a `span`. */
  as?: ElementType;
  className?: string;
  /** Seconds to wait before the first line starts. */
  delay?: number;
  /**
   * When true the lines animate as soon as they mount (hero intro).
   * When false they animate when scrolled into view (section headings).
   */
  immediate?: boolean;
  /** Amount of the element that must be visible before revealing. */
  amount?: number;
};

/**
 * The signature masked text reveal.
 *
 * Each line sits inside an `overflow: hidden` wrapper while an inner span
 * travels from fully below the mask (`y: 112%`) up to rest (`y: 0`). Because
 * the mask clips rather than fades, the glyphs appear to rise out of the
 * layout — the effect that reads as "premium" rather than "fade in".
 *
 * Two details that matter:
 * - The wrapper carries a little bottom padding so descenders (g, y, p) are not
 *   sliced off at rest. Without it the mask clips the letters it reveals.
 * - The wrapper (static) and the inner span (animated) are separated so the
 *   transform never affects layout, which keeps this free of CLS.
 */
export function RevealText({
  children,
  lines: lineProp,
  as: Tag = "span",
  className = "",
  delay = 0,
  immediate = false,
  amount = 0.5,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const lines = lineProp ?? (Array.isArray(children) ? children : [children]);

  // Reduced motion: render the content plainly with no mask or transform.
  if (reduceMotion) {
    return <Tag className={className}>{lines.map((line, i) => <Fragment key={i}>{line}</Fragment>)}</Tag>;
  }

  const animateProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount } };

  return (
    <Tag className={className}>
      <motion.span
        className={styles.revealRoot}
        initial="hidden"
        {...animateProps}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: STAGGER.line, delayChildren: delay } },
        }}
      >
        {lines.map((line, index) => (
          <span className={styles.revealLine} key={index}>
            <motion.span
              className={styles.revealInner}
              variants={{
                hidden: { y: "112%" },
                show: { y: "0%", transition: { duration: DUR.reveal, ease: EASE.signature } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * Escape hatch for headings that mix text with inline elements (`<em>`, `<br />`).
 * Wrap each visual line in one of these.
 */
export function RevealLine({
  children,
  delay = 0,
  immediate = false,
  amount = 0.5,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  amount?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <span className={`${styles.revealLine} ${className}`}>{children}</span>;

  /*
   * The scroll trigger has to live on the mask, not on the span inside it.
   * `whileInView` is backed by an IntersectionObserver, and the observer clips
   * an element's rect by its ancestors' overflow. The inner span starts at
   * `y: 112%`, which parks it completely outside the mask, so observing the
   * inner span reports an intersection ratio of exactly 0 no matter where the
   * page is scrolled and the line never reveals. Observing the mask (which is
   * not clipped by its own overflow) and driving the inner span through
   * variants keeps the same animation and actually fires.
   */
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount } };

  return (
    <motion.span className={`${styles.revealLine} ${className}`} initial="hidden" {...trigger}>
      <motion.span
        className={styles.revealInner}
        variants={{
          hidden: { y: "112%" },
          show: { y: "0%", transition: { duration: DUR.reveal, ease: EASE.signature, delay } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}