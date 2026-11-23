import {CONSUMER_APP_LINK} from '@/lib/app-links';

// Android verifies this response before it opens https://4ourlife.com/j/* in-app.
export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    [
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: CONSUMER_APP_LINK.androidPackage,
          sha256_cert_fingerprints: CONSUMER_APP_LINK.androidSha256,
        },
      },
    ],
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    },
  );
}
