"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** Server render and first hydration assume motion is fine; the subscription
 *  corrects it immediately after, and nothing moves before hydration anyway. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Tracks the visitor's reduced-motion setting, and keeps tracking it — reading
 * `matchMedia` once in an effect would miss someone turning the setting on
 * while the page is open, which on a page with an autoplaying carousel is
 * exactly the moment it matters.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
