import { createPageMetadata } from "@/lib/seo";
import SiteShell from "@/components/landing/SiteShell";
import { COMPANY, CONTACT, PHONES } from "@/components/landing/content";

export const metadata = createPageMetadata({
  title: "Contact 4 Our Life",
  description:
    "How to reach 4 Our Life for support, privacy and data-protection requests, press enquiries and facility partnerships.",
  path: "/contact",
});

/**
 * The reference (`static-landing/index.html` #modal-contact) puts a
 * name/email/topic/message form here. It is not reproduced: that form posts
 * nowhere — there is no handler, no inbox and no backend on this site — so
 * every message typed into it would be silently discarded. A contact form
 * that eats enquiries is worse than no form, and worse again on a health
 * product where someone may be writing about their own data.
 *
 * Addresses and phone lines come from CONTACT and PHONES in
 * components/landing/content.ts, which is the single source of truth for the
 * whole site. Build a real form here when there is somewhere for it to post.
 *
 * Every topic below routes to the one published mailbox, so they are listed
 * as guidance on what to put in the subject line rather than as three
 * separate addresses — printing the same address three times under three
 * headings reads like a mistake.
 */

const TOPICS: readonly { heading: string; body: string }[] = [
  {
    heading: "Support and general enquiries",
    body: "Trouble with the app, a question about a feature, or anything else.",
  },
  {
    heading: "Privacy and data protection",
    body: "Requests to access, correct, export or delete your data under the Ghana Data Protection Act. We respond within 30 days.",
  },
  {
    heading: "Legal and press",
    body: "Terms, compliance, partnership and media enquiries.",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Company</span>
          <h1>Contact Us</h1>
          <p>Reach the right person first time.</p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <h2>Email</h2>
          <p>
            <a href={`mailto:${CONTACT.general}`}>
              <strong>{CONTACT.general}</strong>
            </a>
          </p>

          <h2>Phone</h2>
          <p>
            {PHONES.map(({ display, href }, index) => (
              <span key={href}>
                {index > 0 && <br />}
                <a href={href}>{display}</a>
              </span>
            ))}
          </p>

          <h2>What to write about</h2>
          <p>All of the below reach the same inbox. Naming the topic in your subject line gets it to the right person faster.</p>
          {TOPICS.map(({ heading, body }) => (
            <p key={heading}>
              <strong>{heading}.</strong> {body}
            </p>
          ))}

          <h2>Deleting your account</h2>
          <p>
            You can request account deletion from inside the app, under My Account &rarr; Settings.
            If you no longer have access to the app, email{" "}
            <a href={`mailto:${CONTACT.privacy}`}>{CONTACT.privacy}</a> and we will process it for
            you.
          </p>

          <h2>Postal address</h2>
          <p>
            {COMPANY.legalName}
            <br />
            Kwashieman Ofankor Road
            <br />
            Accra, Ghana
          </p>

          <h2>Complaints</h2>
          <p>
            If you believe we have mishandled your personal data and we have not resolved it, you
            may lodge a complaint with the{" "}
            <strong>Data Protection Commission of Ghana</strong>.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
