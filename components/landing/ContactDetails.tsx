import { CONTACT, PHONES } from "./content";

/**
 * The published email, phone lines and postal address, as the three legal
 * pages print them in their closing "Contact us" section.
 *
 * Extracted because all three rendered the same `Email:` / `Address:` pair
 * verbatim, and adding the phone lines would have meant pasting the same
 * `PHONES.map` into each — the kind of triplication that drifts the moment
 * one page is edited and the others are not.
 *
 * `purpose` exists because the pages route to different CONTACT keys for
 * different reasons (privacy vs legal). The keys currently hold the same
 * mailbox, but the distinction is what makes splitting them later a change
 * in content.ts rather than a hunt through the pages.
 */
export default function ContactDetails({
  purpose = "privacy",
}: {
  purpose?: "privacy" | "legal" | "general";
}) {
  const email = CONTACT[purpose];

  return (
    <p>
      <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
      <br />
      <strong>Phone:</strong>{" "}
      {PHONES.map(({ display, href }, index) => (
        <span key={href}>
          {index > 0 && " / "}
          <a href={href}>{display}</a>
        </span>
      ))}
      <br />
      <strong>Address:</strong> {CONTACT.address}
    </p>
  );
}
