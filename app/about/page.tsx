import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Target,
  Eye,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About Us — 4 Our Life | Bridging the Gap in Ghanaian Healthcare",
  description:
    "Learn about 4 Our Life's mission to democratize healthcare access in Ghana. Built to connect every Ghanaian to quality providers, accurate knowledge, and secure data management.",
};

// ─── Core Pillars ─────────────────────────────────────────────────────────────
const pillars = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "Every piece of health information on 4 Our Life is verified by certified Ghanaian medical professionals. No misinformation. No guesswork.",
    color: "from-emerald-500 to-teal-500",
    points: ["Verified by MDs", "Real-time updates", "Sourced from Ghana Health Service"],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    desc: "AES-256 encryption protects your medical records. Biometric authentication ensures your health data stays yours — always.",
    color: "from-blue-500 to-sky-500",
    points: ["AES-256 Encryption", "Biometric Auth", "Zero data selling"],
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Smarter tools built for the modern Ghanaian healthcare challenge — from Ghana Post GPS integration to AI-powered medication reminders.",
    color: "from-violet-500 to-purple-500",
    points: ["Ghana Post GPS", "AI Reminders", "Real-time Facility Data"],
  },
];

// ─── Team / Values ────────────────────────────────────────────────────────────
const values = [
  { emoji: "🇬🇭", label: "Proudly Ghanaian" },
  { emoji: "🔒", label: "Privacy First" },
  { emoji: "🌍", label: "Universal Access" },
  { emoji: "💡", label: "Innovation-Driven" },
];

export default function AboutPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Image */}
            <AnimatedSection direction="left">
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-100 to-sky-50 rounded-5xl -z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

                <div className="relative rounded-4xl overflow-hidden shadow-2xl">
                  <Image
                    src="/about-hero.png"
                    alt="Ghanaian patient consulting with a doctor at a modern clinic"
                    width={600}
                    height={700}
                    className="w-full h-[500px] object-cover"
                    priority
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-5 left-5 right-5 glass-light border border-emerald-200 rounded-2xl px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                        <HeartHandshake className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-montserrat font-bold text-slate-900 text-sm">
                          Connecting Ghana
                        </p>
                        <p className="text-slate-500 text-xs font-inter">
                          Doctor-verified content only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — Text */}
            <AnimatedSection direction="right">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-6">
                <span className="text-emerald-700 text-xs font-inter font-semibold tracking-wide uppercase">
                  Our Story
                </span>
              </div>
              <h1
                className="font-montserrat font-black text-slate-900 mb-6 leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                Bridging the Gap in{" "}
                <span className="gradient-text">Ghanaian Healthcare.</span>
              </h1>
              <p className="text-slate-600 font-inter text-lg leading-relaxed mb-6">
                4 Our Life was born from a simple, urgent truth: finding a
                reliable hospital, tracking your medications, and accessing
                accurate health information in Ghana shouldn&apos;t be hard.
              </p>
              <p className="text-slate-500 font-inter text-base leading-relaxed mb-8">
                We built this platform because we lived the problem. Long queues,
                outdated clinic lists, forgotten medications, unverified health
                advice — 4 Our Life solves all of this in the palm of your hand.
              </p>

              {/* Values pills */}
              <div className="flex flex-wrap gap-3">
                {values.map(({ emoji, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2"
                  >
                    <span>{emoji}</span>
                    <span className="text-slate-700 font-inter text-sm font-medium">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISSION SECTION
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-emerald-400 font-inter font-bold uppercase tracking-widest text-sm">
                Our Mission
              </p>
            </div>
            <h2
              className="font-montserrat font-black text-white mb-8 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              &ldquo;To{" "}
              <span className="gradient-text">democratize healthcare access</span>{" "}
              by connecting every Ghanaian to quality providers, accurate
              knowledge, and secure data management.&rdquo;
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mx-auto mb-8" />
            <p className="text-slate-400 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
              We believe that quality healthcare information and facility access
              should not be a privilege — it should be a right for every
              Ghanaian, in every region.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VISION SECTION
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-emerald-50 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                <Eye className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-emerald-700 font-inter font-bold uppercase tracking-widest text-sm">
                Our Vision
              </p>
            </div>
            <h2
              className="font-montserrat font-black leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
            >
              <span className="gradient-text">
                A healthier Ghana where professional medical guidance and facility
                discovery are just a tap away.
              </span>
            </h2>
            <p className="text-slate-600 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
              We envision a Ghana where no patient is lost searching for the
              right facility, where no medication is missed, and where every
              health decision is made with verified, trustworthy information.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CORE PILLARS
      ══════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 mb-5">
              <span className="text-slate-600 text-xs font-inter font-semibold tracking-wide uppercase">
                What We Stand For
              </span>
            </div>
            <h2
              className="font-montserrat font-black text-slate-900"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Our{" "}
              <span className="gradient-text">Core Pillars</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <AnimatedSection key={pillar.title} delay={i * 0.15} direction="up">
                  <div className="shimmer-card bg-white border border-slate-100 rounded-4xl p-8 h-full hover:border-emerald-200 hover:shadow-card-hover transition-all duration-300 group">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-montserrat font-black text-slate-900 text-xl mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-500 font-inter text-sm leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                    {/* Points */}
                    <ul className="space-y-2">
                      {pillar.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-slate-600 font-inter text-sm">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            <h2
              className="font-montserrat font-black text-white mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Ready to Join the Mission?
            </h2>
            <p className="text-slate-400 font-inter text-lg mb-10 max-w-xl mx-auto">
              Whether you&apos;re a patient seeking better care or a provider
              wanting to reach more Ghanaians — there&apos;s a place for you in
              the 4 Our Life ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#download">
                <div className="inline-flex items-center gap-2 bg-emerald-500 text-white font-inter font-bold px-8 py-4 rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-emerald hover:shadow-emerald-lg cursor-pointer">
                  Download the App
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
              <Link href="/register-facility">
                <div className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-inter font-bold px-8 py-4 rounded-full hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300 cursor-pointer">
                  Register a Facility
                </div>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
