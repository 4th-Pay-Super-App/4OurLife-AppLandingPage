import { createPageMetadata } from "@/lib/seo";
import Landing from "@/components/landing/Landing";
import SiteShell from "@/components/landing/SiteShell";

// The title carries the same positioning as the hero eyebrow, which moved
// from "Ghana's All-in-One Health Platform" to the line below. Keeping the
// two in step matters for search: this string is what Google shows as the
// result headline, and it was making a different claim from the page.
export const metadata = createPageMetadata({
  title: "Health, Fitness & Nearby Care in Ghana",
  description:
    "Download 4 Our Life for fitness plans, symptom checking, medication reminders, and verified wellness centers across Ghana.",
  path: "/",
});

export default function HomePage() {
  return (
    <SiteShell>
      <Landing />
    </SiteShell>
  );
}
