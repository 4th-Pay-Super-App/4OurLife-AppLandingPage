"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon } from "./icons";
import { NAV_LINKS } from "./content";

/**
 * Fixed header: transparent over the hero, frosted white once scrolled, and a
 * full-screen overlay menu below 768px.
 *
 * Additions over the reference page's `script.js`, which only toggled a class:
 * Escape closes the menu, focus moves into it on open and back to the
 * hamburger on close, and the hamburger is `aria-expanded`. Without those a
 * keyboard or screen-reader user could open the overlay and have no way out.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [renderedPath, setRenderedPath] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /*
   * Close the overlay when the route changes, so a browser Back out of a page
   * opened from the menu does not land on the new page with the menu still
   * covering it. Adjusting state during render (rather than in an effect)
   * is React's documented pattern for "reset when a value changes": it
   * re-renders before the browser paints, so the open menu is never shown.
   */
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    // Copied into the effect scope: by cleanup time the ref may point
    // elsewhere, and the node to restore focus to is the one that was there
    // when the menu opened.
    const hamburger = hamburgerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      hamburger?.focus();
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
        <div className="container navbar-inner">
          <Link href="/" className="logo">
            <span className="logo-mark">
              <Image
                src="/brand/4ol-logo.png"
                alt=""
                width={32}
                height={32}
                priority
              />
            </span>
            4 Our Life
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-cta-desktop">
            <Link href="/#download" className="btn btn-primary">
              Get the App
            </Link>
          </div>

          <button
            ref={hamburgerRef}
            type="button"
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobileMenu"
        // Hidden from assistive tech and from the tab order while closed; the
        // CSS transform alone would leave the links focusable off-screen.
        inert={!menuOpen}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="menu-close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <CloseIcon className="icon" />
        </button>
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="mobile-link" onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <Link href="/#download" className="btn btn-primary" onClick={closeMenu}>
          Get the App
        </Link>
      </div>
    </>
  );
}
