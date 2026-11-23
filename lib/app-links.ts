/**
 * Public application-link identity. These identifiers are intentionally
 * public: Apple and Android fetch them to verify that 4ourlife.com may open
 * the installed consumer app. Keep them in sync with apps/consumer/app.config.ts.
 */
export const CONSUMER_APP_LINK = {
  appleAppId: '6RYDDPKSN3.com.4thpayapps.4ourlife',
  androidPackage: 'com.fourourlifeapppay.fourourlifeapppay',
  androidSha256: [
    '2D:9D:21:61:0B:85:D6:66:B6:90:C7:3A:CE:F1:82:93:EB:28:85:A0:58:94:F7:9F:52:4F:0D:89:53:C9:E9:E8',
    'D2:29:73:7F:D6:01:FC:DE:1F:B8:E8:D3:8A:10:68:77:C9:C1:C7:CC:14:AF:42:BD:B3:2C:E9:78:27:86:A8:98',
  ],
} as const;

export const CONSUMER_STORE_URLS = {
  appStore: 'https://apps.apple.com/app/id6754759396',
  googlePlay:
    'https://play.google.com/store/apps/details?id=com.fourourlifeapppay.fourourlifeapppay',
} as const;
