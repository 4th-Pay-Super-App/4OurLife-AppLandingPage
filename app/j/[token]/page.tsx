import Image from 'next/image';
import type {Metadata} from 'next';
import {CONSUMER_STORE_URLS} from '@/lib/app-links';

type InvitePageProps = {
  params: Promise<{token: string}>;
};

const INVITE_ORIGIN = 'https://4ourlife.com';

function isInviteToken(value: string): boolean {
  return /^[A-Za-z0-9_-]{6,128}$/.test(value);
}

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: 'You’re invited to a group | 4 Our Life',
    description: 'Open 4 Our Life to view your group invitation.',
    alternates: {canonical: INVITE_ORIGIN + '/j'},
    openGraph: {
      title: 'You’re invited to a group on 4 Our Life',
      description: 'Open 4 Our Life to view the invitation and join the conversation.',
      url: INVITE_ORIGIN + '/j',
      siteName: '4 Our Life',
      type: 'website',
      images: [
        {
          url: INVITE_ORIGIN + '/hero-section.png',
          width: 1466,
          height: 700,
          alt: '4 Our Life',
        },
      ],
    },
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
