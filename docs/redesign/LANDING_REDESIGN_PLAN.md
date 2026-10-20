# 4 Our Life landing page: fresh redesign plan

Status: v3, council review applied · Date: 6 Oct 2026 · Repo: `4ourlife-landing` (Next.js 16)

This plan starts from a blank page. It does not build on the current
`LandingExperience` homepage. It keeps only what is true about the product and
brand: the logo, the brand fonts, the brand green, the live store links in
`lib/store-links.ts` and the generated QR codes in `public/qr/`.

The goal is an Apple-grade product page: premium, calm, mobile first, with
scroll-driven device choreography that tells the story instead of decorating
it.

### Owner decisions (6 Oct 2026)

| # | Question | Decision |
| --- | --- | --- |
| 1 | Font | Use the brand fonts: QuincyCF (display) and OpenSans (body). |
| 2 | What is live | Plasence (period tracker) is live and gets a spotlight. Her Health Circle is still launch-gated, so it is not advertised. |
| 3 | Business app | Target store launch: end of October 2026. Treat availability as unconfirmed until both listings are live; before then, use a working register-interest path. |
| 4 | Trust wording | Still open: needs counsel and operations sign-off. |
| 5 | Proof | No testimonials, partners, press or numbers. None will be invented. |
| 6 | 3D anatomy | Removed from the page. No WebGL anywhere. |

---

## 1. The council

Five roles re-evaluated the greenfield plan. Product Marketing, Content and UX
reviewers worked independently; the Copywriter and Sales/Solutions Engineer
reviews were synthesized into the final council decisions below.

| Role | Owns | Their verdict in one line |
| --- | --- | --- |
| Product Marketing Manager | Positioning, audience priority, conversion | Lead with everyday health plus nearby care; keep consumers first and the business app as a clear second audience. |
| Content Strategist | Narrative, section jobs, what to cut | Each scene should explain one user outcome. Reduce the feature catalogue and put the strongest proof first. |
| Copywriter | Headlines, claims, CTAs | Specific, plain, locally relevant wording. Avoid generic “all in one” language and health guarantees. |
| UX Writer | Navigation, accessibility, states | Motion must never gate content. Preserve native scroll and provide accessible fallbacks. |
| Sales / Solutions Engineer | Provider workflows, objection handling, proof | Show real screens for each provider role and describe the workflow without implying complete bed coverage or guaranteed response. |

### Council decisions and corrections

1. **Lead with outcomes, not the whole app inventory.** Keep consumer discovery
   first. Give the three consumer outcomes one reveal, one focused Plasence
   spotlight and one compact supporting feature group; move Jobs, Chats and
   Family lower in the page or defer them if they dilute the core story.
2. **Keep the EventBeds choreography, tune it to 4 Our Life.** On mobile, the
   hero phone visibly travels into the next chapter. Then the consumer phones
   rise from behind it, spread and settle beside their benefit labels. The
   business chapter follows on the same forest-green canvas and uses a pinned
   horizontal story on capable desktop viewports only.
3. **Use real app screens for every device.** Image generation may create
   people, backdrops and one abstract 3D accent, but never screen UI, numbers,
   maps, medical records or device text. Business mockups should be simulator
   captures, not hand-built fake dashboards.
4. **Limit hard pins to two chapters.** Pin the hero-to-consumer handoff and
   the desktop business story. Keep Plasence and remaining product proof in
   ordinary scroll flow; do not make a long page feel like one continuous
   scroll trap.
5. **Replace unapproved trust promises with observable product proof.** Do
   not publish absolute privacy, verification, availability or response claims
   without evidence and owner approval.
6. **Separate discovery from fulfilment.** Consumers can browse ambulance
   listings; ambulance dispatch and bed-request coordination are business
   workflows. The consumer app does not expose live public hospital bed
   counts or one-tap ambulance dispatch. If shown, Ghana's 112 number is a
   clearly labelled national emergency call action, not a 4 Our Life service.

---

## 2. Reference review: borrow the rhythm, keep our own brand

### What I watched and what transfers

- **EventBeds (live page, mobile scroll):** the opening device is the story
  anchor. It stays visually present across the section handoff; then the page
  changes into a darker product chapter where app screens appear, separate,
  and gain their own short labels. In the mobile view I inspected, the feature
  chapter uses two large phones side by side rather than trying to shrink a
  desktop three-phone row. Borrow the continuity, layered reveal and concise
  labels. Keep 4 Our Life's forest green instead of copying EventBeds' black.
- **Supahero:** now part of Screensdesign and functions as a hero-section
  reference library. Use it to study first-screen hierarchy and product
  imagery; it is not itself a live scroll-animation reference.
- **Land-book:** its Health & Fitness, 3D and Animation categories help find
  visual directions and section compositions. Treat captures as static
  references; open the featured live site before borrowing interaction.
- **Nicelydone / Carbon Health:** the examples emphasize clinic discovery,
  service overviews, clinician profiles and appointment entry points. Borrow
  clear wayfinding and concrete next actions, not US-specific insurance
  language or medical claims.
- **Awwwards and Codegrid:** use them for motion ideas such as a reveal,
  fullscreen carousel or pinned image handoff. Translate one motif at a time
  and verify it on a mid-range phone before adding another effect.
- **Apple HIG:** preserve familiar scroll behavior, keyboard shortcuts and
  visible scroll position. The product should feel cinematic while the page
  remains a normal, navigable web page.

### 4 Our Life translation

1. Open on one real consumer screen. As the visitor scrolls, that same phone
   travels into the green consumer chapter.
2. Reveal two supporting phones from behind the travelling phone. They settle
   into three benefit-led positions on wide screens; mobile gets one hero
   device with the other two screens peeking behind, then a horizontal
   scroll-snap feature rail.
3. Follow with one touchable Plasence screen selector. Let visitors switch
   Today, Calendar and Insights themselves; do not add a third pinned scroll
   sequence.
4. Keep the business chapter on the same green canvas. Pin and translate its
   five role panels horizontally only on wide, tall desktop viewports. Each
   panel changes the real screenshot inside one fixed device frame.
5. Mobile, tablet, short viewports, zoomed layouts and reduced-motion mode
   receive ordinary vertical sections with the same copy and real screenshots.

This keeps the EventBeds sense of one continuous product story, while the
copy, palette, product screens and business roles remain distinctly 4 Our Life.

## 3. Positioning and message hierarchy

**One-line promise (consumer):** Everyday health. Care closer to home.

**Business promise:** One workspace for the people who deliver care.

**Audiences, in priority order**

1. Members (consumers) in Ghana. Design for mid-range Android phones and
   mobile data as a mobile-first target, not as a claim about the audience
   mix. They need to understand the app quickly and reach a store in one tap.
2. Women using Plasence to log and review cycle patterns: a focused live
   product reason to download. Do not imply diagnosis, contraception or a
   guaranteed fertility outcome.
3. Providers: facilities, practitioners, trainers, pharmacies and vendors,
   ambulance teams. They need to recognise their own workflow, then download
   the business app or register.

**Primary conversions (one label per intent, used everywhere)**

| Intent | Label | Destination |
| --- | --- | --- |
| Install consumer app | **Get the app** | Consumer store badges and QR (`lib/store-links.ts`); confirm both links resolve before launch |
| Business app launch (before both listings are live) | **Register your interest** | Verified business registration flow; confirm that it supports every advertised role |
| Install business app (after both listings are live) | **Get the business app** | Verified business store badges and QR |
| Pricing | **See plans** | `/plans` only if plans are live and relevant to each provider role |

### The "mobile features only" rule

The page advertises **only what a member or provider can use in the mobile
apps.** The admin panel is internal and never appears, in copy or imagery.
Launch-gated features are not advertised until they are live.

| Feature on the page | Where it lives in the apps | Gate to check before launch |
| --- | --- | --- |
| Disease Library, Symptoms | Consumer: Home → Diseases / Symptoms | PostHog `category-diseases`, `category-symptoms` on |
| Healthy Living | Consumer: Home → Healthy Living | `category-healthy-living` on |
| Plasence (period tracker) | Consumer: `plasence/` | `category-plasence` on (live) |
| Reminders | Consumer: Reminders tab | none |
| Fitness | Consumer: fitness tab group | `category-fitness` on |
| Map and directory (facilities, professionals, ambulances) | Consumer: Map tab, `Directory/` | `category-health-facilities`, `category-health-professionals`, `category-ambulance-directory` on |
| Appointments | Consumer: bookings | `consumer-bookings` enabled and end-to-end booking available; describe as a request where provider confirmation is needed |
| Find medication | Consumer: `Medication/` | `category-find-medication` on |
| Jobs | Consumer: `Jobs/` | `category-jobs` on |
| Chats and groups | Consumer: Chats tab | none |
| Family circle | Consumer: `family/` | none |
| Business app, all five roles | Business app: `(facility)`, `(practitioner)`, `(trainer)`, `(vendor)`, `(ambulance)` | Store release (end of October) |

**Not advertised (exist but gated or internal):** Her Health Circle (seeded
`pending`), Smart Assistant (`smart_assistant` off), Care Bridge telehealth
(`care_bridge_telehealth` off), "Nearby care" on condition pages
(`nearby-care` off), 3D Anatomy (owner decision), anything in the admin panel.
Do not promise video consultations or immediate clinician access while
telehealth is gated. A provider may arrange a video call outside the app; that
is not an in-app video visit.

**Claims policy**

- No diagnosis language. The app informs and connects; it does not treat.
- No invented numbers (users, facilities, ratings, savings).

---

## 4. Design direction

### Design read

Premium consumer health landing page for Ghanaian consumers and care providers,
with an Apple-style product-story feel and selective Awwwards-inspired
choreography. Keep the experience calm, legible and mobile first. Dials:
**variance 7, motion 6, density 3**. The UI/UX Pro Max design-system search
matched scroll-triggered storytelling and recommends that the story remain
understandable without scroll effects, with reduced-motion and mobile
simplifications. Its generic Liquid Glass, gold palette and fashion typography
do not fit the existing 4 Our Life brand, so retain the brand green and
QuincyCF/OpenSans.

### Visual language

- **Theme:** light page (soft white `#F6F8F6`) for hero, then one deliberate
  colour chapter in deep forest green for S2 to S4, then light again. The
  switch is choreographed (the background colour scrubs as the hero phone
  lands), not a hard cut.
- **Palette (Forest family, one accent, locked):**

  | Token | Hex | Use |
  | --- | --- | --- |
  | `--bg` | `#F6F8F6` | Page background (light chapters) |
  | `--ink` | `#0E1A14` | Primary text on light |
  | `--ink-muted` | `#4B5A52` | Secondary text on light (passes 4.5:1 on `--bg`) |
  | `--forest-900` | `#0B2A1D` | Green chapter background |
  | `--forest-700` | `#124A31` | Green chapter surfaces, device glow |
  | `--brand` | `#1F7A4B` | The one accent: buttons, links, focus ring |
  | `--mint` | `#BFE8D2` | Highlighted word in headlines on green |
  | `--on-forest` | `#F2F7F4` | Body text on green (passes AA on `--forest-900`) |

  No purple, no neon, no beige/brass, no gradients beyond a soft radial glow
  behind devices in brand green.
- **Typography (brand fonts, already in `app/fonts/` and loaded with
  `next/font/local`):**

  | Role | Font | Weights | Sizes |
  | --- | --- | --- | --- |
  | Display (headlines, the big business text) | **QuincyCF** | Medium 500, Bold 700 | mobile `40/46`, desktop `84/90`, business panels up to `104/112` |
  | Body, UI, buttons, captions | **OpenSans** | Regular 400, Medium 500, Bold 700 | body `17/26` mobile, `19/30` desktop; UI `15/20` |

  Rules: QuincyCF only for headlines (never body or buttons). Emphasis inside
  a headline uses QuincyCF Bold or the `--mint` colour, never a third font.
  QuincyCF is a serif with descenders: display line-height never below 1.08,
  so letters such as "y" and "g" are never clipped. OpenSans tracking stays at
  0; QuincyCF display gets `-0.015em`.
- **Shape lock:** devices use their real corner radius; cards 24px; buttons and
  store badges full pill; inputs 12px.
- **Icons:** Lucide line icons at 1.5px stroke. No emoji anywhere.
- **Imagery:** real app screenshots inside device frames; up to three
  generated lifestyle photos and one optional 3D accent (section 8).
- **Eyebrows:** at most one per three sections (hero has none).

### What "premium" means here, concretely

1. Generous space: section vertical padding `96–160px` desktop, `72–96px`
   mobile.
2. Few elements per screen: one headline, one sentence, one visual.
3. Motion with weight: scrubbed to the scrollbar, eased (`power3`/`expo`),
   never bouncy.
4. Real product: every phone shows the real app.
5. Quiet details: soft device shadows tinted green, subtle grain on a fixed
   overlay, crisp 1px hairlines.

---

## 5. Page architecture (section by section)

Each section lists its job, layout, scroll choreography, mobile behaviour and
reduced-motion fallback. Copy lives in section 7.

| # | Section | Background |
| --- | --- | --- |
| S0 | Navigation | frosted, adapts |
| S1 | Hero: the phone that travels | light → green |
| S2 | For you: three phones from one | green |
| S3 | Plasence + supporting tools | green |
| S4 | For business: pinned horizontal story | green |
| S5 | Product proof (only verified facts) | green → light |
| S6 | Get the app (both apps) | light |
| S7 | Footer | light |

### S0. Navigation

- 64px bar, frosted (`backdrop-blur` + 1px inner hairline), logo left,
  links centre (**For you**, **For business**, **Plans**), **Get the app**
  pill right.
- Over the green chapter the bar switches to its dark variant (white text) by
  observing which section is under it.
- Mobile: logo + **Get the app** + menu button (44×44 target). Menu is a full
  sheet with the same three links.

### S1. Hero: the phone that travels

**Job:** say what 4 Our Life is in one look and offer **Get the app**.

**Layout (desktop):** a confident, centred QuincyCF headline and one clear
sentence above a single phone in the middle of the viewport, with consumer
store badges visible without scrolling. The phone shows the real consumer
Home screen.

**Choreography (the EventBeds 1a effect, done fully):**

1. On load: headline lines rise and fade in (stagger 60ms), phone rises 40px
   and fades in, a soft green radial glow blooms behind it.
2. On scroll: the phone is lifted into a fixed "stage" layer and
   **follows the scroll** downward while scaling from 1.0 to 0.9, so it is
   visually *carried* into S2 instead of scrolling away with the hero.
3. During that travel the page background scrubs from `--bg` to
   `--forest-900`, and the hero copy fades out upward.
4. The phone lands exactly in the centre of S2 and becomes S2's middle device.
   Same DOM element the whole way (no swap), so there is no flicker.

**Implementation:** GSAP ScrollTrigger timeline on a wrapper spanning S1+S2,
`pin` on the stage, `scrub: 1`. The phone's `y` and `scale` are tweened inside
the pinned stage. Background colour is tweened on a full-bleed layer behind it.

**Mobile:** same short travel, with native vertical scrolling (no wheel
interception). The phone uses 68–74vw width, the headline sits above it and
store badges stay within easy thumb reach. The static layout remains complete
if the pin cannot run.

**Reduced motion:** no travel, no colour scrub. Hero renders static; S2 renders
its final three-device state.

### S2. For you: three phones from one

**Job:** show the three reasons to download, at a glance.

**Choreography (the EventBeds 1b effect):**

1. The travelling phone lands centre. Two more phones are already *behind* it
   (same position, `scale 0.92`, slightly lower, opacity 0).
2. As scrolling continues, the two rise from underneath (opacity 0 → 1,
   y +40 → 0), then **separate** left and right to a three-up row with a
   slight tilt (`rotateY ±8deg`, perspective 1200px) that settles to 0.
3. Under each phone its title and one line fade up, staggered.
4. Section unpins; normal scroll resumes.

**The three phones (consumer pillars):**

| Position | Pillar | Screen |
| --- | --- | --- |
| Left | **Learn at your pace** (conditions, symptoms, Healthy Living) | Disease Library |
| Centre (the traveller) | **Keep your routine** (reminders, Plasence, fitness) | Home |
| Right | **Find care nearby** (facilities, professionals, ambulance listings) | Map tab |

**Mobile:** the phones land as a *fan* (centre phone forward, two peeking
behind at ±18% x offset), then the section becomes a native horizontal
scroll-snap carousel (one phone per snap, title and line under each, dots
below). No scroll hijack on mobile.

**Reduced motion:** static three-up (desktop) or carousel (mobile).

### S3. One product spotlight, then the supporting tools

**Job:** make the live Plasence experience tangible, then show a small number
of useful supporting tools without turning the page into a catalogue.

- **Plasence (live):** one large real phone screen beside a short headline and
  a three-option switcher: Today, Calendar, Insights. Selecting an option
  swaps the real screenshot with a restrained crossfade. The selector is
  keyboard-operable and works without scroll position. Describe the fertile
  window as an estimate wherever it appears.
- Below, show three compact supporting capabilities with real screen crops:
  reminders, guided fitness and nearby care discovery. Use a horizontal
  editorial rail on wide screens and stacked rows on mobile; do not use five
  equal cards.
- Keep Jobs, Chats and Family Circle discoverable in product navigation or a
  future feature page. They do not need homepage weight unless download
  research shows they are primary conversion drivers.

**Mobile:** switcher tabs remain at least 44px high. Screens stack above the
caption. Supporting capabilities become simple vertical rows with images
lazy-loaded below the first viewport.

### S4. For business: pinned horizontal story

**Job:** each provider type recognises its own workflow quickly, then gets a
working next step. This is the end of the green chapter.

**Layout (desktop):** the section pins. **Left 55%:** QuincyCF headline
(clamped to 64–104px, two lines max), one concise sentence and a role label.
**Right 45%:** one device in a real frame showing the business app.

**Choreography (vertical scroll → horizontal):**

- The *role track* translates by one measured panel width per step. Avoid
  hard-coded `400vw`; calculate the travel from the rendered track and
  available viewport, then refresh after fonts and screenshots decode.
- The *phone stays put*; its screen crossfades to the matching business
  screenshot at the midpoint of each panel (with a 6px blur-to-sharp), and the
  phone does a small 4deg tilt-and-return on each change so the swap feels
  physical.
- A progress rail at the bottom: five labelled buttons with current-step
  state. Activating one scrolls to that step; arrow keys move between steps.
  Keep all panels in logical DOM order and reachable when JavaScript is off.
- After panel 5 the section unpins into a band with a working
  **Register your interest** action. Show app badges and QR codes only after
  both business listings are live.

**The five panels:**

| # | Role | Big text | Phone screen (business app) |
| --- | --- | --- | --- |
| 1 | Facilities | Keep bed counts up to date. | `(facility)/beds` |
| 2 | Practitioners | Make your services bookable. | `(practitioner)/schedule` |
| 3 | Trainers | Plan sessions. Follow progress. | `(trainer)/clients` |
| 4 | Pharmacies and vendors | Manage requests and orders. | `(vendor)/requests` |
| 5 | Ambulance teams | Coordinate bed requests. | `(ambulance)/dispatch` |

**Fallback:** enable the pinned horizontal sequence only above 1100 CSS px,
with a viewport height of at least 700 CSS px and a fine pointer. On tablets,
short screens, 200% zoom, touch-first devices or reduced-motion preferences,
render five ordinary vertical role panels. Do not keep a tall sticky phone
over the text; each panel contains its own device crop and caption.

**Reduced motion:** five static rows (text + phone), vertical.

### S5. What the product can prove today

**Job:** reinforce confidence through visible, verifiable product facts.

Use the light canvas as a quiet transition out of the green chapter. Build a
short, two-column editorial panel from product facts that can be verified at
launch: which directory filters a member can use, which services have
appointments enabled, and where Plasence is available. Every statement must
link to a live screen or an owner-approved source.

Do not publish “data is never sold,” “anonymous totals,” “verified
professionals,” real-time bed counts or emergency-response claims until the
responsible teams approve exact wording and evidence. If no proof is approved,
remove this section and move straight to the download CTA. Use no invented
ratings, testimonials, partner logos or statistics.

### S6. Get the app

**Job:** the final, unmissable download moment, for both audiences.

- Main block: consumer phone on a CSS-built soft stage, headline above, **Get
  the app** with Google Play first in visual order and the App Store equally
  visible.
- Desktop: the two consumer QR codes from `public/qr/` (labelled, 120px).
  Mobile: badges only; scanning your own screen is pointless.
- Secondary line beneath: “Run a facility, practice, fitness programme or
  pharmacy?” with business badges marked **Coming soon** and **Register your
  interest** until both listings and the role-appropriate sign-up flow are
  live.

### S7. Footer

Logo, three link columns (Product, Business, Company), legal links (Privacy
policy, Terms of service), small store badges for both apps, © line. Light
background.

---

## 6. Motion system

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` (`expo.out`) | Entrances |
| `--ease-in-out` | `power3.inOut` | Scrubbed travel |
| Durations | 180ms (UI), 450ms (reveal), scrub for scroll | |
| Scrub | `scrub: 1` | All pinned timelines |
| Scroll input | Browser-native vertical scroll, mapped by ScrollTrigger | Avoid replacing wheel, trackpad, keyboard or touch behavior |

Rules:

- Pinned sections: **S1→S2 handoff** and **S4 business on qualifying desktop
  viewports** only. Plasence uses a direct screen selector, not a pinned
  scroll timeline. Mobile receives no scroll hijack.
- Animate only `transform`, `opacity` and the background-colour layer.
- Every ScrollTrigger lives in `useGSAP(..., { scope })` with cleanup.
- `ScrollTrigger.refresh()` after fonts and hero images decode.
- `gsap.matchMedia()` branches: reduced motion, touch-first input, short
  viewport, and width breakpoints. Reduced motion renders the full final
  content in normal document flow; no state is only reachable by animation.
- Each animation has a one-sentence reason in a code comment.

Libraries: **GSAP + ScrollTrigger + @gsap/react** for actual pin/scrub scenes
(add). Keep native browser scrolling; do not add Lenis for the first release.
Use the existing motion library only for small hover/press feedback, never on
the same element as a GSAP timeline.

---

## 7. Copy deck

House rules: sentence case, no exclamation marks, no em-dashes, max 8 words
per headline, max 25 words per supporting line.

| Section | Headline | Supporting line |
| --- | --- | --- |
| S1 Hero | Everyday health. Care closer to home. | Explore health information, keep routines in view and find nearby services with 4 Our Life. |
| S2 left | Learn at your pace. | Explore information on conditions, symptoms and healthy living. |
| S2 centre | Keep your routine. | Set reminders, track cycle patterns with Plasence and follow fitness plans. |
| S2 right | Find care nearby. | Browse nearby facilities, professionals and ambulance services; see specialties and NHIS acceptance where listed. |
| S3 Plasence | Know your cycle patterns. | Log cycle details and review estimates across Today, Calendar and Insights. |
| S3 Reminders | Keep important moments in view. | Set reminders for medication, workouts and appointments. |
| S3 Fitness | Find a routine that fits. | Explore guided fitness and trainer sessions where available. |
| S3 Directory | Find the service you need. | See nearby facilities and specialties; NHIS acceptance appears where listed. |
| S4 intro | A clearer workspace for care teams. | |
| S4 facilities | Keep bed counts up to date. | Update ward availability and respond to incoming bed requests. |
| S4 practitioners | Make your services bookable. | Publish services, set availability and manage appointment requests. |
| S4 trainers | Plan sessions. Follow progress. | Create programmes, schedule sessions and manage clients. |
| S4 vendors | Manage requests and orders. | List health products and respond to requests from members. |
| S4 ambulance | Coordinate bed requests. | Send requests to nearby facilities and follow their responses. |
| S4 band | Make your service easier to find. | **Register your interest** while the business app is preparing for launch. |
| S5 Product proof | See what you can do today. | Use only feature and availability facts verified against the live app. |
| S6 Download | Find your next step in health. | Get 4 Our Life on Google Play or the App Store. |

Before launch, every line is checked against the real app and its feature
flags. Qualify variable inventory, listings and appointment availability with
“where listed,” “where available” or “after provider confirmation.” Describe
pharmacy requests as requests and replies, never as guaranteed live stock.
The consumer app's ambulance directory is a way to find providers; it does
not dispatch an ambulance. A national emergency call CTA is separate from
the app and must say that it calls Ghana's emergency line 112.

Accessibility copy:

- Phone images: use alt text only when it adds information beyond adjacent
  copy; describe the screen's purpose without exposing dates, names, symptoms,
  messages or health records. Otherwise use `alt=""`.
- Decorative 3D objects: `alt=""` and `aria-hidden`.
- QR codes: "QR code: scan to open 4 Our Life on Google Play".
- Pinned sections: content is in logical DOM order and readable without
  JavaScript; screen readers never depend on scroll position. Focus must not
  move automatically when a panel changes.

---

## 8. Images to generate (prompts)

Generate only assets that real app screens cannot provide. **Never generate
app UI, text, numbers, maps, medical records, logos or devices**: every phone
screen is a simulator capture (section 9), and the stage lighting is CSS.
This keeps the page lighter and makes the phone sequence feel like the
product, not advertising art. Generate photos at 2x their rendered size and
export responsive AVIF/WebP crops.

### 8.1 Lifestyle photography

Shared photo direction: editorial documentary photography, natural Ghanaian
settings and people, understated forest-green clothing accents, true-to-life
skin tones, natural soft daylight, calm and capable mood, uncluttered frame,
no text, logos, medical props, watermarks or visible phone screens. Keep a
clear crop zone for responsive layouts; avoid crisis or poverty imagery.

| ID | Use | Aspect | Prompt |
| --- | --- | --- | --- |
| P1 | Guided fitness supporting row | 4:5 | Editorial photograph of a Ghanaian woman in her early thirties finishing a relaxed morning stretch on a shaded path in Accra, candid posture, modest contemporary athletic clothing in muted green and charcoal, leafy urban background softly out of focus, subject placed on the right third with quiet negative space on the left, no gym branding. |
| P2 | Health information supporting row | 4:5 | Editorial photograph of a Ghanaian man in his late twenties at home in Kumasi, calmly reviewing a small printed wellness guide at a bright window, everyday lived-in setting, gentle expression, close framing from the waist up, open negative space to one side, no visible words or medical paperwork. |
| P3 | Optional pharmacy response proof | 3:2 | Editorial photograph of a Ghanaian pharmacist at a neighbourhood pharmacy counter in Accra, listening attentively to a customer outside the frame, clean organised shelves in soft focus, natural daylight, honest everyday service, subject on the right third, no medicine labels readable. Use only if the live medication-request flow is enabled. |

Do not generate a family, nurse or trust image just to fill a slot. Use those
screens only if the page has an approved product story that needs them.

### 8.2 Single 3D accent

Generate one transparent PNG/WebP, square 1:1 at 1600px. Use it as a small
depth cue behind the hero device; create perceived motion with CSS perspective
and scroll transforms rather than WebGL.

**Prompt:** “Premium studio 3D render of one abstract connected form made from
two softly rounded translucent resin loops passing through each other, one
deep forest green and one pale mint, subtle frosted glass edges, gentle
subsurface scattering, soft contact shadow, three-quarter view, isolated on
transparent background, ample clear silhouette, Apple product-launch
craftsmanship, elegant and quiet, no medical cross, no anatomical shape, no
text, no logo, no watermark.”

If the asset does not clearly improve the real phone composition, remove it;
the device handoff itself is the hero visual.

### 8.3 Social / meta

| ID | Use | Size | Notes |
| --- | --- | --- | --- |
| M1 | Open Graph image | 1200×630 | Composite, not generated: forest-green CSS-like gradient + the S2 three-phone render + logo, composed from real assets. |

---

## 9. Screenshots to capture (simulator shot list)

The business section needs real mockups. Capture the business app in the iOS
Simulator so each business panel shows its real workflow. Use real consumer
screens for the hero and consumer story. Do not use generated or hand-built
fake UI.

### Setup

- Device: **iPhone 16 Pro** simulator (1206×2622 px), light mode, default
  text size.
- Clean status bar before capturing:
  `xcrun simctl status_bar booted override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3`
- Capture: `xcrun simctl io booted screenshot <name>.png`
- **Demo accounts only, with fictional but realistic Ghanaian data.** Never
  capture real member, patient, provider or client data. Prepare a seeded
  "Demo Member" and one demo account per business role; remove names, phone
  numbers, chat content, precise personal locations and identifying dates.
- Enable only features approved and live for the planned launch. Do not turn
  on every flag or advertise a gated feature just to make a screenshot.
- Check screenshots against the current production UI before each release;
  simulator state and sample availability must not imply public real-time
  facility capacity.

### Consumer app

| ID | Screen | State to set up | Used in |
| --- | --- | --- | --- |
| C1 | Home | Demo greeting and one non-identifying reminder | S1, S2 centre, S6 |
| C2 | Disease Library | Root view with letters and categories | S2 left |
| C3 | Map tab | Accra area, several facility pins, one card open | S2 right |
| C4 | Plasence Today | Seeded demo data; estimate state labelled accurately | S3 selector: Today |
| C5 | Plasence Calendar | Seeded dates, no real person's cycle data | S3 selector: Calendar |
| C6 | Plasence Insights | Supplied capture at `public/home/consumer/plasence-insights-v1.png`; verify seeded demo data and crop out gated Her Health Circle teaser before public use | S3 selector: Insights |
| C7 | Reminders | Medication and workout examples; appointments only if enabled | Supporting tools |
| C8 | Find medication | A demo request and replies, only if this feature is live | Optional pharmacy story |
| C9 | Fitness plan day | Today's exercise screen | Supporting tools |
| C10 | Jobs | Skip for homepage unless the feature is a launch priority | Future feature page |
| C11 | Chats | Skip for homepage unless the feature is a launch priority | Future feature page |
| C12 | Family circle | Skip for homepage unless the feature is a launch priority | Future feature page |
| C13–C15 | iOS notification banners | Capture only if legible and non-identifying; otherwise omit | Optional supporting detail |

### Business app (`com.4thpayapps.4ourlife.business`)

| ID | Role | Screen | State |
| --- | --- | --- | --- |
| B1 | Facility | Beds | Seeded ward counts and a sample incoming bed request |
| B2 | Practitioner | Schedule | Seeded appointment requests and the provider's availability |
| B3 | Trainer | Clients/programmes | A seeded client programme and session management controls |
| B4 | Vendor | Requests/orders | A seeded product request and its response/order status |
| B5 | Ambulance | Dispatch | A seeded bed request with facility responses |
| B6 | Facility | Bookings | Optional facility booking screen if it is clearer than B1 |

### Device frames

- Use a clean, licensed device frame or a CSS frame sized to the screenshot;
  verify any Apple marketing asset usage against Apple's current terms.
- Keep the device frame and screenshot in separate layers. Export optimized
  AVIF/WebP at responsive sizes so the screen can crossfade without rebuilding
  the device.
- Device depth comes from perspective and transform on real screenshots. No
  WebGL is needed for this story.

---

## 10. Technical plan

- **Framework:** existing Next.js 16 app router. New homepage built in
  `components/home/*`, one component per section; `app/page.tsx` composes
  them. Keep the old `LandingExperience` until the new page passes review,
  then delete it.
- **Fonts:** existing `next/font/local` setup for QuincyCF and OpenSans in
  `app/layout.tsx`; subset to Latin, preload QuincyCF Medium and OpenSans
  Regular only.
- **Dependencies to add:** `gsap`, `@gsap/react`. Nothing else.
- **Images:** `next/image` for photos; plain `<img>`/`<picture>` for SVG QR
  codes; AVIF first with WebP fallback; explicit width and height everywhere.
- **Budgets (mid-range Android on 4G in Accra):**
  - LCP < 2.5 s (hero phone render preloaded, ≤ 120 KB AVIF)
  - CLS < 0.05, INP < 200 ms
  - Initial JS ≤ 160 KB gzip
  - Total page weight on mobile ≤ 2.5 MB
  - Honour `navigator.connection.saveData`: serve the smallest image sizes
    and omit decorative motion; keep every screen and caption available.
- **Accessibility:** WCAG 2.2 AA; visible focus ring in `--brand`; all
  interactive targets ≥ 44px; skip link; `prefers-reduced-motion` static
  fallbacks for every choreographed section.
- **SEO:** keep `robots.ts` and `sitemap.ts`; one `h1`; semantic sections;
  add `MobileApplication` structured data only for verified live store
  listings, with exact app IDs and destinations.

### 10.1 Business store links (when both listings are live)

- When the business listings go live, add `BUSINESS_APP_STORE_URL` and
  `BUSINESS_PLAY_STORE_URL` to `lib/store-links.ts`. From the business app's
  `app.config.ts`: Android package `com.fourourlifeapppay.fourourlifeapp.business`
  (Play URL `https://play.google.com/store/apps/details?id=com.fourourlifeapppay.fourourlifeapp.business`),
  iOS bundle `com.4thpayapps.4ourlife.business`. The Apple app ID (the number
  in the App Store URL) exists only once the listing is created.
- Regenerate QR codes with `scripts/generate-store-qr.js` into
  `public/qr/business-app-store.svg` and `public/qr/business-google-play.svg`.
  Never hand-draw them.
- Until the listings are live, the badges render as “Coming soon” and the
  adjacent CTA routes to **Register your interest**. Swap to live store URLs
  only after approval and link verification.

---

## 11. Still open

1. **Approved trust evidence (S5):** if operations or counsel can verify a
   specific claim, provide its source and exact approved wording; otherwise
   omit S5 and let product screens carry trust.
2. **Business sign-up coverage:** confirm the registration route supports all
   five business roles; add role-specific destinations if it does not.
3. **Business Apple app ID:** add it only after the live listing exists (see
   section 10.1).

---

## 12. Delivery phases

| Phase | Output | Done when |
| --- | --- | --- |
| 1. Assets | Approved consumer screenshots, B1–B5 business captures, P1–P3 photos, optional O1 3D accent | Assets in `public/home/` are real, approved, optimized and reviewed |
| 2. Static page | All sections with final copy, no motion, mobile first | Passes WCAG AA; Lighthouse mobile performance ≥ 90 |
| 3. Choreography | S1→S2 travel, S2 fan-out, S3 selectable Plasence screens, S4 desktop horizontal pin | Smooth at 60 fps on target devices; reduced-motion and small-screen fallbacks verified |
| 4. Business stores | Live business links and QR codes | Both business listings live; links and QR verified by scanning |
| 5. QA and launch | Cross-device pass at 375, 768, 1024, 1440; copy checked against the apps | Owner sign-off; old `LandingExperience` removed |

---

## 13. References

- [EventBeds](https://www.eventbeds.com/): live reference for the mobile
  device handoff and benefit-labelled screen reveal; inspected by scrolling on
  the mobile viewport.
- [Supahero](https://supahero.io/): hero-section library now linked to
  Screensdesign; use for hero composition, not as a motion implementation
  source.
- [Land-book](https://land-book.com/): visual search for health, 3D,
  animation and mobile-app examples; inspect each live site before borrowing
  interaction.
- [Nicelydone Carbon Health examples](https://nicelydone.club/examples/apps/carbon-health/marketing):
  reference for clinic discovery and appointment entry points.
- [Awwwards](https://www.awwwards.com/): explore award-winning app and
  wellness sites for layout and motion references.
- [Codegrid on YouTube](https://www.youtube.com/@codegrid): GSAP landing-page
  reveal and fullscreen carousel tutorials for implementation patterns; adapt
  them to the real app screens.
- [Apple Human Interface Guidelines: Scroll Views](https://developer.apple.com/design/human-interface-guidelines/scroll-views):
  preserve familiar scroll behavior and clear scroll regions.
- Apple Design Resources (device bezels):
  https://developer.apple.com/design/resources/; verify current terms before
  marketing use.
- Skills installed globally: `ui-ux-pro-max` at
  `~/.codex/skills/ui-ux-pro-max` and `design-taste-frontend` at
  `~/.agents/skills/design-taste-frontend` (also linked into Claude Code).
  Treat Taste's v2 as experimental guidance. Apply their accessibility,
  responsive and motion checks where they fit; retain the brand palette, real
  screenshots, low page weight and native-scroll fallbacks over generic
  generated styles.
