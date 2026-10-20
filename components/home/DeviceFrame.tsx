"use client";

import Image from "next/image";
import { motion, type MotionStyle } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./home.module.css";

export type Screen = { src: string; alt: string };

/**
 * One screenshot layer inside a device.
 *
 * Every screen a device can show is mounted at once and stacked, so changing
 * screens is an opacity crossfade between two already-decoded images. The
 * previous implementation swapped `AnimatePresence` keys, which remounted a
 * ~700KB PNG mid-scroll and animated a `filter: blur()` across it. That is what
 * produced the stutter on the way into the Plasence section.
 *
 * `active` is the cheap CSS-transition path, used for the tab selector.
 * `style` is the motion path, used when scroll progress drives the crossfade.
 * The two must not mix: a scroll-driven layer already gets a new opacity every
 * frame, so inheriting the tab transition would make it lag the scrollbar.
 */
export function DeviceScreen({
  screen,
  priority = false,
  active = true,
  style,
}: {
  screen: Screen;
  priority?: boolean;
  active?: boolean;
  style?: MotionStyle;
}) {
  return (
    <motion.div
      className={styles.deviceLayer}
      data-active={active ? "true" : "false"}
      data-scrub={style ? "true" : undefined}
      style={style}
    >
      <Image
        src={screen.src}
        alt={screen.alt}
        fill
        sizes="(max-width: 900px) 72vw, 300px"
        preload={priority}
        className={styles.deviceImage}
      />
    </motion.div>
  );
}

/**
 * Groups several `DeviceScreen` layers under a single opacity so a whole set of
 * screens can fade in together while still crossfading internally.
 */
export function DeviceLayerGroup({ style, children }: { style?: MotionStyle; children: ReactNode }) {
  return (
    <motion.div className={styles.deviceLayer} data-scrub="true" style={style}>
      {children}
    </motion.div>
  );
}

/**
 * The phone chrome. Pure CSS, never a drawn representation of app UI: whatever
 * sits inside is a real capture from the shipped app.
 */
export function DeviceFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.deviceFrame} ${className}`}>
      <div className={styles.deviceScreen}>{children}</div>
      <span className={styles.deviceIsland} aria-hidden="true" />
    </div>
  );
}
