/**
 * Landing page copy and the device artwork each section shows.
 *
 * Everything here is lifted verbatim from the signed-off reference page in
 * `static-landing/index.html`.
 *
 * ⚠ PLACEHOLDER CONTENT — carried over from the reference, needs real data
 * before this goes to production:
 *   • `PARTNERS`      — invented facility names (the reference marked them
 *                       "replace with real partner facilities")
 *   • `TESTIMONIALS`  — written as examples, not collected from real users
 *   • `STATS`         — unverified figures (2,500 users, 4.9 rating, 150
 *                       facilities, 16 regions)
 *   • `CONTACT.phone` — +233 24 000 0000 is not a dialable number
 */

import type { ComponentType } from "react";
import {
  ActivityIcon,
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  DownloadIcon,
  DumbbellIcon,
  GridIcon,
  HeartIcon,
  MapPinIcon,
  MessageCircleIcon,
  StarIcon,
  SunIcon,
  UserIcon,
  UsersIcon,
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
   Stats bar
   ============================================================ */

export type Stat = {
  icon: IconComponent;
  target: number;
  suffix?: string;
  decimal?: boolean;
  label: string;
};

export const STATS: readonly Stat[] = [
  { icon: UsersIcon, target: 2500, suffix: "+", label: "Active Users" },
  { icon: BuildingIcon, target: 150, suffix: "+", label: "Verified Facilities" },
  { icon: MapPinIcon, target: 16, label: "Regions Covered" },
  { icon: StarIcon, target: 4.9, decimal: true, label: "App Store Rating" },
] as const;

/* ============================================================
   Partner strip
   ============================================================ */

export const PARTNERS: readonly string[] = [
  "Premier Family Hospital",
  "Korle Hills Clinic",
  "Ashanti Diagnostic Lab",
  "GreenLeaf Pharmacy",
  "Cape Wellness Center",
  "Northern Eye Clinic",
  "Harmony Physiotherapy",
  "AccraCentral Fitness",
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
   Testimonials
   ============================================================ */

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "The fitness workouts are perfect for my small apartment. I've lost 5kg in 2 months just following the AI plans.",
    name: "Ama, 28",
    location: "Accra",
  },
  {
    quote:
      "I use the medication tracker for my mother's blood pressure pills. The reminders have been a lifesaver.",
    name: "Kofi, 45",
    location: "Kumasi",
  },
  {
    quote:
      "I recommend 4 Our Life to my patients. The symptom checker helps them understand when to seek care.",
    name: "Dr. Mensah",
    location: "Cape Coast",
  },
] as const;

/* ============================================================
   Navigation + contact details
   ============================================================ */

/**
 * Only the addresses the site still shows. The support, legal, press and
 * phone entries went with the Contact, Careers and Press Kit pages — a
 * published address nothing links to is an inbox nobody watches.
 */
export const CONTACT = {
  general: "hello@4ourlife.health",
  privacy: "privacy@4ourlife.health",
  address: "4 Our Life Health Tech, Accra Digital Center, Accra, Ghana",
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

export const FOOTER_LEGAL_LINKS: readonly { href: string; label: string }[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
] as const;

export const SOCIAL_LINKS: readonly { href: string; label: string }[] = [
  { href: "https://www.facebook.com/", label: "Facebook" },
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://twitter.com/", label: "Twitter" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
] as const;
