import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Register your healthcare facility",
  description:
    "Help patients discover your healthcare services. Register your facility with 4 Our Life in Ghana.",
  path: "/register-facility",
});

export default function RegisterFacilityLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
