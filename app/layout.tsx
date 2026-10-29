import type { Metadata } from "next";
import localFont from "next/font/local";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

/*
 * Open Sans backs `body` in globals.css, so the pages still built with
 * Tailwind use it. `preload: false` because the landing and the pages built
 * from the landing design system set Inter on their own wrapper, and nothing
 * on them ever renders in Open Sans — preloading it there cost ~390 KB of
 * unrendered TTF on the most-visited page on the site. Pages that do use it
 * fetch it on demand, covered by `display: swap`.
 *
 * (These are unsubsetted TTFs at ~130 KB per weight. Converting them to woff2
 * would cut roughly 60% off; worth doing when the Tailwind pages are next
 * touched.)
 */
const openSans = localFont({
  src: [
    { path: "./fonts/OpenSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/OpenSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/OpenSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

/*
 * The landing design calls for Inter. The reference page pulled it from
 * fonts.googleapis.com, which costs a render-blocking stylesheet plus a second
 * connection to fonts.gstatic.com before any text can paint. These are the
 * same Google-published woff2 subset, served from our own origin: one 48 KB
 * file covers 400–700 because Inter is a variable font.
 *
 * Latin only. `next/font/local` emits no `unicode-range`, so listing the
 * latin-ext subset as a second src made every visitor download both (another
 * 84 KB) regardless of the glyphs on the page. Every character the site
 * renders — including the typographic quotes, en dashes and the middot in the
 * trust line — is inside this subset. Text in a language that needs Latin
 * Extended (Twi's ɛ/ɔ, say) would fall back to the system UI font; add that
 * subset back, with an explicit unicode-range, if such copy is ever added.
 *
 * The variable is `--font-landing`, not `--font-inter`: globals.css already
 * declares `--font-inter: "Inter", sans-serif` in its Tailwind theme, and two
 * declarations of the same name on the same element resolve by source order,
 * which the font loader does not control.
 */
const inter = localFont({
  src: [{ path: "./fonts/Inter-Variable-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-landing",
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Healthcare access, made clearer",
    description:
      "Find hospitals, specialists and ambulance services in Ghana. Manage health reminders, explore trusted guidance and connect with care providers in one app.",
    path: "/",
  }),
  metadataBase: SITE_URL,
  /*
   * Google Search Console verification.
   *
   * A *Domain* property (the kind that covers 4ourlife.com and every
   * subdomain, http and https alike) is verified by a DNS TXT record on the
   * apex, not by anything in this codebase — see docs below. This tag is the
   * fallback for a *URL-prefix* property, and it is here so that verifying
   * one never needs a code change: set GOOGLE_SITE_VERIFICATION in the
   * hosting environment and redeploy.
   *
   * Left undefined when the variable is unset, so no empty meta tag ships.
   */
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  keywords: [
    "Ghana health app",
    "healthcare Ghana",
    "hospital locator Ghana",
    "medication reminders",
    "health services Ghana",
    "4 Our Life",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `no-js` is swapped for `js` by the inline script below. It exists so the
    // scroll-reveal animations can present their finished state when JavaScript
    // is unavailable, instead of leaving headings permanently hidden.
    // `suppressHydrationWarning` is required because that script mutates <html>
    // before React hydrates.
    <html
      lang="en"
      className={`no-js ${openSans.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so there is no flash of the fallback state. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.replace('no-js','js')`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
