import { createPageMetadata } from "@/lib/seo";
import SiteShell from "@/components/landing/SiteShell";
import { CONTACT } from "@/components/landing/content";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "How 4 Our Life uses cookies and similar tracking technologies, which categories we set, and how to control them.",
  path: "/cookie-policy",
});

const LAST_UPDATED = "June 24, 2026";

type CookieRow = { name: string; purpose: string; duration: string };

const STRICTLY_NECESSARY: readonly CookieRow[] = [
  { name: "supabase-auth-token", purpose: "Maintains your login session", duration: "Session" },
  {
    name: "csrf-token",
    purpose: "Prevents cross-site request forgery attacks",
    duration: "Session",
  },
] as const;

const FUNCTIONAL: readonly CookieRow[] = [
  { name: "user-preferences", purpose: "Remembers your app settings and theme", duration: "1 year" },
  { name: "lang", purpose: "Stores your selected language", duration: "1 year" },
] as const;

const ANALYTICS: readonly CookieRow[] = [
  { name: "_ga (Google Analytics)", purpose: "Distinguishes unique users", duration: "2 years" },
  { name: "_gid", purpose: "Distinguishes users for 24 hours", duration: "24 hours" },
  { name: "_gat", purpose: "Throttles request rate", duration: "1 minute" },
  {
    name: "posthog_session",
    purpose: "Tracks user sessions for product analytics",
    duration: "1 year",
  },
] as const;

const MARKETING: readonly CookieRow[] = [
  { name: "fb_pixel", purpose: "Tracks conversions from Facebook ads", duration: "3 months" },
  {
    name: "google_ads_id",
    purpose: "Tracks Google Ads campaign performance",
    duration: "13 months",
  },
] as const;

const BROWSER_GUIDES: readonly { label: string; href: string }[] = [
  { label: "Google Chrome", href: "https://support.google.com/chrome/answer/95647" },
  {
    label: "Mozilla Firefox",
    href: "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies",
  },
  {
    label: "Apple Safari",
    href: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
  },
  {
    label: "Microsoft Edge",
    href: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
] as const;

/** Wrapped in a scroll container so a four-column table never forces the
 *  whole page sideways on a phone. */
function CookieTable({ rows }: { rows: readonly CookieRow[] }) {
  return (
    <div className="table-scroll">
      <table className="cookie-table">
        <thead>
          <tr>
            <th scope="col">Cookie Name</th>
            <th scope="col">Purpose</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.purpose}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Cookie Policy</h1>
          <p>
            How we use cookies and similar tracking technologies across our website and mobile
            application.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <p className="legal-date">
            <strong>Last Updated:</strong> {LAST_UPDATED}
          </p>
          <p>
            This Cookie Policy explains how 4 Our Life Health Tech (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies and similar tracking technologies
            when you visit our website or use our mobile application. This Policy should be read
            alongside our Privacy Policy.
          </p>

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or
            mobile) when you visit a website or use an app. They help the site recognize your device
            and remember information about your visit, such as your preferences and settings.
            &ldquo;Similar technologies&rdquo; include local storage, web beacons, and pixel tags.
          </p>

          <h2>2. Types of Cookies We Use</h2>
          <p>We use the following categories of cookies:</p>

          <h3>2.1 Strictly Necessary Cookies</h3>
          <p>
            These cookies are essential for the Services to function properly. They enable core
            features such as account authentication, security, and session management. You cannot
            opt out of these cookies.
          </p>
          <CookieTable rows={STRICTLY_NECESSARY} />

          <h3>2.2 Functional Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization, such as remembering
            your preferences, language settings, and display choices.
          </p>
          <CookieTable rows={FUNCTIONAL} />

          <h3>2.3 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our Services by collecting
            and reporting information anonymously. This data helps us improve our platform.
          </p>
          <CookieTable rows={ANALYTICS} />

          <h3>2.4 Marketing Cookies</h3>
          <p>
            These cookies are used to deliver advertisements more relevant to you and your
            interests. They also help measure the effectiveness of advertising campaigns.
          </p>
          <CookieTable rows={MARKETING} />

          <h2>3. How We Use Cookies</h2>
          <ul>
            <li>
              <strong>Authentication:</strong> To recognize you when you log in and keep you signed
              in.
            </li>
            <li>
              <strong>Security:</strong> To detect suspicious activity and protect your account.
            </li>
            <li>
              <strong>Preferences:</strong> To remember your settings and personalize your
              experience.
            </li>
            <li>
              <strong>Analytics:</strong> To analyze traffic patterns, feature usage, and app
              performance.
            </li>
            <li>
              <strong>Marketing:</strong> To deliver relevant health tips and app promotion
              campaigns.
            </li>
          </ul>

          <h2>4. Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third parties that provide services on our behalf. These
            include:
          </p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> For website and app usage analytics.
            </li>
            <li>
              <strong>Firebase:</strong> For crash reporting and push notification delivery.
            </li>
            <li>
              <strong>PostHog:</strong> For product analytics and feature usage tracking.
            </li>
            <li>
              <strong>Facebook/Meta:</strong> For advertising conversion tracking.
            </li>
            <li>
              <strong>Supabase:</strong> For authentication and database session management.
            </li>
          </ul>
          <p>
            These third parties have their own privacy and cookie policies. We encourage you to
            review them.
          </p>

          <h2>5. Cookie Consent and Management</h2>
          <p>
            When you first visit our website or install our app, you will see a cookie consent
            banner allowing you to:
          </p>
          <ul>
            <li>
              <strong>Accept All:</strong> Consent to all cookie categories.
            </li>
            <li>
              <strong>Reject Non-Essential:</strong> Allow only strictly necessary cookies.
            </li>
            <li>
              <strong>Customize:</strong> Select which cookie categories you accept.
            </li>
          </ul>
          <p>
            You can change your cookie preferences at any time through your browser settings or by
            contacting us. Note that disabling certain cookies may affect the functionality of our
            Services.
          </p>

          <h2>6. How to Control Cookies</h2>
          <p>Most web browsers allow you to control cookies through their settings. You can:</p>
          <ul>
            <li>Delete all cookies already stored on your device.</li>
            <li>Block all cookies from being set.</li>
            <li>Block third-party cookies while allowing first-party cookies.</li>
            <li>Set your browser to notify you when a website tries to set a cookie.</li>
          </ul>
          <p>Please refer to your browser&rsquo;s help documentation for specific instructions:</p>
          <ul>
            {BROWSER_GUIDES.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <h2>7. Mobile App Tracking</h2>
          <p>
            Our mobile app may use device identifiers and mobile analytics in addition to browser
            cookies. You can control some of this tracking through your device settings:
          </p>
          <ul>
            <li>
              <strong>iOS:</strong> Settings &rarr; Privacy &amp; Security &rarr; Tracking
            </li>
            <li>
              <strong>Android:</strong> Settings &rarr; Privacy &rarr; Ads &rarr; Opt out of Ads
              Personalization
            </li>
          </ul>

          <h2>8. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in the cookies we
            use or for operational, legal, or regulatory reasons. We will notify you of material
            changes via email or in-app notification. Please check this page periodically for
            updates.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions about our use of cookies or this Policy, please contact us:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${CONTACT.privacy}`}>{CONTACT.privacy}</a>
            <br />
            <strong>Address:</strong> {CONTACT.address}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
