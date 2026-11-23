import {CONSUMER_APP_LINK} from '@/lib/app-links';

// Apple fetches this file directly. It must be HTTPS, JSON, and never redirect.
export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appID: CONSUMER_APP_LINK.appleAppId,
            paths: ['/j/*'],
          },
        ],
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    },
  );
}
