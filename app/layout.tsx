import type { Metadata } from "next";
import localFont from "next/font/local";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

const openSans = localFont({
  src: [
    { path: "./fonts/OpenSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/OpenSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/OpenSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const quincy = localFont({
  src: [
    { path: "./fonts/QuincyCF-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/QuincyCF-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/QuincyCF-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
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
