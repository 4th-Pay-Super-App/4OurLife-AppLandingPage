"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin, Bell, BookOpen, ShieldCheck,
  ChevronDown, Building2, Apple, Smartphone,
  ArrowRight, Star, HeartPulse, Zap, CheckCircle2,
  Clock, AlertTriangle, TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSectionOne from "@/components/HeroSectionOne";
import { AppStoreIcon, PlayStoreIcon } from "@/components/Brand-icons";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import FinalCTA from "@/components/FinalCTA";

/* ─── Data ─────────────────────────────────────────────────── */



const PROBLEM_CARDS = [
  {
    icon: AlertTriangle,
    title: "Healthcare stress is at an all-time high",
    desc: "Finding quality medical care in Ghana takes hours and causes unnecessary anxiety for millions of patients.",
    bg: "#1E293B",
    border: "rgba(255,255,255,0.06)",
  },
  {
    icon: Clock,
    title: "Medication schedules are complex",
    desc: "Most people don't know that missing doses is the number one reason treatments fail and it is easily preventable.",
    bg: "#0D9488",
    border: "rgba(255,255,255,0.15)",
    highlight: true,
  },
  {
    icon: TrendingUp,
    title: "Limited access to health advice",
    desc: "Rural patients often lack access to verified health information, leaving them dependent on unreliable sources.",
    bg: "#1E293B",
    border: "rgba(255,255,255,0.06)",
  },
];



const TESTIMONIALS = [
  {
    name: "Dr. Ama Asante",
    role: "GP, Accra",
    text: "4 Our Life has transformed how my patients manage their health between visits. Medication adherence has improved dramatically.",
    rating: 5,
    initials: "AA",
  },
  {
    name: "Kwame Osei",
    role: "Patient, Kumasi",
    text: "Finding a hospital used to take hours. Now I locate verified clinics in seconds. This app is a genuine game-changer.",
    rating: 5,
    initials: "KO",
  },
  {
    name: "Abena Mensah",
    role: "Nurse, Takoradi",
    text: "The verified wellness library is incredible. My patients refer to it constantly and it gives me peace of mind.",
    rating: 5,
    initials: "AM",
  },
];

const FAQS = [
  {
    q: "How secure is my health data?",
    a: "Your data is protected with AES-256 encryption at rest and in transit. Biometric authentication ensures only you can access your records. We follow HIPAA-aligned best practices and never sell your data.",
  },
  {
    q: "Is 4 Our Life free for patients?",
    a: "Yes — the core app is completely free for individual patients. You can locate facilities, set medication reminders, and access the wellness library at no cost.",
  },
  {
    q: "How do I list my facility?",
    a: "Healthcare providers  would contact us with interests to register and our team will visit to register and verify the facility's documentation.",
  },
  {
    q: "Which regions are supported?",
    a: "We currently support all 16 regions of Ghana with growing coverage in both urban and rural areas. Ghana Post GPS integration ensures accuracy even for remote facilities.",
  },
];

/* ─── FAQ Item ──────────────────────────────────────────────── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedSection delay={index * 0.08}>
      <div
        style={{
          borderRadius: "1.25rem",
          border: `1.5px solid ${open ? "rgba(13,148,136,0.3)" : "#E5E0DA"}`,
          background: open ? "#FFFFFF" : "#F5F1EE",
          overflow: "hidden",
          transition: "all 0.25s ease",
          boxShadow: open ? "0 8px 32px rgba(13,148,136,0.08)" : "none",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-left transition-colors duration-150"
          style={{ padding: "1.375rem 1.5rem" }}
          aria-expanded={open}
        >
          <span style={{ fontFamily: "var(--font-figtree)", fontWeight: 700, fontSize: "1rem", color: "#0F172A", paddingRight: "1rem" }}>
            {q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: open ? "#0D9488" : "#EDE8E3", color: open ? "#FFFFFF" : "#475569", transition: "background 0.2s, color 0.2s" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: "hidden" }}
        >
          <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.9rem", color: "#475569", lineHeight: 1.75, padding: "0 1.5rem 1.375rem" }}>
            {a}
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main style={{ background: "#F5F1EE", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — White background, green + black
      ══════════════════════════════════════════════ */}
      <HeroSectionOne />
      <HowItWorks />

      {/* ══════════════════════════════════════════════
          DARK BANNER — Problem cards 
      ══════════════════════════════════════════════ */}
      <section className="bg-[#0F172A] py-24 relative overflow-hidden">
        {/* Overlays */}
        <div className="grid-bg-dark absolute inset-0 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--color-teal-600),transparent_90%)_0%,transparent_70%)] pointer-events-none" />

        <div className="container-width relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-14">
      <AnimatedSection direction="left">
        <h2 className="text-white font-figtree font-black text-[clamp(2rem,4vw,3.25rem)] leading-tight">
          Healthcare guidance,<br />every moment.
        </h2>
      </AnimatedSection>
      
      <AnimatedSection direction="right">
        <p className="text-white/55 font-noto text-base leading-relaxed">
          We help you identify the right facility, manage medications proactively, and access verified health information — so you stay in control of your wellbeing.
        </p>
      </AnimatedSection>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {PROBLEM_CARDS.map(({ icon: Icon, title, desc, bg, border, highlight }, i) => (
        <AnimatedSection key={title} delay={i * 0.1}>
          <div
            className="flex flex-col gap-4 p-8 rounded-3xl h-full border transition-all"
            style={{ 
              backgroundColor: bg, 
              borderColor: border 
            }}
          >
            {/* Icon Container */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 
              ${highlight ? "bg-white/20" : "bg-teal-600/18"}`}
            >
              <Icon 
                size={20} 
                className={highlight ? "text-white" : "text-teal-600"} 
              />
            </div>

            <h3 className="text-white font-figtree font-extrabold text-[1.05rem] leading-snug">
              {title}
            </h3>
            
            <p className="text-white/55 font-noto text-sm leading-relaxed grow">
              {desc}
            </p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
</section>


      {/* ══════════════════════════════════════════════
          FEATURE SPLIT 1 — Plan for every milestone
          Text LEFT, UI Card RIGHT (cream bg)
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#F5F1EE", padding: "6rem 0" }}>
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <AnimatedSection direction="left">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#CCFBF1", color: "#0D9488", padding: "0.4rem 1rem", borderRadius: "9999px", fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", border: "1.5px solid rgba(13,148,136,0.18)" }}>
                  <HeartPulse size={12} /> Proactive Health
                </div>
                <h2
                  className="section-headline"
                  style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", color: "#0F172A", marginBottom: "1.125rem" }}
                >
                  Plan for every health milestone.
                </h2>
                <p style={{ fontFamily: "var(--font-noto)", color: "#475569", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "27rem" }}>
                  Set medication reminders, track your health history, and get notified about upcoming checkups, all personalised to your routine.
                </p>
                <Link href="/register-facility">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2.5 cursor-pointer"
                    style={{ background: "#0D9488", color: "#FFFFFF", padding: "0.875rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.95rem", boxShadow: "0 8px 28px rgba(13,148,136,0.3)" }}
                  >
                    Get Started Free
                    <ArrowRight size={16} />
                  </motion.div>
                </Link>
              </div>
            </AnimatedSection>

            {/* UI demo card */}
            <AnimatedSection direction="right">
              <div
                className="float-anim"
                style={{ background: "#FFFFFF", borderRadius: "1.75rem", padding: "1.75rem", boxShadow: "0 20px 60px rgba(15,23,42,0.09)", border: "1px solid #EDE8E3" }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Today's Schedule</p>
                    <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "1.5rem", color: "#0F172A", lineHeight: 1.1, marginTop: 2 }}>4 Reminders</p>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: "0.875rem", background: "#CCFBF1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Bell size={20} style={{ color: "#0D9488" }} />
                  </div>
                </div>

                {/* Reminder rows */}
                {[
                  { name: "Paracetamol 500mg",  time: "8:00 AM",  done: true  },
                  { name: "Vitamin C 1000mg",   time: "12:00 PM", done: true  },
                  { name: "Metformin 850mg",    time: "6:00 PM",  done: false },
                  { name: "Omeprazole 20mg",    time: "9:00 PM",  done: false },
                ].map(({ name, time, done }) => (
                  <div
                    key={name}
                    style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem", borderRadius: "0.875rem", background: done ? "#F0FDFA" : "#F8FAFC", border: `1px solid ${done ? "rgba(13,148,136,0.15)" : "#F1F5F9"}`, marginBottom: "0.5rem" }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: done ? "#0D9488" : "#CBD5E1", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 700, fontSize: "0.85rem", color: done ? "#0D9488" : "#334155", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</p>
                    </div>
                    <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.72rem", color: "#94a3b8", flexShrink: 0 }}>{time}</p>
                    {done && <CheckCircle2 size={14} style={{ color: "#0D9488", flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURE SPLIT 2 — Expert guidance  (white bg)
          Phone LEFT, Text RIGHT
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "6rem 0" }}>
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Phone mockup */}
            <AnimatedSection direction="left" className="order-2 lg:order-1 flex justify-center">
              <div className="relative" style={{ maxWidth: 400, width: "100%" }}>
                {/* Glow */}
                <div style={{ position: "absolute", inset: -24, background: "radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
                <Image 
                  src="/MapMockup4OL-landing-0109.png"
                  alt="4 Our Life Map Mockup"
                  width={600}
                  height={600}
                  className="float-anim2 relative z-10"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection direction="right" className="order-1 lg:order-2">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#F5F1EE", color: "#475569", padding: "0.4rem 1rem", borderRadius: "9999px", fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", border: "1.5px solid #EDE8E3" }}>
                <MapPin size={12} /> Facility Locator
              </div>
              <h2
                className="section-headline"
                style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", color: "#0F172A", marginBottom: "1.125rem" }}
              >
                Expert guidance, straight to the point.
              </h2>
              <p style={{ fontFamily: "var(--font-noto)", color: "#475569", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "27rem" }}>
                For short-term and long-term care, count on professionally verified data to find the best-rated facilities near you — instantly and accurately.
              </p>
              {/* Feature list */}
              <div className="space-y-3">
                {[
                  "Ghana Post GPS integration for precise directions",
                  "Real-time open/closed status for every facility",
                  "Ratings from verified patients, not anonymous reviews",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#CCFBF1", border: "1.5px solid rgba(13,148,136,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <CheckCircle2 size={11} style={{ color: "#0D9488" }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.9rem", color: "#334155", lineHeight: 1.6 }}>{point}</p>
                  </div>
                ))}
              </div>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 cursor-pointer mt-8"
                style={{ background: "transparent", color: "#0D9488", padding: "0.875rem 0", fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.95rem", borderBottom: "2px solid #0D9488" }}
              >
                Start the Journey
                <ArrowRight size={16} />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* ══════════════════════════════════════════════
          TESTIMONIALS — "What They Said" (white)
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "6rem 0" }}>
        <div className="container-width">
          <AnimatedSection className="text-center" style={{ marginBottom: "3.5rem" }}>
            <h2
              className="section-headline"
              style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0F172A", marginBottom: "0.875rem" }}
            >
              What They Said
            </h2>
            <p style={{ fontFamily: "var(--font-noto)", color: "#64748b", maxWidth: "28rem", margin: "0 auto" }}>
              Real stories from across Ghana about how 4 Our Life is changing lives.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, rating, initials }, i) => (
              <AnimatedSection key={name} delay={i * 0.12}>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -5 }}
                  style={{ background: "#F5F1EE", borderRadius: "1.5rem", padding: "2rem", border: "1.5px solid #EDE8E3", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(15,23,42,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,148,136,0.2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F5F1EE"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "#EDE8E3"; }}
                >
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3, marginBottom: "1rem" }}>
                    {Array.from({ length: rating }).map((_, s) => (
                      <Star key={s} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.9rem", color: "#334155", lineHeight: 1.75, fontStyle: "italic", flexGrow: 1 }}>
                    &ldquo;{text}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", paddingTop: "1.25rem", marginTop: "1.25rem", borderTop: "1px solid #EDE8E3" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "0.875rem", background: "#CCFBF1", border: "1.5px solid rgba(13,148,136,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "0.9rem", color: "#0D9488", flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.95rem", color: "#0F172A", lineHeight: 1 }}>{name}</p>
                      <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 3 }}>{role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          B2B CTA (dark)
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#0F172A", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg-dark absolute inset-0 opacity-100 pointer-events-none" />
        <div style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(13,148,136,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container-width relative z-10 text-center max-w-4xl">
          <AnimatedSection>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(13,148,136,0.12)", border: "1px solid rgba(13,148,136,0.25)", color: "#2dd4bf", padding: "0.5rem 1.25rem", borderRadius: "9999px", fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1.75rem" }}>
              <Building2 size={13} /> For Healthcare Facilities
            </div>

            <h2
              className="section-headline"
              style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "clamp(2.25rem, 5vw, 3.75rem)", color: "#FFFFFF", marginBottom: "1.25rem" }}
            >
              Scale your facility to{" "}
              <span className="gradient-text">10,000+</span> patients.
            </h2>

            <p style={{ fontFamily: "var(--font-noto)", color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "34rem", margin: "0 auto 2.5rem" }}>
              Join Ghana&apos;s fastest-growing health network. Reach more patients, provide better digital support, and streamline your clinic&apos;s discovery.
            </p>

            <Link href="/register-facility">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 cursor-pointer"
                style={{ background: "#0D9488", color: "#FFFFFF", padding: "1.125rem 2.75rem", borderRadius: "9999px", fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "1.05rem", boxShadow: "0 12px 40px rgba(13,148,136,0.4)", letterSpacing: "-0.01em" }}
              >
                Become a Partner Facility
                <ArrowRight size={20} />
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ (cream)
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#F5F1EE", padding: "6rem 0" }}>
        <div className="container-width" style={{ maxWidth: 760 }}>
          <AnimatedSection className="text-center" style={{ marginBottom: "3rem" }}>
            <h2
              className="section-headline"
              style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0F172A", marginBottom: "0.875rem" }}
            >
              Got <span className="gradient-text">questions?</span>
            </h2>
            <p style={{ fontFamily: "var(--font-noto)", color: "#64748b" }}>
              Everything you need to know about the platform.
            </p>
          </AnimatedSection>

          <div className="space-y-3">
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — "Make Healthy Moves." (teal)
      ══════════════════════════════════════════════ */}
      <FinalCTA />

      <Footer />
    </main>
  );
}
