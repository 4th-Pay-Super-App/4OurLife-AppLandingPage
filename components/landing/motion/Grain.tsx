import styles from "./motion.module.css";

/**
 * A very subtle, fixed film-grain overlay across the whole landing page.
 *
 * It exists purely for cohesion: without it the page reads as eight separate
 * sections stacked on top of each other. A single shared grain layer ties them
 * into one continuous "film". The texture is inline SVG turbulence, so there is
 * no image request, no layout cost and no bundle weight.
 *
 * Hidden on touch devices and under reduced motion, where it is pure overhead.
 */
export default function Grain() {
  return <div className={styles.grain} aria-hidden="true" />;
}