import { createPageMetadata } from "@/lib/seo";
import SiteShell from "@/components/landing/SiteShell";
import { COMPANY } from "@/components/landing/content";

export const metadata = createPageMetadata({
  title: "About 4 Our Life",
  description:
    "4 Our Life is a Ghanaian health technology company making quality health information and wellness tools accessible to every Ghanaian.",
  path: "/about",
});

/**
 * Copy follows the signed-off reference in `static-landing/index.html`
 * (#modal-about), with the operator named from COMPANY rather than the
 * reference's "4 Our Life Health Tech".
 *
 * Two claims from the reference are NOT reproduced, for the same reason the
 * stats bar was removed:
 *
 *   • "a remote-first team … spread across Accra, Kumasi, and Tamale" —
 *     a headcount and three office locations nobody has verified.
 *   • "Founded in 2025" is kept, as the one date the stores and the
 *     registration agree on. Correct it here if that is wrong.
 */
export default function AboutPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Company</span>
          <h1>About 4 Our Life</h1>
          <p>Health information and wellness tools built for Ghana.</p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            4 Our Life is a Ghanaian health technology company on a mission to make quality health
            information and wellness tools accessible to every Ghanaian, regardless of location or
            income. We believe that proactive health management should be simple, trustworthy, and
            built for local realities.
          </p>

          <h2>The Story</h2>
          <p>
            Founded in 2025, 4 Our Life began when our founders saw how difficult it was for
            ordinary Ghanaians to find reliable health guidance, track medications, or locate
            verified wellness facilities. What started as a symptom-checker prototype has grown
            into a platform serving fitness plans, disease information, medication reminders, group
            health communities, and a curated directory of verified wellness centers across Ghana.
          </p>

          <h2>What We Do</h2>
          <ul>
            <li>
              <strong>Health Education:</strong> Doctor-reviewed articles on diseases, symptoms,
              and healthy living tailored to Ghanaian contexts.
            </li>
            <li>
              <strong>Digital Tools:</strong> Fitness trackers, medication reminders, and symptom
              checkers that work offline.
            </li>
            <li>
              <strong>Community:</strong> Moderated group chats where users support each other on
              topics like diabetes, maternal health, and fitness.
            </li>
            <li>
              <strong>Facility Verification:</strong> We partner with HEFRA to verify clinics,
              pharmacies, and wellness centers so users know where to go.
            </li>
          </ul>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Trust First:</strong> Every piece of health content is reviewed or sourced
              from accredited institutions.
            </li>
            <li>
              <strong>Privacy by Design:</strong> Your health data is encrypted and never sold to
              third parties.
            </li>
            <li>
              <strong>Local Relevance:</strong> We prioritize malaria, hypertension, diabetes, and
              maternal health because these matter most in Ghana.
            </li>
            <li>
              <strong>Inclusion:</strong> Our app works on low-end devices and poor network
              connections.
            </li>
          </ul>

          <h2>Company Details</h2>
          <p>
            4 Our Life is operated by <strong>{COMPANY.legalName}</strong>, registered in Ghana.
            <br />
            {COMPANY.address}
          </p>
          <p>
            Questions, partnerships or press enquiries: <a href="/contact">get in touch</a>.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
