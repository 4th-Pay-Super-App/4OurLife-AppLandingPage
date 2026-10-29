import Link from "next/link";
import { FEATURES, FITNESS_POINTS, SCREENS, STEPS, SYMPTOM_POINTS } from "./content";
import { BellIcon, CheckIcon, MessageCircleIcon } from "./icons";
import DeviceFrame from "./DeviceFrame";
import HeroBackdrop from "./HeroBackdrop";
import HeroCarousel from "./HeroCarousel";
import Reveal from "./Reveal";
import { StoreBadgeRow, StoreQrRow } from "./StoreBadges";

/** A bulleted benefit list — identical markup in both showcase sections. */
function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <div className="check">
            <CheckIcon />
          </div>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Landing() {
  return (
    <>
      {/* ── Hero ── */}
      <header className="hero" id="hero">
        <HeroBackdrop />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <Reveal className="container hero-inner">
          <div className="hero-text">
            <span className="eyebrow">Health, Fitness &amp; Nearby Care in Ghana</span>
            <h1>Healthcare Simplified, Longevity Amplified.</h1>
            <p className="subtitle">
              From fitness plans and symptom checks to medication reminders and nearby wellness
              centers — 4 Our Life puts your complete health journey in one place.
            </p>
            {/*
              The store badges, not a jump link. "Download the App" used to
              scroll to #download further down the page, so the primary call
              to action on the site took two clicks to reach a store and
              looked broken to anyone expecting a download.

              "Explore Features" keeps the in-page jump, which is what it is
              for.
            */}
            <div className="hero-ctas">
              <StoreBadgeRow />
              <Link href="#features" className="btn btn-secondary">
                Explore Features
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <HeroCarousel />
            <div className="float-card behind">
              <span className="bell-ring">
                <BellIcon />
              </span>
              Time for your Paracetamol reminder
            </div>
          </div>
        </Reveal>
      </header>

      {/*
        The stats bar and the partner strip stood here. Both published
        invented data as fact — "2,500+ Active Users", "150+ Verified
        Facilities", "4.9 App Store Rating", and eight facility names that
        belong to no real partner — so both are gone rather than restyled.
        See the header of ./content.ts.
      */}

      {/* ── Features grid ── */}
      <section className="features" id="features">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">Launch Features</span>
            <h2>Everything You Need for Better Health</h2>
            <p className="subtitle">
              We&rsquo;ve built the essential tools to help you stay fit, informed, and connected —
              with more coming soon.
            </p>
          </Reveal>
          <div className="features-grid">
            {FEATURES.map(({ icon: Icon, title, body, href }) => (
              <Reveal className="feature-card" key={title}>
                <div className="feature-icon-wrap">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <Link href={href}>
                  Learn more <span aria-hidden="true">&rarr;</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase: fitness ── */}
      <section className="showcase" id="fitness-showcase">
        <Reveal className="container showcase-inner">
          <div className="showcase-image">
            <DeviceFrame screens={[SCREENS.fitness]} sizes="(max-width: 768px) 70vw, 320px" />
          </div>
          <div className="showcase-text">
            <h2>Your Personal Trainer in Your Pocket</h2>
            <p>
              Whether you&rsquo;re a beginner or a seasoned athlete, 4 Our Life generates workout
              plans tailored to your fitness level, available equipment, and goals. Track every rep,
              set, and calorie.
            </p>
            <CheckList items={FITNESS_POINTS} />
            <Link href="#download" className="btn btn-primary">
              See All Fitness Features <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Showcase: symptom checker ── */}
      <section className="showcase reverse" id="symptom-showcase">
        <Reveal className="container showcase-inner">
          <div className="showcase-text">
            <h2>Know Your Body, Act Early</h2>
            <p>
              Not sure what&rsquo;s wrong? Our symptom checker helps you understand possible causes.
              Dive deeper into doctor-reviewed disease and condition guides — all adapted for the
              Ghanaian context.
            </p>
            <CheckList items={SYMPTOM_POINTS} />
            <Link href="#download" className="btn btn-primary">
              Try the Symptom Checker <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="showcase-image">
            <DeviceFrame screens={[SCREENS.diseaseLibrary]} sizes="(max-width: 768px) 70vw, 320px" />
          </div>
        </Reveal>
      </section>

      {/* ── Showcase: medication + group chats ── */}
      <section className="showcase" id="medication-showcase">
        <div className="container">
          <Reveal className="showcase-centered">
            <h2>Never Miss a Dose. Never Feel Alone.</h2>
            <p>
              Health is a journey best traveled with support. Set smart medication reminders and
              join caring communities — all in one app.
            </p>
          </Reveal>
          <Reveal className="showcase-split">
            <div className="info-card">
              <div className="feature-icon-wrap">
                <BellIcon />
              </div>
              <h3>Smart Medication Reminders</h3>
              <p>
                Set once. We&rsquo;ll remind you. Track adherence, refill alerts, and share
                schedules with family or caregivers.
              </p>
            </div>
            <DeviceFrame screens={[SCREENS.reminders]} sizes="240px" />
            <div className="info-card">
              <div className="feature-icon-wrap">
                <MessageCircleIcon />
              </div>
              <h3>Healthcare Group Chats</h3>
              <p>
                Join condition-specific support groups, facility community chats, or wellness
                challenges. Moderated and secure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <Reveal className="section-header">
            <h2>Get Started in 4 Simple Steps</h2>
          </Reveal>
          <Reveal className="steps">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div className="step" key={title}>
                <div className="step-icon-wrap">
                  <Icon />
                </div>
                <div className="step-num" aria-hidden="true">
                  {i + 1}
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {/*
        A "What Our Users Say" section stood here with three testimonials.
        All three were written as examples — "Ama, 28", "Kofi, 45" and a
        "Dr. Mensah" who endorsed the symptom checker to his patients. Quotes
        attributed to people who do not exist are not a styling problem, so
        the section is removed until there are real ones to publish.
      */}

      {/*
        ── Coming soon ──
        The reference page captured emails here. There is no waitlist now, so
        the band keeps the announcement and sends people to the stores instead:
        downloading the app is the one action that actually gets them early
        access when these ship.
      */}
      <section className="coming-soon-band" id="coming-soon">
        <Reveal className="container">
          <span className="eyebrow">Coming Soon</span>
          <h2>Virtual Consultations &amp; Medication Delivery</h2>
          <p className="subtitle">
            Talk to a licensed clinician from home and get prescriptions delivered to your door.
            Download the app today and you will have it the day it launches.
          </p>
          <Link href="#download" className="btn btn-white">
            Get the App <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </section>

      {/* ── Download CTA ── */}
      <section className="download-cta" id="download">
        <Reveal className="container">
          <h2>Take Control of Your Health Today</h2>
          <p>
            Join thousands of Ghanaians using 4 Our Life to stay fit, informed, and connected.
            Download now — it&rsquo;s free.
          </p>
          <StoreBadgeRow />
          <StoreQrRow />
          {/* Decorative here: both screens are already described where they
              appear with their own copy further up the page. */}
          <div className="cta-phones" aria-hidden="true">
            <DeviceFrame
              screens={[{ src: SCREENS.map.src, alt: "" }]}
              sizes="(max-width: 768px) 150px, 220px"
            />
            <DeviceFrame
              screens={[{ src: SCREENS.plasence.src, alt: "" }]}
              sizes="(max-width: 768px) 150px, 220px"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
