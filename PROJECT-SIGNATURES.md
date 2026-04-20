# Project Signatures & Landing-Page Playbook

Everything that makes a VigorXPro / TrustedNutraProducts landing page feel "ours."
Drop this file into any sibling project and an agent can apply the same patterns.

---

## 1. Required Reading

Before touching any landing page, read these two docs in order:

1. **`PAGE-OPTIMIZATION-PLAYBOOK.md`** — the 6-phase workflow (ours caps at 5; see §3).
2. **`VSL-MEDIA-PLAYER-GUIDE.md`** — the canonical custom HLS.js VSL player spec for VSL pages.

Don't work from memory. Re-read the files at the start of each task.

---

## 2. Execution Rules

**How we work together:**

| Rule | What it means |
|---|---|
| Answer questions, don't act on them | "This should be X, right?" is a question, not a command. Reply, don't edit. Only edit when the user gives an explicit imperative. |
| Execute after approval | Once a plan is approved, run every step back-to-back. No "shall I continue?" or "yes/no" prompts mid-task. Do not surface interactive shell prompts. |
| Cap plans at 5 phases | Always. Fold PageSpeed baseline into Phase 1 and commits into the final phase. |
| Show next phase after each phase | Every phase-complete report ends with a `Next — Phase N` preview describing the upcoming step. |
| PageSpeed baseline is mandatory | Desktop + mobile via PageSpeed Insights API **before** Phase 1. Save raw JSON to `%TEMP%/<slug>_{desktop,mobile}.json`. |
| Open via `file://`, not `localhost` | When opening a local page for review, use `start "" "<absolute path>"` on Windows. |
| Don't auto-reopen pages | After the first open in a session, ask the user to refresh. |
| Never commit API tokens | Python helper scripts that hold tokens stay local; never `git add` them. |
| Only create commits when asked | Work locally; commit when the user says "commit". |

---

## 3. 5-Phase Page Optimization (our adaptation of the playbook)

| Phase | What | Notes |
|---|---|---|
| 1 | Baseline + dead-code cleanup | Run PageSpeed first. Remove Lucky Orange block, slidereveal.js, junk `.html` stylesheets (5 common ones), Material Icons if unused, duplicate font imports. Move `<meta charset>` to first child of `<head>`. Add preconnect for CF Stream, Google Fonts, jsDelivr. Strip every `loading="lazy"` (see §4). |
| 2 | Video migration to Cloudflare Stream | Check `cf-video-mapping.json` **first** before uploading. Swap `<video>` blocks to the poster + `cfPlay()` pattern (§6). For full VSL pages, adopt the VSL-MEDIA-PLAYER-GUIDE block (§7). |
| 3 | CLS fix + SEO + JSON-LD | Add `width`/`height` to every `<img>` + baseline `img { height: auto }`. Fill meta description/author, add canonical (absolute URL), og:/twitter:, and JSON-LD Product schema with AggregateOffer. Keep `robots: noindex` on conversion pages. |
| 4 | Image compression + WebP + cache-bust | Quality 85 re-encode, skip <100 KB, **never resize/crop**. Convert PNG >300 KB to WebP (§5). Append `?v=YYYYMMDD` to local image URLs. Update ALL HTML files repo-wide that reference a converted PNG. |
| 5 | Signature pack + final PageSpeed + commit | Add the skeleton + top progress bar (§4). Hero video preload hints. Re-run PageSpeed, compare, one commit per phase or one batched commit. |

---

## 4. Signature Patterns (non-negotiables)

### 4.1 Skeleton loader + top progress bar — on EVERY new landing page

Inject right after `<body>`:

- **Top 3 px gold/shimmer progress bar**: 0 → 15 % → 60 % on DOMContentLoaded → 100 % on `window.load`.
- **Full-viewport shimmer skeleton overlay**: logo / h1 / h2 / hero / 3-card row placeholders. Fades out on `window.load` with an 8 s safety fallback.

This is a deliberate trade-off: it costs a few Lighthouse LCP points because Lighthouse treats the hero skeleton block as the largest paint, but it gives a much better perceived UX. Keep it.

### 4.2 No `loading="lazy"` — anywhere

Everything loads eagerly under the skeleton. Never emit `loading="lazy"` on any `<img>` or `<iframe>`. The skeleton gives the browser cover to download every asset in parallel; by the time the user scrolls past the hero the whole page is already cached.

When editing a page, also strip pre-existing `loading="lazy"` occurrences.

### 4.3 Hero readiness during loader

By the time the skeleton fades, the hero area must be interactable:

- First video's Cloudflare Stream poster thumbnail: `loading="eager"` + `fetchpriority="high"`
- Plus `<link rel="preload" as="image" fetchpriority="high" href=".../thumbnails/thumbnail.jpg?time=5s">`
- Plus `<link rel="preload" as="fetch" crossorigin href=".../manifest/video.m3u8">` (preloads HLS manifest)

### 4.4 Small center play/pause icon on every `cfPlay` clip

Every inline video clip that uses the `cfPlay()` pattern shows a small centered play icon when paused.

- 48 px SVG on desktop, 40 px on mobile
- `.mv-bigplay` overlay visible when the `.mv-player` wrapper has `.mv-paused` class
- Listens for video `play` / `pause` to toggle the class
- Tap anywhere on the video (via `.mv-tap` transparent overlay) OR on the `.mv-bigplay` icon toggles play/pause

### 4.5 Mobile tap-to-toggle — `.mv-tap` transparent overlay

Native `<video controls>` on iOS/Android swallows clicks on the video area, so tap-anywhere-to-pause doesn't work by default. Fix: absolute transparent overlay above the video but below the native control bar:

```css
.mv-tap { position:absolute; top:0; left:0; right:0; bottom:48px; z-index:2; cursor:pointer; background:transparent; }
@media (max-width:768px) { .mv-tap { bottom:40px; } }
```

Click handler on `.mv-tap` toggles `video.paused ? video.play() : video.pause()`. Native controls at the bottom still work.

### 4.6 A11y on custom video overlays

The two transparent overlays (`.mv-tap`, `.mv-bigplay`) need:

```html
role="button" tabindex="0" aria-label="Play or pause video"
```

Keyboard users can toggle; screen readers announce properly.

### 4.7 hls.js loading

Every page using hls.js (either `cfPlay` or the full VSL player) loads the library with:

```html
<link rel="modulepreload" href="https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js">
<script async src="https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js"></script>
```

Saves ~40 ms TBT on mobile vs. a `defer` or blocking script.

### 4.8 "Key Ingredient" stack layout

When the "Key Ingredient Behind the Formula" section pairs the `intimacy-desire/a9.png` portrait image with the HGW ingredient video, **stack** them (image on top, video below) — never side-by-side. The image is portrait-tall and a 50/50 split creates a huge vertical mismatch.

Use `row > col-12 col-md-8 mx-auto` rows for both.

### 4.9 Image format preference

Always WebP, never JPEG, when re-encoding PNGs. WebP preserves alpha and compresses better. Save as `.webp` at quality 85, method 4. Update every `src` / `href` reference across every HTML file in the repo.

### 4.10 "Ready to Order?" top-right CTA on VSL pages

VSL pages (ones using the custom HLS player) have a small pulsing pill in the top-right corner of the main VSL. It:

- Starts hidden (`opacity:0; transform:translateY(-10px)`)
- Fades + slides in on the first `vslVideo.play` event (add `show-cta` class to wrapper)
- Gold/amber gradient with a pulsing box-shadow animation
- Click reveals `#magicalSections` (unhides the timer-gated content) and smooth-scrolls to `#buynow`

Never remove this button — it's part of the VSL engine. If you restore/overwrite the player, re-inject the CTA.

---

## 5. 9-Video Placement Pattern

Every "video-heavy" landing page (short/go, edvsl, erectvsl, dtc) should have the same 9-video narrative, in the same order. For a new page, reuse the UIDs already in `v2/cf-video-mapping.json`.

| # | Video slug | Placement | Signature `startTime=3` |
|---|---|---|---|
| 1 | `problem-hook` (C01) | Hero — single centered | ✓ |
| 2 | `ed-hook` (video 9) | Pair — image + video side-by-side |  |
| 3 | `energy-transform` (video 3) | Pair — video + image |  |
| 4 | `ingredients` (video 4) | Pair — video + image | ✓ |
| 5 | `testimonial-setup` (video 12) | Pair — image + video |  |
| 6 | `ingredient-hgw` (C21) | **Stacked** (see §4.8) | ✓ |
| 7 | `urgency` (video 15) | Pair — image + video |  |
| 8 | `product-container` (video 17) | Pair — image + video |  |
| 9 | `transformation-story` (P10) | 3-up: image + video + image | ✓ |

The four "signature" videos get `data-cf-starttime="3"` — the first 3 seconds of those clips are a static brand intro that we skip.

---

## 6. `cfPlay()` — poster-to-video swap pattern

For every inline mv-player clip. The wrapper shows a Cloudflare Stream poster thumbnail; on click the poster is replaced with a native `<video>` + hls.js.

See live code in `v2/short/go/index.html` or `v2/dtc/index.html`. The function:

- Reads `data-cf-uid` + `data-cf-starttime` from the wrapper
- Injects `<video controls autoplay playsinline>` + `.mv-tap` overlay + `.mv-bigplay` overlay
- Wires tap/click to toggle play/pause
- Attaches hls.js if available, else falls back to native (Safari/iOS)

### Supporting CSS (inject once per page)

```css
.mv-player { position:relative; overflow:hidden; aspect-ratio:16/9; background:#111; border-radius:12px; }
.mv-player .mv-poster { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; background:#111; cursor:pointer; }
.mv-player video, .mv-player iframe { position:absolute; inset:0; width:100%; height:100%; border:none; }
.mv-tap { position:absolute; top:0; left:0; right:0; bottom:48px; z-index:2; cursor:pointer; background:transparent; }
@media (max-width:768px) { .mv-tap { bottom:40px; } }
.mv-bigplay { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:3; opacity:0; pointer-events:none; transition:opacity .2s ease; }
.mv-player.mv-paused .mv-bigplay { opacity:1; pointer-events:auto; cursor:pointer; }
.mv-bigplay svg { width:48px; height:48px; fill:rgba(255,255,255,0.92); filter:drop-shadow(0 3px 10px rgba(0,0,0,0.55)); }
@media (max-width:768px) { .mv-bigplay svg { width:40px; height:40px; } }
```

---

## 7. Full VSL Player

For pages where the hero is a 30+ min VSL (edvsl, erectvsl, prostatevsl), use the canonical custom HLS.js player from `VSL-MEDIA-PLAYER-GUIDE.md`. Key features you must preserve when porting:

- Looping silent HD-locked thumbnail behind a pulsing blue "Your Video is Playing — Click to Unmute" overlay
- Skeleton shimmer covering the player until the first thumbnail frame renders
- Custom controls bar (volume slider, quality menu, fullscreen)
- **Mobile controls always visible**: `@media (hover:none),(pointer:coarse) { #cf-vsl.active #cf-vsl-controls { opacity:1 !important; pointer-events:auto !important; } }`
- **Pseudo-fullscreen on mobile**: CSS takeover with `.pseudo-fullscreen` class (position:fixed inset:0). In portrait, rotate 90° for landscape view. **Never call `webkitEnterFullscreen()`** on mobile — iOS native player breaks the VSL flow with scrubber / skip-10s / close-X.
- Attempt `screen.orientation.lock('landscape')` on mobile fullscreen (best-effort, iOS Safari rejects it — that's fine, the CSS rotate is the real fix).
- Big center play icon when paused (§4.4)
- "Loading video..." hint with 3 s fallback if the main VSL isn't buffered by the time the user clicks the thumbnail
- "Ready to Order?" top-right CTA (§4.10)

---

## 8. Cloudflare Stream Usage

### Account

- **Account ID**: `7a6e1fad95b03d6e23f9b3542f818c5e`
- **Customer subdomain**: `customer-8ocoyclfhfvlpft9`
- **API token**: create a fresh `Stream:Edit` token per project. **Rotate after the migration.** Never commit tokens.

### Mapping file

Each project has `cf-video-mapping.json` in the repo root at the version path (e.g., `v2/cf-video-mapping.json`) mapping source path → UID. Always check it first before uploading.

### Video title convention

When uploading, set `meta.name` to `<project>-<slug>` (e.g., `vigorxpro-C01-problem-hook`). Makes the Cloudflare dashboard searchable per project.

### Upload sizes

- <200 MB → basic multipart POST
- ≥200 MB → TUS resumable upload with 8 MB chunks and HEAD-resume on 409 offset mismatches

---

## 9. PageSpeed API

Both keys are public-safe project keys:

- `AIzaSyBqxfoff3pZnXDIrLaOyp6Fyjjfn0c2pd4`
- `AIzaSyDAwf7NN8_-V2pjTqboZYjcguhJACDpccA`

Request all 4 categories (`performance`, `seo`, `accessibility`, `best-practices`) for both `desktop` and `mobile` strategies. Save the raw JSON.

---

## 10. Media Buyer Deliverable

At the end of a project, generate a beautiful Excel for the media buyer:

- Hero band (brand name + navy/gold)
- 4 offer tiles (Platform, Offer Name, Category, Niche)
- Landing pages table with: `#`, Landing Page Name, URL (clickable `cell.hyperlink`, never `=HYPERLINK()` formula — iOS Excel/WhatsApp preview evaluates formulas as `0`), Landing Page Type, Best Usage
- Disclaimer: "Every user converted via these URLs who reaches Checkout + Thank You is counted as our sale."
- Affiliate tools page link (plain-text cell + `cell.hyperlink`, **not** a formula)
- No freeze panes (the whole page should scroll together)
- Keep emojis (they render fine on iOS) and default Calibri/Arial fonts

Reference implementation: `make_media_buyer_sheet.py` in this repo.

---

## 11. Final Checklist Before Handoff

- [ ] All 5 phases complete on every targeted page
- [ ] PageSpeed desktop + mobile re-run after deploy, before/after comparison noted
- [ ] 4 VSL/TSL/DTC pages use the same 9-video pattern (if applicable)
- [ ] Every cfPlay clip has the small center pause icon + `.mv-tap` overlay
- [ ] No `loading="lazy"` anywhere in the repo (`grep -r 'loading="lazy"' v2/` returns nothing)
- [ ] VSL pages have the "Ready to Order?" CTA
- [ ] All heavy PNGs converted to WebP (with references updated across the repo)
- [ ] Media buyer Excel generated with a disclaimer + affiliate link
- [ ] API tokens NOT committed — double-check `git log -p` for any `cfut_` string
