# Konstantin Zhirnov — portfolio

Cinematic dark portfolio: near-black stage, one accent red, oversized uppercase display type and
mono micro-labels. Built with CRA + React 18 + TypeScript + SASS modules, motion on GSAP/ScrollTrigger
with Lenis for smooth scroll.

```bash
npm start     # dev server on http://127.0.0.1:3000
npm run build # production bundle into build/
```

## Where things are

| Path | What |
|---|---|
| `src/shared/content.ts` | **every word and link on the site** — profile, companies, expertise, stack, experience, projects, education. Edit copy here, not in the components. |
| `src/app/App.sass` | design tokens (colour, type, rhythm, motion) as CSS custom properties, plus the shared section furniture (`.container`, `.section`, `.h2`, `.eyebrow`, `.lead`, `.head`, `.line`). |
| `src/shared/lib/useMotion.ts` | the whole motion layer: Lenis + ScrollTrigger boot and the reveal system. |
| `src/shared/assets/` | `portrait.jpg` (duotone plate used in About), `portrait-source.jpg` (the untouched original), `work/` (site screenshots, shared with the Web Solutions studio site). |
| `src/widgets/*` | one folder per section: `index.tsx` + `*.module.sass`. |

## Motion

Reveals are declared in markup and picked up by `useMotion`, so a new section animates without
touching any JS:

- `data-lines` — masked line rise; wrap each line as `<span class="line"><span>text</span></span>`
- `data-reveal` — fade + rise of the element
- `data-reveal="stagger"` — same, staggered across the element's children
- `data-tilt` — the element's children stand up out of a tilted-back pose, then lean to the pointer
- `data-tilt="self"` — the same for a single card
- `data-count` — the number counts up to the attribute's value, keeping its `+`, padding and decimals
- `data-parallax` — the inner `<img>` settles from `scale(1.18)` to `1`

The one set piece is the hero scroll-out (`src/widgets/Hero`): the two headline lines tilt away in 3D
under a blur veil while the ring's black core scales up and swallows the stage. It is scrubbed, so it
plays forwards and backwards with the scroll.

`prefers-reduced-motion: reduce` disables Lenis and every tween but keeps colour and opacity
feedback on hover and focus. The reveal guards only hide content while the motion layer is
alive: if it throws, it releases them, and every section sits in its own error boundary.

The site is a client-rendered React app, so without JavaScript nothing below `<div id="root">`
mounts. A `<noscript>` block in `public/index.html` keeps the contact channels reachable —
it mirrors `profile` in `content.ts`, so update both together.

## Notes

- Section headings use the `.line > span` markup above; GSAP pins `y` to `0` on both ends of that
  tween because the CSS guard `translateY(110%)` would otherwise survive it as a px offset.
- Never build a GSAP selector from a CSS-module class name — CRA's hashes can contain `+`, which is
  invalid in a selector. Use refs.
- The contact section has no form: the site is static, so it lists direct channels instead.
  To add one, put an `api/mail.ts` function next to the build (the site already runs on Vercel)
  and POST `{ spam_2026, name, contact, message }` to it — same shape as the Web Solutions studio
  route in `Studio/app/api/mail/route.ts`, which forwards the enquiry into Telegram.
