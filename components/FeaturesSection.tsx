"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bell, BookOpen, LucideIcon, MapPin, ShieldCheck } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge: string;
  accent: string;
  bg: string;
}

const FEATURES: FeatureProps[] = [
  {
    icon: MapPin,
    title: "Facility Locator",
    desc: "Search top-rated hospitals and clinics near you using Ghana Post GPS. Get verified directions instantly.",
    badge: "GPS-Powered",
    accent: "#0D9488",
    bg: "#CCFBF1",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Never miss a dose. Intelligent medication tracking with customisable schedules and push alerts.",
    badge: "AI-Powered",
    accent: "#2563EB",
    bg: "#DBEAFE",
  },
  {
    icon: BookOpen,
    title: "Verified Library",
    desc: "Condition-specific wellness guides curated by certified Ghanaian medical professionals.",
    badge: "Expert-Verified",
    accent: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    icon: ShieldCheck,
    title: "Biometric Lock",
    desc: "Your medical records secured with AES-256 encryption and biometric authentication. Privacy first.",
    badge: "Bank-Grade",
    accent: "#DC2626",
    bg: "#FEE2E2",
  },
];

export default function FeaturesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      id="features" 
      className="relative overflow-hidden bg-[#FBF9F8] py-24 min-[2500px]:py-48"
    >
      {/* Dynamic Background Element */}
      <div className="pointer-events-none absolute top-1/2 -right-24 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-teal-600),transparent_95%)_0%,transparent_70%)]" />

      <div className="container-width relative z-10 mx-auto px-6 max-w-[1900px] min-[2500px]:max-w-[2400px]">
        
        {/* Header Section */}
        <div className="mb-16 text-center min-[2500px]:mb-32">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-noto text-[0.7rem] font-bold tracking-[0.25em] text-teal-600 uppercase mb-3 min-[2500px]:text-xl"
          >
            Built for Ghana
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-figtree text-4xl font-black text-slate-900 md:text-5xl min-[2500px]:text-8xl leading-tight"
          >
            Everything you need, <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              nothing you don&apos;t.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-xl font-noto text-slate-500 leading-relaxed min-[2500px]:max-w-4xl min-[2500px]:text-3xl min-[2500px]:mt-10"
          >
            Purpose-built to solve real healthcare logistics challenges faced by Ghanaians every single day.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 min-[2500px]:gap-12">
          {FEATURES.map(({ icon: Icon, title, desc, badge, accent, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.01 }}
              className="group relative flex flex-col h-full cursor-default rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-teal-600/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] min-[2500px]:p-16 min-[2500px]:rounded-[4rem]"
            >
              {/* Feature Badge */}
              <div className="mb-6">
                <span className="inline-block rounded-full bg-slate-50 px-3 py-1 font-noto text-[10px] font-bold tracking-wider text-slate-400 uppercase min-[2500px]:text-lg min-[2500px]:px-6 min-[2500px]:py-2">
                  {badge}
                </span>
              </div>

              <div className="flex items-start gap-5 mb-6 min-[2500px]:gap-10 min-[2500px]:mb-10">
                {/* Icon Container with double layering */}
                <div 
                  className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl min-[2500px]:h-28 min-[2500px]:w-28 min-[2500px]:rounded-[2rem]"
                  style={{ backgroundColor: bg }}
                >
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/50" />
                  <Icon size={28} className="min-[2500px]:w-14 min-[2500px]:h-14" style={{ color: accent }} />
                </div>

                <div>
                  <h3 className="font-figtree text-xl font-extrabold text-slate-900 min-[2500px]:text-5xl">
                    {title}
                  </h3>
                  <div className="mt-1 h-1 w-8 rounded-full bg-teal-600/20 transition-all duration-300 group-hover:w-16 group-hover:bg-teal-600/40 min-[2500px]:h-2 min-[2500px]:w-16 min-[2500px]:group-hover:w-32" />
                </div>
              </div>

              <p className="flex-grow font-noto text-[0.95rem] leading-relaxed text-slate-600 min-[2500px]:text-3xl">
                {desc}
              </p>

              {/* Action Link */}
              <div 
                className="mt-8 flex items-center gap-2 font-figtree text-sm font-extrabold transition-all duration-300 min-[2500px]:text-3xl min-[2500px]:mt-16 min-[2500px]:gap-4"
                style={{ color: accent }}
              >
                <span className="group-hover:underline">Explore Feature</span>
                <ArrowRight 
                  size={18} 
                  className="transition-transform duration-300 group-hover:translate-x-2 min-[2500px]:w-10 min-[2500px]:h-10" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}