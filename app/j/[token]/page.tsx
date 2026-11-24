import Image from 'next/image';
import type {Metadata} from 'next';
import {CONSUMER_STORE_URLS} from '@/lib/app-links';
import {SITE_URL} from '@/lib/seo';

type InvitePageProps = {
  params: Promise<{token: string}>;
};

/**
 * Every absolute URL below is built from SITE_URL — the CANONICAL host,
 * `https://www.4ourlife.com`.
 *
 * This file used to hardcode the apex, `https://4ourlife.com`, and that one
 * character was the whole bug. Vercel serves the apex as a 307 redirect to
 * www, for every path, so the apex version of this page AND of the Open Graph
 * image both answered a crawler with a redirect instead of content:
 *
 *     GET https://4ourlife.com/j/<token>     → 307 → www
 *     GET https://4ourlife.com/opengraph-image → 307 → www
 *
 * A preview crawler will usually follow the redirect for the PAGE, which is
 * why the title and description eventually appeared — after a visible delay,
 * since every fetch cost an extra round trip. Most crawlers will NOT follow a
 * redirect for `og:image`, which is why the card never had a thumbnail.
 *
 * So: resolve against SITE_URL and the crawler fetches content on the first
 * request, with no redirect on the image.
 */
function inviteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

const OG_IMAGE_URL = inviteUrl('/opengraph-image');

function isInviteToken(value: string): boolean {
  return /^[A-Za-z0-9_-]{6,128}$/.test(value);
}

// This page uses no per-request data. Caching it avoids making link crawlers
// wait on a server render before they can see its Open Graph tags.
export const dynamic = 'force-static';
export const revalidate = 604800;

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const {token} = await params;
  // `og:url` must be a URL that actually resolves. It previously pointed at
  // `/j`, which is not a route here — there is only `/j/[token]` — so a
  // crawler that re-fetched it got a 404. Point at this invite's own page.
  // The token is no secret from the person holding the link; it is already in
  // the URL they were sent.
  const canonicalUrl = isInviteToken(token)
    ? inviteUrl(`/j/${encodeURIComponent(token)}`)
    : inviteUrl('/');

  return {
    // Keep this deliberately generic: the token alone must not disclose a
    // group name, its membership, or whether the invite is still live. These
    // are the same public details the former Office-hosted preview exposed,
    // without leaking the admin hostname.
    title: 'Join a group · 4OurLife',
    description: 'You have been invited to a group on 4 Our Life.',
    alternates: {canonical: canonicalUrl},
    openGraph: {
      title: 'Join a group · 4OurLife',
      description: 'You have been invited to a group on 4 Our Life.',
      url: canonicalUrl,
      siteName: '4OurLife',
      type: 'website',
      images: [
        {
          // A single static, lightweight asset shared by every invite. This
          // is much faster for Telegram/WhatsApp/iMessage to fetch than an
          // invite-specific server render or the full-size landing-page hero.
          url: OG_IMAGE_URL,
          secureUrl: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          // WhatsApp and some older crawlers only render a thumbnail when the
          // type is declared, so state it rather than letting them sniff.
          type: 'image/png',
          alt: '4OurLife — Join a group',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Join a group · 4OurLife',
      description: 'You have been invited to a group on 4 Our Life.',
      images: [OG_IMAGE_URL],
    },
    // noindex keeps invite tokens out of search results. Preview crawlers
    // (Telegram, WhatsApp, iMessage, Slack) do not consult this — they render
    // the card regardless — so it costs nothing here.
    robots: {index: false, follow: false, nocache: true},
  };
}

export default async function GroupInvitePage({params}: InvitePageProps) {
  const {token} = await params;
  const safeToken = isInviteToken(token) ? token : null;
  const appUrl = safeToken
    ? 'fourourlife://join/' + encodeURIComponent(safeToken)
    : null;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: 'linear-gradient(180deg, #EBF8F0 0%, #F5F5F0 58%)',
        color: '#17251C',
      }}>
      <section
        style={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 28,
          background: '#FFFFFF',
          padding: '36px 28px',
          textAlign: 'center',
          boxShadow: '0 18px 48px rgba(23, 37, 28, 0.12)',
        }}>
        <Image
          src="/brand/4ol-logo.png"
          alt="4 Our Life"
          width={72}
          height={72}
          priority
          style={{borderRadius: 18}}
        />
        <p style={{margin: '16px 0 0', color: '#2E9E63', fontWeight: 700}}>
          4 Our Life
        </p>
        <h1 style={{margin: '10px 0 0', fontSize: 28, lineHeight: 1.15}}>
          {safeToken ? 'You’re invited to a group' : 'This invite link is not valid'}
        </h1>
        <p style={{margin: '14px 0 0', color: '#475569', lineHeight: 1.55}}>
          {safeToken
            ? 'Open the 4 Our Life app to view the invitation and join the conversation.'
            : 'Ask the person who invited you to send a new group invite link.'}
        </p>
        {appUrl ? (
          <>
            <a
              href={appUrl}
              style={{
                display: 'block',
                marginTop: 24,
                borderRadius: 14,
                padding: '14px 18px',
                background: '#2E9E63',
                color: '#FFFFFF',
                fontWeight: 800,
                textDecoration: 'none',
              }}>
              Open 4 Our Life
            </a>
            <p style={{margin: '22px 0 10px', color: '#64748B', fontSize: 14}}>
              Don&apos;t have the app?
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
              <a href={CONSUMER_STORE_URLS.appStore} style={{color: '#1F7A4B', fontWeight: 700}}>
                App Store
              </a>
              <a href={CONSUMER_STORE_URLS.googlePlay} style={{color: '#1F7A4B', fontWeight: 700}}>
                Google Play
              </a>
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
