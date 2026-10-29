import Image from "next/image";
import Link from "next/link";
import {
  COMPANY,
  CONTACT,
  FOOTER_COMPANY_LINKS,
  FOOTER_FEATURE_LINKS,
  FOOTER_LEGAL_LINKS,
  SOCIAL_LINKS,
} from "./content";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "./icons";

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedInIcon,
} as const;

type FooterColumnProps = {
  heading: string;
  links: readonly { href: string; label: string }[];
};

function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div className="footer-col">
      {/* h3, not h4: every page's last content heading is an h2, so h4 here
          would skip a level and break the document outline. */}
      <h3>{heading}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-mark">
                <Image src="/brand/4ol-logo.png" alt="" width={32} height={32} />
              </span>
              4 Our Life
            </Link>
            <p>Your health, simplified.</p>
            {/*
              With the Contact page gone, the one address worth publishing
              sits here rather than alone in a column of its own.
            */}
            <p className="footer-contact">
              <a href={`mailto:${CONTACT.general}`}>{CONTACT.general}</a>
            </p>
            {/*
              Renders nothing until SOCIAL_LINKS has real profile URLs. The
              row used to link to the platforms' own front pages, which is
              worse than no icon at all: it looks like a profile and goes
              nowhere. Fill the list in content.ts and this comes back.
            */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="socials">
                {SOCIAL_LINKS.map(({ href, label }) => {
                  const Icon = SOCIAL_ICONS[label as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={label}
                      href={href}
                      className="social"
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <FooterColumn heading="Features" links={FOOTER_FEATURE_LINKS} />
          <FooterColumn heading="Company" links={FOOTER_COMPANY_LINKS} />
          <FooterColumn heading="Legal" links={FOOTER_LEGAL_LINKS} />
        </div>

        {/* The operator named here must match the one in the legal pages and
            the app stores — see COMPANY in ./content.ts. */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} {COMPANY.legalName}, trading as {COMPANY.tradingName}.
          All rights reserved. Made with care for Ghana.
        </div>
      </div>
    </footer>
  );
}
