import { createPageMetadata } from "@/lib/seo";
import SiteShell from "@/components/landing/SiteShell";
import { COMPANY, CONTACT } from "@/components/landing/content";

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
 * Addresses come from CONTACT in components/landing/content.ts, which is the
 * single source of truth for the whole site. Build a real form here when
 * there is somewhere for it to post.
 */

const ENQUIRIES: readonly { heading: string; body: string; email: string }[] = [
  {
    heading: "Support and general enquiries",
    body: "Trouble with the app, a question about a feature, or anything else.",
    email: CONTACT.general,
  },
  {
    heading: "Privacy and data protection",
    body: "Requests to access, correct, export or delete your data under the Ghana Data Protection Act. We respond within 30 days.",
    email: CONTACT.privacy,
  },
  {
    heading: "Legal and press",
    body: "Terms, compliance, partnership and media enquiries.",
    email: CONTACT.legal,
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
          {ENQUIRIES.map(({ heading, body, email }) => (
            <div key={heading}>
              <h2>{heading}</h2>
              <p>{body}</p>
              <p>
                <a href={`mailto:${email}`}>
                  <strong>{email}</strong>
                </a>
              </p>
            </div>
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
