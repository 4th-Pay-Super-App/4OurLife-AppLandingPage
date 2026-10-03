import { createPageMetadata } from "@/lib/seo";
import LandingExperience from "@/components/landing/LandingExperience";

export const metadata = createPageMetadata({
  title: "Healthcare access, made clearer",
  description:
    "Find hospitals, specialists and ambulance services in Ghana. Manage health reminders, explore trusted guidance and connect with care providers in one app.",
  path: "/",
});

export default function HomePage() {
  return <LandingExperience />;
}
