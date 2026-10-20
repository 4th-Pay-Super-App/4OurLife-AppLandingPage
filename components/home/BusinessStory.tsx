"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Ambulance, ArrowRight, Building2, CalendarDays, Dumbbell, Package, type LucideIcon } from "lucide-react";
import { useLenis } from "lenis/react";
import { useCallback, useRef, useState } from "react";
import { RevealLine, STAGGER } from "@/components/landing/motion";
import { useStageMode } from "./useStageMode";
import styles from "./home.module.css";

const roles = [
  {
    Icon: Building2,
    visual: "Ward updates",
    label: "Facilities",
    title: "Keep ward availability current.",
    body: "Update bed counts ward by ward and answer bed requests coming in from other care teams.",
    screen: "/home/business/facility.png",
    details: ["Ward-level updates", "Incoming requests", "Facility profile"],
  },
  {
    Icon: CalendarDays,
    visual: "Appointment slots",
    label: "Practitioners",
    title: "Make your services bookable.",
    body: "Publish what you offer, set the hours you work and handle appointment requests in one schedule.",
    screen: "/home/business/practitioner.png",
    details: ["Services", "Availability", "Appointment requests"],
  },
  {
    Icon: Dumbbell,
    visual: "Training sessions",
    label: "Trainers",
    title: "Plan sessions. Follow progress.",
    body: "Build programmes, schedule sessions and keep every client's progress in one view.",
    screen: "/home/business/trainer.png",
    details: ["Programmes", "Sessions", "Client progress"],
  },
  {
    Icon: Package,
    visual: "Product requests",
    label: "Pharmacies and vendors",
    title: "Put health products within reach.",
    body: "List what you stock and reply to requests and orders from members near you.",
    screen: "/home/business/vendor.png",
    details: ["Product catalogue", "Member requests", "Order status"],
  },
  {
    Icon: Ambulance,
    visual: "Bed coordination",
    label: "Ambulance teams",
    title: "Coordinate the next step.",
    body: "Send bed requests to nearby facilities and follow their answers from one workspace.",
    screen: "/home/business/ambulance.png",
    details: ["Bed requests", "Facility responses", "Dispatch workflow"],
  },
];

type BusinessRole = (typeof roles)[number];

function RoleVisual({ role }: { role: BusinessRole }) {
  const Icon = role.Icon as LucideIcon;
  return (
    <span className={styles.visualSurface}>
      <span className={styles.businessCalloutIcon}><Icon size={22} strokeWidth={1.75} /></span>
      <span className={styles.businessCalloutCopy}>
        <strong>{role.visual}</strong>
        <small>{role.label}</small>
      </span>
    </span>
  );
}

/*
 * Five panels travel horizontally while the phone stays put. The track holds on
 * each panel and then slides quickly, rather than drifting continuously, so the
 * copy is readable for most of the scroll instead of permanently mid-move.
 */
const TRACK_IN = [0, 0.12, 0.2, 0.37, 0.45, 0.62, 0.7, 0.87, 0.95, 1];
/*
 * Percentages in `translateX` resolve against the element's own border box, and
 * the track is 500% of the viewport wide. One panel is therefore 20% of the
 * track, not 100%: the old -100% steps moved it five viewports at a time and
 * threw every panel after the first off screen.
 */
const TRACK_OUT = ["0%", "0%", "-20%", "-20%", "-40%", "-40%", "-60%", "-60%", "-80%", "-80%"];
/** Each panel takes over halfway through its slide. */
const STEP_AT = [0.16, 0.41, 0.66, 0.91];

export function BusinessStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const mode = useStageMode();
  const scene = mode === "scene";
  const lenis = useLenis();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const trackX = useTransform(p, TRACK_IN, TRACK_OUT);
  // A shallower counter-drift on the phone reads as depth between the two layers.
  const deviceX = useTransform(p, [0, 1], ["0px", "-26px"]);

  useMotionValueEvent(p, "change", (value) => {
    const next = STEP_AT.filter((threshold) => value >= threshold).length;
    setActiveIndex((current) => (current === next ? current : next));
  });

  const jumpToRole = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      // Land in the middle of the target panel's hold, not on its slide.
      const holdCentre = [0.06, 0.28, 0.53, 0.78, 0.97][index];
      const travel = Math.max(0, section.offsetHeight - window.innerHeight);
      const top = section.offsetTop + holdCentre * travel;
      // Lenis owns the scroll position, so going through it keeps the eased glide.
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: "smooth" });
    },
    [lenis],
  );

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.business}
        data-mode={mode}
        id="business"
        aria-labelledby="business-heading"
      >
        {/* Remounted on a breakpoint change so Framer's inline track transform
            cannot survive into the flow layout. See ConsumerChapter. */}
        <div className={styles.businessStage} key={mode}>
          <div className={styles.businessSceneContent}>
          <div className={styles.businessIntro}>
            <span className={styles.eyebrow}>For health businesses</span>
            <h2 id="business-heading">
              <RevealLine>One workspace</RevealLine>
              <RevealLine delay={STAGGER.line}>
                <em>for the people who care.</em>
              </RevealLine>
            </h2>
            <p>
              For the hospitals, clinics, pharmacies, trainers and ambulance teams keeping care moving
              across Ghana.
            </p>
          </div>

          {/* Scene mode: one horizontal track. Flow mode: CSS unwraps the same
              markup into five stacked panels, so the copy exists only once. */}
          <div className={styles.businessViewport}>
            <motion.div
              className={styles.businessTrack}
              style={scene ? { x: trackX } : undefined}
            >
              {roles.map((role, index) => (
                <article className={styles.businessPanel} key={role.label} data-active={index === activeIndex}>
                  <span className={styles.roleCount}>
                    0{index + 1}
                    <i />0{roles.length}
                  </span>
                  <p className={styles.roleLabel}>{role.label}</p>
                  <h3>{role.title}</h3>
                  <p className={styles.roleBody}>{role.body}</p>
                  <div className={styles.roleDetails}>
                    {role.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                  <span className={styles.roleFlowVisual} aria-hidden="true"><RoleVisual role={role} /></span>
                  {/* Flow mode shows the matching capture beside each panel.
                      Scene mode uses the single phone on the right instead. */}
                  <div className={styles.panelImage}>
                    <Image src={role.screen} alt="" fill sizes="(max-width: 900px) 76vw, 40vw" />
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <motion.div className={styles.businessDeviceStage} style={scene ? { x: deviceX } : undefined}>
            <span className={styles.businessDeviceGlow} aria-hidden="true" />
            {scene ? (
              <motion.aside
                key={roles[activeIndex].label}
                className={styles.businessCallout}
                aria-hidden="true"
                initial={{ opacity: 0, x: 18, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <RoleVisual role={roles[activeIndex]} />
              </motion.aside>
            ) : null}
            <div className={styles.businessDevice}>
              {roles.map((role, index) => (
                <div
                  className={styles.businessDeviceLayer}
                  key={role.label}
                  data-active={index === activeIndex}
                >
                  <Image src={role.screen} alt="" fill sizes="28vw" />
                </div>
              ))}
            </div>
          </motion.div>

          <div className={styles.roleRail} aria-label="Business roles">
            {roles.map((role, index) => (
              <button
                type="button"
                key={role.label}
                className={index === activeIndex ? styles.roleRailActive : ""}
                aria-current={index === activeIndex ? "step" : undefined}
                onClick={() => jumpToRole(index)}
              >
                <span>0{index + 1}</span>
                {role.label}
              </button>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className={styles.businessBand} aria-label="Business app availability">
        <p>Make your service easier to find across Ghana.</p>
        <a href="mailto:hello@4ourlife.com?subject=4%20Our%20Life%20business%20interest" className={styles.lightButton}>
          Talk to our team <ArrowRight size={17} />
        </a>
        <span className={styles.comingSoon}>Business app · Coming soon</span>
      </section>
    </>
  );
}
