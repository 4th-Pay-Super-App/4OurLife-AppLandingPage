import { ArrowRight } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import Image from 'next/image';


const HOW_STEPS = [
  {
    num: "01",
    title: "Download 4 Our Life",
    desc: "Available on iOS and Android — free forever. No credit card, no subscription required to get started.",
  },
  {
    num: "02",
    title: "Set Up Your Profile",
    desc: "Add your health basics, medications, and preferred regions. Takes under 2 minutes and is fully encrypted.",
  },
  {
    num: "03",
    title: "Enjoy Every Feature",
    desc: "Locate clinics, set smart reminders, read verified guides, and manage your health all from one screen.",
  },
];

const HowItWorks = () => {
  return (
          <section id="how" style={{ background: "#FFFFFF" }} className="py-18 lg:pt-2 lg:pb-18">
        <div className="container-width">
          <AnimatedSection className="text-center mb-8 md:mb-10 lg:mb-12">
            <p style={{ fontFamily: "var(--font-noto)", fontWeight: 700, fontSize: "0.7rem", color: "#0D9488", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Simple Setup
            </p>
            <h2
              className="section-headline md:mb-1.5"
              style={{ fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0F172A"}}
            >
              How it works
            </h2>
            <p style={{ fontFamily: "var(--font-noto)", color: "#64748b", maxWidth: "30rem", margin: "0 auto", lineHeight: 1.65 }}>
              Three simple steps to take full control of your healthcare journey in Ghana.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-2 items-center">
            {/* Phone visual (green box) */}
            <AnimatedSection direction="left" className="flex justify-center">
              <div
                className="relative"
                style={{ borderRadius: "2rem", background: "#0D9488", padding: "2.5rem 2rem", display: "flex", justifyContent: "center", maxWidth: 320, width: "100%", boxShadow: "0 32px 80px rgba(13,148,136,0.35)" }}
              >
                {/* Subtle pattern */}
                <div className="grid-bg-dark absolute inset-0 rounded-3xl opacity-40 pointer-events-none" />
                {/* Glow orb */}
                <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "80%", height: 200, background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
                <Image 
                  src="/MapMockup4OL-landing-0200.png"
                  alt="4 Our Life Map Mockup"
                  width={600}
                  height={600}
                  loading='eager'
                  className="relative z-10"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </AnimatedSection>

            {/* Steps */}
            <div className="space-y-10">
              {HOW_STEPS.map(({ num, title, desc }, i) => (
                <AnimatedSection key={num} delay={i * 0.12} direction="right">
                  <div className="flex gap-7 items-start">
                    <div className="shrink-0 text-right" style={{ width: 64 }}>
                      <span className="step-num">{num}.</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-figtree)", fontWeight: 800, fontSize: "1.25rem", color: "#0F172A", marginBottom: "0.375rem" }}>{title}</h3>
                      <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.9rem", color: "#64748b", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default HowItWorks