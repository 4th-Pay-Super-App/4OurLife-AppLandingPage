import { createPageMetadata } from "@/lib/seo";
import Landing from "@/components/landing/Landing";
import SiteShell from "@/components/landing/SiteShell";

export const metadata = createPageMetadata({
  title: "Your All-in-One Health App for Ghana",
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
