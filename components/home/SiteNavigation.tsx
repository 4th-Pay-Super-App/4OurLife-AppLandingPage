"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { APP_STORE_URL } from "@/lib/store-links";
import styles from "./home.module.css";

const links = [
  { href: "#people", label: "For you" },
  { href: "#plasence", label: "Plasence" },
  { href: "#business", label: "For business" },
];

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const shellRef = useRef<HTMLElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  /* A hairline inside the pill. The consumer chapter and the business story are
     both several viewports of pinned scroll, so some sense of how far through
     the page you are is genuinely useful rather than decorative. */
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // One state change at the threshold, not one per frame.
  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 24;
    setLifted((current) => (current === next ? current : next));
  });

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnOutside = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutside);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutside);
    };
  }, [open]);

  return (
    <header className={styles.navShell} ref={shellRef} data-lifted={lifted}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link className={styles.brand} href="#top" aria-label="4 Our Life home">
          <Image src="/brand/4ol-logo.png" alt="" width={34} height={30} className={styles.brandLogo} />
          <span className={styles.brandName}>4 OUR LIFE</span>
        </Link>
        <div className={styles.navLinks}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/plans">Plans</Link>
        </div>
        <a className={styles.navCta} href={APP_STORE_URL} target="_blank" rel="noreferrer">
          Get the app <span aria-hidden="true">↗</span>
        </a>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <motion.span className={styles.navProgress} style={{ scaleX: progress }} aria-hidden="true" />
      </nav>
      {open ? (
        <div className={styles.mobileMenu} id="mobile-navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link href="/plans" onClick={() => setOpen(false)}>
            Plans<span aria-hidden="true">↗</span>
          </Link>
          <a href={APP_STORE_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Get the app<span aria-hidden="true">↗</span>
          </a>
        </div>
      ) : null}
    </header>
  );
}
