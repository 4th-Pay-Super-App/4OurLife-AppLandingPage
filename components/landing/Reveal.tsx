"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Defaults to a plain `div`; pass `"section"`, `"ul"` etc. where the
   *  surrounding markup needs a specific element. */
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Fades its children up on first scroll into view, then stops observing.
 *
 * The hidden start state lives behind `html.js` in `landing.css`, so with
 * JavaScript off the content renders in its finished state rather than staying
 * invisible forever.
 */
export default function Reveal({ children, as: Tag = "div", className, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Without IntersectionObserver, show the content immediately.
    if (!("IntersectionObserver" in window)) {
      node.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={className ? `reveal ${className}` : "reveal"}>
      {children}
    </Tag>
  );
}
