"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { AppStoreIcon, PlayStoreIcon } from "./Brand-icons";



export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      id="download" 
      className="bg-[#F5F1EE] py-24 overflow-hidden"
    >
      <div className="mx-auto px-6 max-w-[1900px] min-[2500px]:max-w-[2400px]">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-teal-600 rounded-[2.5rem] min-[2500px]:rounded-[5rem] px-8 py-20 min-[2500px]:py-40 text-center flex flex-col items-center overflow-hidden shadow-2xl shadow-teal-900/20"
        >
          {/* Subtle v4 Decorative Patterns */}
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:32px_32px] min-[2500px]:bg-[size:64px_64px]" />
          
          {/* Floating Glow Orbs (Tailwind v4 dynamic blur) */}
          <div className="absolute -top-1/4 -left-1/4 w-96 h-96 min-[2500px]:w-[50rem] min-[2500px]:h-[50rem] bg-white/10 rounded-full blur-[80px] min-[2500px]:blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 min-[2500px]:w-[40rem] min-[2500px]:h-[40rem] bg-black/10 rounded-full blur-[80px] min-[2500px]:blur-[160px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl min-[2500px]:max-w-6xl">
            {/* Compelling Headline */}
            <h2 className="font-figtree font-black text-white leading-tight tracking-tight mb-6 
              text-4xl md:text-5xl lg:text-7xl"
            >
              The health of <span className="text-teal-200">your family</span><br className="hidden md:block" /> in your pocket.
            </h2>

            {/* Tightened Subtext */}
            <p className="font-noto text-white/80 leading-relaxed mx-auto mb-12
              text-lg lg:text-xl min-[2500px]:text-4xl min-[2500px]:mb-24 max-w-2xl min-[2500px]:max-w-5xl"
            >
              Don't wait for an emergency. Join 10,000+ Ghanaians who use 4 Our Life to find verified care and stay healthy every day.
            </p>

            {/* High-Contrast Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 min-[2500px]:gap-12">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-4 bg-slate-900 text-white min-w-[220px] min-[2500px]:min-w-[450px] px-8 py-4 min-[2500px]:px-16 min-[2500px]:py-10 rounded-full font-figtree font-extrabold shadow-xl hover:bg-black transition-colors"
              >
                <AppStoreIcon />
                <div className="text-left">
                  <p className="text-[10px] min-[2500px]:text-xl opacity-60 uppercase tracking-widest leading-none mb-1">Download on the</p>
                  <p className="text-lg min-[2500px]:text-4xl leading-none font-black">App Store</p>
                </div>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-4 bg-white/15 hover:bg-white/25 text-white border-2 border-white/20 backdrop-blur-md min-w-[220px] min-[2500px]:min-w-[450px] px-8 py-4 min-[2500px]:px-16 min-[2500px]:py-10 rounded-full font-figtree font-extrabold transition-all"
              >
                <PlayStoreIcon />
                <div className="text-left">
                  <p className="text-[10px] min-[2500px]:text-xl opacity-60 uppercase tracking-widest leading-none mb-1">Get it on</p>
                  <p className="text-lg min-[2500px]:text-4xl leading-none font-black">Google Play</p>
                </div>
              </motion.a>
            </div>

            {/* Social Trust Signal */}
            <div className="mt-12 min-[2500px]:mt-24 flex flex-col items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 min-[2500px]:w-20 min-[2500px]:h-20 rounded-full border-2 border-teal-600 bg-teal-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-white/60 font-noto font-medium text-sm min-[2500px]:text-2xl">
                Rated <span className="text-white font-bold">4.9/5 stars</span> by health professionals
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}