import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Review the terms that apply when using 4 Our Life's health platform and services.",
  path: "/terms-of-service",
});

export default function TermsOfServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
