import {ImageResponse} from 'next/og';

/**
 * A single branded invite thumbnail shared by every opaque `/j/<token>` URL.
 * It is generated at build time and cached at the CDN, so crawlers fetch a
 * small, immediately available PNG rather than the full landing-page hero.
 */
export const alt = '4OurLife — Join a group';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';
export const revalidate = 604800;

export default function GroupInviteOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          color: '#FFFFFF',
          background:
            'radial-gradient(circle at 86% 18%, #59D891 0, #2E9E63 22%, transparent 48%), linear-gradient(135deg, #0D3B27 0%, #176A47 52%, #0D3B27 100%)',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
          <div
            style={{
              display: 'flex',
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              color: '#176A47',
              fontSize: '30px',
              fontWeight: 800,
            }}
          >
            4
          </div>
          <span style={{fontSize: '34px', fontWeight: 800, letterSpacing: '1px'}}>
            4OUR LIFE
          </span>
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontSize: '34px', fontWeight: 700, opacity: 0.84}}>
            You&apos;re invited to
          </span>
          <span style={{fontSize: '82px', lineHeight: 1.05, fontWeight: 800}}>
            Join a group
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            borderRadius: '999px',
            padding: '14px 24px',
            background: 'rgba(255,255,255,0.16)',
            fontSize: '26px',
            fontWeight: 700,
          }}
        >
          Open in 4OurLife
        </div>
      </div>
    ),
    size,
  );
}
