import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4 Our Life — Your Healthcare Companion for Ghana",
  description:
    "Locate hospitals, track medications, and get verified wellness tips — all in one secure place. 4 Our Life is the comprehensive healthcare ecosystem for Ghana.",
  keywords: [
    "Ghana health app",
    "healthcare Ghana",
    "hospital locator Ghana",
    "medication tracker",
    "wellness app Ghana",
    "4 Our Life",
  ],
  openGraph: {
    title: "4 Our Life — Your Healthcare Companion for Ghana",
    description:
      "A comprehensive healthcare ecosystem connecting patients with top-rated facilities, managing medications, and providing expert wellness guidance.",
    type: "website",
    siteName: "4 Our Life",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Critical fonts first — Figtree (headings), Noto Sans (body), Inter (UI) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&family=Noto+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen" style={{ background: "#F5F1EE" }}>
        {children}
      </body>
    </html>
  );
}
