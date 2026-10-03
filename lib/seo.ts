import type { Metadata } from "next";

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.4ourlife.com",
);

const SITE_NAME = "4 Our Life";
const SHARE_IMAGE = new URL("/hero-section.png", SITE_URL).toString();

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const pageUrl = new URL(path, SITE_URL);

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "en_GH",
      type: "website",
      images: [
        {
          url: SHARE_IMAGE,
          width: 1466,
          height: 700,
          alt: "4 Our Life connects people and healthcare providers in Ghana",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
