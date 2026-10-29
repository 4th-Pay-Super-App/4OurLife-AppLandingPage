/**
 * Landing page copy and the device artwork each section shows.
 *
 * Structure and copy come from the signed-off reference page in
 * `static-landing/index.html`.
 *
 * ── Prototype content, removed Oct 2026 ──────────────────────────────────
 * The reference carried four blocks of invented data that had been shipping
 * as fact. All four are gone, not commented out — a fabricated number that
 * is one uncomment away from production is still a liability:
 *
 *   • `STATS`        — "2,500+ Active Users", "150+ Verified Facilities",
 *                      "16 Regions Covered", "4.9 App Store Rating". None
 *                      was measured; the 4.9 in particular claimed a store
 *                      rating the listings do not have.
 *   • `PARTNERS`     — eight invented facility names ("Premier Family
 *                      Hospital", "Korle Hills Clinic", …). The reference
 *                      itself said "replace with real partner facilities".
 *   • `TESTIMONIALS` — three quotes written as examples, attributed to
 *                      people who do not exist, one of them to a doctor.
 *   • `CONTACT.phone`— +233 24 000 0000, not a dialable number.
 *
 * Put any of them back only with a source. Real figures belong in a
 * dated note next to the number so the next person can re-verify it.
 */

import type { ComponentType } from "react";
import {
  ActivityIcon,
  BookIcon,
  CalendarIcon,
  CheckIcon,
  DownloadIcon,
  DumbbellIcon,
  GridIcon,
  HeartIcon,
  MapPinIcon,
  MessageCircleIcon,
  SunIcon,
  UserIcon,
} from "./icons";

type IconComponent = ComponentType<{ className?: string }>;

/* ============================================================
   Hero carousel
   ============================================================ */

export type Screen = {
  src: string;
  /** Describes the screen for someone who cannot see it. */
  alt: string;
};

export type CarouselSlide = Screen & {
  label: string;
};

/**
 * Unframed captures of the shipped app, rendered inside the CSS `DeviceFrame`.
 * Every capture is the same 944 × 2048, which is what lets the frame reserve
 * its height up front and the carousel hold one size across all four slides.
 *
 * These replace the pre-framed `brand/consumer-features/*-device-v1.png` set:
 * with the phone body baked into the artwork, a screen the team had only as a
 * raw capture (the consumer home screen) could not join the carousel without
 * being composited into someone else's frame.
 */
export const CAPTURE_WIDTH = 944;
export const CAPTURE_HEIGHT = 2048;

export const SCREENS = {
  home: {
    src: "/home/consumer/home-source.png",
    alt: "The 4 Our Life home screen: a search box, category shortcuts for diseases, fitness, healthy living and Plasence, and top-rated facilities nearby.",
  },
  diseaseLibrary: {
    src: "/home/consumer/disease-library.png",
    alt: "The disease library screen with a condition search box, an A to Z index and category cards.",
  },
  fitness: {
    src: "/home/consumer/fitness.png",
    alt: "The fitness screen showing an eight-week plan, day streak, workout count and this week's schedule.",
  },
  reminders: {
    src: "/home/consumer/reminders.png",
    alt: "The reminders screen offering medication, workout and calendar reminders.",
  },
  map: {
    src: "/home/consumer/map-directory.png",
    alt: "A map of nearby pharmacies and hospitals with distance filters and location pins.",
  },
  plasence: {
    src: "/home/consumer/plasence-today.png",
    alt: "The Plasence cycle tracking screen showing the current phase and cycle insights.",
  },
} as const;

export const CAROUSEL_SLIDES: readonly CarouselSlide[] = [
  { label: "Your Home Screen", ...SCREENS.home },
  { label: "Symptom Checker", ...SCREENS.diseaseLibrary },
  { label: "Medication Tracker", ...SCREENS.reminders },
  { label: "Nearby Clinics", ...SCREENS.map },
] as const;

/* ============================================================
   Features grid
   ============================================================ */

export type Feature = {
  icon: IconComponent;
  title: string;
  body: string;
  href: string;
};

export const FEATURES: readonly Feature[] = [
  {
    icon: DumbbellIcon,
    title: "Fitness & Workouts",
    body: "Personalized workout plans, AI-generated routines, and progress tracking tailored to your goals.",
    href: "#fitness-showcase",
  },
  {
    icon: BookIcon,
    title: "Diseases & Conditions",
    body: "Comprehensive, doctor-reviewed information on hundreds of conditions.",
    href: "#symptom-showcase",
  },
  {
    icon: ActivityIcon,
    title: "Symptom Checker",
    body: "Select your symptoms and get instant guidance on possible causes.",
    href: "#symptom-showcase",
  },
  {
    icon: HeartIcon,
    title: "Healthy Living",
    body: "Evidence-based articles on nutrition, sleep, mental wellness, and daily habits.",
    href: "#download",
  },
  {
    icon: CalendarIcon,
    title: "Medication Tracker",
    body: "Never miss a dose. Set personalized reminders and manage prescriptions.",
    href: "#medication-showcase",
  },
  {
    icon: MessageCircleIcon,
    title: "Healthcare Group Chats",
    body: "Connect with healthcare communities and support groups in secure chat spaces.",
    href: "#medication-showcase",
  },
  {
    icon: SunIcon,
    title: "Health Tips & Advice",
    body: "Daily bite-sized health tips and expert-curated guidance.",
    href: "#download",
  },
  {
    icon: MapPinIcon,
    title: "Outdoor Workout & Wellness Centers",
    body: "Discover gyms, yoga studios, herbal centers, and wellness spots near you.",
    href: "#download",
  },
] as const;

/* ============================================================
   Showcases
   ============================================================ */

export const FITNESS_POINTS: readonly string[] = [
  "AI-generated workout routines with adaptive difficulty",
  "Video-guided exercises with proper form tips",
  "Progress photos and body measurements over time",
  "Outdoor workout maps — find running routes and parks",
] as const;

export const SYMPTOM_POINTS: readonly string[] = [
  "Search by body part or symptom keyword",
  "Condition guides with causes, diagnosis, treatment, and prevention",
  "Know when to self-care vs. when to visit a facility",
  "Offline access to saved articles",
] as const;

/* ============================================================
   How it works
   ============================================================ */

export type Step = {
  icon: IconComponent;
  title: string;
  body: string;
};

export const STEPS: readonly Step[] = [
  {
    icon: DownloadIcon,
    title: "Download",
    body: "Get 4 Our Life free from the App Store or Google Play.",
  },
  {
    icon: UserIcon,
    title: "Create Your Profile",
    body: "Tell us your health goals, conditions, and preferences.",
  },
  {
    icon: GridIcon,
    title: "Explore Features",
    body: "Use the symptom checker, start a workout, or find a facility.",
  },
  {
    icon: CheckIcon,
    title: "Stay Consistent",
    body: "Set reminders, join groups, and track your progress daily.",
  },
] as const;

/* ============================================================
   Company identity + contact details
   ============================================================ */

/**
 * The one place this site states who operates it.
 *
 * These values match the shipped iOS/Android app and the admin panel, which
 * both identify the operator as 4th Pay Ltd and route mail to
 * disrupt@4th-pay.com. The landing page had been the odd one out, publishing
 * a different company name ("4 Our Life Health Tech"), a different registered
 * address (Accra Digital Center) and two mailboxes on a domain the site does
 * not use — hello@ and privacy@4ourlife.health — while the legacy
 * `components/Footer.tsx` published a third, hello@4ourlife.app. Five
 * addresses across four domains, for one company.
 *
 * The reference page in `static-landing/` still carries the old identity.
 * Where it conflicts with this, this wins: a mockup is a layout, not a
 * company registration.
 *
 * If any of this changes, change it here. Nothing else should hardcode it.
 */
export const COMPANY = {
  /** Registered operator, as stated in the app stores and the admin panel. */
  legalName: "4th Pay Ltd",
  /** Consumer-facing product name. */
  tradingName: "4 Our Life",
  address: "4th Pay Ltd, Kwashieman Ofankor Road, Accra, Ghana",
} as const;

export const CONTACT = {
  /** General enquiries and support. */
  general: "support@4ourlife.com",
  /** Privacy, data-protection and legal correspondence. */
  privacy: "disrupt@4th-pay.com",
  legal: "disrupt@4th-pay.com",
  address: COMPANY.address,
} as const;

export const NAV_LINKS: readonly { href: string; label: string }[] = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#download", label: "Download" },
] as const;

export const FOOTER_FEATURE_LINKS: readonly { href: string; label: string }[] = [
  { href: "/#features", label: "Fitness & Workouts" },
  { href: "/#symptom-showcase", label: "Symptom Checker" },
  { href: "/#medication-showcase", label: "Medication Tracker" },
  { href: "/#features", label: "Group Chats" },
  { href: "/#features", label: "Health Tips" },
] as const;

export const FOOTER_COMPANY_LINKS: readonly { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LEGAL_LINKS: readonly { href: string; label: string }[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
] as const;

/**
 * Social profiles.
 *
 * Empty on purpose. The four icons used to link to facebook.com,
 * instagram.com, twitter.com and linkedin.com — the platforms' own front
 * pages, not our profiles — so every click left the site and landed nowhere
 * useful. The footer renders nothing while this list is empty.
 *
 * Add the real profile URLs here and the icon row comes back on its own:
 *
 *   { href: "https://www.facebook.com/<handle>", label: "Facebook" },
 *
 * `label` must be one of the keys in SiteFooter's SOCIAL_ICONS map
 * (Facebook, Instagram, Twitter, LinkedIn).
 */
export const SOCIAL_LINKS: readonly { href: string; label: string }[] = [];
