# PageSpeed & SEO Report — VigorX Pro v2
**Checked:** 2026-04-12  
**Base URL:** https://vigorxpro.trustednutraproduct.com/v2  
**Tool:** Google PageSpeed Insights API v5  
**Constraints:** No image compression · No video compression · No lazy load

---

## Results Table

Scores out of 100. Core Web Vitals: FCP = First Contentful Paint, LCP = Largest Contentful Paint, TBT = Total Blocking Time, CLS = Cumulative Layout Shift, SI = Speed Index.

### Mobile

| Page          | Perf | SEO | BP  | A11Y | FCP   | LCP    | TBT    | CLS   | SI    |
|---------------|------|-----|-----|------|-------|--------|--------|-------|-------|
| ED VSL        | 56   | 42  | 73  | 81   | 8.0s  | 13.0s  | 120ms  | 0.001 | 8.0s  |
| Prostate VSL  | 55   | 42  | 73  | 81   | 8.1s  | 13.5s  | 170ms  | 0.001 | 8.1s  |
| DTC           | 65   | 42  | 96  | 85   | 4.4s  | 6.4s   | 0ms    | 0     | 5.0s  |
| Long3         | 70   | 83  | 100 | 85   | 3.2s  | 6.9s   | 0ms    | 0.01  | 3.2s  |
| Long4         | 62   | 50  | 96  | 88   | 5.0s  | 30.8s  | 0ms    | 0     | 5.3s  |
| Long6         | ERR  | ERR | ERR | ERR  | ERR   | ERR    | ERR    | ERR   | ERR   |
| Long8         | 76   | 83  | 100 | 79   | 3.2s  | 4.5s   | 0ms    | 0     | 4.6s  |
| Long9         | 67   | 85  | 96  | 87   | 3.7s  | 6.3s   | 0ms    | 0     | 5.0s  |
| Short         | 60   | 42  | 100 | 76   | 4.5s  | 22.7s  | 0ms    | 0     | 7.2s  |
| Short2        | 65   | 75  | 100 | 90   | 3.8s  | 8.7s   | 0ms    | 0     | 4.8s  |
| Short3        | 75   | 58  | 100 | 69   | 2.9s  | 4.7s   | 0ms    | 0     | 4.8s  |
| Best          | 58   | 42  | 96  | 89   | 5.1s  | 13.4s  | 0ms    | 0     | 7.9s  |

### Desktop

| Page          | Perf | SEO | BP  | A11Y | FCP   | LCP   | TBT    | CLS   | SI    |
|---------------|------|-----|-----|------|-------|-------|--------|-------|-------|
| ED VSL        | 96   | 42  | 73  | 81   | 0.6s  | 0.8s  | 140ms  | 0.003 | 1.3s  |
| Prostate VSL  | 95   | 42  | 73  | 81   | 0.6s  | 0.8s  | 140ms  | 0.003 | 1.5s  |
| DTC           | 96   | 42  | 96  | 85   | 0.9s  | 1.2s  | 0ms    | 0.043 | 0.9s  |
| Long3         | 93   | 83  | 96  | 85   | 0.7s  | 1.6s  | 0ms    | 0     | 1.1s  |
| Long4         | 85   | 50  | 92  | 88   | 0.9s  | 1.4s  | 0ms    | 0.208 | 0.9s  |
| Long6         | 96   | 83  | 92  | 78   | 0.9s  | 1.1s  | 0ms    | 0     | 1.2s  |
| Long8         | 98   | 83  | 100 | 79   | 0.7s  | 1.0s  | 0ms    | 0.009 | 0.8s  |
| Long9         | 98   | 85  | 96  | 87   | 0.6s  | 1.2s  | 0ms    | 0.012 | 0.6s  |
| Short         | 78   | 42  | 100 | 72   | 1.0s  | 3.7s  | 0ms    | 0.008 | 1.0s  |
| Short2        | 94   | 75  | 100 | 90   | 0.8s  | 1.6s  | 0ms    | 0.005 | 0.8s  |
| Short3        | 98   | 58  | 100 | 69   | 0.7s  | 0.9s  | 0ms    | 0.031 | 1.2s  |
| Best          | 86   | 42  | 96  | 89   | 1.0s  | 2.2s  | 0ms    | 0.01  | 1.6s  |

---

## Diagnosed Issues (Per Audit)

### SEO Failures

| Audit Failure              | Affected Pages                                              |
|----------------------------|-------------------------------------------------------------|
| robots.txt invalid/missing | ALL pages                                                   |
| Page blocked from indexing | ED VSL, Prostate VSL, DTC, Short, Best, Long4               |
| No meta description        | ED VSL, Prostate VSL, DTC, Short, Best                      |
| Images missing alt text    | ED VSL, Prostate VSL, Long3, Short                          |
| Links with no descriptive text | Long4                                                   |

### Performance Failures

| Audit Failure                     | Affected Pages       | Est. Savings         |
|-----------------------------------|----------------------|----------------------|
| Render-blocking requests          | ALL pages            | 2,000–4,000ms        |
| No cache policy on static assets  | ALL pages            | 10–28 MB savings     |
| Unused CSS                        | ALL pages            | 29–129 KB            |
| Unused JavaScript                 | ALL pages            | 9–511 KB             |
| Font display not swap             | ALL pages            | ~10–20ms             |
| Images without explicit dimensions| ALL pages            | Causes CLS           |
| Long6 mobile JS redirect → NO_FCP | Long6                | Full mobile failure  |
| Long4 CLS 0.208 desktop           | Long4                | Layout shift fix     |
| Short LCP 22.7s mobile            | Short                | 9,107 KB image payload|
| Long4 LCP 30.8s mobile            | Long4                | 1,306 KB image payload|

---

## Improvement Plan

### Phase 1 — SEO Fixes (Affects ALL pages, zero performance risk)

**1.1 — Fix robots.txt**
- Create `/v2/robots.txt` at the root with `Allow: /` and `Sitemap:` pointer
- Currently missing entirely, causing robots.txt audit failure on all 12 pages

**1.2 — Remove noindex / unblock crawling**
- Pages failing `is-crawlable`: ED VSL, Prostate VSL, DTC, Short, Best, Long4
- Check each page's `<meta name="robots">` tag and HTTP headers — remove any `noindex` directive
- These 6 pages will never rank or be crawled until this is fixed

**1.3 — Add meta descriptions**
- ED VSL, Prostate VSL, DTC, Short, Best are missing `<meta name="description">`
- Write a unique 150–160 char description per page focused on the page's offer angle

**1.4 — Add alt text to all images**
- ED VSL, Prostate VSL, Long3, Short have images with no `alt=""` attribute
- Audit each page's `<img>` tags and add descriptive alt text

**1.5 — Fix Long4 link text**
- Long4 has links with generic/empty text ("click here", "here", blank anchors)
- Replace with descriptive anchor text

---

### Phase 2 — Render Blocking (Biggest mobile speed win)

All pages lose 2,000–4,000ms on mobile due to synchronous CSS/JS in `<head>`.

**2.1 — Defer non-critical JavaScript**
- Any `<script src="...">` in `<head>` without `async` or `defer` blocks rendering
- Add `defer` to all non-critical scripts (analytics, tracking pixels, affiliate scripts)
- Add `async` to independent scripts (GTM, Facebook Pixel, etc.)

**2.2 — Move non-critical CSS to bottom or load async**
- Large CSS files loaded in `<head>` delay FCP
- Extract critical above-the-fold CSS → inline it in `<style>` in `<head>`
- Load the rest with `<link rel="preload" as="style" onload="this.rel='stylesheet'">`

**2.3 — Preconnect to external origins**
- Add `<link rel="preconnect">` for all third-party hosts used on each page:
  - `https://fonts.googleapis.com`
  - `https://www.youtube.com` (VSL pages)
  - `https://www.googletagmanager.com`
  - `https://connect.facebook.net`

---

### Phase 3 — Cache Policy (Biggest bandwidth win)

All pages show 10–28 MB in cache savings — static assets have no cache headers.

**3.1 — Set cache headers via .htaccess**
Add to `/v2/.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/x-font-woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```
This alone eliminates the cache audit failure across all pages.

---

### Phase 4 — Font Display

**4.1 — Add `font-display: swap` to all @font-face declarations**
- Prevents invisible text during font load (FOIT)
- Affects all pages using custom/Google fonts
- In each page's `<style>` or linked CSS, add `font-display: swap;` inside every `@font-face` rule
- For Google Fonts URLs: append `&display=swap` to the Google Fonts `<link>` href

---

### Phase 5 — Fix Layout Shift (CLS)

**5.1 — Add explicit `width` and `height` on all `<img>` tags (ALL pages)**
- Images without dimensions cause browser reflow → CLS score drops
- Every `<img>` must have `width="X" height="Y"` matching the actual image aspect ratio
- Critical for Long4 (CLS 0.208 desktop) and DTC (CLS 0.043)

**5.2 — Reserve space for YouTube embeds (ED VSL, Prostate VSL)**
- YouTube iframe must have a defined aspect-ratio wrapper to prevent CLS on load
- Wrap with: `<div style="position:relative;padding-bottom:56.25%;height:0;">`

---

### Phase 6 — VSL Pages Mobile Performance (ED VSL, Prostate VSL)

ED VSL and Prostate VSL score 55–56 on mobile with 13s+ LCP. The YouTube player is the bottleneck.

**6.1 — Replace YouTube iframe with poster image + play button (facade pattern)**
- Render a static thumbnail `<img>` with a play button overlay on page load
- Inject the YouTube `<iframe>` only when the user clicks play
- This eliminates the ~500 KB YouTube embed from the initial load path
- LCP drops from 13s → ~3–4s estimated
- Note: this is NOT lazy load — the video loads instantly on click, not on scroll

**6.2 — Preload the LCP image on VSL pages**
- Add `<link rel="preload" as="image" href="path/to/poster.jpg">` in `<head>`
- Tells the browser to fetch the hero image at top priority before parsing completes

---

### Phase 7 — Long4 LCP 30.8s & Short LCP 22.7s

**7.1 — Preload the hero/LCP image on Long4 and Short**
- Add `<link rel="preload" as="image">` for the first visible image on each page
- The LCP element isn't being fetched early enough — preload fixes this

**7.2 — Reduce image payload on Short (9,107 KB flagged)**
- Short is loading ~9 MB of image data that contributes to the LCP delay
- Without compression or lazy load, serve images from a CDN with HTTP/2 push
- Or split the page to load below-fold images only after the hero section paints

---

### Phase 8 — Long6 Mobile ERR Fix

Long6's `index.html` contains a JS device redirect that sends mobile visitors to `mobile.html`. PSI's mobile emulation triggers this redirect but can't follow it — resulting in NO_FCP.

**8.1 — Remove or condition the JS redirect**
- Replace the JS `window.location` redirect with CSS-only responsive design, or
- Use a `<link rel="canonical">` + server-side redirect (302) that PSI can follow, or
- Merge `long6/mobile.html` content into `long6/index.html` using responsive CSS breakpoints

---

### Phase 9 — Minify CSS & JS

**9.1 — Minify all inline and linked CSS/JS**
- All pages have `Minify JavaScript` and `Reduce unused CSS` audit failures
- Run each page's CSS through a minifier (e.g. cssnano) — saves 3–129 KB per page
- Run JS through terser/uglify — saves 9+ KB per page
- Remove Bootstrap/jQuery components that aren't used on the page

---

## Priority Order

| Priority | Phase | Impact | Effort | Pages |
|----------|-------|--------|--------|-------|
| 1 | 1.1 robots.txt | SEO — ALL pages | 5 min | All |
| 2 | 1.2 Remove noindex | SEO — 6 pages unblocked | 10 min | ED VSL, ProVSL, DTC, Short, Best, Long4 |
| 3 | 1.3 Meta descriptions | SEO +20–30 pts | 30 min | ED VSL, ProVSL, DTC, Short, Best |
| 4 | 3.1 Cache headers (.htaccess) | Perf — ALL pages | 10 min | All |
| 5 | 2.1 Defer JS | Perf +10–15 pts mobile | 1–2 hrs | All |
| 6 | 6.1 YouTube facade | Mobile Perf +20 pts | 2 hrs | ED VSL, ProVSL |
| 7 | 5.1 Fix image dimensions | CLS fix | 1 hr | All |
| 8 | 2.2 Inline critical CSS | FCP -1–2s | 3 hrs | All |
| 9 | 8.1 Long6 mobile fix | Mobile ERR → scored | 2 hrs | Long6 |
| 10 | 7.1 Preload LCP images | LCP fix Long4/Short | 30 min | Long4, Short |
| 11 | 1.4 Image alt text | SEO + A11Y | 1 hr | All |
| 12 | 4.1 Font display swap | FOIT fix | 30 min | All |
| 13 | 9.1 Minify CSS/JS | Perf +5–10 pts | 2 hrs | All |
