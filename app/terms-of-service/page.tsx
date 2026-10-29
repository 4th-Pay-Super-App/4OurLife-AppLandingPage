import { createPageMetadata } from "@/lib/seo";
import SiteShell from "@/components/landing/SiteShell";
import { COMPANY, CONTACT } from "@/components/landing/content";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "The terms governing your use of the 4 Our Life app and website, including the medical disclaimer, acceptable use and governing law.",
  path: "/terms-of-service",
});

const LAST_UPDATED = "October 29, 2026";

/**
 * ── Why this page was rewritten (Oct 2026) ───────────────────────────────
 * Two problems, both visible to anyone clicking "Terms of Service" in the
 * footer.
 *
 * 1. It rendered inside `components/Navbar` + `components/Footer` — a
 *    different design system from the rest of the site, with its own header,
 *    its own footer and a fourth support address (hello@4ourlife.app). The
 *    cookie policy, one link away, used SiteShell. Clicking between two
 *    legal pages changed the entire chrome, which is what "it redirects to a
 *    page with different info" described.
 *
 * 2. The operator was named inconsistently across the estate.
 *
 * Copy follows the signed-off reference in `static-landing/index.html`
 * (#modal-terms). Where the reference states company details it is NOT
 * followed: it says "4 Our Life Health Tech Ltd." and legal@4ourlife.health,
 * neither of which is the registered operator. Those come from COMPANY and
 * CONTACT in components/landing/content.ts, which match the app stores and
 * the admin panel. A mockup is a layout, not a company registration.
 */

export default function TermsOfServicePage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Terms of Service</h1>
          <p>The agreement between you and {COMPANY.legalName} for use of the 4 Our Life app and website.</p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <p className="legal-date">
            <strong>Last Updated:</strong> {LAST_UPDATED}
          </p>

          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement
            between you and {COMPANY.legalName}, trading as {COMPANY.tradingName} (&ldquo;4 Our
            Life,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), governing your
            access to and use of the 4 Our Life mobile application, website, and related services
            (collectively, the &ldquo;Services&rdquo;). By accessing or using our Services, you
            agree to be bound by these Terms. If you do not agree, you must not use our Services.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 13 years old to use our Services. By using the Services, you
            represent and warrant that you meet this age requirement and have the legal capacity to
            enter into these Terms. If you are using the Services on behalf of an organization, you
            represent that you have authority to bind that organization.
          </p>

          <h2>2. Medical Disclaimer</h2>
          <p>
            <strong>IMPORTANT:</strong> 4 Our Life is a health information and wellness platform,{" "}
            <strong>not a medical service provider</strong>. The content provided through our
            Services, including symptom checkers, disease information, fitness plans, and health
            tips, is for informational and educational purposes only.
          </p>
          <ul>
            <li>
              Our Services <strong>do not constitute medical advice, diagnosis, or treatment</strong>.
            </li>
            <li>
              Always seek the advice of a qualified healthcare professional for any medical
              condition or concern.
            </li>
            <li>
              Never disregard professional medical advice or delay seeking it because of
              information you read on our platform.
            </li>
            <li>
              In case of a medical emergency, contact emergency services or go to the nearest
              hospital immediately.
            </li>
            <li>
              Medication reminders are a scheduling tool only; we do not verify prescriptions or
              dosages.
            </li>
          </ul>
          <p>
            We expressly disclaim any liability for adverse health outcomes resulting from reliance
            on information provided through our Services.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account, you must provide accurate, current, and complete
            information. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activities that occur under your account.</li>
            <li>Notifying us immediately of any unauthorized access or security breach.</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms or for
            prolonged inactivity.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to use our Services to:</p>
          <ul>
            <li>
              Post, share, or transmit content that is unlawful, harmful, threatening, abusive,
              harassing, defamatory, or discriminatory.
            </li>
            <li>
              Impersonate any person or entity, or falsely state or misrepresent your affiliation.
            </li>
            <li>Upload or transmit viruses, malware, or other malicious code.</li>
            <li>Interfere with or disrupt the integrity or performance of the Services.</li>
            <li>
              Attempt to gain unauthorized access to any part of the Services or related systems.
            </li>
            <li>Scrape, crawl, or otherwise extract data from the Services without authorization.</li>
            <li>
              Use group chats to distribute medical misinformation, promote unverified treatments,
              or sell pharmaceuticals.
            </li>
          </ul>
          <p>
            Violation of these rules may result in immediate account suspension, legal action, and
            reporting to relevant authorities.
          </p>

          <h2>5. Content and Intellectual Property</h2>
          <p>
            <strong>Our Content:</strong> All content provided by 4 Our Life, including articles,
            videos, graphics, software, and trademarks, is owned by us or licensed to us and is
            protected by copyright, trademark, and other intellectual property laws. You may not
            reproduce, distribute, modify, or create derivative works without our written
            permission.
          </p>
          <p>
            <strong>Your Content:</strong> You retain ownership of content you submit (e.g., group
            chat messages, reviews, profile information). By submitting content, you grant us a
            worldwide, non-exclusive, royalty-free license to use, display, and distribute your
            content for the purpose of operating and improving the Services.
          </p>
          <p>
            <strong>Content Removal:</strong> We reserve the right to remove any user content that
            violates these Terms or that we deem harmful, without prior notice.
          </p>

          <h2>6. Wellness Center Listings</h2>
          <p>
            Wellness centers, clinics, and pharmacies listed on our platform are verified through
            partnerships with regulatory bodies such as HEFRA. However:
          </p>
          <ul>
            <li>Listing does not constitute an endorsement or guarantee of service quality.</li>
            <li>Users are encouraged to independently verify credentials before seeking treatment.</li>
            <li>
              We are not liable for the actions, omissions, or services provided by listed
              facilities.
            </li>
            <li>Facility owners are responsible for the accuracy of their listing information.</li>
          </ul>

          <h2>7. Payments and Subscriptions</h2>
          <p>Certain features may require payment or a subscription:</p>
          <ul>
            <li>All fees are quoted in Ghana Cedis (GHS) unless otherwise stated.</li>
            <li>
              Subscriptions automatically renew unless cancelled at least 24 hours before the
              renewal date.
            </li>
            <li>
              Refunds are provided at our discretion and in accordance with Ghanaian consumer
              protection law.
            </li>
            <li>We may modify pricing with 30 days&rsquo; advance notice.</li>
          </ul>

          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by Ghanaian law:</p>
          <ul>
            <li>
              We provide the Services &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, either express or implied.
            </li>
            <li>
              We do not warrant that the Services will be uninterrupted, timely, secure, or
              error-free.
            </li>
            <li>
              Our total liability to you for any claim arising from or relating to these Terms
              shall not exceed the amount you paid us in the 12 months preceding the claim, or GHS
              500, whichever is greater.
            </li>
            <li>
              We are not liable for any indirect, incidental, special, consequential, or punitive
              damages.
            </li>
          </ul>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless {COMPANY.legalName}, its affiliates,
            officers, directors, employees, and agents from and against any claims, liabilities,
            damages, losses, and expenses (including legal fees) arising out of or in any way
            connected with your access to or use of the Services, your violation of these Terms, or
            your infringement of any third-party rights.
          </p>

          <h2>10. Termination</h2>
          <p>
            We may terminate or suspend your access to the Services immediately, without prior
            notice or liability, for any reason, including breach of these Terms. Upon termination,
            your right to use the Services ceases immediately. Provisions that by their nature
            should survive termination shall survive.
          </p>

          <h2>11. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            Republic of Ghana. Any dispute arising from these Terms shall first be attempted to be
            resolved through good-faith negotiations. If unresolved within 60 days, disputes shall
            be submitted to binding arbitration in Accra, Ghana, under the rules of the Ghana
            Arbitration Centre.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            We may revise these Terms from time to time. Material changes will be notified via
            email or in-app notice at least 14 days before taking effect. Your continued use of the
            Services after changes constitutes acceptance of the revised Terms.
          </p>

          <h2>13. Contact Information</h2>
          <p>For questions about these Terms, contact us at:</p>
          <p>
            <strong>Email:</strong> <a href={`mailto:${CONTACT.legal}`}>{CONTACT.legal}</a>
            <br />
            <strong>Address:</strong> {CONTACT.address}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
