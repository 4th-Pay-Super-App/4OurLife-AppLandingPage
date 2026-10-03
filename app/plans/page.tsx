import PlansExperience from "@/components/plans/PlansExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Plans for people and providers",
  description:
    "Compare 4 Our Life plans for everyday health, independent providers and care organisations in Ghana.",
  path: "/plans",
});

export default function PlansPage() {
  return <PlansExperience />;
}
