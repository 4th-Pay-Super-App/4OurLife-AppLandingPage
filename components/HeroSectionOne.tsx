"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ShieldCheck, HeartPulse, MapPin } from "lucide-react";
import Image from "next/image";
import { AppStoreIcon, PlayStoreIcon } from "./Brand-icons";

/* ─── Floating badge cards ──────────────────────────────────── */
const FLOAT_CARDS = [
  {
    id: "reminder",
    // Converted to Tailwind dynamic positioning
    positionClasses: "top-[18%] left-[-14%] min-w-[172px] min-[2500px]:min-w-[340px]",
    animClass: "float-anim2",
    delay: 0.9,
    node: (
      <div className="flex items-center gap-2.5 min-[2500px]:gap-5">
        <div className="w-9 h-9 min-[2500px]:w-18 min-[2500px]:h-18 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
          <HeartPulse className="text-teal-600 w-[18px] h-[18px] min-[2500px]:w-10 min-[2500px]:h-10" />
        </div>
        <div>
          <p className="font-figtree font-extrabold text-xs min-[2500px]:text-2xl text-slate-900 leading-none">Reminder Set</p>
          <p className="font-noto text-[10px] min-[2500px]:text-xl text-slate-500 mt-0.5 min-[2500px]:mt-2">Paracetamol · 8:00 AM</p>
        </div>
      </div>
    ),
  },
  {
    id: "nearby",
    positionClasses: "bottom-[26%] right-[-12%] min-w-[172px] min-[2500px]:min-w-[340px]",
    animClass: "float-anim3",
    delay: 1.1,
    node: (
      <div className="flex items-center gap-2.5 min-[2500px]:gap-5">
        <div className="w-9 h-9 min-[2500px]:w-18 min-[2500px]:h-18 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
          <MapPin className="text-teal-600 w-[18px] h-[18px] min-[2500px]:w-10 min-[2500px]:h-10" />
        </div>
        <div>
          <p className="font-figtree font-extrabold text-xs min-[2500px]:text-2xl text-slate-900 leading-none">Nearby Clinic</p>
          <p className="font-noto text-[10px] min-[2500px]:text-xl text-slate-500 mt-0.5 min-[2500px]:mt-2">0.4 km · Verified ✓</p>
        </div>
      </div>
    ),
  },
  {
    id: "secure",
    positionClasses: "top-[8%] right-[-8%] min-w-[148px] min-[2500px]:min-w-[300px]",
    animClass: "float-anim",
    delay: 1.3,
    node: (
      <div className="flex items-center gap-2 min-[2500px]:gap-4">
        <div className="w-7 h-7 min-[2500px]:w-14 min-[2500px]:h-14 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
          <ShieldCheck className="text-teal-600 w-3.5 h-3.5 min-[2500px]:w-8 min-[2500px]:h-8" />
        </div>
        <p className="font-figtree font-extrabold text-[11px] min-[2500px]:text-xl text-slate-900">Bank-Grade Secure</p>
      </div>
    ),
  },
];

export default function HeroSectionOne() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const mobileY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : -40]);

  return (
    <section id="home" className="bg-white overflow-hidden">

      {/* PART 1 — Full-bleed hero banner 
          Dynamic padding-top to clear navbar at all scales
      */}
      <div className="w-full pt-18 min-[2500px]:pt-40 leading-[0]">
        <Image
          src="/hero-section.png"
          alt="4 Our Life — Healthcare Simplified"
          width={1440}
          height={540}
          priority
          className="w-full h-auto block"
        />
      </div>

      {/* PART 2 — Main Hero Content */}
      <div className="bg-white pt-12 pb-6 lg:pt-2 lg:pb-2 min-[2500px]:py-40 relative">
        <div className="dot-bg absolute inset-0 opacity-50 pointer-events-none" />

        <div className="container-width relative z-10 max-w-[1900px] min-[2500px]:max-w-[2400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-[2500px]:gap-24 items-center">

            {/* LEFT: Text Content */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:block"
            >
              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-figtree font-black text-slate-900 mb-6 min-[2500px]:mb-12 leading-tight items-center"
              >
                <span className="block text-4xl md:text-6xl lg:text-7xl min-[2500px]:text-[120px]">Healthcare</span>
                <span className="text-teal-600 block text-4xl md:text-6xl lg:text-7xl min-[2500px]:text-[120px]">made simple.</span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="font-noto text-slate-600 text-base lg:text-lg min-[2500px]:text-4xl lg:max-w-lg min-[2500px]:max-w-4xl leading-relaxed mb-8 min-[2500px]:mb-20"
              >
                Locate hospitals, track medications, and access verified wellness tips — 
                the comprehensive healthcare companion built specifically for Ghana.
              </motion.p>

              {/* CTA BUTTONS */}
              <motion.div className="flex flex-wrap gap-4 min-[2500px]:gap-10 mb-10 min-[2500px]:mb-24">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-slate-900 hover:bg-teal-600 text-white px-6 py-3 md:px-8 md:py-4 min-[2500px]:px-16 min-[2500px]:py-8 rounded-full font-figtree font-extrabold text-xs md:text-[15px] min-[2500px]:text-3xl no-underline inline-flex items-center gap-3 min-[2500px]:gap-6 shadow-lg transition-colors duration-300"
                >
                  <div className="scale-100 min-[2500px]:scale-200"><AppStoreIcon /></div>
                  <div className="text-left">
                    <p className="text-[8px] md:text-[9px] min-[2500px]:text-xl opacity-60 leading-none uppercase tracking-widest">Download on</p>
                    <p className="text-base min-[2500px]:text-4xl leading-tight">App Store</p>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-white text-slate-900 border-2 border-slate-200 hover:border-teal-600 hover:text-teal-600 px-6 py-3 md:px-8 md:py-4 min-[2500px]:px-16 min-[2500px]:py-8 rounded-full font-figtree font-extrabold text-xs md:text-[15px] min-[2500px]:text-3xl no-underline inline-flex items-center gap-3 min-[2500px]:gap-6 shadow-sm transition-all duration-300"
                >
                  <div className="scale-100 min-[2500px]:scale-200"><PlayStoreIcon /></div>
                  <div className="text-left">
                    <p className="text-[8px] md:text-[9px] min-[2500px]:text-xl opacity-60 leading-none uppercase tracking-widest">Get it on</p>
                    <p className="text-base min-[2500px]:text-4xl leading-tight">Google Play</p>
                  </div>
                </motion.a>
              </motion.div>

              {/* Stats Strip */}
              <div className="flex flex-wrap gap-8 min-[2500px]:gap-20 pt-8 min-[2500px]:pt-16 border-t border-slate-200 w-full justify-center lg:justify-start">
                {[
                  { value: "500+", label: "Facilities" },
                  { value: "10K+", label: "Users"      },
                  { value: "16",   label: "Regions"    },
                  { value: "4.9★", label: "Rating"     },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-figtree font-black text-xl md:text-2xl min-[2500px]:text-6xl text-teal-600 leading-none">{value}</p>
                    <p className="font-noto text-[11px] min-[2500px]:text-xl text-slate-400 font-bold uppercase tracking-widest mt-1.5 min-[2500px]:mt-4">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Video Column (Hidden on mobile) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex relative justify-center"
            >
              <div className="absolute inset-[-32px] bg-[radial-gradient(ellipse_at_50%_60%,rgba(13,148,136,0.1)_0%,transparent_65%)] pointer-events-none" />

              <motion.div
                style={{ y: mobileY }}
                className="relative z-10 w-full max-w-[520px] min-[2500px]:max-w-[1000px]"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto drop-shadow-2xl mix-blend-multiply"
                >
                  <source src="/hero-mobile-video.mp4" type="video/mp4" />
                </video>

                {/* Floating badge cards */}
                {FLOAT_CARDS.map(({ id, positionClasses, animClass, delay, node }) => (
                  <motion.div
                    key={id}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay, duration: 0.5, ease: "easeOut" }}
                    className={`absolute z-20 bg-white rounded-2xl min-[2500px]:rounded-[40px] p-3 min-[2500px]:p-8 shadow-xl border border-slate-100 ${positionClasses} ${animClass}`}
                  >
                    {node}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}