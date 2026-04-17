"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, ArrowRight, Smartphone, Apple } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { motion } from "framer-motion";
import { AppStoreIcon, PlayStoreIcon } from "./Brand-icons";

const NAV = [
  { label: "Home",              href: "/"                  },
  { label: "Features",          href: "/#features"         },
  { label: "How It Works",      href: "/#how"              },
  { label: "About Us",          href: "/about"             },
  { label: "Register Facility", href: "/register-facility" },
];

const LEGAL = [
  { label: "Privacy Policy",  href: "#" },
  { label: "Terms of Service",href: "#" },
];

const SOCIALS = [
  { Icon: FaTwitter,   href: "#", label: "Twitter"   },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaLinkedinIn,  href: "#", label: "LinkedIn"  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0D9488", position: "relative", overflow: "hidden" }}>

      {/* ── Subtle grid overlay ── */}
      <div className="grid-bg-dark absolute inset-0 opacity-30 pointer-events-none" />

      {/* ── Top glow ── */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 400, height: 80, background: "rgba(255,255,255,0.04)", borderRadius: "0 0 50% 50%", filter: "blur(30px)", pointerEvents: "none" }} />

      <div className="relative z-10 container-width pt-16 pb-8">

        {/* ── Main footer grid ── */}
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.15)", marginBottom: "2rem" }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" className="flex items-center gap-2.5 group" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
              <div style={{ width: 40, height: 40, borderRadius: "0.75rem", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "transform 0.25s" }}>
                <Image src="/logo.png" alt="4 Our Life" width={26} height={26} className="object-cover w-full" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "1.125rem", color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.015em" }}>4 Our Life</p>
                <p style={{ fontFamily: "var(--font-noto)", fontWeight: 700, fontSize: "0.6rem", color: "rgba(255,255,255,0.65)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>Ghana Health</p>
              </div>
            </Link>

            <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.875rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.7, maxWidth: "17rem", marginBottom: "1.5rem" }}>
              Your comprehensive healthcare companion for Ghana. Locate facilities, track medications, and live healthier — all in one secure place.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  style={{ width: 36, height: 36, borderRadius: "0.625rem", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.75)", transition: "all 0.18s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1.125rem" }}>Navigation</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 transition-colors duration-150"
                    style={{ fontFamily: "var(--font-noto)", fontWeight: 500, fontSize: "0.9rem", color: "rgba(255,255,255,0.72)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)")}
                  >
                    <ArrowRight size={12} style={{ opacity: 0, transition: "opacity 0.15s, transform 0.15s", transform: "translateX(-4px)" }} className="group-hover:opacity-100 group-hover:translate-x-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1.125rem" }}>Legal & Contact</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
              {LEGAL.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{ fontFamily: "var(--font-noto)", fontWeight: 500, fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:hello@4ourlife.app"
                  className="flex items-center gap-2"
                  style={{ fontFamily: "var(--font-noto)", fontWeight: 500, fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", transition: "color 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)")}
                >
                  <Mail size={13} />
                  hello@4ourlife.app
                </a>
              </li>
            </ul>
          </div>

          {/* Download CTAs */}
          <div>
            <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1.125rem" }}>Get the App</p>
            <div className="flex flex-row md:flex-col gap-2.5">
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "0.875rem", padding: "0.75rem 1rem", color: "#FFFFFF", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.22)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)")}
              >
                <AppStoreIcon />
                <div>
                  <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.6rem", opacity: 0.65, lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.1em" }}>Download on</p>
                  <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.9rem", lineHeight: 1.3 }}>App Store</p>
                </div>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "0.875rem", padding: "0.75rem 1rem", color: "#FFFFFF", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.22)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)")}
              >
                <PlayStoreIcon />
                <div>
                  <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.6rem", opacity: 0.65, lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.1em" }}>Get it on</p>
                  <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.9rem", lineHeight: 1.3 }}>Google Play</p>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>
            © {year} <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>4 Our Life</span>. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>
            &ldquo;For Your Better Tomorrow.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
