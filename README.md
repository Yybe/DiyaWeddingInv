# Diya & Abhishek — Wedding Invitation Website

A premium, mobile-first digital wedding invitation built for sharing over WhatsApp. Opens with a tap-to-open envelope and wax seal, then reveals the full invitation with a scratch-to-uncover wedding date, a live countdown, and all ceremony details — all content is sourced from the couple's invitation card.

## Tech stack

- **React 19 + Vite** — fast dev server and lean production build
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`, custom design tokens (colors/fonts) defined in `src/index.css`
- **GSAP** — the envelope-opening timeline (seal press → crack → flap unfold → card slide)
- **Framer Motion** — scroll-reveal and micro-interactions across sections
- **Lucide React** — icons

## Getting started

```bash
npm install
npm run dev       # starts a local dev server (see the printed localhost URL)
npm run build     # production build, output in dist/
npm run preview   # serve the production build locally to double-check it
```

## Project structure

```
src/
├── assets/
│   ├── images/      # couple portrait, Ganesh symbol, floral corner motif
│   ├── videos/       # marigold petal overlay clip
├── components/       # Envelope, ScratchHeart, MarigoldOverlay, SectionHeading, etc.
├── sections/          # Hero, InvitationMessage, BrideGroom, WeddingDetails,
│                       # DateReveal, HaldiMehendi, Venue, Contact, Footer
├── hooks/             # useCountdown
├── utils/             # phone number formatting/tel: link helpers
├── data/
│   └── invitation.js  # single source of truth — all invitation text lives here
├── App.jsx
└── main.jsx
```

## Editing the invitation content

**Every** piece of text on the site — names, dates, venues, timings, phone numbers — comes from `src/data/invitation.js`. To correct or update anything, edit that file only; no other file contains hardcoded invitation copy. The wedding-date countdown and the scratch-reveal cards both read from `invitation.weddingDate`, so updating the `iso` field there keeps the countdown accurate.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New Project** → import the repository.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist` (Vercel fills these in automatically).
4. Deploy — no environment variables are required.

Or, from the CLI:

```bash
npm install -g vercel
vercel
```

## Notes on assets

- The marigold petal video (`src/assets/videos/marigold-petals.mp4`) is used only as a subtle looping overlay behind the Hero section, muted and auto-playing, per the brief.
- The couple portrait was supplied with a baked-in checkerboard background (not true transparency); it's been cleanly reprocessed to a transparent PNG and downscaled for performance.
- If you'd like to trim the video further for faster mobile loading, re-export it at a lower resolution/bitrate (e.g. 720p, ~2 Mbps) — the component itself needs no changes.

## Accessibility

- Semantic HTML landmarks (`main`, `footer`, headings in order)
- All interactive elements meet a 44×44px minimum touch target
- Visible keyboard focus states
- `prefers-reduced-motion` is respected — animations shorten to near-instant for users who request it
- Phone numbers are exposed as real `tel:` links with descriptive `aria-label`s where needed
