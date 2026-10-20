"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { Activity, Biohazard, CalendarDays, Droplet, Dumbbell, HeartPulse, MapPin } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/store-links";
import { Magnetic } from "@/components/landing/motion";
import { DeviceFrame, DeviceLayerGroup, DeviceScreen, type Screen } from "./DeviceFrame";
import { useScrub } from "./useScrub";
import { useStageMode } from "./useStageMode";
import styles from "./home.module.css";

/*
 * The consumer chapter is one continuous scroll scene in three acts:
 *
 *   act 1  hero          light page, one phone showing Home, copy on the left
 *   act 2  three phones  page darkens to forest, two more phones come out from
 *                        behind the first and spread, captions underneath
 *   act 3  Plasence      page returns to light, the side phones sink away, the
 *                        middle phone sweeps left and its screen crossfades
 *                        from Home into Plasence Today
 *
 * It is a single component on purpose. Previously the hero handoff and the
 * Plasence section were separate pinned sections, so the phones could not
 * travel between them: the first pin released (hard cut from forest to paper)
 * and the second section then faded a different phone in from scratch. Keeping
 * one stage and one set of phones is what makes the devices follow the reader
 * into Plasence and land on Today.
 */

const PAPER = "#f6f8f6";
const FOREST = "#0b2a1d";

/** The hero phone. Also act 2's middle phone, and act 3's Plasence phone. */
const HOME_SCREEN: Screen = { src: "/home/consumer/home-source.png", alt: "" };

/**
 * Alt text is empty by design. Each capture sits directly beside copy that
 * states what the screen is for, and the redesign brief requires that the
 * screenshots never read out dates, names or health records.
 */
const pillars = [
  {
    Icon: Biohazard,
    title: "Answers in plain language",
    body: "Look up conditions, symptoms and treatments before you join the queue.",
    screen: { src: "/home/consumer/disease-library.png", alt: "" },
    side: "left" as const,
  },
  {
    Icon: HeartPulse,
    title: "Your health on one screen",
    body: "Categories, reminders and the services around you, straight from the home screen.",
    screen: HOME_SCREEN,
    side: "centre" as const,
  },
  {
    Icon: MapPin,
    title: "Care around the corner",
    body: "Browse hospitals, pharmacies, specialists and ambulance services, with NHIS shown where listed.",
    screen: { src: "/home/consumer/map-directory.png", alt: "" },
    side: "right" as const,
  },
];

const PLASENCE_TABS = ["Today", "Calendar", "Insights"] as const;
type PlasenceTab = (typeof PLASENCE_TABS)[number];

const plasenceScreens: Record<PlasenceTab, { screen: Screen; summary: string }> = {
  Today: {
    screen: { src: "/home/consumer/plasence-today.png", alt: "" },
    summary: "See where you are in your cycle and log how today feels.",
  },
  Calendar: {
    screen: { src: "/home/consumer/plasence-calendar.png", alt: "" },
    summary: "Look back at the days you logged and the dates estimated ahead.",
  },
  Insights: {
    screen: { src: "/home/consumer/plasence-insights-v1.png", alt: "" },
    summary: "Watch your own patterns build up over a few cycles.",
  },
};

const categoryVisuals = [
  { Icon: null, assetClass: "brandDisease", className: "categoryVisualDisease" },
  { Icon: Dumbbell, assetClass: null, className: "categoryVisualFitness" },
  { Icon: HeartPulse, assetClass: null, className: "categoryVisualWellness" },
  { Icon: null, assetClass: "brandPlasence", className: "categoryVisualPlasence" },
] as const;

function PlasenceVisual({ activeTab }: { activeTab: PlasenceTab }) {
  if (activeTab === "Today") {
    return <div className={styles.plasenceOrb}><span className={`${styles.brandCategoryIcon} ${styles.brandPlasence}`} /></div>;
  }
  if (activeTab === "Calendar") {
    return (
      <div className={styles.plasenceCalendar}>
        <CalendarDays size={18} strokeWidth={1.6} />
        <span className={styles.plasenceCalendarDots} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
      </div>
    );
  }
  return (
    <div className={styles.plasenceChart}>
      <Activity size={19} strokeWidth={1.6} />
      <span aria-hidden="true"><i /><i /><i /><i /><i /></span>
    </div>
  );
}

/**
 * Drops a faded-out layer out of the tab order. `opacity: 0` alone still leaves
 * its buttons focusable, so a keyboard user could land on the Plasence tabs
 * while they are invisible at the top of the page.
 */
const useVisibility = (opacity: MotionValue<number>) =>
  useTransform(opacity, (value) => (value < 0.04 ? "hidden" : "visible"));

export function ConsumerChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillarBandRef = useRef<HTMLDivElement>(null);
  const pillarGridRef = useRef<HTMLDivElement>(null);
  const mode = useStageMode();
  const scene = mode === "scene";
  const [activeTab, setActiveTab] = useState<PlasenceTab>("Today");
  const [pillarTrackDistance, setPillarTrackDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Lenis already interpolates the scroll position itself, so the raw progress
  // is frame-continuous and needs no extra spring. Smoothing it twice would
  // only make the phones visibly lag behind the scrollbar.
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const { scrollYProgress: pillarProgress } = useScroll({
    target: pillarBandRef,
    offset: ["start start", "end end"],
  });
  const pillarTrackX = useTransform(pillarProgress, [0, 1], [0, -pillarTrackDistance]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const grid = pillarGridRef.current;
    if (!grid) return;

    const measure = () => {
      const cards = grid.children;
      if (cards.length < 2) return setPillarTrackDistance(0);
      const first = cards[0] as HTMLElement;
      const last = cards[cards.length - 1] as HTMLElement;
      setPillarTrackDistance(last.getBoundingClientRect().left - first.getBoundingClientRect().left);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  /* The vw/svh/colour scrubs below keep `useTransform`: their outputs are
     strings, which Framer cannot lift into WAAPI keyframes, so they already
     run on the frame loop. Every numeric value uses `useScrub`. */
  const stageColor = useTransform(p, [0, 0.22, 0.36, 0.62, 0.78, 1], [PAPER, PAPER, FOREST, FOREST, PAPER, PAPER]);

  const heroOpacity = useScrub(p, [0, 0.06, 0.2], [1, 1, 0]);
  const heroY = useScrub(p, [0, 0.2], [0, -56]);
  const heroVisibility = useVisibility(heroOpacity);
  const heroGlow = useScrub(p, [0, 0.22, 0.34], [1, 1, 0]);

  // The middle phone: right of the hero copy, to the centre for act 2, then a
  // sweep to the left so act 3 mirrors act 1 instead of repeating it.
  const centreX = useTransform(p, [0, 0.06, 0.26, 0.58, 0.8, 1], ["21cqw", "21cqw", "0cqw", "0cqw", "-19cqw", "-19cqw"]);
  const centreY = useTransform(p, [0, 0.3, 0.58, 0.8], ["0svh", "-4svh", "-4svh", "0svh"]);
  const centreScale = useScrub(p, [0, 0.08, 0.3, 0.58, 0.8], [1, 1, 0.82, 0.82, 1.12]);

  const sideOpacity = useScrub(p, [0.28, 0.4, 0.58, 0.7], [0, 1, 1, 0]);
  const sideScale = useScrub(p, [0.28, 0.46, 0.58, 0.72], [0.6, 0.82, 0.82, 0.6]);
  const sideY = useTransform(p, [0.28, 0.46, 0.58, 0.72], ["3svh", "-4svh", "-4svh", "-1svh"]);
  const leftX = useTransform(p, [0.28, 0.46, 0.58, 0.72], ["0cqw", "-24cqw", "-24cqw", "-6cqw"]);
  const rightX = useTransform(p, [0.28, 0.46, 0.58, 0.72], ["0cqw", "24cqw", "24cqw", "6cqw"]);
  const forestGlow = useScrub(p, [0.26, 0.38, 0.62, 0.74], [0, 1, 1, 0]);

  const captionOpacity = useScrub(p, [0.38, 0.5, 0.58, 0.66], [0, 1, 1, 0]);
  const captionY = useScrub(p, [0.38, 0.5], [20, 0]);
  const careCalloutOpacity = useScrub(p, [0.32, 0.42, 0.59, 0.68], [0, 1, 1, 0]);
  const careCalloutY = useScrub(p, [0.32, 0.44, 0.59, 0.68], [24, 0, 0, -12]);
  const careCalloutScale = useScrub(p, [0.32, 0.44], [0.92, 1]);
  const categoryVisualOpacity = useScrub(p, [0.32, 0.42, 0.59, 0.68], [0, 1, 1, 0]);
  const plasenceVisualOpacity = useScrub(p, [0.69, 0.82, 0.94, 1], [0, 1, 1, 1]);
  const plasenceVisualY = useScrub(p, [0.69, 0.82], [24, 0]);

  // The handover itself: Home dissolves into Plasence inside the same frame.
  const homeOpacity = useScrub(p, [0.62, 0.73], [1, 0]);
  const plasenceScreenOpacity = useScrub(p, [0.64, 0.75], [0, 1]);
  const plasenceAura = useScrub(p, [0.68, 0.8], [0, 1]);
  const plasenceCopyOpacity = useScrub(p, [0.72, 0.84], [0, 1]);
  const plasenceCopyX = useScrub(p, [0.72, 0.84], [52, 0]);
  const plasenceVisibility = useVisibility(plasenceCopyOpacity);

  /*
   * The fixed navigation pill is light glass, which disappears against the
   * forest act. Writing a data attribute straight onto <html> keeps the
   * inversion out of React: a scroll-driven `setState` here re-rendered the
   * whole chapter on every frame, which is the other half of the old jank.
   */
  const darkToneRef = useRef(false);
  useMotionValueEvent(p, "change", (value) => {
    const dark = scene && value > 0.3 && value < 0.72;
    if (dark === darkToneRef.current) return;
    darkToneRef.current = dark;
    document.documentElement.dataset.chapterTone = dark ? "dark" : "light";
  });
  useEffect(() => {
    if (!scene) delete document.documentElement.dataset.chapterTone;
    return () => {
      delete document.documentElement.dataset.chapterTone;
    };
  }, [scene]);

  const current = plasenceScreens[activeTab];

  return (
    <section
      ref={sectionRef}
      id="top"
      className={styles.chapter}
      data-mode={mode}
      aria-labelledby="hero-heading"
    >
      {/* `#people` and `#plasence` cannot live on the acts themselves: those are
          pinned, so the browser would scroll to wherever the sticky stage
          currently sits. These markers sit in the section's own coordinate
          space, at the scroll depth where each act has arrived. */}
      {scene ? (
        <>
          <span id="people" className={`${styles.actAnchor} ${styles.anchorPillars}`} aria-hidden="true" />
          <span id="plasence" className={`${styles.actAnchor} ${styles.anchorPlasence}`} aria-hidden="true" />
        </>
      ) : null}

      {/*
       * `key={mode}` remounts the stage when the viewport crosses the
       * breakpoint. Framer Motion writes transforms straight to the node and
       * does not clear style keys it stops owning, so without this a resize from
       * scene to flow would leave a stale transform frozen on every phone.
       */}
      <motion.div
        key={mode}
        className={styles.stage}
        style={scene ? { backgroundColor: stageColor } : undefined}
      >
        <motion.div
          className={styles.heroGlow}
          aria-hidden="true"
          style={scene ? { opacity: heroGlow } : undefined}
        />
        <motion.div
          className={styles.forestGlow}
          aria-hidden="true"
          style={scene ? { opacity: forestGlow } : undefined}
        />

        <div className={styles.sceneContent}>
        <motion.div
          className={styles.heroCopy}
          style={scene ? { opacity: heroOpacity, y: heroY, visibility: heroVisibility } : undefined}
        >
          {/*
            * The headline reveal is CSS, not Framer Motion, because this is the
            * LCP element. Framer server-renders its `initial` state, so a
            * masked `RevealLine` ships as `translateY(112%)` and the headline
            * stays invisible until the React bundle lands: seconds of blank
            * hero on a slow connection. A keyframe animation runs on first
            * paint whether or not hydration ever happens.
            */}
          <h1 id="hero-heading">
            <span className={styles.heroLine}><span>Everyday health.</span></span>
            <span className={styles.heroLine}><span><em>Care closer to home.</em></span></span>
          </h1>
          <p>
            Find care near you in Ghana, read up on conditions in plain language and keep your health
            routine in view.
          </p>
          <div className={styles.heroActions}>
            <Magnetic as="a" className={styles.primaryButton} href={APP_STORE_URL} target="_blank" rel="noreferrer">
              Get the app <span aria-hidden="true">↗</span>
            </Magnetic>
            <a className={styles.secondaryButton} href="#business">
              For health businesses <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className={styles.storeLinks} aria-label="Available on the App Store and Google Play">
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
              <SiApple className={styles.storeLogo} aria-hidden="true" />
              <span>
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
              <SiGoogleplay className={styles.storeLogo} aria-hidden="true" />
              <span>
                <small>Get it on</small>
                <strong>Google Play</strong>
              </span>
            </a>
          </div>
        </motion.div>

        <div className={styles.deviceStage}>
          <motion.div
            className={`${styles.device} ${styles.deviceCentre}`}
            style={scene ? { x: centreX, y: centreY, scale: centreScale } : undefined}
          >
            <DeviceFrame>
              <DeviceScreen
                screen={HOME_SCREEN}
                priority
                style={scene ? { opacity: homeOpacity } : undefined}
              />
              {/* In flow mode the Plasence act has its own phone further down
                  the page, so these layers would just sit on top of Home. */}
              {scene ? (
                <DeviceLayerGroup style={{ opacity: plasenceScreenOpacity }}>
                  {PLASENCE_TABS.map((tab) => (
                    <DeviceScreen
                      key={tab}
                      screen={plasenceScreens[tab].screen}
                      active={tab === activeTab}
                    />
                  ))}
                </DeviceLayerGroup>
              ) : null}
            </DeviceFrame>
          </motion.div>

          {pillars
            .filter((pillar) => pillar.side !== "centre")
            .map((pillar) => {
              const isLeft = pillar.side === "left";
              return (
                <motion.div
                  key={pillar.side}
                  className={`${styles.device} ${isLeft ? styles.deviceLeft : styles.deviceRight}`}
                  style={
                    scene
                      ? { x: isLeft ? leftX : rightX, y: sideY, scale: sideScale, opacity: sideOpacity }
                      : undefined
                  }
                >
                  <DeviceFrame>
                    <DeviceScreen screen={pillar.screen} />
                  </DeviceFrame>
                </motion.div>
              );
            })}
        </div>

        <div className={styles.categoryVisuals} aria-hidden="true">
          {categoryVisuals.map(({ Icon, assetClass, className }) => (
            <motion.span
              className={`${styles.categoryVisual} ${styles[className]}`}
              key={className}
              style={scene ? { opacity: categoryVisualOpacity } : undefined}
            >
              <span className={styles.visualSurface}>
                {Icon ? <Icon size={31} strokeWidth={1.8} /> : <span className={`${styles.brandCategoryIcon} ${styles[assetClass!]}`} />}
              </span>
            </motion.span>
          ))}
        </div>

        {/* Example floating detail card: introduced with the three-device
            reveal and kept outside the hero so the opening stays uncluttered. */}
        <motion.aside
          className={styles.careCallout}
          aria-hidden="true"
          style={scene ? { opacity: careCalloutOpacity, y: careCalloutY, scale: careCalloutScale } : undefined}
        >
          <span className={styles.visualSurface}>
            <span className={styles.careCalloutIcon}><MapPin size={21} strokeWidth={1.8} /></span>
            <span className={styles.careCalloutCopy}>
              <strong>Care, closer to you</strong>
              <span>Specialties · nearby facilities</span>
              <small>Bed updates, when listed</small>
            </span>
            <span className={styles.careCalloutSpark} aria-hidden="true">↗</span>
          </span>
        </motion.aside>

        <motion.div
          className={styles.pillarBand}
          ref={pillarBandRef}
          id={scene ? undefined : "people"}
          style={scene ? { opacity: captionOpacity, y: captionY } : undefined}
        >
          <div className={styles.pillarSticky}>
            {/* Visually hidden in scene mode, where the three captions carry the
                act on their own, but kept in the document so the heading outline
                is the same at every breakpoint. */}
            <h2 className={styles.pillarHeading}>
              Small steps, <em>all year round.</em>
            </h2>
            <div className={styles.pillarViewport}>
              <motion.div
                ref={pillarGridRef}
                className={styles.pillarGrid}
                style={!scene && isMobile ? { x: pillarTrackX } : undefined}
              >
                {pillars.map(({ Icon, ...pillar }) => (
                  <article className={styles.pillar} key={pillar.title}>
                    {/* Scene mode shows the real phones instead, so rendering the
                        card image there would duplicate every screenshot request
                        and hand Next a second, lazy copy of the LCP candidate. */}
                    {scene ? null : (
                      <div className={styles.pillarImage}>
                        <Image src={pillar.screen.src} alt="" fill sizes="(max-width: 900px) 220px, 80vw" />
                      </div>
                    )}
                    <span className={styles.pillarVisual} aria-hidden="true"><Icon size={23} strokeWidth={1.8} /></span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                  </article>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.plasenceCopy}
          id={scene ? undefined : "plasence"}
          style={scene ? { opacity: plasenceCopyOpacity, x: plasenceCopyX, visibility: plasenceVisibility } : undefined}
        >
          <span className={styles.eyebrow}>Plasence</span>
          <h2 id="plasence-heading">
            Know your cycle,
            <br />
            <em>week by week.</em>
          </h2>
          <p>Log how you feel, keep your own record and see estimates built only from the days you enter.</p>
          <div className={styles.plasenceTabs} role="group" aria-label="Choose a Plasence screen">
            {PLASENCE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                className={activeTab === tab ? styles.plasenceTabActive : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className={styles.plasenceSummary} aria-live="polite">
            {current.summary}
          </p>
          <p className={styles.healthNote}>
            Cycle dates and fertile windows are estimates based on what you log. Plasence does not
            diagnose health conditions.
          </p>
        </motion.div>

        {/* Flow mode needs its own Plasence phone, because the hero phone above
            stays on Home instead of travelling. */}
        {scene ? null : (
          <div className={styles.plasenceDeviceFlow}>
            <span className={styles.plasenceAura} aria-hidden="true" />
            <div className={styles.plasenceVisualFlow} aria-hidden="true">
              <motion.span
                key={`flow-${activeTab}`}
                className={styles.visualSurface}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <PlasenceVisual activeTab={activeTab} />
              </motion.span>
            </div>
            <DeviceFrame>
              {PLASENCE_TABS.map((tab) => (
                <DeviceScreen key={tab} screen={plasenceScreens[tab].screen} active={tab === activeTab} />
              ))}
            </DeviceFrame>
          </div>
        )}

        {scene ? (
          <motion.aside
            className={styles.plasenceVisual}
            aria-hidden="true"
            style={{ opacity: plasenceVisualOpacity, y: plasenceVisualY }}
          >
            <motion.span
              key={activeTab}
              className={styles.visualSurface}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlasenceVisual activeTab={activeTab} />
            </motion.span>
          </motion.aside>
        ) : null}

        <motion.span
          className={styles.plasenceAuraScene}
          aria-hidden="true"
          style={scene ? { opacity: plasenceAura } : undefined}
        />
        </div>
      </motion.div>
    </section>
  );
}
