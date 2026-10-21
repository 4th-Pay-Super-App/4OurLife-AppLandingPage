import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import StickyDownloadBar from "./StickyDownloadBar";
import "./landing.css";

type SiteShellProps = {
  children: ReactNode;
};

/**
 * Page chrome for every surface built on this design system: skip link, fixed
 * nav, `<main>`, footer and the phone-only download bar.
 *
 * The `fol` class is what scopes `landing.css`'s element rules, so any page
 * that wants this look wraps itself in this component and nothing else on the
 * site is affected.
 */
export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="fol">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteNav />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <StickyDownloadBar />
    </div>
  );
}
