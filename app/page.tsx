import { createPageMetadata } from "@/lib/seo";
import HomeExperience from "@/components/home/HomeExperience";

export const metadata = createPageMetadata({
  title: "Everyday health. Care closer to home.",
  description:
    "Explore health guidance, build healthier routines and browse care services near you with 4 Our Life in Ghana.",
  path: "/",
});

export default function HomePage() {
  return <HomeExperience />;
}
