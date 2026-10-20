# Landing page implementation plan

Status: asset intake complete; implementation has not started. This plan turns the approved fresh redesign brief into a build sequence for the current Next.js repository.

## Design read

Premium, mobile-first health product landing page for consumers and care providers in Ghana. Use the existing QuincyCF/Open Sans fonts and forest-green identity, with restrained Apple-style device storytelling and a few Awwwards-inspired scroll moments. Motion supports the product story; visitors can reach every section and CTA with ordinary scrolling.

## Product and content guardrails

- Consumer discovery leads; provider workflows are the second chapter.
- Only show real app captures inside the web page's device frames. Remove the hand-built sample UI from `components/landing/DeviceMockups.tsx` as marketing evidence.
- Consumer ambulance content is a directory. It does not dispatch an ambulance. Facility bed counts and bed-request coordination are provider workflows; do not imply public live bed availability.
- Keep appointments conditional on the consumer booking flow being enabled and working end to end. Do not advertise in-app telehealth or Her Health Circle while those features are gated.
- Cycle estimates are estimates, not diagnoses. Use fictional demo data and remove identifying names, dates and precise locations from captures.
- Business store badges stay marked as coming soon until both listings are live. Use the existing register-interest path meanwhile.

## Asset intake

- [x] Add the supplied Plasence Insights capture to `public/home/consumer/plasence-insights-v1.png` (1284 × 2778, RGB PNG).
- [x] Keep a source copy at `/Users/anwarsadat/Downloads/4-Our-Life-Minimal/source/screens/plasence-insights.png`.
- [ ] Stage reviewed Home, Disease Library, Fitness, Plasence Today, Calendar, Map and Reminders source captures from `/Users/anwarsadat/Downloads/4-Our-Life-Minimal/source/screens/` into `public/home/consumer/` with stable descriptive names.
- [ ] Stage the five business captures from `/Users/anwarsadat/Downloads/4OLBusiness/` into `public/home/business/`; inspect names, dates and sample data before using them.
- [ ] Replace Home with a clean demo greeting; replace Map with an Accra demo view and one facility card open. Refresh Plasence Today/Calendar dates if the currently supplied dates are not clearly seeded.
- [ ] Crop the supplied Insights image to the actual app viewport for the phone screen. The capture includes a Her Health Circle “coming soon” teaser; keep that teaser out of public product claims until the feature is approved. Verify all cycle metrics and insight copy are fictional demo content before launch.
- [ ] Prepare the planned P1/P2 editorial photos only if they improve the static layout; omit P3 unless the medication-request feature is enabled. Use no generated app UI.

## Build sequence

### Phase 1 — Static page structure and real product screens

1. Create `components/home/` and build the new homepage as small section components: navigation, hero, consumer pillars, Plasence spotlight, business story, product proof/download, footer.
2. Update `app/page.tsx` to compose the new experience while leaving `components/landing/LandingExperience.tsx` available for comparison until review.
3. Add a shared device frame that receives a real screenshot image and accessible alt text. Use `next/image` with explicit dimensions; device chrome is CSS, never fake app UI.
4. Establish the section layout and final copy in normal document flow first. Keep the page useful with JavaScript and motion disabled.

**Review point:** content hierarchy, screenshots, device scale, mobile layout and CTAs are approved before scroll choreography begins.

### Phase 2 — Hero-to-consumer handoff

1. Build the light hero around one real consumer Home screen; include a clear “Get the app” CTA and verified store badges.
2. Add a scroll-linked stage where the hero device travels into the forest-green consumer chapter and becomes the middle device.
3. Reveal the Disease Library and Map devices from behind it; settle into three benefit-led positions on desktop.
4. On mobile, preserve native vertical scroll and use a touch-friendly horizontal snap rail for the three benefits.
5. Respect `prefers-reduced-motion`, short viewports, touch input and zoom by rendering the final static layout without a pin.

### Phase 3 — Plasence spotlight and supporting capabilities

1. Build a keyboard-operable Today / Calendar / Insights selector with a 44px minimum target and restrained crossfade.
2. Use the supplied Insights capture as the third state, with a viewport crop that keeps gated content out of view.
3. Add reminders, fitness and nearby-care support as a compact editorial rail on desktop and simple rows on mobile.
4. State cycle predictions as estimates and avoid diagnostic language.

### Phase 4 — Business story

1. Build the five provider panels: facilities, practitioners, trainers, pharmacies/vendors and ambulance teams.
2. On capable desktop viewports, use a sticky stage and scroll progress to translate panels horizontally while the device stays fixed and its real screenshot crossfades between roles.
3. Provide visible step controls that work with keyboard input and expose the current role.
4. On mobile, tablets, short screens, zoomed layouts and reduced motion, render five ordinary vertical panels with a screenshot beside each role.
5. Keep the business conversion on the verified register-interest route until store listings and role coverage are confirmed.

### Phase 5 — Proof, conversion and responsive polish

1. Include only product facts verified against the mobile apps and live feature flags; omit the proof section if no claims have approved evidence.
2. Complete download and business-interest CTAs, privacy/legal links, metadata and structured data only for verified live listings.
3. Optimize responsive image variants and prioritize the hero screen. Keep all copy and screenshots available when `saveData` is enabled.

### Phase 6 — Review and release readiness

- Inspect at 375, 768, 1024 and 1440 CSS pixels, plus a short viewport and 200% zoom.
- Review keyboard navigation, focus visibility, alt text, reduced-motion mode, mobile scroll behavior and 44px interactive targets.
- Confirm screenshots contain demo data only and every claim matches enabled app features.
- Review image weight, initial JavaScript and scroll smoothness on a mid-range phone/network profile.
- Remove the old homepage implementation only after the new page passes visual, content and accessibility review.

## Repository-specific decisions

- Existing baseline: Next.js 16 App Router, TypeScript, CSS Modules, local QuincyCF/Open Sans fonts, `framer-motion`, and Lenis are already present.
- Start with the installed `framer-motion` scroll values and CSS sticky positioning; do not add GSAP before a prototype demonstrates a capability gap. Keep the document's natural scroll position and avoid wheel interception.
- Current homepage is a large client component (`components/landing/LandingExperience.tsx`, about 1,874 lines) with a 6,565-line CSS module. Rebuild in `components/home/` rather than incrementally layering the redesign into that monolith.
- `components/landing/DeviceMockups.tsx` draws sample screen content in React. Replace those representations with imported real screenshots in the new page; preserve only reusable neutral device-frame styling if it remains useful.
- `app/layout.tsx` already loads the brand fonts, and `app/page.tsx` already owns homepage metadata. Keep both unless implementation review finds a concrete gap.

## First implementation task

Build Phase 1 only: create the new section/component skeleton, move approved real screenshots into the homepage asset tree, and render the complete page without animation. Review the static result before adding the scroll-linked sequences.
