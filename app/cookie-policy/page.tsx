import { createPageMetadata } from "@/lib/seo";
import SiteShell from "@/components/landing/SiteShell";
import { COMPANY } from "@/components/landing/content";
import ContactDetails from "@/components/landing/ContactDetails";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "4ourlife.com sets no analytics, advertising or tracking cookies. What the site and the mobile app actually store, and how to control it.",
  path: "/cookie-policy",
});

const LAST_UPDATED = "October 29, 2026";

/**
 * ── Why this page was rewritten (Oct 2026) ───────────────────────────────
 * The previous version described a site that does not exist. It listed
 * Google Analytics (_ga, _gid, _gat), PostHog, a Facebook pixel and a Google
 * Ads identifier in four cookie tables, named Meta as an advertising
 * partner, and told visitors that "when you first visit our website or
 * install our app, you will see a cookie consent banner".
 *
 * None of it was true. There is no analytics script, no advertising pixel
 * and no consent banner anywhere in this codebase — `grep` for gtag,
 * posthog, fbq or any consent component returns nothing outside that page's
 * own prose. It also listed a `supabase-auth-token` cookie; the marketing
 * site has no Supabase client and never signs anyone in.
 *
 * A cookie policy that over-declares is not a harmless safety margin. Under
 * the Ghana Data Protection Act it is a published statement about how
 * personal data is handled, and it told every visitor we were tracking them
 * for advertising when we were not.
 *
 * So: this page now describes only what actually happens. If analytics or
 * advertising are ever added, BOTH halves change together — the tooling and
 * this page, in the same pull request — and the consent banner lands with
 * them. See the note in §4.
 */

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

export default function CookiePolicyPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Cookie Policy</h1>
          <p>
            What this website and the 4 Our Life app store on your device — and, just as
            importantly, what they do not.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <p className="legal-date">
            <strong>Last Updated:</strong> {LAST_UPDATED}
          </p>

          <p>
            This Cookie Policy explains how {COMPANY.legalName}, trading as {COMPANY.tradingName}{" "}
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), uses cookies and similar
            technologies on this website and in our mobile app. It should be read alongside our{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>

          <h2>1. The short version</h2>
          <p>
            <strong>
              This website sets no analytics cookies, no advertising cookies and no third-party
              tracking of any kind.
            </strong>{" "}
            We do not use Google Analytics, we do not run an advertising pixel, and we do not sell
            or share browsing data. Because nothing non-essential is stored, there is no consent
            banner to click through — there is nothing to consent to.
          </p>

          <h2>2. What are cookies?</h2>
          <p>
            Cookies are small text files a website stores on your device so it can recognize that
            device on a later visit. Related technologies include browser local storage, web
            beacons and pixel tags, and — on phones — advertising and device identifiers.
          </p>

          <h2>3. This website (4ourlife.com)</h2>
          <p>
            This is a brochure site. It has no login, no shopping basket and no account area, so it
            has nothing it needs to remember about you between pages. In normal use it writes{" "}
            <strong>no cookies at all</strong>.
          </p>
          <p>The only thing it stores on your device is the page itself:</p>
          <ul>
            <li>
              <strong>Standard browser caching</strong> of pages, fonts and images, so the site
              loads faster on a second visit. This is handled by your browser, is not a cookie, and
              carries no identifier.
            </li>
            <li>
              <strong>Your hosting provider&rsquo;s network logs,</strong> which record IP addresses
              and request times for security and abuse prevention, as any web server does. These
              are not cookies and are not used to build a profile of you.
            </li>
          </ul>
          <p>
            Links out to the App Store and Google Play are plain links. We do not add tracking
            parameters to them, so we cannot see who followed one.
          </p>

          <h2>4. If that ever changes</h2>
          <p>
            If we add analytics or advertising in future, we will publish a consent banner{" "}
            <em>before</em> any non-essential cookie is set, offering at minimum: accept all, reject
            everything non-essential, and a per-category choice. Rejecting will be as easy as
            accepting, and the choice will be changeable at any time. This page will be updated in
            the same release, not afterwards.
          </p>

          <h2>5. The mobile app</h2>
          <p>
            The 4 Our Life app is not a browser and does not use cookies. It does store two things
            on your phone:
          </p>
          <ul>
            <li>
              <strong>Your sign-in token,</strong> held in the operating system&rsquo;s secure
              storage (Keychain on iOS, Keystore on Android) so you are not signed out between
              sessions. Signing out removes it.
            </li>
            <li>
              <strong>A push notification token,</strong> issued by Apple or Google so medication
              and appointment reminders can reach your device. Turning off notifications for the app
              stops it being used.
            </li>
          </ul>
          <p>
            Both are strictly necessary for features you have asked for. Neither is used for
            advertising, and neither is shared with advertising networks.
          </p>
          <p>
            You can reset the advertising identifier your phone exposes to all apps at any time:
          </p>
          <ul>
            <li>
              <strong>iOS:</strong> Settings &rarr; Privacy &amp; Security &rarr; Tracking
            </li>
            <li>
              <strong>Android:</strong> Settings &rarr; Privacy &rarr; Ads
            </li>
          </ul>

          <h2>6. Controlling cookies yourself</h2>
          <p>
            There is nothing on this site to switch off, but you can manage cookies for any site
            from your browser settings — deleting what is stored, blocking cookies outright, or
            asking to be prompted each time:
          </p>
          <ul>
            {BROWSER_GUIDES.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <h2>7. Updates to this policy</h2>
          <p>
            We will update this page whenever what we store changes, and the &ldquo;Last
            Updated&rdquo; date above will tell you when that last happened.
          </p>

          <h2>8. Contact us</h2>
          <p>If you have questions about this Policy, please contact us:</p>
          <ContactDetails purpose="privacy" />
          <p>
            You also have the right to lodge a complaint with the{" "}
            <strong>Data Protection Commission of Ghana</strong> if you believe we have mishandled
            your personal data.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
