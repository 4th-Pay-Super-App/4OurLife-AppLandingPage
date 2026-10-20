import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Next treats 127.0.0.1 and localhost as different origins and blocks its dev
   * resources across them, so opening the dev server on http://127.0.0.1:3000
   * silently fails to hydrate: the CSS layout renders, but no React, no Lenis
   * and no scroll animation. Listing the loopback hosts here makes both
   * spellings work. Development only; it has no effect on a production build.
   */
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    /*
     * Every image on the site is a phone screenshot or a flat brand asset, and
     * the sources are large PNGs (the hero capture alone is 1MB at 944x2048).
     * AVIF reaches roughly 20-30% below WebP on this kind of artwork, which
     * comes straight off the LCP image. WebP stays listed as the fallback for
     * browsers that do not send `image/avif` in Accept.
     */
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    /*
     * `react-icons/si` is one barrel module covering every Simple Icons glyph,
     * and the two store logos in DownloadSection are its only consumers.
     * Listing it here keeps a stray deep import from pulling the barrel in.
     */
    optimizePackageImports: ["framer-motion", "lucide-react", "react-icons"],
  },
};

export default nextConfig;
