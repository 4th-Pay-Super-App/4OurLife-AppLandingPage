"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Minus, Sparkles } from "lucide-react";
import { useState } from "react";
import styles from "./PlansExperience.module.css";

type Audience = "people" | "business";
type CellValue = boolean | string;

type Plan = {
  name: string;
  eyebrow: string;
  description: string;
  price: string;
  cadence: string;
  note?: string;
  featured?: boolean;
  benefits: string[];
};

type FeatureGroup = {
  label: string;
  rows: { label: string; values: CellValue[] }[];
};

const peoplePlans: Plan[] = [
  {
    name: "Fitness Pass",
    eyebrow: "Everyday momentum",
    description: "Premium movement and health tools, without Plasence premium.",
    price: "GH₵29.90",
    cadence: "/ 30 days",
    note: "Lifetime access also available for GH₵299",
    benefits: ["Unlimited AI fitness plans", "Health metrics and integrations", "Jobs, anatomy and medication enquiry"],
  },
  {
    name: "All-Access",
    eyebrow: "Best all-round value",
    description: "The complete 4 Our Life experience—including full Plasence Cycle Pro.",
    price: "GH₵29.90",
    cadence: "/ 30 days",
    note: "Lifetime access also available for GH₵299",
    featured: true,
    benefits: ["Everything in Fitness Pass", "Full Plasence premium", "One connected entitlement across the app"],
  },
  {
    name: "Cycle Pro",
    eyebrow: "Plasence only",
    description: "Deeper cycle interpretation for people who want Plasence on its own.",
    price: "GH₵19.90",
    cadence: "/ 30 days",
    benefits: ["Extended six-cycle forecasts", "Full history and export", "TTC and fertility tools"],
  },
];

const businessPlans: Plan[] = [
  {
    name: "Provider Premium",
    eyebrow: "Independent teams",
    description: "The core provider toolkit for a focused care business.",
    price: "GH₵79",
    cadence: "/ month",
    benefits: ["Up to 5 staff", "Priority enquiries and paid chat", "Advanced analytics and demand insights"],
  },
  {
    name: "Premium Plus",
    eyebrow: "Business + personal",
    description: "Provider Premium with personal All-Access for the subscribing provider.",
    price: "GH₵109",
    cadence: "/ month",
    featured: true,
    benefits: ["Everything in Provider Premium", "Up to 5 staff", "Personal 4 Our Life All-Access"],
  },
  {
    name: "Enterprise",
    eyebrow: "Growing organisations",
    description: "A broader operating plan for staffed clinics and care organisations.",
    price: "GH₵299",
    cadence: "/ month",
    benefits: ["Up to 25 staff", "Up to 10 departments", "Provider-wide premium privileges"],
  },
  {
    name: "Enterprise Plus",
    eyebrow: "Hospitals and networks",
    description: "Scale premium operations across larger, multi-team organisations.",
    price: "GH₵499",
    cadence: "/ month",
    benefits: ["Up to 100 staff", "Up to 25 departments", "Personal All-Access for the administrator"],
  },
];

const peopleFeatures: FeatureGroup[] = [
  {
    label: "Daily health",
    rows: [
      { label: "AI workout plan generation", values: [true, true, false] },
      { label: "Health metrics and integrations", values: [true, true, false] },
      { label: "Jobs, anatomy and medication enquiry", values: [true, true, false] },
      { label: "Advanced progress analytics", values: [true, true, false] },
    ],
  },
  {
    label: "Cycle health",
    rows: [
      { label: "Plasence logging and basic estimates", values: ["Included free", "Included free", "Included free"] },
      { label: "Extended six-cycle forecasts", values: [false, true, true] },
      { label: "Full history and export", values: [false, true, true] },
      { label: "TTC and fertility tools", values: [false, true, true] },
    ],
  },
  {
    label: "Access",
    rows: [
      { label: "Priority support", values: [true, true, false] },
      { label: "Lifetime option", values: ["GH₵299", "GH₵299", false] },
    ],
  },
];

const businessFeatures: FeatureGroup[] = [
  {
    label: "Provider tools",
    rows: [
      { label: "Priority enquiry alerts", values: [true, true, true, true] },
      { label: "Paid patient chat", values: [true, true, true, true] },
      { label: "Advanced analytics", values: [true, true, true, true] },
      { label: "Demand insights", values: [true, true, true, true] },
    ],
  },
  {
    label: "Organisation",
    rows: [
      { label: "Staff seats", values: ["5", "5", "25", "100"] },
      { label: "Departments", values: ["1", "1", "10", "25"] },
      { label: "Provider-wide access", values: [true, true, true, true] },
    ],
  },
  {
    label: "Connected benefits",
    rows: [
      { label: "Personal All-Access", values: [false, true, false, true] },
      { label: "Consumer and business entitlement bridge", values: [false, true, false, true] },
    ],
  },
];

function BrandMark() {
  return (
    <span className={styles.brandMark}>
      <Image src="/brand/4ol-logo.png" alt="" width={34} height={30} />
      <span><strong>4 OUR</strong> LIFE</span>
    </span>
  );
}

function PricingNav() {
  return (
    <header className={styles.navWrap}>
      <nav className={styles.nav} aria-label="Pricing navigation">
        <Link href="/" aria-label="4 Our Life home"><BrandMark /></Link>
        <div className={styles.navLinks}>
          <Link href="/#people">For people</Link>
          <Link href="/#business">For business</Link>
          <span aria-current="page">Plans</span>
        </div>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={14} /> Back home
        </Link>
      </nav>
    </header>
  );
}

function AudienceSwitch({ value, onChange }: { value: Audience; onChange: (value: Audience) => void }) {
  return (
    <div className={styles.audienceSwitch} role="tablist" aria-label="Choose plan audience">
      {(["people", "business"] as const).map((audience) => (
        <button
          key={audience}
          type="button"
          role="tab"
          aria-selected={value === audience}
          className={value === audience ? styles.switchActive : ""}
          onClick={() => onChange(audience)}
        >
          {audience === "people" ? "For people" : "For business"}
        </button>
      ))}
    </div>
  );
}

function PlanCard({ plan, audience, index }: { plan: Plan; audience: Audience; index: number }) {
  return (
    <motion.article
      className={`${styles.planCard} ${plan.featured ? styles.planCardFeatured : ""}`}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
    >
      {plan.featured ? <span className={styles.popularPill}><Sparkles size={11} /> Most popular</span> : null}
      <p className={styles.planEyebrow}>{plan.eyebrow}</p>
      <h2>{plan.name}</h2>
      <p className={styles.planDescription}>{plan.description}</p>
      <div className={styles.priceLine}>
        <strong>{plan.price}</strong><span>{plan.cadence}</span>
      </div>
      <div className={styles.benefitList}>
        {plan.benefits.map((benefit) => <span key={benefit}><Check size={14} />{benefit}</span>)}
      </div>
      {audience === "people" ? (
        <a
          className={styles.planAction}
          href="https://apps.apple.com/app/id6754759396"
          target="_blank"
          rel="noreferrer"
        >
          Get 4 Our Life <ArrowRight size={15} />
        </a>
      ) : (
        <span className={`${styles.planAction} ${styles.planActionDisabled}`} aria-disabled="true">
          Business app coming soon
        </span>
      )}
      {plan.note ? <small className={styles.planNote}>{plan.note}</small> : null}
    </motion.article>
  );
}

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <span className={styles.yes}><Check size={15} /><span className={styles.srOnly}>Included</span></span>;
  if (value === false) return <span className={styles.no}><Minus size={15} /><span className={styles.srOnly}>Not included</span></span>;
  return <span className={styles.cellText}>{value}</span>;
}

function ComparisonTable({ plans, groups }: { plans: Plan[]; groups: FeatureGroup[] }) {
  return (
    <div className={styles.tableShell}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th scope="col">What is included</th>
            {plans.map((plan) => <th scope="col" key={plan.name}>{plan.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <FragmentRows key={group.label} group={group} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FragmentRows({ group }: { group: FeatureGroup }) {
  return (
    <>
      <tr className={styles.groupRow}>
        <th scope="rowgroup" colSpan={group.rows[0].values.length + 1}>{group.label}</th>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.label}>
          <th scope="row">{row.label}</th>
          {row.values.map((value, index) => <td key={`${row.label}-${index}`}><Cell value={value} /></td>)}
        </tr>
      ))}
    </>
  );
}

export default function PlansExperience() {
  const [audience, setAudience] = useState<Audience>("people");
  const plans = audience === "people" ? peoplePlans : businessPlans;
  const features = audience === "people" ? peopleFeatures : businessFeatures;

  return (
    <main className={styles.page}>
      <PricingNav />
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <p className={styles.kicker}>Plans built around real life</p>
        <h1>Simple choices.<br /><em>More connected care.</em></h1>
        <p className={styles.heroCopy}>
          Choose the experience that fits today. Move between personal health and professional care without losing the bigger picture.
        </p>
        <AudienceSwitch value={audience} onChange={setAudience} />
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={audience}
          className={styles.planExperience}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <section className={styles.cardsSection} aria-labelledby="plans-heading">
            <div className={styles.sectionHeading}>
              <p>{audience === "people" ? "Personal plans" : "Business plans"}</p>
              <h2 id="plans-heading">
                {audience === "people" ? "Start with the part of health that matters most." : "Choose the operating plan your team needs."}
              </h2>
            </div>
            <div className={`${styles.planGrid} ${audience === "business" ? styles.planGridBusiness : ""}`}>
              {plans.map((plan, index) => <PlanCard key={plan.name} plan={plan} audience={audience} index={index} />)}
            </div>
          </section>

          <section className={styles.compareSection} aria-labelledby="compare-heading">
            <div className={styles.sectionHeading}>
              <p>Compare plans</p>
              <h2 id="compare-heading">See the difference, line by line.</h2>
            </div>
            <ComparisonTable plans={plans} groups={features} />
          </section>
        </motion.div>
      </AnimatePresence>

      <section className={styles.bottomCta}>
        <p>{audience === "people" ? "Your health, in one calmer place." : "One connected workspace for better care."}</p>
        <h2>{audience === "people" ? "Ready to begin?" : "Build with your team in mind."}</h2>
        <Link href={audience === "people" ? "/#people" : "/#business"}>
          Explore the {audience === "people" ? "people" : "business"} experience <ArrowRight size={15} />
        </Link>
      </section>

      <footer className={styles.footer}>
        <BrandMark />
        <span>© {new Date().getFullYear()} 4 Our Life</span>
        <Link href="/">Everything health. One connected life.</Link>
      </footer>
    </main>
  );
}
