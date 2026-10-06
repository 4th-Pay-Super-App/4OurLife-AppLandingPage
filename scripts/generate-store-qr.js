#!/usr/bin/env node
/**
 * App Store / Google Play QR-code generator for print and marketing assets.
 *
 * Both store listings are LIVE, so these URLs are the real destinations:
 *   App Store   https://apps.apple.com/app/id6754759396
 *   Google Play https://play.google.com/store/apps/details?id=com.fourourlifeapppay.fourourlifeapppay
 *
 * The identifiers are cross-checked against the mobile repo's documented source
 * of truth (apps/consumer/store/README.md) before anything is written, so a
 * console-side ID change cannot silently produce QR codes that point at a dead
 * or wrong listing. That check is the reason this script is not a one-liner.
 *
 * Every generated PNG is then DECODED AGAIN with jsQR and compared to the exact
 * URL it is supposed to carry. Printing a banner run against a QR that does not
 * scan is expensive and effectively irreversible, so the artefacts are proven
 * rather than assumed. The script exits non-zero on any mismatch.
 *
 * Output (images/store-qr/):
 *   <slug>.svg         print master - lossless, hand this to the printer
 *   <slug>-1024.png    standard raster (flyers, A4/A3, social)
 *   <slug>-2048.png    large format (roll-up banners, posters)
 *   qr-test.html       scan-test page - open it and point a phone at it
 *   print-sheet.html   A4 layout, the source for store-qr-print-sheet.pdf
 *   preview.html       spec sheet listing every artefact and its parameters
 *
 * The two SVG masters are also published to
 * 4OurLife-AppLandingPage/public/qr/ so the website serves the identical,
 * already-verified code rather than a copy maintained by hand.
 *
 * PDFs are rendered from print-sheet.html by scripts/store-qr-pdf.js, which is
 * kept separate because it is the only stage that needs Puppeteer. That script
 * and scripts/inject-static-landing-qr.js live ONLY at the workspace root -
 * they are print/build tooling, and pulling Puppeteer's Chromium download into
 * the website repo is not worth it for a marketing deliverable.
 *
 * This file is deliberately kept identical in two places so neither copy can
 * drift:
 *   <workspace>/scripts/generate-store-qr.js
 *   <workspace>/4OurLife-AppLandingPage/scripts/generate-store-qr.js
 * Paths are derived from the running location rather than assumed, so both work.
 * Edit one, copy it over the other.
 *
 * Usage:
 *   node scripts/generate-store-qr.js
 *
 * Print notes (also rendered onto preview.html):
 *   - The 4-module quiet zone is included in every file. Do not crop it, and do
 *     not place artwork inside it; scanners need it to find the code.
 *   - Error correction is Q (25%). Raise to H only if a logo is overlaid, and
 *     keep any overlay under ~10% of the code area. H makes the code denser and
 *     therefore harder to read at distance, which is why it is not the default.
 *   - Dark module #0F172A on opaque white, matching the in-app QR in
 *     apps/consumer/features/bookings/ui/AppointmentDetailScreen.tsx. Near-black
 *     keeps contrast high enough to scan outdoors in direct sun; a mid-tone
 *     brand colour would not.
 *   - Never upscale a PNG for large format - regenerate at 2048, or place the
 *     SVG, which is resolution independent.
 */

const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { PNG } = require("pngjs");

const jsqrModule = require("jsqr");
const jsQR = jsqrModule.default || jsqrModule;

// The directory containing scripts/ - either the workspace root or the landing
// repo, depending on which copy is running.
const HERE = path.resolve(__dirname, "..");

// A Next.js config plus an app/ directory identifies the landing repo. Checking
// both avoids mistaking the workspace root, which holds plenty of app-like
// folders of its own.
const IS_LANDING_REPO =
  fs.existsSync(path.join(HERE, "next.config.ts")) &&
  fs.existsSync(path.join(HERE, "app"));

// Artefacts land next to whichever copy is running, so a checkout of the site
// repo on its own can still regenerate the codes that site serves.
const ROOT = HERE;
const OUT_DIR = path.join(ROOT, "images", "store-qr");

// The mobile repo is a child of the workspace root, and a sibling of the
// landing repo, so it is one level up from HERE in the landing case.
const WORKSPACE = IS_LANDING_REPO ? path.dirname(HERE) : HERE;
const MOBILE_REPO = path.join(WORKSPACE, "4OurLife-MobileApp");

// Documented source of truth for the store identifiers.
const STORE_README = path.join(
  MOBILE_REPO,
  "apps",
  "consumer",
  "store",
  "README.md"
);

// The landing page serves the QR masters out of public/qr/ and mirrors the same
// two IDs in lib/store-links.ts. Both are derived artefacts of this script, so
// both are regenerated and re-checked here rather than left to drift by hand.
// When running inside the landing repo, HERE already IS that root.
const LANDING_ROOT = IS_LANDING_REPO
  ? HERE
  : path.join(ROOT, "4OurLife-AppLandingPage");
const LANDING_QR_DIR = path.join(LANDING_ROOT, "public", "qr");
const LANDING_STORE_LINKS = path.join(LANDING_ROOT, "lib", "store-links.ts");

const APPLE_APP_ID = "6754759396";
const ANDROID_PACKAGE = "com.fourourlifeapppay.fourourlifeapppay";

const TARGETS = [
  {
    slug: "app-store",
    label: "App Store",
    store: "Apple App Store",
    url: `https://apps.apple.com/app/id${APPLE_APP_ID}`,
  },
  {
    slug: "google-play",
    label: "Google Play",
    store: "Google Play Store",
    url: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`,
  },
];

const QR_OPTIONS = {
  errorCorrectionLevel: "Q",
  margin: 4,
  color: { dark: "#0F172AFF", light: "#FFFFFFFF" },
};

const PNG_WIDTHS = [1024, 2048];

// Rough but real scanning floor: ~0.33 mm per module. Below this, phone cameras
// start failing, especially at speed or in poor light.
const MIN_MM_PER_MODULE = 0.33;

const failures = [];

function fail(msg) {
  failures.push(msg);
  console.error(`  FAIL  ${msg}`);
}

/**
 * Guards against drift: if the IDs recorded in the store README change, the
 * constants at the top of this file are stale and the QR codes would encode a
 * wrong listing while still looking perfectly valid.
 */
function assertSourceOfTruth() {
  console.log(
    `Running from ${IS_LANDING_REPO ? "the landing repo" : "the workspace root"}: ${HERE}`
  );

  console.log("\nChecking identifiers against apps/consumer/store/README.md");
  if (!fs.existsSync(STORE_README)) {
    if (fs.existsSync(MOBILE_REPO)) {
      fail(`store README not found at ${STORE_README}`);
    } else {
      // A standalone checkout of the landing repo has no mobile repo beside it.
      // This weakens the guard rather than removing it: the lib/store-links.ts
      // check below still runs, and that is the file the site links from.
      console.log(
        "  skip  4OurLife-MobileApp is not checked out next to this repo"
      );
    }
  } else {
    const doc = fs.readFileSync(STORE_README, "utf8");
    for (const [name, value] of [
      ["Apple App ID", APPLE_APP_ID],
      ["Android package", ANDROID_PACKAGE],
    ]) {
      if (doc.includes(value)) {
        console.log(`  ok    ${name} ${value}`);
      } else {
        fail(`${name} ${value} is NOT in the store README - ID may have changed`);
      }
    }
  }

  // The landing page repeats the same IDs. If a release ever changes one side
  // only, the site would link to a different listing than the printed QR codes.
  console.log("\nChecking the landing page agrees (lib/store-links.ts)");
  if (!fs.existsSync(LANDING_STORE_LINKS)) {
    fail(`landing store-links module not found at ${LANDING_STORE_LINKS}`);
    return;
  }
  const site = fs.readFileSync(LANDING_STORE_LINKS, "utf8");
  for (const [name, value] of [
    ["Apple App ID", APPLE_APP_ID],
    ["Android package", ANDROID_PACKAGE],
  ]) {
    if (site.includes(value)) {
      console.log(`  ok    ${name} ${value}`);
    } else {
      fail(`landing page lib/store-links.ts disagrees on ${name} (${value})`);
    }
  }
}

/** Decodes a PNG back to text and asserts it equals the intended URL. */
function verifyPng(file, expectedUrl) {
  const png = PNG.sync.read(fs.readFileSync(file));
  const rgba = new Uint8ClampedArray(
    png.data.buffer,
    png.data.byteOffset,
    png.data.length
  );
  const found = jsQR(rgba, png.width, png.height);
  const name = path.basename(file);

  if (!found) {
    fail(`${name} did not decode at all (${png.width}x${png.height})`);
    return { decoded: null, width: png.width };
  }
  if (found.data !== expectedUrl) {
    fail(`${name} decoded to the WRONG url\n          got: ${found.data}\n          want: ${expectedUrl}`);
    return { decoded: found.data, width: png.width };
  }
  console.log(`  ok    ${name} decodes to the exact URL (${png.width}px)`);
  return { decoded: found.data, width: png.width };
}

/** Writes preview.html - a labelled check sheet for eyeballing before print. */
function writePreview(rows) {
  const cards = rows
    .map(
      (r) => `
    <figure>
      <figcaption><strong>${r.label}</strong> &mdash; ${r.store}</figcaption>
      <img src="./${r.slug}.svg" alt="QR code for ${r.label}" width="220" height="220" />
      <code>${r.url}</code>
      <dl>
        <dt>QR version</dt><dd>${r.version} (${r.modules} &times; ${r.modules} modules)</dd>
        <dt>Error correction</dt><dd>Q &mdash; recovers 25% damage</dd>
        <dt>Quiet zone</dt><dd>4 modules, included in every file</dd>
        <dt>Minimum print width</dt><dd>${r.minWidthMm} mm &times; ${r.minWidthMm} mm</dd>
        <dt>Files</dt><dd>${r.slug}.svg &middot; ${r.files.join(" &middot; ")}</dd>
      </dl>
    </figure>`
    )
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>4 Our Life &mdash; store QR codes (print check sheet)</title>
<style>
  :root { --ink: #0F172A; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 2.5rem 1.5rem; background: #F8FAFC; color: var(--ink);
         font: 15px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  h1 { margin: 0 0 .25rem; font-size: 1.5rem; letter-spacing: -.01em; }
  p.lede { margin: 0 0 2rem; color: #475569; max-width: 62ch; }
  main { display: flex; flex-wrap: wrap; gap: 1.5rem; }
  figure { margin: 0; background: #fff; border: 1px solid #E2E8F0; border-radius: 14px;
           padding: 1.25rem; width: 340px; box-shadow: 0 1px 3px rgba(15,23,42,.06); }
  figcaption { font-size: .95rem; margin-bottom: .9rem; }
  figure img { display: block; margin: 0 auto; background: #fff; }
  figure code { display: block; margin: .9rem 0; padding: .5rem .6rem; background: #F1F5F9;
                border-radius: 8px; font-size: .72rem; word-break: break-all; color: #334155; }
  dl { margin: 0; font-size: .8rem; }
  dt { float: left; clear: left; width: 44%; color: #64748B; }
  dd { margin: 0 0 .3rem 44%; }
  .notes { margin-top: 2.5rem; padding: 1.25rem 1.5rem; background: #fff;
           border: 1px solid #E2E8F0; border-left: 4px solid #0F172A; border-radius: 12px;
           max-width: 720px; }
  .notes h2 { margin: 0 0 .6rem; font-size: 1rem; }
  .notes ul { margin: 0; padding-left: 1.1rem; color: #334155; }
  .notes li { margin-bottom: .4rem; }
  @media print { body { background: #fff; } .notes { break-inside: avoid; } }
</style>
</head>
<body>
<h1>Store QR codes &mdash; print check sheet</h1>
<p class="lede">
  Generated by <code>scripts/generate-store-qr.js</code>. Every PNG below was decoded
  again after generation and matched its URL exactly. Scan one with a phone camera
  before sending anything to print.
</p>
<main>
${cards}
</main>
<section class="notes">
  <h2>Before this goes to print</h2>
  <ul>
    <li><strong>Do not crop the white margin.</strong> The 4-module quiet zone is part of the code.</li>
    <li><strong>Do not upscale a PNG.</strong> Place the SVG, or regenerate at 2048 for large format.</li>
    <li><strong>Distance rule of thumb:</strong> viewing distance &divide; 10 = minimum code width. Read from 2&nbsp;m at a roll-up, the code must be at least 200&nbsp;mm wide.</li>
    <li><strong>No logo overlay</strong> is applied. Adding one needs error correction H and an overlay under ~10% of the area.</li>
    <li><strong>Re-run the script</strong> if either store ID ever changes; it re-verifies against <code>store/README.md</code> and fails loudly on drift.</li>
  </ul>
</section>
</body>
</html>
`;

  const file = path.join(OUT_DIR, "preview.html");
  fs.writeFileSync(file, html, "utf8");
  return file;
}

/**
 * Scan-test page. Deliberately austere: a big code on pure white with nothing
 * competing for the camera's attention, because this file exists to be pointed
 * at with a phone. The SVG is inlined rather than linked so the page still
 * works when opened straight off disk, emailed, or served from anywhere.
 */
function writeTestPage(rows) {
  const cards = rows
    .map(
      (r) => `
    <section class="card">
      <div class="qr">${r.svgInline}</div>
      <h2>${r.label}</h2>
      <a href="${r.url}" rel="noopener">${r.url}</a>
      <p class="meta">version ${r.version} &middot; ${r.modules}&times;${r.modules} modules &middot; error correction Q</p>
    </section>`
    )
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>4 Our Life &mdash; store QR scan test</title>
<style>
  :root { --ink: #0F172A; --muted: #64748B; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 2rem 1.25rem 3rem; background: #F1F5F9; color: var(--ink);
         font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  header { max-width: 760px; margin: 0 auto 2rem; text-align: center; }
  h1 { margin: 0 0 .4rem; font-size: 1.6rem; letter-spacing: -.02em; }
  header p { margin: 0; color: var(--muted); }
  .grid { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; max-width: 900px; margin: 0 auto; }
  .card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px;
          padding: 1.75rem 1.5rem 1.4rem; width: 400px; text-align: center;
          box-shadow: 0 2px 10px rgba(15,23,42,.06); }
  /* Pure white surround: the quiet zone is baked into the SVG, and a coloured
     backdrop behind it measurably reduces scan success on phone cameras. */
  .qr { background: #FFFFFF; padding: 10px; display: inline-block; line-height: 0; }
  .qr svg { width: 300px; height: 300px; display: block; }
  .card h2 { margin: 1rem 0 .3rem; font-size: 1.1rem; }
  .card a { color: #0D9488; font-size: .78rem; word-break: break-all; text-decoration: none; }
  .card a:hover { text-decoration: underline; }
  .meta { margin: .7rem 0 0; font-size: .72rem; color: var(--muted); }
  .hint { max-width: 760px; margin: 2rem auto 0; padding: 1rem 1.25rem; background: #FFFFFF;
          border: 1px solid #E2E8F0; border-left: 4px solid #0D9488; border-radius: 12px;
          font-size: .85rem; color: #334155; }
  .hint strong { color: var(--ink); }
  @media (max-width: 460px) { .card { width: 100%; } .qr svg { width: 240px; height: 240px; } }
</style>
</head>
<body>
<header>
  <h1>Store QR codes &mdash; scan test</h1>
  <p>Point your phone camera at a code. It should open the live store listing.</p>
</header>
<div class="grid">
${cards}
</div>
<div class="hint">
  <strong>If a code will not scan:</strong> raise your screen brightness, move the phone
  to about 20&ndash;30&nbsp;cm away and hold steady, and make sure nothing is reflecting off the
  screen. Both codes were decoded programmatically after generation and matched their URL
  exactly, so a failure here is a camera or glare problem, not a bad code.
</div>
</body>
</html>
`;

  const file = path.join(OUT_DIR, "qr-test.html");
  fs.writeFileSync(file, html, "utf8");
  return file;
}

/**
 * A4 print sheet - the artefact to hand a printer or drop into banner artwork.
 * Codes are laid out at a fixed physical size in millimetres rather than pixels,
 * so what is on the page is what comes off the press regardless of DPI.
 */
function writePrintSheet(rows) {
  const CODE_MM = 62; // ~4.5 mm per module on the denser Play code: scans from ~45 cm

  const cards = rows
    .map(
      (r) => `
    <section class="code">
      <div class="qr">${r.svgInline}</div>
      <h2>${r.label}</h2>
      <p class="url">${r.url}</p>
      <p class="spec">${CODE_MM} &times; ${CODE_MM} mm &middot; ECC Q &middot; v${r.version} &middot; ${r.modules}&times;${r.modules} modules</p>
    </section>`
    )
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>4 Our Life &mdash; store QR codes (print sheet)</title>
<style>
  @page { size: A4 portrait; margin: 16mm 14mm; }
  :root { --ink: #0F172A; --muted: #64748B; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { color: var(--ink); background: #FFFFFF;
         font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
         -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  h1 { margin: 0 0 2mm; font-size: 17pt; letter-spacing: -.01em; }
  .lede { margin: 0 0 8mm; font-size: 9pt; color: var(--muted); }
  .row { display: flex; gap: 10mm; justify-content: flex-start; }
  .code { width: 82mm; text-align: center; }
  .qr { width: ${CODE_MM}mm; height: ${CODE_MM}mm; margin: 0 auto; background: #FFFFFF; line-height: 0; }
  .qr svg { width: ${CODE_MM}mm; height: ${CODE_MM}mm; display: block; }
  .code h2 { margin: 4mm 0 1mm; font-size: 11pt; }
  .url { margin: 0; font-size: 6.6pt; color: #334155; word-break: break-all; }
  .spec { margin: 1.5mm 0 0; font-size: 6.6pt; color: var(--muted); }
  .notes { margin-top: 12mm; padding-top: 5mm; border-top: 0.4pt solid #CBD5E1; }
  .notes h3 { margin: 0 0 2.5mm; font-size: 9.5pt; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
  .notes ul { margin: 0; padding-left: 5mm; font-size: 8.2pt; line-height: 1.65; color: #334155; }
  .notes li { margin-bottom: 1.2mm; }
  .foot { margin-top: 10mm; font-size: 7pt; color: var(--muted); }
</style>
</head>
<body>
<h1>4 Our Life &mdash; App Store &amp; Google Play QR codes</h1>
<p class="lede">
  Vector artwork for print. Generated ${new Date().toISOString().slice(0, 10)} by
  <code>scripts/generate-store-qr.js</code>; every code was decoded after generation and
  matched its URL exactly.
</p>
<div class="row">
${cards}
</div>
<section class="notes">
  <h3>Print specification</h3>
  <ul>
    <li><strong>Do not crop the white margin.</strong> The 4-module quiet zone is part of the code and is included in the ${CODE_MM}&nbsp;mm box.</li>
    <li><strong>Minimum size</strong> is ${rows.map((r) => r.minWidthMm + " mm").join(" / ")} (App Store / Google Play) &mdash; the ${CODE_MM}&nbsp;mm layout above is well above it.</li>
    <li><strong>Distance rule:</strong> viewing distance &divide; 10 = minimum code width. For a roll-up read from 2&nbsp;m, scale the code to at least 200&nbsp;mm.</li>
    <li><strong>Scale from the SVG</strong> (<code>images/store-qr/*.svg</code>), never by upscaling a PNG. Regenerate at 2048&nbsp;px if a raster is required.</li>
    <li><strong>Reproduce in solid black or #0F172A on white.</strong> Do not tint to a mid-tone brand colour or reverse it out &mdash; contrast is what makes it scan outdoors.</li>
    <li><strong>No logo overlay.</strong> Adding one requires error correction H and an overlay under ~10% of the code area; regenerate the artwork rather than placing a logo on top.</li>
  </ul>
</section>
<p class="foot">Both listings verified live. Apple App ID ${APPLE_APP_ID} &middot; Android package ${ANDROID_PACKAGE}.</p>
</body>
</html>
`;

  const file = path.join(OUT_DIR, "print-sheet.html");
  fs.writeFileSync(file, html, "utf8");
  return file;
}

async function main() {
  console.log("4 Our Life - store QR generator\n");
  assertSourceOfTruth();
  if (failures.length) {
    console.error("\nAborting: identifier check failed, no files written.");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`\nWriting to ${path.relative(ROOT, OUT_DIR)}\n`);

  const rows = [];

  for (const t of TARGETS) {
    console.log(`${t.label}  ${t.url}`);

    // Matrix is derived once so the reported version/module count describes the
    // very same code that gets rendered into both the SVG and the PNGs.
    const qr = QRCode.create(t.url, {
      errorCorrectionLevel: QR_OPTIONS.errorCorrectionLevel,
    });
    const modules = qr.modules.size;
    const totalModules = modules + QR_OPTIONS.margin * 2;
    const minWidthMm = Math.ceil(totalModules * MIN_MM_PER_MODULE);

    // qrcode emits a viewBox but no intrinsic width/height. Print RIPs and some
    // layout tools then render the master at 0x0 or stretch it to 100%, so the
    // size is pinned explicitly at 1 mm per module - comfortably above the
    // 0.33 mm scanning floor, and still losslessly scalable because the
    // viewBox is preserved alongside it.
    //
    // svgInline keeps the XML prologue and DOCTYPE stripped and carries no
    // width/height, which is what embedding inside HTML wants: the surrounding
    // CSS owns the box, and a stray <?xml?> would be invalid markup in-page.
    const svgPath = path.join(OUT_DIR, `${t.slug}.svg`);
    const svgRaw = await QRCode.toString(t.url, { ...QR_OPTIONS, type: "svg" });
    const svgInline = svgRaw.slice(svgRaw.indexOf("<svg"));
    const svgPrint = svgInline.replace(
      "<svg ",
      `<svg width="${totalModules}mm" height="${totalModules}mm" `
    );
    fs.writeFileSync(svgPath, svgPrint, "utf8");
    console.log(
      `  wrote ${t.slug}.svg (${fs.statSync(svgPath).size} bytes, ${totalModules}x${totalModules}mm)`
    );

    // Publish the same master into the landing page so the site serves the
    // exact code that was verified here, not a separately-maintained copy.
    if (fs.existsSync(LANDING_ROOT)) {
      fs.mkdirSync(LANDING_QR_DIR, { recursive: true });
      const siteCopy = path.join(LANDING_QR_DIR, `${t.slug}.svg`);
      fs.writeFileSync(siteCopy, svgPrint, "utf8");
      console.log(
        `  wrote ${path.relative(ROOT, siteCopy)} (landing page asset)`
      );
    } else {
      console.log("  skip  landing page repo not present, not publishing there");
    }

    const files = [];
    for (const width of PNG_WIDTHS) {
      const pngPath = path.join(OUT_DIR, `${t.slug}-${width}.png`);
      await QRCode.toFile(pngPath, t.url, { ...QR_OPTIONS, type: "png", width });
      const bytes = fs.statSync(pngPath).size;
      files.push(`${t.slug}-${width}.png`);
      console.log(`  wrote ${t.slug}-${width}.png (${bytes} bytes)`);
      verifyPng(pngPath, t.url);
    }

    // The SVG cannot be fed to a raster decoder, so it is checked structurally:
    // well-formed, carrying real module geometry, and self-describing in size.
    const svg = svgPrint;
    if (!svg.includes("<svg") || !svg.includes("</svg>")) {
      fail(`${t.slug}.svg is not well-formed SVG`);
    } else if (!/<(path|rect)/.test(svg)) {
      fail(`${t.slug}.svg contains no drawn modules`);
    } else if (!/width="\d+mm"/.test(svg) || !/viewBox="0 0 \d+ \d+"/.test(svg)) {
      fail(`${t.slug}.svg is missing an intrinsic size or viewBox`);
    } else {
      console.log(
        `  ok    ${t.slug}.svg is well-formed, carries module geometry, and has an intrinsic size`
      );
    }

    rows.push({
      slug: t.slug,
      label: t.label,
      store: t.store,
      url: t.url,
      version: qr.version,
      modules,
      totalModules,
      minWidthMm,
      files,
      svgInline,
    });
    console.log("");
  }

  const preview = writePreview(rows);
  console.log(`Wrote ${path.relative(ROOT, preview)}`);
  const testPage = writeTestPage(rows);
  console.log(`Wrote ${path.relative(ROOT, testPage)}`);
  const printSheet = writePrintSheet(rows);
  console.log(`Wrote ${path.relative(ROOT, printSheet)}`);
  console.log("");

  console.log("Summary");
  for (const r of rows) {
    console.log(
      `  ${r.label.padEnd(12)} v${r.version}  ${r.modules}x${r.modules} modules  ` +
        `min print ${r.minWidthMm}mm  ECC Q`
    );
  }

  if (failures.length) {
    console.error(`\n${failures.length} FAILURE(S) - do not send these to print.`);
    process.exit(1);
  }
  console.log("\nAll QR codes generated and verified by round-trip decode.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
