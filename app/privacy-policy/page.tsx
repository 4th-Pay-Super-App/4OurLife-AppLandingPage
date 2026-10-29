import { createPageMetadata } from "@/lib/seo";
import SiteShell from "@/components/landing/SiteShell";
import { COMPANY, CONTACT } from "@/components/landing/content";
import ContactDetails from "@/components/landing/ContactDetails";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How 4 Our Life collects, uses and protects your personal and health information under the Ghana Data Protection Act 2012 (Act 843).",
  path: "/privacy-policy",
});

const LAST_UPDATED = "October 29, 2026";

/**
 * ── Why this page was rewritten (Oct 2026) ───────────────────────────────
 * Same two problems as the Terms page: it rendered in a different design
 * system from the rest of the site (components/Navbar + components/Footer,
 * publishing hello@4ourlife.app), so moving between the three legal pages
 * changed the entire chrome and the contact address with it.
 *
 * Copy follows the signed-off reference in `static-landing/index.html`
 * (#modal-privacy). Three deliberate departures from it:
 *
 *   • Company details come from COMPANY/CONTACT in
 *     components/landing/content.ts. The reference names "4 Our Life Health
 *     Tech" at Accra Digital Center with privacy@4ourlife.health; the
 *     registered operator the app stores and the admin panel both name is
 *     4th Pay Ltd.
 *   • The reference's "+233 24 000 0000" is not published — it is not a
 *     dialable number, and a privacy policy that invites people to call a
 *     disconnected line is worse than one that lists only email. The two
 *     real lines in PHONES are published in its place.
 *   • §4 no longer lists "analytics providers" among the parties we share
 *     data with, and the marketing site is described as cookie-free,
 *     because it is — see app/cookie-policy/page.tsx for the detail.
 */

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p>
            How we collect, use and safeguard your personal and health information under the Ghana
            Data Protection Act 2012.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <p className="legal-date">
            <strong>Last Updated:</strong> {LAST_UPDATED}
          </p>

          <p>
            {COMPANY.legalName}, trading as {COMPANY.tradingName} (&ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;), is committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains how we collect,
            use, store, and safeguard your information when you use our website, mobile
            application, and services (collectively, the &ldquo;Services&rdquo;).
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, information collected
            automatically, and information from third-party sources.
          </p>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, phone number, date of
              birth, gender, and password when you register.
            </li>
            <li>
              <strong>Health Information:</strong> Symptoms checked, fitness goals, workout
              history, medication schedules, weight, height, and any health data you voluntarily
              enter.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, device type, operating system,
              unique device identifiers, and mobile network information.
            </li>
            <li>
              <strong>Usage Data:</strong> Features used, time spent, and app crash logs.
            </li>
            <li>
              <strong>Location Data:</strong> With your consent, we collect precise or approximate
              location to show nearby wellness centers and fitness facilities.
            </li>
            <li>
              <strong>Communications:</strong> Messages sent in group chats, support tickets, and
              feedback submissions.
            </li>
          </ul>
          <p>
            Our marketing website sets no analytics or advertising cookies and does not track
            visitors. See our <a href="/cookie-policy">Cookie Policy</a>.
          </p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide, maintain, and improve our Services.</li>
            <li>
              To personalize your experience, including fitness recommendations and health tips.
            </li>
            <li>To send medication reminders, appointment notifications, and wellness updates.</li>
            <li>To verify and display wellness centers and healthcare facilities near you.</li>
            <li>To moderate group chats and ensure community safety.</li>
            <li>To analyze usage trends and improve app performance.</li>
            <li>
              To comply with legal obligations, including the Ghana Data Protection Act 2012 (Act
              843).
            </li>
          </ul>

          <h2>3. Legal Basis for Processing (Ghana DPA)</h2>
          <p>
            Under the Ghana Data Protection Act 2012, we process your personal data based on:
          </p>
          <ul>
            <li>
              <strong>Consent:</strong> When you explicitly agree to data collection (e.g.,
              location sharing, health data input).
            </li>
            <li>
              <strong>Contract:</strong> Processing necessary to provide the Services you
              requested.
            </li>
            <li>
              <strong>Legal Obligation:</strong> Compliance with health regulations and law
              enforcement requests.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Fraud prevention, network security, and
              service improvement.
            </li>
          </ul>

          <h2>4. How We Share Your Information</h2>
          <p>
            We do <strong>not</strong> sell your personal information. We may share data only in
            the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Supabase (cloud database) and Firebase (push
              notifications), under strict confidentiality agreements.
            </li>
            <li>
              <strong>Healthcare Partners:</strong> Verified wellness centers may see anonymized
              demand data to improve services. No personally identifiable health data is shared
              without your explicit consent.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by Ghanaian courts, regulators, or
              to protect our rights and safety.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale
              of assets, your data will remain protected under this Privacy Policy.
            </li>
          </ul>

          <h2>5. Data Security</h2>
          <p>We implement industry-standard security measures:</p>
          <ul>
            <li>All data in transit is encrypted using TLS 1.3.</li>
            <li>Health data at rest is encrypted with AES-256.</li>
            <li>
              Supabase Row-Level Security (RLS) ensures users can only access their own records.
            </li>
            <li>Regular penetration testing and vulnerability assessments.</li>
            <li>Staff access to user data is restricted and logged.</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed
            to provide you with Services. Health data is retained for 7 years after account
            deletion to comply with Ghanaian medical record regulations, after which it is securely
            destroyed. You may request earlier deletion by contacting us.
          </p>

          <h2>7. Your Rights Under the Ghana Data Protection Act</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li>
              <strong>Right to Access:</strong> Request a copy of all data we hold about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> Correct inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to Erasure:</strong> Request deletion of your data (&ldquo;right to be
              forgotten&rdquo;), subject to legal retention requirements.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Limit how we use your data in certain
              circumstances.
            </li>
            <li>
              <strong>Right to Object:</strong> Opt out of direct marketing and certain automated
              decision-making.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Receive your data in a structured,
              machine-readable format.
            </li>
          </ul>
          <p>
            To exercise any of these rights, email{" "}
            <a href={`mailto:${CONTACT.privacy}`}>
              <strong>{CONTACT.privacy}</strong>
            </a>{" "}
            or use the in-app data request feature. We will respond within 30 days as required by
            law.
          </p>

          <h2>8. Children&rsquo;s Privacy</h2>
          <p>
            Our Services are not intended for children under 13. We do not knowingly collect data
            from children under 13. If you believe we have collected data from a child under 13,
            please contact us immediately and we will delete the information.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Your data is primarily stored on Supabase servers. Some service providers (e.g.,
            Firebase, Sentry) may process data outside Ghana. All international transfers are
            protected by standard contractual clauses and adequacy decisions compliant with Ghana
            Data Protection Act requirements.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of material changes
            via email or in-app notification at least 14 days before they take effect. The
            &ldquo;Last Updated&rdquo; date at the top of this page reflects the most recent
            revision.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices,
            please contact us:
          </p>
          <ContactDetails purpose="privacy" />
          <p>
            You also have the right to lodge a complaint with the{" "}
            <strong>Data Protection Commission of Ghana</strong> if you believe we have violated
            your data protection rights.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
