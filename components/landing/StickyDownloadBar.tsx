"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Phone-only bar pinned to the bottom of the viewport (hidden above 768px by
 * `landing.css`). It gets out of the way once the full download section is on
 * screen, so the two calls to action never compete.
 */
export default function StickyDownloadBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("download");
    if (!target || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`sticky-download${hidden ? " hidden" : ""}`}>
      <p className="sticky-label">
        Get 4 Our Life
        <small>Free on iOS &amp; Android</small>
      </p>
      <Link href="/#download" className="btn btn-primary sticky-btn">
        Download
      </Link>
    </div>
  );
}
