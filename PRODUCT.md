# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: prospective clients.** Owners and operators of small businesses on Vancouver Island
(Nanaimo and around) who need a website, a web app, or an AI product built and supported. They
arrive from local search, a referral, or one of the two studio sites, and they are deciding whether
one person can be trusted with the whole job. They are not developers; they judge by the work shown
and by how easy it is to start a conversation.

**Secondary: hiring managers and recruiters.** Technical leads screening for a full-time or contract
developer. They read the experience list, the stack and the credentials, and they want the résumé
within one click. They are served by the same page, but they are not who the page leads with.

## Product Purpose

The personal site of Konstantin Zhirnov, Full Stack Developer in Nanaimo, BC — the one page that
carries both halves of his working life: the client work shipped through his two companies, and the
eight-year employment record behind it.

Success is a started conversation about a project. A message on email, Telegram, WhatsApp or the
phone is the conversion. A full-time enquiry is a welcome second outcome, not the goal the page is
shaped around.

## Positioning

One person owns the entire chain — design, build, deploy, support — so the client talks to the
developer writing the code rather than to an account manager. Two companies run in parallel out of
Nanaimo since January 2026: **Web Solutions** (create-website.ca) for websites and web apps for
small businesses, and **AI Solutions** (ai-solutions.live) for AI products, agents and automation.
The pairing is the position: a local web studio that can also ship LLM products that take real
action, which neither a generic local agency nor a remote AI shop can claim truthfully.

## Operating Context

- Clients are local and small; most Web Solutions sites ship in one to three weeks.
- The page is a single scrolling document with in-page navigation — Home, About, Companies,
  Expertise, Stack, Experience, Projects, Contact — not a multi-route site.
- There is no contact form. Enquiries arrive through direct channels: email, phone, Telegram,
  WhatsApp, plus LinkedIn and GitHub for the hiring audience.
- The résumé PDF (`public/Konstantin_Zhirnov.pdf`) is the artefact the hiring audience wants.
- Project screenshots are shared with the Web Solutions studio site (`C:\Projects\studio`), so the
  two properties show the same client work.

## Capabilities and Constraints

**Confirmed content the site carries:** profile and bio; two company cards; four expertise
disciplines; a five-group technology stack; seven employment entries from 2018 to now; eight live
client projects with screenshots and links; two education credentials; four headline statistics;
five contact channels.

**Technical constraints that must hold:**

- Stack stays **CRA + React 18 + TypeScript + Sass modules**. No migration to Next.js, Vite or
  another bundler.
- **Every word and link lives in `src/shared/content.ts`.** Copy never moves into components.
  One sanctioned exception: the `<noscript>` block in `public/index.html` mirrors the contact
  channels from `profile`, because static HTML cannot import the module. Change both together.
- Deployed from `github.com/Konstantin-Zhirnov/portfolio` to Vercel.

**Explicitly open:** the site is static today, but a backend is *not* ruled out — a serverless
function and a real contact form are permitted future work if they serve the client audience. The
existing Web Solutions mail route (`Studio/app/api/mail/route.ts`, which forwards into Telegram) is
the shape to follow if one is added.

**Audience order in copy:** the hero, the header CTA ("Start a project") and the page meta lead
with the client offer. Full-time and contract availability is stated once, as the closing line of
the Contact section, and nowhere above the fold.

## Brand Commitments

- Name and wordmark: **"Konstantin."** — the first name with a red period.
- The dark visual identity is **binding**, not a candidate for replacement: near-black stage, a
  single red accent, oversized uppercase display type, mono micro-labels. Future work extends it;
  it does not redesign it away.
- Voice in the shipped copy is first-person, plain and unhedged, with concrete numbers rather than
  adjectives ("you talk to the person writing the code").
- Company names in use: Web Solutions, AI Solutions, Helper AI (helper-ai.org).

## Evidence on Hand

**Verified — future work may rely on these:**

- Building for the web since **2018**; seven roles through AVA-media, ETM, Sberbank-Technology,
  Digital Nanaimo, Severstal, FindPro.ca, and the two own companies.
- **30+** websites shipped.
- **5.0** rating on Google.
- Employment metrics: the Sberbank-Technology internal banking app used by **over 1,000 employees**;
  the ETM jQuery→React/Next.js rewrite delivering a **2× cost reduction** and **over 26,000 new
  clients**.
- Education: B.Sc. in Applied Informatics, Northern (Arctic) Federal University — NArFU, 2013–2017;
  Electromechanics, Kumertau Mining College, 1997–2001.

**Assets:**

- Eight client site screenshots, 1400×875, in `src/shared/assets/work/`: AI Solutions, Helper AI,
  Athecon Projects, P3 Mechanical & Electrical, Pahlavan General Contracting, UPGREAT Home
  Renovations, Yankovska School of Rhythmic Gymnastics, Mobile Paintless Dent Repair. Every one is a
  live site.
- Résumé PDF at `public/Konstantin_Zhirnov.pdf`.
- Portrait plates in `src/shared/assets/` and the scroll sequence in `public/portrait/`. Provenance:
  these were generated on kie.ai from Konstantin's own photograph
  (`portrait-source.jpg`) — an AI restyle of a real person, not a studio shoot. Raw generations and
  the reference reels sit in the gitignored `references/`.

**Absent — must not be invented:** there are no testimonials, no named client quotes, no pricing,
no client logos beyond the eight screenshots, no awards, and no team. Konstantin works alone.

## Product Principles

1. **The client decides first.** When a section could serve either audience, shape it for the person
   weighing up a project, and let the hiring reader take what they need from the same material.
2. **Show the work, not adjectives.** Eight live sites and real numbers carry the argument; nothing
   needs a superlative on top of it.
3. **One person, whole chain.** Every claim should stay true of a solo operator — never imply a team,
   a studio floor, or capacity that does not exist.
4. **Starting a conversation costs one tap.** Direct channels stay visible and unmediated; no gate,
   no qualification step, no form standing between interest and contact.
5. **Copy has one home.** Words and links live in `content.ts` so the page can be re-designed
   without re-typing the product.

## Accessibility & Inclusion

No external standard has been mandated, but the incumbent build carries commitments future work must
keep: `prefers-reduced-motion: reduce` disables smooth scroll and every tween and is treated as a
first-class rendering mode, not a fallback; keyboard focus is visible everywhere; a skip link opens
the page; and every text colour clears WCAG AA 4.5:1 on the stage. The site is a
client-rendered React app and needs JavaScript; without it, a `<noscript>` fallback keeps
the contact channels reachable.
