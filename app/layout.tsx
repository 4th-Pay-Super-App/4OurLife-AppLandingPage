import type { Metadata } from "next";
import localFont from "next/font/local";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

/*
 * OpenSans (text) and QuincyCF (display) are the same two faces the mobile
 * apps bundle in `assets/fonts` — the sources here were byte-identical TTFs.
 * They ship as subsetted WOFF2 because every face is `rel=preload as=font`,
 * so their combined weight lands on the critical path ahead of first paint:
 * as TTF that was 812KB, which on a slow connection cost seconds of blank
 * hero. Subsetting to the Latin range the site renders and recompressing to
 * WOFF2 brings the same six faces down to ~100KB.
 *
 * Regenerate with `scripts/build-fonts.sh` after replacing a source TTF.
 */
const openSans = localFont({
  src: [
    { path: "./fonts/OpenSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/OpenSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Open Sans", "Helvetica Neue", "Arial", "sans-serif"],
});

const quincy = localFont({
  src: [
    { path: "./fonts/QuincyCF-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/QuincyCF-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/QuincyCF-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Healthcare access, made clearer",
    description:
      "Find hospitals, specialists and ambulance services in Ghana. Manage health reminders, explore trusted guidance and connect with care providers in one app.",
    path: "/",
  }),
  metadataBase: SITE_URL,
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
      className={`no-js ${openSans.variable} ${quincy.variable}`}
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
