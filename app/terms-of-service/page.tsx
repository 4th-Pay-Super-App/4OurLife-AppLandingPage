"use client";

import Link from "next/link";
import {
  FileText,
  Users,
  AlertTriangle,
  ShieldOff,
  XCircle,
  Mail,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

// ─── Sections Data ─────────────────────────────────────────────
const SECTIONS = [
  { id: "agreement", label: "The Agreement", icon: FileText },
  { id: "eligibility", label: "Eligibility", icon: Users },
  { id: "medical", label: "Medical Disclaimer", icon: AlertTriangle },
  { id: "conduct", label: "User Conduct", icon: ShieldOff },
  { id: "liability", label: "Liability", icon: XCircle },
  { id: "termination", label: "Termination", icon: XCircle },
  { id: "contact", label: "Contact Legal", icon: Mail },
];

const SECTION_CONTENT = [
  {
    id: "agreement",
    num: 1,
    icon: FileText,
    title: "The Agreement",
    accent: false,
    body: (
      <p
        style={{
          fontFamily: "var(--font-noto)",
          color: "#475569",
          lineHeight: 1.8,
          fontSize: "0.95rem",
        }}
      >
        By accessing or using the 4 Our Life App or website, you agree to be
        bound by these Terms and Conditions. If you do not agree to all of these
        terms, do not use the service. These terms form a legally binding
        agreement between you and 4th Pay Ltd, operating as 4 Our Life.
      </p>
    ),
  },
  {
    id: "eligibility",
    num: 2,
    icon: Users,
    title: "Eligibility",
    accent: false,
    body: (
      <p
        style={{
          fontFamily: "var(--font-noto)",
          color: "#475569",
          lineHeight: 1.8,
          fontSize: "0.95rem",
        }}
      >
        You must be at least 13 years old to use this App. Users between 13 and
        18 years of age require guardian consent to access specific health
        features. By using the App, you confirm that you meet these eligibility
        requirements.
      </p>
    ),
  },
  {
    id: "medical",
    num: 3,
    icon: AlertTriangle,
    title: "Medical Disclaimer",
    accent: true,
    body: (
      <div>
        <p
          className="font-bold italic mb-3"
          style={{
            fontFamily: "var(--font-noto)",
            color: "#B91C1C",
            fontSize: "0.9rem",
          }}
        >
          IMPORTANT: 4 Our Life is an information tool, NOT a medical provider.
        </p>
        <p
          style={{
            fontFamily: "var(--font-noto)",
            color: "#475569",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}
        >
          The App provides facility finders, medication reminders, and health
          tracking tools but does not provide clinical diagnoses or medical
          advice. Always seek the advice of a qualified healthcare provider in
          Ghana for any medical condition. In an emergency, contact emergency
          services immediately.
        </p>
      </div>
    ),
  },
  {
    id: "conduct",
    num: 4,
    icon: ShieldOff,
    title: "User Conduct",
    accent: false,
    body: (
      <div>
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-noto)",
            color: "#475569",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}
        >
          As a user of 4 Our Life, you agree not to:
        </p>
        <ul className="space-y-2.5">
          {[
            "Provide false, misleading, or inaccurate health information.",
            "Attempt to breach, hack, or circumvent security protocols.",
            "Reverse engineer, decompile, or disassemble any part of the App.",
            "Use the App for any unlawful or fraudulent purpose.",
            "Impersonate any person or entity or misrepresent your affiliation.",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{
                fontFamily: "var(--font-noto)",
                color: "#475569",
                fontSize: "0.9rem",
                lineHeight: 1.65,
              }}
            >
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: "#0D9488" }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "liability",
    num: 5,
    icon: XCircle,
    title: "Limitation of Liability",
    accent: false,
    body: (
      <p
        style={{
          fontFamily: "var(--font-noto)",
          color: "#475569",
          lineHeight: 1.8,
          fontSize: "0.95rem",
        }}
      >
        4 Our Life Limited (4th Pay Ltd) shall not be liable for any indirect,
        incidental, special, or consequential damages resulting from your use of
        the App, including but not limited to damages for loss of profits,
        goodwill, use, data, or other intangible losses. Our total liability
        shall not exceed the amount paid by you (if any) for accessing the
        service in the twelve months preceding the claim.
      </p>
    ),
  },
  {
    id: "termination",
    num: 6,
    icon: XCircle,
    title: "Termination",
    accent: false,
    body: (
      <p
        style={{
          fontFamily: "var(--font-noto)",
          color: "#475569",
          lineHeight: 1.8,
          fontSize: "0.95rem",
        }}
      >
        We reserve the right to terminate or suspend your account at our sole
        discretion, without notice, for conduct that we believe violates these
        Terms or is harmful to other users, us, or third parties. You may also
        terminate your account at any time by contacting us at
        disrupt@4th-pay.com.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
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
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
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
              Terms &amp; <span className="gradient-text">Conditions</span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-noto)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Please read these terms carefully before using the 4 Our Life
              application or website. By using our service you agree to these
              terms.
            </p>
            <p
              className="text-xs mt-4 font-semibold uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-noto)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Version 1.0 · January 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Content ── */}
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
                    href="/privacy-policy"
                    className="flex items-center gap-2 transition-colors duration-150"
                    style={{
                      fontFamily: "var(--font-noto)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#0D9488",
                    }}
                  >
                    <ChevronRight size={13} />
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="space-y-8 max-w-[960px]">
              {SECTION_CONTENT.map((section, delay_i) => {
                const Icon = section.icon;
                return (
                  <AnimatedSection key={section.id} delay={delay_i * 0.07}>
                    <div
                      id={section.id}
                      className="rounded-3xl p-8"
                      style={{
                        background: section.accent ? "#FFF5F5" : "#FFFFFF",
                        border: `1.5px solid ${section.accent ? "rgba(239,68,68,0.2)" : "#EDE8E3"}`,
                        boxShadow: section.accent
                          ? "0 4px 24px rgba(239,68,68,0.06)"
                          : "0 4px 24px rgba(15,23,42,0.05)",
                      }}
                    >
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center"
                          style={{
                            background: section.accent
                              ? "rgba(239,68,68,0.1)"
                              : "#CCFBF1",
                          }}
                        >
                          <Icon
                            size={20}
                            style={{
                              color: section.accent ? "#DC2626" : "#0D9488",
                            }}
                          />
                        </div>
                        <h2
                          className="font-black uppercase tracking-wider"
                          style={{
                            fontFamily: "var(--font-figtree)",
                            color: section.accent ? "#B91C1C" : "#0F172A",
                            fontSize: "1rem",
                          }}
                        >
                          {section.num}. {section.title}
                        </h2>
                      </div>
                      {section.body}
                    </div>
                  </AnimatedSection>
                );
              })}

              {/* Contact Legal */}
              <AnimatedSection delay={0.42}>
                <div
                  id="contact"
                  className="rounded-3xl p-8"
                  style={{
                    background: "#0F172A",
                    boxShadow: "0 20px 60px rgba(15,23,42,0.25)",
                  }}
                >
                  <h2
                    className="font-black text-white mb-2"
                    style={{
                      fontFamily: "var(--font-figtree)",
                      fontSize: "1.5rem",
                    }}
                  >
                    Contact Legal
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: "var(--font-noto)",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                    }}
                  >
                    Have questions about these terms? Reach our legal team
                    directly.
                  </p>
                  <a
                    href="mailto:disrupt@4th-pay.com"
                    className="inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-2xl font-bold transition-all duration-200"
                    style={{
                      background: "#0D9488",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-figtree)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <Mail size={16} />
                    Email Legal Team
                  </a>
                </div>
              </AnimatedSection>

              {/* Back / cross-link */}
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
                  href="/privacy-policy"
                  className="inline-flex items-center gap-2 transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-noto)",
                    color: "#0D9488",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  Privacy Policy
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
