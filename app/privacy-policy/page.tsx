"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Database,
  Eye,
  Lock,
  Clock,
  Mail,
  Phone,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

// ─── Sections Data ────────────────────────────────────────────
const SECTIONS = [
  { id: "introduction", label: "Introduction", icon: ShieldCheck },
  { id: "collect", label: "Information We Collect", icon: Database },
  { id: "usage", label: "How We Use Information", icon: Eye },
  { id: "security", label: "Data Security", icon: Lock },
  { id: "retention", label: "Data Retention", icon: Clock },
  { id: "contact", label: "Contact Us", icon: Mail },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "rgba(13,148,136,0.08)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection direction="up">
            <div
              className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6"
              style={{
                background: "rgba(13,148,136,0.15)",
                borderColor: "rgba(13,148,136,0.3)",
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span
                className="text-xs font-semibold tracking-wide uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Legal
              </span>
            </div>
            <h1
              className="font-black text-white mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-figtree)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              }}
            >
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-noto)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              4 Our Life is committed to protecting your privacy and the
              security of your personal health data. This policy complies with
              the{" "}
              <span style={{ color: "#2dd4bf" }}>
                Data Protection Act, 2012 (Act 843) of Ghana.
              </span>
            </p>
            <p
              className="text-xs mt-4 font-semibold uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-noto)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Last Updated: January 2026 · Version 1.0
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F5F1EE" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
            {/* ── Sticky TOC ── */}
            <aside className="hidden lg:block">
              <div
                className="sticky top-28 rounded-3xl p-6"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #EDE8E3",
                  boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
                }}
              >
                <p
                  className="font-black text-xs uppercase tracking-widest mb-5"
                  style={{
                    fontFamily: "var(--font-figtree)",
                    color: "#94a3b8",
                  }}
                >
                  On This Page
                </p>
                <ul className="space-y-1">
                  {SECTIONS.map(({ id, label, icon: Icon }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150"
                        style={{ color: "#475569" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "#F0FDFA";
                          (e.currentTarget as HTMLElement).style.color =
                            "#0D9488";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLElement).style.color =
                            "#475569";
                        }}
                      >
                        <Icon size={14} className="flex-shrink-0" />
                        <span
                          style={{
                            fontFamily: "var(--font-noto)",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                          }}
                        >
                          {label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: "1px solid #EDE8E3" }}
                >
                  <Link
                    href="/terms-of-service"
                    className="group flex items-center gap-2 transition-colors duration-150"
                    style={{
                      fontFamily: "var(--font-noto)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#0D9488",
                    }}
                  >
                    <ChevronRight size={13} />
                    Terms of Service
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="space-y-8 max-w-[960px]">
              {/* 1. Introduction */}
              <AnimatedSection delay={0.05}>
                <div
                  id="introduction"
                  className="rounded-3xl p-8"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #EDE8E3",
                    boxShadow: "0 4px 24px rgba(15,23,42,0.05)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ background: "#CCFBF1" }}
                    >
                      <ShieldCheck size={20} style={{ color: "#0D9488" }} />
                    </div>
                    <h2
                      className="font-black uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-figtree)",
                        color: "#0F172A",
                        fontSize: "1rem",
                      }}
                    >
                      1. Introduction
                    </h2>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-noto)",
                      color: "#475569",
                      lineHeight: 1.8,
                      fontSize: "0.95rem",
                    }}
                  >
                    4 Our Life is committed to protecting your privacy and
                    ensuring the security of your personal information,
                    particularly your health data. This Privacy Policy explains
                    how 4th Pay Ltd ("we," "us," or "our") collects, uses, and
                    safeguards your information when you use the 4 Our Life
                    mobile application and website. This policy complies with
                    the Data Protection Act, 2012 (Act 843) of Ghana.
                  </p>
                </div>
              </AnimatedSection>

              {/* 2. Information We Collect */}
              <AnimatedSection delay={0.1}>
                <div
                  id="collect"
                  className="rounded-3xl p-8"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #EDE8E3",
                    boxShadow: "0 4px 24px rgba(15,23,42,0.05)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ background: "#CCFBF1" }}
                    >
                      <Database size={20} style={{ color: "#0D9488" }} />
                    </div>
                    <h2
                      className="font-black uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-figtree)",
                        color: "#0F172A",
                        fontSize: "1rem",
                      }}
                    >
                      2. Information We Collect
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Identity Information",
                        desc: "Name, email address, and phone number provided during registration.",
                      },
                      {
                        title: "Health Information",
                        desc: "Profile details, medication history, tracked symptoms, and facility interactions you choose to record.",
                      },
                      {
                        title: "Device & Usage Data",
                        desc: "Location (with your permission), app usage patterns, and automated technical logs to improve the service.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex gap-4 p-4 rounded-2xl"
                        style={{
                          background: "#F5F1EE",
                          border: "1px solid #EDE8E3",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ background: "#0D9488" }}
                        />
                        <div>
                          <p
                            className="font-bold mb-1"
                            style={{
                              fontFamily: "var(--font-figtree)",
                              color: "#0F172A",
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.title}
                          </p>
                          <p
                            style={{
                              fontFamily: "var(--font-noto)",
                              color: "#475569",
                              fontSize: "0.88rem",
                              lineHeight: 1.7,
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* 3. How We Use */}
              <AnimatedSection delay={0.15}>
                <div
                  id="usage"
                  className="rounded-3xl p-8"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #EDE8E3",
                    boxShadow: "0 4px 24px rgba(15,23,42,0.05)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ background: "#CCFBF1" }}
                    >
                      <Eye size={20} style={{ color: "#0D9488" }} />
                    </div>
                    <h2
                      className="font-black uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-figtree)",
                        color: "#0F172A",
                        fontSize: "1rem",
                      }}
                    >
                      3. How We Use Your Information
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Provide and improve the 4 Our Life app and its features.",
                      "Support health tools like ovulation tracking, medication reminders, and facility discovery.",
                      "Personalise your experience based on your health profile and usage patterns.",
                      "Conduct research, analytics, and — with your consent — targeted marketing.",
                      "Meet our legal and regulatory obligations under Ghanaian law.",
                    ].map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                        style={{
                          fontFamily: "var(--font-noto)",
                          color: "#475569",
                          fontSize: "0.92rem",
                          lineHeight: 1.7,
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                          style={{
                            background: "#CCFBF1",
                            color: "#0D9488",
                            fontFamily: "var(--font-figtree)",
                          }}
                        >
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* 4. Security */}
              <AnimatedSection delay={0.2}>
                <div
                  id="security"
                  className="rounded-3xl p-8"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #EDE8E3",
                    boxShadow: "0 4px 24px rgba(15,23,42,0.05)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ background: "#CCFBF1" }}
                    >
                      <Lock size={20} style={{ color: "#0D9488" }} />
                    </div>
                    <h2
                      className="font-black uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-figtree)",
                        color: "#0F172A",
                        fontSize: "1rem",
                      }}
                    >
                      4. Data Security
                    </h2>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-noto)",
                      color: "#475569",
                      lineHeight: 1.8,
                      fontSize: "0.95rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    We take the security of your health data with the utmost
                    seriousness. Our measures include:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: "AES-256 Encryption",
                        desc: "In transit and at rest",
                      },
                      {
                        title: "Multi-Factor Auth",
                        desc: "Biometric & PIN protection",
                      },
                      {
                        title: "Strict Access Controls",
                        desc: "Role-based permissions",
                      },
                      {
                        title: "Breach Notification",
                        desc: "Within 72 hours per GDPR",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="p-4 rounded-2xl"
                        style={{
                          background: "#F0FDFA",
                          border: "1.5px solid rgba(13,148,136,0.15)",
                        }}
                      >
                        <p
                          className="font-bold mb-0.5"
                          style={{
                            fontFamily: "var(--font-figtree)",
                            color: "#0D9488",
                            fontSize: "0.88rem",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-noto)",
                            color: "#475569",
                            fontSize: "0.8rem",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-noto)",
                      color: "#64748b",
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Health data receives enhanced encryption and audited access
                    logging. We never sell your personal or health data to third
                    parties.
                  </p>
                </div>
              </AnimatedSection>

              {/* 5. Retention */}
              <AnimatedSection delay={0.25}>
                <div
                  id="retention"
                  className="rounded-3xl p-8"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #EDE8E3",
                    boxShadow: "0 4px 24px rgba(15,23,42,0.05)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ background: "#CCFBF1" }}
                    >
                      <Clock size={20} style={{ color: "#0D9488" }} />
                    </div>
                    <h2
                      className="font-black uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-figtree)",
                        color: "#0F172A",
                        fontSize: "1rem",
                      }}
                    >
                      5. Data Retention
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        type: "Account Data",
                        period: "Life of account + 2 years",
                      },
                      {
                        type: "Health Data",
                        period: "Life of account + 3 years",
                      },
                      { type: "Marketing Data", period: "Until you opt-out" },
                      {
                        type: "Technical Logs",
                        period: "90 days rolling window",
                      },
                    ].map((row) => (
                      <div
                        key={row.type}
                        className="flex items-center justify-between p-4 rounded-2xl"
                        style={{
                          background: "#F5F1EE",
                          border: "1px solid #EDE8E3",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-figtree)",
                            fontWeight: 700,
                            color: "#334155",
                            fontSize: "0.88rem",
                          }}
                        >
                          {row.type}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-noto)",
                            color: "#0D9488",
                            fontWeight: 600,
                            fontSize: "0.82rem",
                          }}
                        >
                          {row.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* 6. Contact */}
              <AnimatedSection delay={0.3}>
                <div
                  id="contact"
                  className="rounded-3xl p-8"
                  style={{
                    background: "#0D9488",
                    boxShadow: "0 20px 60px rgba(13,148,136,0.25)",
                  }}
                >
                  <h2
                    className="font-black text-white mb-2"
                    style={{
                      fontFamily: "var(--font-figtree)",
                      fontSize: "1.5rem",
                    }}
                  >
                    Contact Us
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: "var(--font-noto)",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    4th Pay Ltd · Kwashieman Ofankor Road, Accra, Ghana
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:disrupt@4th-pay.com"
                      className="flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold transition-all duration-200"
                      style={{
                        background: "#FFFFFF",
                        color: "#0D9488",
                        fontFamily: "var(--font-figtree)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <Mail size={16} />
                      disrupt@4th-pay.com
                    </a>
                    <a
                      href="tel:+233554506861"
                      className="flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.18)",
                        border: "1.5px solid rgba(255,255,255,0.25)",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-figtree)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <Phone size={16} />
                      +233 55 450 6861
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              {/* Back link */}
              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-noto)",
                    color: "#64748b",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to Home
                </Link>
                <Link
                  href="/terms-of-service"
                  className="inline-flex items-center gap-2 transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-noto)",
                    color: "#0D9488",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  Terms of Service
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
