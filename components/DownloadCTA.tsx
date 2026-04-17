"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

/* ─── Placeholder QR Code SVG ──────────────────────────────── */
function QRCodePlaceholder({ size = 88 }: { size?: number }) {
  /* A realistic-looking QR placeholder built purely from SVG rects */
  const cell = size / 21;
  /* Minimal QR-like pattern: finder squares + some data cells */
  const finderPattern = (ox: number, oy: number) => {
    const rects = [];
    // outer 7×7 square
    rects.push(<rect key={`${ox}-${oy}-o`} x={ox * cell} y={oy * cell} width={7 * cell} height={7 * cell} fill="#0F172A" rx={cell * 0.25} />);
    // inner white 5×5
    rects.push(<rect key={`${ox}-${oy}-w`} x={(ox + 1) * cell} y={(oy + 1) * cell} width={5 * cell} height={5 * cell} fill="#FFFFFF" />);
    // inner dark 3×3
    rects.push(<rect key={`${ox}-${oy}-d`} x={(ox + 2) * cell} y={(oy + 2) * cell} width={3 * cell} height={3 * cell} fill="#0F172A" />);
    return rects;
  };

  /* sprinkle data cells for authenticity */
  const dataCells: [number, number][] = [
    [8,0],[9,0],[10,0],[12,0],[14,0],[16,0],[18,0],[20,0],
    [8,1],[10,1],[13,1],[15,1],[17,1],[19,1],
    [8,2],[9,2],[11,2],[14,2],[16,2],[20,2],
    [0,8],[2,8],[4,8],[6,8],[8,8],[10,8],[12,8],[14,8],[16,8],[18,8],[20,8],
    [1,9],[3,9],[5,9],[9,9],[11,9],[13,9],[17,9],[19,9],
    [0,10],[2,10],[4,10],[8,10],[10,10],[12,10],[16,10],[18,10],[20,10],
    [8,12],[10,12],[12,12],[14,12],[16,12],[18,12],[20,12],
    [9,13],[11,13],[13,13],[15,13],[17,13],[19,13],
    [8,14],[10,14],[12,14],[16,14],[20,14],
    [8,16],[9,16],[11,16],[13,16],[15,16],[17,16],[19,16],
    [8,17],[10,17],[12,17],[14,17],[16,17],[18,17],[20,17],
    [8,18],[9,18],[11,18],[13,18],[17,18],[19,18],[20,18],
    [8,20],[10,20],[12,20],[14,20],[16,20],[18,20],
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block", borderRadius: 6, border: "1px solid #E2E8F0" }}
    >
      <rect width={size} height={size} fill="#FFFFFF" />
      {/* top-left finder */}
      {finderPattern(0, 0)}
      {/* top-right finder */}
      {finderPattern(14, 0)}
      {/* bottom-left finder */}
      {finderPattern(0, 14)}
      {/* data cells */}
      {dataCells.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x * cell}
          y={y * cell}
          width={cell * 0.9}
          height={cell * 0.9}
          fill="#0F172A"
          rx={cell * 0.15}
        />
      ))}
    </svg>
  );
}

/* ─── Store Badges (SVG recreation) ───────────────────────── */
function GooglePlayBadge() {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", background: "#0F172A", color: "#FFFFFF", padding: "0.55rem 1.25rem", borderRadius: "0.625rem", textDecoration: "none", minWidth: 148, boxShadow: "0 4px 16px rgba(15,23,42,0.25)" }}
    >
      {/* Play triangle — simplified */}
      <svg width={20} height={20} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00C4FF" />
            <stop offset="100%" stopColor="#0088FF" />
          </linearGradient>
          <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00E676" />
            <stop offset="100%" stopColor="#00BCD4" />
          </linearGradient>
          <linearGradient id="pg3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6D00" />
            <stop offset="100%" stopColor="#FFEA00" />
          </linearGradient>
          <linearGradient id="pg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF1744" />
            <stop offset="100%" stopColor="#FF6D00" />
          </linearGradient>
        </defs>
        <path d="M4 3.5L13.5 12 4 20.5V3.5Z" fill="url(#pg2)" />
        <path d="M4 3.5L13.5 12l4.25-4.25L7 3.5Z" fill="url(#pg1)" />
        <path d="M4 20.5L13.5 12l4.25 4.25L7 20.5Z" fill="url(#pg4)" />
        <path d="M13.5 12l4.25-4.25L21 10.05 17.5 12l-3.25-.75.5.75Z" fill="url(#pg3)" />
        <path d="M13.5 12L17.5 12l3.5 1.95-4.25 4.05Z" fill="url(#pg3)" opacity="0.9" />
      </svg>
      <div>
        <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.6rem", opacity: 0.7, lineHeight: 1, letterSpacing: "0.05em" }}>GET IT ON</p>
        <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.9rem", lineHeight: 1.3 }}>Google Play</p>
      </div>
    </motion.a>
  );
}

function AppStoreBadge() {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", background: "#0F172A", color: "#FFFFFF", padding: "0.55rem 1.25rem", borderRadius: "0.625rem", textDecoration: "none", minWidth: 148, boxShadow: "0 4px 16px rgba(15,23,42,0.25)" }}
    >
      {/* Apple logo */}
      <svg width={18} height={20} viewBox="0 0 814 1000" fill="white" style={{ flexShrink: 0 }}>
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 620.3 0 486.7 0 358.4c0-207.7 135.4-317.7 268.5-317.7 99.8 0 182.6 66.2 244.9 66.2 59.2 0 152-70.2 263.9-70.2 33.7 0 154.8 3.2 218.2 120.2zm-174.3-158.8c28.8-34 49-81.8 49-131.8 0-6.5-.5-13.1-1.6-19.5-46.8 1.8-101.5 31.2-134.8 70.2-26.3 30.4-50.3 78.1-50.3 128.7 0 7.3.5 14.3 1.3 21 3.2.5 8.4 1 13.7 1 42.4 0 96.8-28.3 122.7-70.6z" />
      </svg>
      <div>
        <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.6rem", opacity: 0.7, lineHeight: 1, letterSpacing: "0.05em" }}>Download on the</p>
        <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.9rem", lineHeight: 1.3 }}>App Store</p>
      </div>
    </motion.a>
  );
}

/* ─── Main CTA Banner ───────────────────────────────────────── */
export default function DownloadCTABanner() {
  return (
    <AnimatedSection>
      <div
        style={{
          background: "#E8F5F0",
          borderRadius: "1.5rem",
          padding: "2rem 2.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          border: "1.5px solid rgba(13,148,136,0.15)",
          boxShadow: "0 4px 32px rgba(13,148,136,0.08)",
        }}
      >
        {/* ── Left: "Available on iOS and Android" ── */}
        <div style={{ flexShrink: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-figtree)",
              fontWeight: 900,
              fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
              color: "#0A4A3A",
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
            }}
          >
            Available on<br />iOS and Android
          </p>
        </div>

        {/* ── Centre: badges + QR codes ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.5rem",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Google Play badge + QR */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.625rem" }}>
            <GooglePlayBadge />
            <QRCodePlaceholder size={96} />
          </div>

          {/* App Store badge + QR */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.625rem" }}>
            <AppStoreBadge />
            <QRCodePlaceholder size={96} />
          </div>
        </div>

        {/* ── Right: "Download Now" ── */}
        <div style={{ flexShrink: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-figtree)",
              fontWeight: 900,
              fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
              color: "#0D9488",
              letterSpacing: "-0.015em",
              lineHeight: 1.25,
              textAlign: "right",
            }}
          >
            Download Now
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
