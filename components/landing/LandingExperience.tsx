"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLenis } from "lenis/react";
import {
  Ambulance,
  ArrowDown,
  ArrowRight,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Dumbbell,
  Menu,
  MapPin,
  Package,
  Sparkles,
  Stethoscope,
  Video,
  X,
} from "lucide-react";
import { FaApple } from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";
import type { ComponentType, ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import {
  AmbulanceScreen,
  BusinessWelcomeScreen,
  ConsumerHomeScreen,
  DeviceFrame,
  FacilityScreen,
  PracticeScreen,
  TrainerScreen,
  VendorScreen,
} from "./DeviceMockups";
import {
  DUR,
  EASE,
  Grain,
  Magnetic,
  RevealLine,
  RevealText,
  SCROLL_OFFSET,
  SmoothScroll,
  SPRING,
  STAGGER,
  Spotlight,
  useChapterSettle,
  usePacedChapter,
  useScrollDirection,
  useSmoothProgress,
} from "./motion";
import styles from "./LandingExperience.module.css";

type Chapter = {
  eyebrow: string;
  title: string;
  body: string;
  details: string[];
  Screen?: ComponentType;
  image?: string;
  imageAlt?: string;
  accent: string;
};

const consumerChapters: Chapter[] = [
  {
    eyebrow: "Fitness",
    title: "Move with a plan that moves with you.",
    body: "Find exercises, follow guided sessions, take your workout outdoors and see the progress that keeps you going.",
    details: ["Guided workouts", "Outdoor routes", "Goals & FitCoins"],
    image: "/brand/consumer-features/fitness-device-v1.png",
    imageAlt: "4 Our Life Fitness experience on an iPhone",
    accent: "#47BE7D",
  },
  {
    eyebrow: "Find care",
    title: "The right care, closer.",
    body: "Explore nearby facilities and health services from one clear map, then move from discovery to the next step with less friction.",
    details: ["Nearby services", "Useful filters", "Facility details"],
    image: "/brand/consumer-features/care-device-v1.png",
    imageAlt: "4 Our Life nearby care map on an iPhone",
    accent: "#2E9E63",
  },
  {
    eyebrow: "Reminders",
    title: "Your routine, remembered.",
    body: "Bring medication, workouts and appointments into one calm daily rhythm—so the important things are easier to stay on top of.",
    details: ["Medication", "Appointments", "Daily planning"],
    image: "/brand/consumer-features/reminders-device-v1.png",
    imageAlt: "4 Our Life reminders experience on an iPhone",
    accent: "#1F7A4B",
  },
  {
    eyebrow: "Understand",
    title: "Health knowledge, ready when you need it.",
    body: "Search conditions and learn about symptoms, causes and treatments through a library designed for calm, useful discovery.",
    details: ["Condition library", "Symptoms & causes", "Treatment guidance"],
    image: "/brand/consumer-features/understand-device-v1.png",
    imageAlt: "4 Our Life Disease Library on an iPhone",
    accent: "#96DDB3",
  },
  {
    eyebrow: "Cycle health",
    title: "Know your rhythm. Plan with confidence.",
    body: "Track your cycle, understand each phase and turn daily check-ins into clearer, more personal health insights.",
    details: ["Cycle tracking", "Phase insights", "Daily check-ins"],
    image: "/brand/consumer-features/cycle-device-v1.png",
    imageAlt: "4 Our Life Plasence cycle-health experience on an iPhone",
    accent: "#E91E63",
  },
];

const businessChapters: Chapter[] = [
  {
    eyebrow: "Facilities",
    title: "See the day clearly. Run care smoothly.",
    body: "Bring live bed availability, bookings, messages and operational alerts into one focused workspace for your team.",
    details: ["Live capacity", "Bookings", "Team alerts"],
    Screen: FacilityScreen,
    accent: "#8BE0AD",
  },
  {
    eyebrow: "Practitioners",
    title: "Your practice, without the busywork.",
    body: "Keep schedules, patient touchpoints and shared reports close—before, during and after every appointment.",
    details: ["Smart schedule", "Patient flow", "Shared reports"],
    Screen: PracticeScreen,
    accent: "#B3EBC8",
  },
  {
    eyebrow: "Trainers",
    title: "Coach the person, not the paperwork.",
    body: "Follow client momentum, build programs and spot the moments where a little attention can make a big difference.",
    details: ["Client progress", "Programs", "Scheduling"],
    Screen: TrainerScreen,
    accent: "#8BE0AD",
  },
  {
    eyebrow: "Vendors",
    title: "Turn demand into better service.",
    body: "Manage your catalogue, stay ahead of orders and use practical demand signals to keep the right products moving.",
    details: ["Catalogue", "Orders", "Demand insights"],
    Screen: VendorScreen,
    accent: "#C8F1D8",
  },
  {
    eyebrow: "Ambulance teams",
    title: "Every second, connected.",
    body: "Coordinate dispatch, vehicles, open trips and receiving facilities with a shared view built for teams on the move.",
    details: ["Dispatch", "Fleet", "Trip coordination"],
    Screen: AmbulanceScreen,
    accent: "#8BE0AD",
  },
];

const desktopNavLinks = [
  { href: "#features", label: "Features" },
  { href: "#people", label: "For people" },
  { href: "#business", label: "For business" },
  { href: "/plans", label: "Plans" },
  { href: "#about", label: "About" },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`${styles.brandMark} ${light ? styles.brandMarkLight : ""}`}
    >
      <Image
        className={styles.brandLogo}
        src="/brand/4ol-logo.png"
        alt=""
        width={34}
        height={30}
      />
      <span className={styles.brandWords}>
        <strong>4 OUR</strong> LIFE
      </span>
    </span>
  );
}

function DesktopLinks() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.desktopLinks} onMouseLeave={() => setHovered(null)}>
      {desktopNavLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={styles.navLink}
          onMouseEnter={() => setHovered(href)}
          onFocus={() => setHovered(href)}
          onBlur={() => setHovered(null)}
        >
          {label}
          {hovered === href ? (
            <motion.span
              layoutId="nav-underline"
              className={styles.navUnderline}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", ...SPRING.smooth }
              }
              aria-hidden="true"
            />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function LandingNav() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  const close = () => setOpen(false);

  // Condense once the page has moved; hide on scroll-down, reveal on scroll-up.
  // Never hide while the mobile menu is open or near the top of the page.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastY.current;
    setCondensed(latest > 24);
    if (Math.abs(delta) < 6) return;
    lastY.current = latest;
    setHidden(delta > 0 && latest > 320 && !open);
  });

  return (
    <header
      className={styles.navWrap}
      data-condensed={condensed}
      data-hidden={hidden}
    >
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link href="#top" onClick={close} aria-label="4 Our Life home">
          <BrandMark />
        </Link>
        <DesktopLinks />
        <Magnetic
          as="a"
          strength={5}
          className={styles.navCta}
          href="#get-the-app"
        >
          Get the app <ArrowRight size={14} />
        </Magnetic>
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            className={styles.mobileMenu}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: {
                opacity: 0,
                y: -12,
                transition: { duration: 0.2, ease: EASE.micro },
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: EASE.signature,
                  staggerChildren: 0.045,
                  delayChildren: 0.05,
                },
              },
            }}
          >
            {[
              { href: "#features", label: "Features", Icon: ChevronRight },
              { href: "#people", label: "For people", Icon: ChevronRight },
              { href: "#business", label: "For business", Icon: ChevronRight },
              { href: "/plans", label: "Plans", Icon: ChevronRight },
              { href: "#about", label: "About", Icon: ChevronRight },
              { href: "#get-the-app", label: "Get the app", Icon: ArrowRight },
            ].map(({ href, label, Icon }) => (
              <motion.div
                key={href}
                variants={{
                  hidden: { opacity: 0, y: -8 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link href={href} onClick={close}>
                  {label} <Icon size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

const consumerStores = {
  apple: "https://apps.apple.com/app/id6754759396",
  google:
    "https://play.google.com/store/apps/details?id=com.fourourlifeapppay.fourourlifeapppay",
};

function StoreBadge({
  store,
  href,
  comingSoon = false,
  inverse = false,
}: {
  store: "apple" | "google";
  href?: string;
  comingSoon?: boolean;
  inverse?: boolean;
}) {
  const isApple = store === "apple";
  const content = (
    <>
      {isApple ? <FaApple aria-hidden /> : <SiGoogleplay aria-hidden />}
      <span>
        <small>
          {comingSoon
            ? "Coming soon on"
            : isApple
              ? "Download on the"
              : "Get it on"}
        </small>
        <strong>{isApple ? "App Store" : "Google Play"}</strong>
      </span>
    </>
  );

  if (!href) {
    return (
      <span
        className={`${styles.storeBadge} ${styles.storeBadgeDisabled} ${inverse ? styles.storeBadgeInverse : ""}`}
        aria-label={`${isApple ? "App Store" : "Google Play"} — coming soon`}
      >
        {content}
      </span>
    );
  }

  return (
    <Magnetic as="span" strength={5}>
      <a
        className={`${styles.storeBadge} ${inverse ? styles.storeBadgeInverse : ""}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Download 4 Our Life on the ${isApple ? "App Store" : "Google Play"}`}
      >
        {content}
      </a>
    </Magnetic>
  );
}

function StoreBadges({ kind }: { kind: "consumer" | "business" }) {
  const business = kind === "business";

  return (
    <div
      className={`${styles.storeBadges} ${business ? styles.storeBadgesInverse : ""}`}
    >
      <StoreBadge
        store="google"
        href={business ? undefined : consumerStores.google}
        comingSoon={business}
        inverse={business}
      />
      <StoreBadge
        store="apple"
        href={business ? undefined : consumerStores.apple}
        comingSoon={business}
        inverse={business}
      />
    </div>
  );
}

function Eyebrow({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <span
      className={`${styles.eyebrow} ${inverse ? styles.eyebrowInverse : ""}`}
    >
      <span />
      {children}
    </span>
  );
}

function HeroStory() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Spring-smoothed progress: the product, ambient rings and handoff copy now
  // coast to a stop instead of inheriting the raw stepping of the wheel/trackpad.
  const progress = useSmoothProgress(ref);

  const copyOpacity = useTransform(progress, [0, 0.35, 0.62, 1], [1, 1, 0, 0]);
  const copyY = useTransform(progress, [0, 0.62], [0, -70]);
  const productX = useTransform(progress, [0, 0.55, 1], ["0vw", "0vw", "24vw"]);
  const productY = useTransform(progress, [0, 0.55, 1], [55, -22, -34]);
  const productScale = useTransform(progress, [0, 0.55, 1], [0.86, 1.08, 0.72]);
  const productRotate = useTransform(progress, [0, 0.55, 1], [-7, -3, 0]);
  const productOpacity = useTransform(
    progress,
    [0, 0.84, 0.98, 1],
    [1, 1, 0.28, 0.28],
  );
  const handoffOpacity = useTransform(progress, [0.62, 0.82, 1], [0, 1, 1]);
  const sceneScale = useTransform(progress, [0, 0.24, 1], [1, 1, 0.98]);
  // Depth layer: the ambient field trails the product so the scene reads as 3D
  // rather than as a single flat object sliding around.
  const ambientY = useTransform(progress, [0, 1], [0, -96]);
  // The scroll cue retires as soon as the story starts moving.
  const cueOpacity = useTransform(progress, [0, 0.06, 0.15], [1, 1, 0]);

  return (
    <section ref={ref} id="top" className={styles.heroStory}>
      <div className={styles.heroSticky}>
        <motion.div
          className={styles.heroAmbient}
          style={reduceMotion ? undefined : { scale: sceneScale, y: ambientY }}
        >
          <span className={styles.ambientOne} />
          <span className={styles.ambientTwo} />
          <span className={styles.ambientThree} />
        </motion.div>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            style={
              reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }
            }
          >
            <span className={styles.heroIntroEyebrow}>
              <Eyebrow>4 Our Life · Connected health</Eyebrow>
            </span>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>
                <span>Everything health.</span>
              </span>
              <span className={styles.heroTitleLine}>
                <span>
                  One <em>connected</em> life.
                </span>
              </span>
            </h1>
            <p className={styles.heroIntroBody}>
              One app helps people manage everyday health. A suite of focused
              tools helps facilities, practitioners, trainers, vendors and
              ambulance teams do their work.
            </p>
            <div className={`${styles.heroActions} ${styles.heroIntroActions}`}>
              <Magnetic
                as="a"
                strength={6}
                href="#features"
                className={styles.primaryButton}
              >
                Explore the app <ArrowDown size={15} />
              </Magnetic>
              <Link className={styles.textButton} href="#business">
                Built for health businesses <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          <div className={styles.heroDevices}>
            <motion.div
              className={styles.heroProduct}
              style={
                reduceMotion
                  ? undefined
                  : {
                      x: productX,
                      y: productY,
                      scale: productScale,
                      rotate: productRotate,
                      opacity: productOpacity,
                    }
              }
            >
              {/* Intro lives on a nested element so the CSS entrance animation
                  never fights the scroll-driven transforms written above. */}
              <div className={styles.heroProductIntro}>
                <div className={styles.heroProductFloat}>
                  <Image
                    className={styles.heroProductImage}
                    src="/brand/hero-consumer-phone-v2.png"
                    alt="The 4 Our Life consumer home screen displayed on an iPhone"
                    width={1024}
                    height={1536}
                    priority
                    sizes="(max-width: 680px) 88vw, (max-width: 900px) 52vw, 520px"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroHandoff}
            style={{ opacity: handoffOpacity }}
          >
            <Eyebrow>For every day</Eyebrow>
            <p>One calm place for the moving parts of your health.</p>
          </motion.div>
        </div>
        <motion.div
          className={styles.scrollCue}
          style={reduceMotion ? undefined : { opacity: cueOpacity }}
        >
          <span>Scroll to discover</span>
          <i />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * One dash of the story progress rail.
 *
 * The fill is scrubbed from scroll progress rather than toggled on the active
 * chapter, so the rail fills continuously as the story advances. Each dash owns
 * the slice of progress that corresponds to its own chapter: input clamping
 * means it reads 0 before its chapter starts, scrubs 0→1 through it, and stays
 * full afterwards — no per-item state required.
 */
function ProgressDash({
  progress,
  index,
  count,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const fill = useTransform(
    progress,
    [index / count, (index + 1) / count],
    [0, 1],
  );
  return (
    <i>
      <motion.span
        className={styles.progressFill}
        style={{ scaleX: fill }}
        aria-hidden="true"
      />
    </i>
  );
}

function ChapterCopy({
  chapter,
  index,
  total,
  inverse = false,
  direction = 1,
}: {
  chapter: Chapter;
  index: number;
  total: number;
  inverse?: boolean;
  direction?: 1 | -1;
}) {
  const reduceMotion = useReducedMotion();
  // Signed by scroll direction, so entering content always travels from the
  // side the user is scrolling toward. Reversing direction mid-story therefore
  // feels correct instead of identical to continuing forwards.
  const travel = reduceMotion ? 0 : 38 * direction;

  return (
    <motion.div
      key={`${chapter.eyebrow}-${index}`}
      className={`${styles.chapterCopy} ${inverse ? styles.chapterCopyInverse : ""}`}
      initial={{ opacity: 0, y: travel }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -travel * 0.72 }}
      transition={{ duration: DUR.story, ease: EASE.story }}
    >
      <motion.div
        className={styles.chapterIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE.micro }}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <i />
        <span>{String(total).padStart(2, "0")}</span>
      </motion.div>
      <motion.p
        className={styles.chapterEyebrow}
        style={{ color: chapter.accent }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE.story, delay: 0.05 }}
      >
        {chapter.eyebrow}
      </motion.p>
      {/* Masked line reveal. Note there is deliberately no `filter: blur()` on
          any text here — animating blur on text is the most expensive thing
          this page could do and it was being run on every chapter swap. */}
      <h2>
        <RevealLine immediate delay={0.1}>
          {chapter.title}
        </RevealLine>
      </h2>
      <motion.p
        className={styles.chapterBody}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE.story, delay: 0.2 }}
      >
        {chapter.body}
      </motion.p>
      <motion.div
        className={styles.detailList}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: STAGGER.item, delayChildren: 0.28 },
          },
        }}
      >
        {chapter.details.map((detail) => (
          <motion.span
            key={detail}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.42, ease: EASE.story },
              },
            }}
          >
            <Check size={12} />
            {detail}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

function StoryProgress({
  chapters,
  progress,
  active,
  inverse = false,
  onSelect,
}: {
  chapters: Chapter[];
  /** Raw (or smoothed) scroll progress, used to scrub the rail fill. */
  progress: MotionValue<number>;
  active: number;
  inverse?: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className={`${styles.storyProgress} ${inverse ? styles.storyProgressInverse : ""}`}
      aria-label="Feature chapters"
    >
      {chapters.map((chapter, index) => (
        <button
          key={chapter.eyebrow}
          type="button"
          className={active === index ? styles.progressActive : ""}
          onClick={() => onSelect(index)}
          aria-label={`Jump to ${chapter.eyebrow}`}
          aria-current={active === index ? "step" : undefined}
        >
          <ProgressDash
            progress={progress}
            index={index}
            count={chapters.length}
          />
          <span>{chapter.eyebrow}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * A two-digit counter whose digits roll vertically when the value changes,
 * in the direction the user is scrolling. The inline-grid stacks the outgoing
 * and incoming numbers in the same cell so width never jumps.
 */
function RollingNumber({
  value,
  direction,
}: {
  value: number;
  direction: 1 | -1;
}) {
  const label = String(value).padStart(2, "0");
  return (
    <span className={styles.rollingMask} aria-label={label}>
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={label}
          className={styles.rollingDigit}
          custom={direction}
          initial={{ y: `${direction * 100}%`, opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: `${direction * -100}%`, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE.signature }}
          aria-hidden="true"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ScrollStory({
  chapters,
  kind,
  id,
}: {
  chapters: Chapter[];
  kind: "consumer" | "business";
  id: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  // Spring-smoothed so the device, halo and sweep coast instead of stepping.
  const progress = useSmoothProgress(ref, { enabled: !reduceMotion });
  // Paced chapters: each chapter visibly holds a beat before handing over,
  // instead of flipping the instant the boundary is crossed.
  const story = usePacedChapter(progress, chapters.length);
  const direction = useScrollDirection();
  const active = story.index;
  const chapter = chapters[active];
  const Screen = chapter.Screen;
  const inverse = kind === "business";
  // Multi-rate parallax: the halo drifts slower than the device, so the stage
  // reads as layered depth rather than one flat object being moved around.
  const phoneY = useTransform(progress, [0, 0.06, 0.94, 1], [58, 0, 0, -58]);
  const phoneScale = useTransform(
    progress,
    [0, 0.08, 0.92, 1],
    [0.94, 1, 1, 0.95],
  );
  const haloScale = useTransform(progress, [0, 0.5, 1], [0.84, 1.12, 0.9]);
  const haloY = useTransform(progress, [0, 1], [30, -34]);
  const sweepRotate = useTransform(progress, [0, 1], [0, 210]);
  // Physical "settle" on every handover: the device dips slightly as the new
  // chapter arrives, which makes the swap feel tactile rather than switched.
  const settle = useChapterSettle(progress, chapters.length);

  const selectChapter = (index: number) => {
    if (!ref.current) return;
    const element = ref.current;
    const scrollable = element.offsetHeight - window.innerHeight;
    // Target the middle of the chapter's slot. Landing at the slot boundary
    // would drop the user into a handover window, where the paced index may
    // still resolve to the neighbouring chapter.
    const target =
      element.offsetTop + scrollable * ((index + 0.5) / chapters.length);

    // Route through Lenis when available so the jump eases on the same curve as
    // the rest of the page instead of being a second, competing scroll system.
    if (lenis) {
      lenis.scrollTo(target, { duration: reduceMotion ? 0 : 1.1 });
      return;
    }
    window.scrollTo({
      top: target,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (reduceMotion) {
    return (
      <section
        id={id}
        ref={ref}
        className={`${styles.staticStory} ${inverse ? styles.staticStoryInverse : ""}`}
      >
        <div className={styles.staticStoryIntro}>
          <Eyebrow inverse={inverse}>
            {inverse ? "4 Our Life for business" : "4 Our Life for you"}
          </Eyebrow>
          <h2>
            {inverse
              ? "One connected workspace for every kind of care."
              : "Everyday health, brought into focus."}
          </h2>
          <StoreBadges kind={kind} />
        </div>
        <div className={styles.staticStoryList}>
          {chapters.map((item, index) => {
            const StaticScreen = item.Screen;
            return (
              <article className={styles.staticChapter} key={item.eyebrow}>
                <ChapterCopy
                  chapter={item}
                  index={index}
                  total={chapters.length}
                  inverse={inverse}
                />
                <div
                  className={`${styles.staticDevice} ${item.image ? styles.staticConsumerDevice : ""}`}
                >
                  {item.image ? (
                    <Image
                      className={styles.consumerFeatureDevice}
                      src={item.image}
                      alt={
                        item.imageAlt ?? `${item.eyebrow} in the 4 Our Life app`
                      }
                      width={852}
                      height={1848}
                      sizes="(max-width: 680px) 74vw, 350px"
                    />
                  ) : StaticScreen ? (
                    <DeviceFrame kind={inverse ? "samsung" : "iphone"}>
                      <StaticScreen />
                    </DeviceFrame>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      className={`${styles.scrollStory} ${inverse ? styles.businessStory : styles.consumerStory} ${
        reduceMotion ? styles.reducedStory : ""
      }`}
    >
      <div className={styles.storySticky}>
        <div className={styles.storyTopline}>
          <span>
            {inverse ? "4 Our Life for business" : "4 Our Life for you"}
          </span>
          <span className={styles.rollingCount}>
            <RollingNumber value={active + 1} direction={direction} /> /{" "}
            {String(chapters.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className={`${styles.storyGrid} ${inverse ? styles.storyGridReverse : ""}`}
        >
          <div className={styles.copyStage}>
            <div className={styles.chapterPosition}>
              <AnimatePresence mode="wait" initial={false}>
                <ChapterCopy
                  chapter={chapter}
                  index={active}
                  total={chapters.length}
                  inverse={inverse}
                  direction={direction}
                />
              </AnimatePresence>
              <StoreBadges kind={kind} />
            </div>
          </div>
          <div className={styles.deviceStage}>
            {/* Depth layers, each on its own rate: sweep (fastest to rotate) →
                halo (drifts slowest) → device (full scroll travel). */}
            <motion.span
              className={styles.deviceSweep}
              style={reduceMotion ? undefined : { rotate: sweepRotate }}
              aria-hidden="true"
            />
            <motion.span
              className={styles.deviceHalo}
              style={reduceMotion ? undefined : { scale: haloScale, y: haloY }}
            />
            <motion.div
              className={`${styles.storyDevice} ${chapter.image ? styles.consumerStoryDevice : ""}`}
              style={
                reduceMotion ? undefined : { y: phoneY, scale: phoneScale }
              }
            >
              {/* The settle dips the whole device as a handover completes. */}
              <motion.div
                className={styles.deviceSettle}
                style={reduceMotion ? undefined : { scale: settle }}
              >
                {chapter.image ? (
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                    custom={direction}
                  >
                    <motion.div
                      className={styles.consumerProductTransition}
                      key={chapter.image}
                      initial={{ opacity: 0, y: 34 * direction, scale: 1.04 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -26 * direction, scale: 0.985 }}
                      transition={{
                        y: SPRING.settle,
                        scale: SPRING.settle,
                        opacity: { duration: 0.42, ease: EASE.story },
                      }}
                    >
                      <Image
                        className={styles.consumerFeatureDevice}
                        src={chapter.image}
                        alt={
                          chapter.imageAlt ??
                          `${chapter.eyebrow} in the 4 Our Life app`
                        }
                        width={852}
                        height={1848}
                        priority={active === 0}
                        sizes="(max-width: 680px) 74vw, (max-width: 900px) 42vw, 350px"
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : Screen ? (
                  <DeviceFrame kind={inverse ? "samsung" : "iphone"}>
                    <AnimatePresence
                      mode="popLayout"
                      initial={false}
                      custom={direction}
                    >
                      <motion.div
                        className={styles.screenTransition}
                        key={chapter.eyebrow}
                        initial={{ opacity: 0, y: 30 * direction, scale: 1.02 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -22 * direction, scale: 0.99 }}
                        transition={{
                          y: SPRING.settle,
                          scale: SPRING.settle,
                          opacity: { duration: 0.4, ease: EASE.story },
                        }}
                      >
                        <Screen />
                      </motion.div>
                    </AnimatePresence>
                  </DeviceFrame>
                ) : null}
              </motion.div>
            </motion.div>
          </div>
        </div>
        <StoryProgress
          chapters={chapters}
          progress={progress}
          active={active}
          inverse={inverse}
          onSelect={selectChapter}
        />
      </div>
    </section>
  );
}

function AudienceOverview() {
  return (
    <section id="features" className={styles.audienceOverview}>
      <div className={styles.audienceHeading}>
        <Eyebrow>Two experiences, one health ecosystem</Eyebrow>
        <h2>
          <RevealText
            lines={["Built for everyday life.", "Ready for the work of care."]}
          />
        </h2>
        <p>
          Start with the experience that fits you. Each side is focused on the
          people and tasks it serves.
        </p>
      </div>
      <div className={styles.audienceGrid}>
        <article className={styles.audiencePanel}>
          <span className={styles.audienceLabel}>
            01 / for people &amp; families
          </span>
          <h3>Your health, in your hands.</h3>
          <p>
            Build routines, learn about your health, find nearby services and
            keep important reminders together in one consumer app.
          </p>
          <Link href="#people">
            Explore the consumer app <ArrowRight size={15} />
          </Link>
        </article>
        <article className={styles.audiencePanel}>
          <span className={styles.audienceLabel}>
            02 / for health businesses
          </span>
          <h3>Tools for the work behind care.</h3>
          <p>
            Purpose-built apps help facilities, practitioners, trainers, vendors
            and ambulance teams manage the work their day depends on.
          </p>
          <Link href="#business">
            Explore business tools <ArrowRight size={15} />
          </Link>
        </article>
      </div>
    </section>
  );
}

function BrandBridge() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // The background morph is the most visible scroll-linked change on the page,
  // so it gets the lazier spring — a stepped paper→forest gradient is the
  // single clearest tell that a page is not built for smooth motion.
  const progress = useSmoothProgress(ref, {
    offset: SCROLL_OFFSET.enter,
    spring: SPRING.lazy,
    enabled: !reduceMotion,
  });
  const backgroundColor = useTransform(
    progress,
    [0.08, 0.62],
    ["#F5F5F0", "#1F7A4B"],
  );
  const color = useTransform(progress, [0.12, 0.58], ["#17251C", "#F5F5F0"]);
  const copyY = useTransform(progress, [0.08, 0.55, 1], [80, 0, -26]);
  const copyOpacity = useTransform(progress, [0, 0.14, 1], [0.4, 1, 1]);
  const visualScale = useTransform(progress, [0, 0.65, 1], [0.94, 1, 1.035]);

  return (
    <motion.section
      ref={ref}
      className={styles.bridge}
      style={
        reduceMotion
          ? { backgroundColor: "#1F7A4B", color: "#F5F5F0" }
          : { backgroundColor, color }
      }
    >
      <div className={styles.bridgeSticky}>
        <div className={styles.bridgeLayout}>
          <motion.div
            className={styles.bridgeCopy}
            style={
              reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }
            }
          >
            <Eyebrow inverse>One connected ecosystem</Eyebrow>
            <h2>
              <RevealLine>Personal health.</RevealLine>
              <RevealLine delay={0.12}>
                <em>Shared progress.</em>
              </RevealLine>
            </h2>
            <p>
              One app helps people build healthy routines and find care. Focused
              business apps help the teams around them coordinate the next step.
            </p>
            <Link className={styles.bridgeLink} href="#people">
              Explore the experiences <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            className={styles.bridgeShowcase}
            style={reduceMotion ? undefined : { scale: visualScale }}
          >
            <div className={styles.bridgeLight} aria-hidden="true" />
            <svg
              className={styles.bridgeConnection}
              viewBox="0 0 600 390"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d="M110 245 C 190 80, 390 80, 490 245"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 8"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                whileInView={
                  reduceMotion ? undefined : { pathLength: 1, opacity: 1 }
                }
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 1.8,
                  ease: EASE.signature,
                  opacity: { duration: 0.5 },
                }}
              />
              <motion.circle
                cx="110"
                cy="245"
                r="5"
                fill="currentColor"
                initial={reduceMotion ? false : { scale: 0 }}
                whileInView={reduceMotion ? undefined : { scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              />
              <motion.circle
                cx="490"
                cy="245"
                r="5"
                fill="currentColor"
                initial={reduceMotion ? false : { scale: 0 }}
                whileInView={reduceMotion ? undefined : { scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.35 }}
              />
            </svg>
            <motion.div
              className={`${styles.bridgeProduct} ${styles.bridgeConsumer}`}
              initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: -5 }}
              whileInView={
                reduceMotion ? undefined : { opacity: 1, y: 0, rotate: -5 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: EASE.signature }}
            >
              <span className={styles.bridgeProductLabel}>
                FOR EVERYDAY LIFE <i>01</i>
              </span>
              <DeviceFrame>
                <ConsumerHomeScreen />
              </DeviceFrame>
            </motion.div>
            <motion.div
              className={`${styles.bridgeProduct} ${styles.bridgeBusiness}`}
              initial={reduceMotion ? false : { opacity: 0, y: 34, rotate: 5 }}
              whileInView={
                reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 5 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, delay: 0.18, ease: EASE.signature }}
            >
              <span className={styles.bridgeProductLabel}>
                FOR THE WORK OF CARE <i>02</i>
              </span>
              <DeviceFrame kind="samsung">
                <FacilityScreen />
              </DeviceFrame>
            </motion.div>
            <span className={styles.bridgeCenterMark}>
              <BrandMark light />
            </span>
            <span className={styles.bridgeCaption}>
              A clearer path from daily wellbeing to the people who make care
              happen.
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

const personalBenefits = [
  {
    icon: MapPin,
    title: "Find hospitals, specialists & ambulances",
    copy: "Search nearby facilities and professionals by location, specialty and service. Browse ambulance listings too; see distance and NHIS acceptance where listed.",
  },
  {
    icon: Video,
    title: "Talk before you travel",
    copy: "Book a healthcare professional and choose video, clinic or home consultation when they offer it.",
  },
  {
    icon: Dumbbell,
    title: "Make healthy habits stick",
    copy: "Explore guided fitness, book trainer sessions and keep important health reminders close.",
  },
];

const businessBenefits = [
  {
    icon: CalendarDays,
    title: "Turn availability into bookings",
    copy: "Publish services, set clinic, video or home visit hours, and manage appointments in one place.",
  },
  {
    icon: Dumbbell,
    title: "Grow sessions and client lists",
    copy: "Create workout programmes and bookable sessions, then manage attendance and client progress.",
  },
  {
    icon: Package,
    title: "Put products in front of nearby people",
    copy: "List health products, manage requests and orders, and promote your business to local members.",
  },
  {
    icon: BedDouble,
    title: "Keep urgent care coordinated",
    copy: "Facilities update live ward counts; ambulance teams can send emergency bed requests.",
  },
];

function EcosystemSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className={styles.ecosystemSection}>
      <header className={styles.benefitHeading}>
        <Eyebrow>Care access, built for Ghana</Eyebrow>
        <h2>
          <RevealText
            lines={["Find your next step.", "Help good care reach further."]}
          />
        </h2>
        <p>
          Ghana’s care network spans community services, hospitals and
          specialists. The next step is not always easy to see. 4 Our Life helps
          people find nearby options and gives the teams around them practical
          tools to coordinate care.
        </p>
      </header>

      <div className={styles.benefitGrid}>
        <Spotlight
          className={`${styles.benefitPanel} ${styles.personalPanel}`}
          tilt={1}
          radius={420}
        >
          <article className={styles.benefitPanelCopy}>
            <span className={styles.benefitKicker}>
              <i>01</i> FOR PEOPLE &amp; FAMILIES
            </span>
            <h3>Find the right care, closer to home.</h3>
            <p className={styles.benefitLead}>
              Spend less time guessing where to start. Explore the services
              around you and choose a next step that fits.
            </p>
            <div className={styles.benefitList}>
              {personalBenefits.map(({ icon: Icon, title, copy }, index) => (
                <motion.div
                  className={styles.benefitRow}
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: EASE.signature,
                  }}
                >
                  <span>
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={styles.emergencyLink}>
              <Ambulance size={17} />
              <span>
                <strong>Need an ambulance?</strong>
                <small>For an emergency in Ghana, call 112.</small>
              </span>
              <a href="tel:112" aria-label="Call Ghana emergency number 112">
                <ArrowRight size={17} />
              </a>
            </div>
            <Link className={styles.benefitCta} href="#people">
              Explore the consumer app <ArrowRight size={15} />
            </Link>
          </article>
          <div className={styles.benefitVisual}>
            <span className={styles.benefitVisualLabel}>
              CARE, CLOSER TO YOU <i>ACCRA · GH</i>
            </span>
            <Image
              className={styles.benefitPhoneImage}
              src="/brand/consumer-features/care-device-v1.png"
              alt="Map view for finding nearby health services in the 4 Our Life app"
              width={852}
              height={1848}
              sizes="(max-width: 680px) 48vw, (max-width: 1100px) 28vw, 20vw"
            />
            <div className={styles.nearbyTag}>
              <MapPin size={14} />
              <span>
                <strong>Care around you</strong>
                <small>Clinics · specialists · pharmacies</small>
              </span>
            </div>
            <span className={styles.mapCoordinate}>
              5°36&apos; N&nbsp;&nbsp; 0°11&apos; W
            </span>
          </div>
        </Spotlight>

        <Spotlight
          className={`${styles.benefitPanel} ${styles.businessPanel}`}
          tilt={1}
          radius={420}
        >
          <article className={styles.benefitPanelCopy}>
            <span className={styles.benefitKicker}>
              <i>02</i> FOR HEALTH BUSINESSES
            </span>
            <h3>Grow your reach. Keep care moving.</h3>
            <p className={styles.benefitLead}>
              Put your services and products where people can find them, then
              run the bookings and operations behind every visit.
            </p>
            <div className={styles.benefitList}>
              {businessBenefits.map(({ icon: Icon, title, copy }, index) => (
                <motion.div
                  className={styles.benefitRow}
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: EASE.signature,
                  }}
                >
                  <span>
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link className={styles.benefitCta} href="#business">
              Explore business apps <ArrowRight size={15} />
            </Link>
          </article>
          <div className={styles.businessVisual}>
            <div className={styles.businessVisualTop}>
              <span>THE WORK BEHIND CARE</span>
              <span>
                <i /> LIVE WORKSPACE
              </span>
            </div>
            <div className={styles.businessStats}>
              <span>
                <Building2 size={15} /> FACILITY SNAPSHOT
              </span>
              <strong>Care, in motion.</strong>
              <small>Capacity · bookings · people</small>
            </div>
            <div className={styles.businessDevice}>
              <DeviceFrame kind="samsung">
                <FacilityScreen />
              </DeviceFrame>
            </div>
            <span className={styles.businessVisualFoot}>
              ONE BUSINESS APP FOR EVERY KIND OF CARE TEAM
            </span>
          </div>
        </Spotlight>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  const reduceMotion = useReducedMotion();
  const principles = useMemo(
    () => [
      {
        icon: Sparkles,
        number: "01",
        eyebrow: "For everyday wellbeing",
        title: "Build a healthier rhythm.",
        copy: "Follow guided workouts, track your cycle, learn about health conditions and keep medication or appointment reminders close in one app.",
        image: "/brand/consumer-features/fitness-device-v1.png",
        imageAlt: "Fitness progress and guided movement in the 4 Our Life app",
        link: "Explore the consumer app",
        href: "#people",
      },
      {
        icon: MapPin,
        number: "02",
        eyebrow: "When you need care",
        title: "See your options nearby.",
        copy: "Search hospitals, specialists, pharmacies and ambulance providers by location or service. Check distance and NHIS acceptance where listed, and book a consultation in the format a provider offers.",
        image: "/brand/consumer-features/care-device-v1.png",
        imageAlt: "Nearby health services shown on a map in the 4 Our Life app",
        link: "Explore care discovery",
        href: "#people",
      },
      {
        icon: Building2,
        number: "03",
        eyebrow: "For the teams behind care",
        title: "Make great services easier to reach.",
        copy: "Providers publish services and availability, then manage appointments. Trainers run programmes, vendors handle orders, facilities update live capacity and ambulance teams coordinate emergency bed requests.",
        image: null,
        imageAlt: "",
        link: "Explore business tools",
        href: "#business",
      },
    ],
    [],
  );

  return (
    <section className={styles.principlesSection}>
      <div className={styles.principlesHeader}>
        <p>
          A clearer health journey <span>01—03</span>
        </p>
        <h2>
          <RevealText
            lines={[
              "One app for everyday health.",
              "Tools for the teams behind care.",
            ]}
          />
        </h2>
        <p className={styles.journeyLead}>
          Build routines and find nearby services in the consumer app. Health
          professionals and businesses get focused tools to publish services,
          manage appointments and coordinate daily operations.
        </p>
      </div>
      <div className={styles.principlesGrid}>
        <svg
          className={styles.journeyConnector}
          viewBox="0 0 1000 90"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M15 45 C 210 45, 250 45, 335 45 S 630 45, 665 45 S 830 45, 985 45"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={reduceMotion ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.7, ease: EASE.signature }}
          />
        </svg>
        {principles.map(
          (
            {
              icon: Icon,
              number,
              eyebrow,
              title,
              copy,
              image,
              imageAlt,
              link,
              href,
            },
            index,
          ) => (
            <Spotlight
              key={title}
              className={styles.principleCard}
              tilt={1.5}
              radius={380}
            >
              <motion.article
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true, amount: 0.35 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      delayChildren: 0.12 + index * 0.14,
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                <motion.span
                  className={styles.principleNumber}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EASE.signature },
                    },
                  }}
                >
                  {number}
                </motion.span>
                <motion.span
                  className={styles.principleIcon}
                  variants={{
                    hidden: { opacity: 0, scale: 0.7, rotate: -12 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { duration: 0.6, ease: EASE.signature },
                    },
                  }}
                >
                  <Icon size={21} />
                </motion.span>
                <span className={styles.principleEyebrow}>{eyebrow}</span>
                <motion.div
                  className={styles.principleVisual}
                  aria-hidden="true"
                  variants={{
                    hidden: { opacity: 0, y: 12, scale: 0.98 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: EASE.signature },
                    },
                  }}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={imageAlt}
                      width={852}
                      height={1848}
                      sizes="(max-width: 900px) 80vw, 30vw"
                    />
                  ) : (
                    <span className={styles.teamVisual}>
                      <i>
                        <Building2 size={19} />
                      </i>
                      <i>
                        <Stethoscope size={18} />
                      </i>
                      <i>
                        <Dumbbell size={18} />
                      </i>
                      <i>
                        <Package size={18} />
                      </i>
                      <i>
                        <Ambulance size={18} />
                      </i>
                      <span>
                        CARE, IN MOTION <ArrowRight size={14} />
                      </span>
                    </span>
                  )}
                </motion.div>
                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: EASE.signature },
                    },
                  }}
                >
                  {title}
                </motion.h3>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: EASE.signature },
                    },
                  }}
                >
                  {copy}
                </motion.p>
                <Link className={styles.principleLink} href={href}>
                  {link} <ArrowRight size={14} />
                </Link>
              </motion.article>
            </Spotlight>
          ),
        )}
      </div>
    </section>
  );
}

/** Shared stagger variant for every footer column item. */
const footerItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE.signature },
  },
};

function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useSmoothProgress(ref, {
    offset: SCROLL_OFFSET.through,
    spring: SPRING.lazy,
    enabled: !reduceMotion,
  });

  // The two devices travel at different rates, which is what makes the group
  // read as a pair sitting in space rather than one flat image.
  const frontY = useTransform(progress, [0, 1], [46, -46]);
  const backY = useTransform(progress, [0, 1], [78, -70]);
  // Ambient rings drift the slowest of all — they are the furthest layer back.
  const ambientY = useTransform(progress, [0, 1], [0, -120]);
  const ambientRotate = useTransform(progress, [0, 1], [0, 34]);

  return (
    <section ref={ref} id="get-the-app" className={styles.finalCta}>
      <motion.div
        className={styles.ctaAmbient}
        style={
          reduceMotion ? undefined : { y: ambientY, rotate: ambientRotate }
        }
      >
        <span />
        <span />
        <span />
      </motion.div>
      <div className={styles.ctaPhones}>
        <motion.div
          className={styles.ctaPhoneBack}
          style={reduceMotion ? undefined : { y: backY }}
        >
          <div className={styles.ctaFloatBack}>
            <DeviceFrame kind="samsung">
              <BusinessWelcomeScreen />
            </DeviceFrame>
          </div>
        </motion.div>
        <motion.div
          className={styles.ctaPhoneFront}
          style={reduceMotion ? undefined : { y: frontY }}
        >
          <div className={styles.ctaFloatFront}>
            <DeviceFrame>
              <ConsumerHomeScreen />
            </DeviceFrame>
          </div>
        </motion.div>
      </div>
      <div className={styles.ctaCopy}>
        <Eyebrow inverse>Start connected</Eyebrow>
        <h2>
          <RevealText
            lines={["Everyday health.", <>Care that keeps moving.</>]}
          />
        </h2>
        <p>
          Use the consumer app for routines, health guidance and nearby care. Or
          explore the focused tools built for the teams delivering it.
        </p>
        <div className={styles.ctaActions}>
          <Magnetic as="a" strength={6} href="#people">
            Explore for people <ArrowRight size={15} />
          </Magnetic>
          <Magnetic as="a" strength={6} href="#business">
            Explore for business <ArrowRight size={15} />
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const lenis = useLenis();

  // Route through Lenis so "Back to top" glides instead of snapping.
  const backToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(0, {
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  };

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.footerTop}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE.signature }}
      >
        <BrandMark light />
        <p>Connected health for the life you live.</p>
        <Link href="#top" onClick={backToTop}>
          Back to top <ArrowDown size={14} className={styles.backArrow} />
        </Link>
      </motion.div>
      <div className={styles.footerGrid}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: STAGGER.item } },
          }}
        >
          <motion.strong variants={footerItem}>Explore</motion.strong>
          <motion.div variants={footerItem}>
            <Link href="#features">Features</Link>
          </motion.div>
          <motion.div variants={footerItem}>
            <Link href="#people">For people</Link>
          </motion.div>
          <motion.div variants={footerItem}>
            <Link href="#business">For business</Link>
          </motion.div>
          <motion.div variants={footerItem}>
            <Link href="/plans">Plans</Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: STAGGER.item } },
          }}
        >
          <motion.strong variants={footerItem}>Company</motion.strong>
          <motion.div variants={footerItem}>
            <Link href="#about">About</Link>
          </motion.div>
          <motion.div variants={footerItem}>
            <Link href="/privacy-policy">Privacy</Link>
          </motion.div>
          <motion.div variants={footerItem}>
            <Link href="/terms-of-service">Terms</Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: STAGGER.item } },
          }}
        >
          <motion.strong variants={footerItem}>Connect</motion.strong>
          <motion.div variants={footerItem}>
            <a href="mailto:hello@4ourlife.com">hello@4ourlife.com</a>
          </motion.div>
          <motion.div variants={footerItem}>
            <span>Accra, Ghana</span>
          </motion.div>
        </motion.div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} 4 Our Life</span>
        <span>Health, connected.</span>
      </div>
    </footer>
  );
}

export default function LandingExperience() {
  return (
    <SmoothScroll>
      <main className={styles.page}>
        <LandingNav />
        <HeroStory />
        <AudienceOverview />
        <ScrollStory chapters={consumerChapters} kind="consumer" id="people" />
        <BrandBridge />
        <ScrollStory
          chapters={businessChapters}
          kind="business"
          id="business"
        />
        <EcosystemSection />
        <PrinciplesSection />
        <FinalCta />
        <Footer />
      </main>
      <Grain />
    </SmoothScroll>
  );
}
