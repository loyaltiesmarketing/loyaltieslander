# Hero stamp grid (loyalty card circles)

How the homepage hero “loyalty circles” work — one continuous video clipped into a grid of round stamps, plus a Sign up circle.

## Source files

| Role | Path |
| --- | --- |
| Component logic | `src/components/HeroStampGrid.tsx` |
| Layout, circles, animation | `src/components/HeroStampGrid.module.css` |
| Used on the homepage | `src/pages/Home.tsx` |
| Brand tokens (`--radius-pill`, colours, shadow) | `src/styles/tokens.css` |
| Supabase public asset URL helper | `src/lib/assets.ts` → `publicAssetUrl()` |
| Sign-up CTA destination | `src/data/site.ts` → `APP_URL` |
| Local poster (shown until video plays) | `public/hero-poster.jpg` |
| Sign-up mark | `public/submark-white.svg` |
| Hero video | `public/hero.webm` (served by the site, not Supabase) |

The hero video is a local file:

```ts
const HERO_VIDEO = '/hero.webm'
```

---

## What you are building

Visually: a **stage** holding a CSS grid of **perfect circles**. Each circle is a window onto **the same full-bleed video**, positioned so the video lines up across all windows — it looks like one film behind several round cut-outs.

```
┌─────────────────────────────────────┐
│  ○  ○  ○  ○                         │  desktop: 4 × 2
│  ○  ○  ○  [Sign up]                 │  7 video stamps + CTA
└─────────────────────────────────────┘

┌───────────────┐
│  ○  ○         │  mobile: 2 × 3
│  ○  ○         │  5 video stamps + CTA
│  ○  [Sign up] │
└───────────────┘
```

---

## 1. Make the circles

In CSS, each stamp cell is a square with a pill radius (fully round):

```css
/* tokens.css */
--radius-pill: 9999px;

/* HeroStampGrid.module.css */
.stampWindow {
  aspect-ratio: 1;              /* square cell */
  border-radius: var(--radius-pill); /* → circle */
}

.stampClip {
  position: absolute;
  inset: 0;
  border-radius: inherit;       /* clip children to the circle */
  overflow: hidden;
  background: #111;
}
```

**Sign up** uses the same circle treatment (`.signUp`), with a dark fill, `submark-white.svg`, and the label “Sign up”.

---

## 2. Lay out the grid

Stage and grid live in `HeroStampGrid.module.css`:

| Breakpoint | Stage | Grid | Video stamps | CTA |
| --- | --- | --- | --- | --- |
| Mobile (default) | `aspect-ratio: 2 / 3`, max width ~504px | 2 columns × 3 rows | 5 | last cell |
| Desktop (`min-width: 768px`) | `aspect-ratio: 2 / 1`, max width ~920px | 4 columns × 2 rows | 7 | last cell |

Stamp counts are defined in the component:

```ts
const DESKTOP_STAMPS = [{}, {}, {}, {}, {}, {}, {}] // 7
const MOBILE_STAMPS = [{}, {}, {}, {}, {}]          // 5
```

Breakpoint switch:

```ts
window.matchMedia('(min-width: 768px)')
```

---

## 3. One video, many circular windows (the important trick)

You do **not** crop the video into separate files. Each stamp hosts its own `<video>` (same `src`), sized to the **whole stage**, then offset so that stamp’s clip shows the correct region.

### Measure offsets

On layout (and on resize), for each `.stampClip`:

```ts
left = stageRect.left - clipRect.left
top  = stageRect.top  - clipRect.top
width  = stageRect.width
height = stageRect.height
```

Apply those as inline styles on the video (and poster):

```tsx
style={{ width: offset.w, height: offset.h, left: offset.left, top: offset.top }}
```

Media CSS:

```css
.stampMedia {
  position: absolute;
  max-width: none;
  object-fit: cover;
  pointer-events: none;
}
```

Because every video is stage-sized and shifted by the clip’s position relative to the stage, the circles act like holes in a mask over one continuous image.

Use `ResizeObserver` on the stage and each clip so offsets stay correct when the viewport or stamp count changes.

---

## 4. Keep the videos in sync

All stamp videos share one timeline:

1. Play every muted, looping, `playsInline` video when the hero is in view (`IntersectionObserver`, threshold `0.2`).
2. Treat the first video as primary.
3. Every ~500ms, if another video drifts more than `0.125s`, set `currentTime` to match the primary.

Also set `muted` / `playsInline` / `webkit-playsinline` in JS before calling `play()` so mobile autoplay is more reliable.

---

## 5. Poster until playing (no mobile play button)

Safari often shows a native play control while a video loads. Avoid that by:

1. Leaving the video at `opacity: 0` until playback starts.
2. Layering `public/hero-poster.jpg` on top (same offset maths as the video).
3. On the primary video’s `playing` event (or successful `play()`), set `videoPlaying` so the poster fades out and videos fade in.
4. Hiding WebKit media controls with CSS (`::-webkit-media-controls`, start-playback button).

No `controls` attribute. Use `disablePictureInPicture` and `aria-hidden` on decorative videos.

---

## 6. Entrance motion

`.stampWindow` and `.signUp` use `stampIn` (scale + fade). Stagger with `animationDelay: ${i * 60}ms` (Sign up uses `stamps.length * 60`).

---

## 7. Minimal HTML structure

```tsx
<section className={styles.hero}>
  <div className={styles.stampStage} ref={stageRef}>
    <div className={styles.grid}>
      {stamps.map((_, i) => (
        <div className={styles.stampWindow}>
          <div className={styles.stampClip} ref={…}>
            <video className={styles.stampMedia} style={mediaStyle} … />
            <img className={styles.stampPoster} style={mediaStyle} src="/hero-poster.jpg" />
            <div className={styles.shade} />
          </div>
        </div>
      ))}
      <a className={styles.signUp} href={APP_URL}>Sign up</a>
    </div>
  </div>
  <h1>…</h1>
</section>
```

Optional `stamp.label` renders white text over a stamp (`.stampLabel`).

---

## Checklist to recreate elsewhere

1. One looping muted hero video + matching poster still.
2. Stage with fixed aspect ratio; CSS grid of square cells.
3. `border-radius: 9999px` + `overflow: hidden` on each cell.
4. Per-cell video/poster sized to the **stage**, positioned with stage−clip offsets.
5. ResizeObserver to remeasure.
6. Sync `currentTime` across videos.
7. Poster overlay until `playing`.
8. Separate circle for the CTA (no video).

---

## Related brand assets (optional)

Wallet card *UI* mockups (not this hero grid) live in:

- `src/components/LoyaltyCardShowcase.tsx`
- Stamp icon SVGs: `public/stamp-icons/*.svg`
- Icon path map: `src/lib/stamp-icon-paths.ts`
