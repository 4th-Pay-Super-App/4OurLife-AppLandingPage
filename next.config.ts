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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
