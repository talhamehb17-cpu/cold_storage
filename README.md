# Tahseen Jaber Cold Storage & Logistics — Website

Premium one-page corporate experience for **Tahseen Jaber Cold Storage & Logistics**, Uuayrij Industrial Area, Baghdad, Iraq.

**White · Navy · Ice-blue** visual identity — cinematic scrolling, editorial typography and a high-budget international cold-chain feel.

## Routes (frontend only)

| Route     | Description                                      |
| --------- | ------------------------------------------------ |
| `/`       | The complete long-scroll cinematic homepage      |
| `/login`  | Premium split-screen sign-in experience          |
| `/signup` | Premium split-screen account creation            |

Everything else lives on the homepage as scroll sections:

Hero → Cold Chain → Products & Industries → Facility Experience → Temperature Experience → Inventory System → Security & Monitoring → Logistics → Storage Solutions → Trust → CTA / Request Storage → Footer

## Stack

- **Next.js 15** (App Router, static prerender) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — custom design tokens (`@theme`), glass/frost utilities
- **GSAP + ScrollTrigger** — hero entrance sequence, scroll-scrubbed temperature narrative, parallax
- **Framer Motion** — UI transitions, word-by-word text reveals, tab/menu choreography
- **Lenis** — smooth scrolling, GSAP-ticker synced
- **Lucide** icons, self-hosted **Archivo / Inter / JetBrains Mono** variable fonts
- Custom cursor (desktop only, disabled on touch + reduced motion)

## Highlights

- **Cinematic hero** — layered facility image, frost particles, animated temperature HUD (counts to −18.0°C), marquee status ticker, parallax on scroll
- **Scroll-driven cold chain** — journey spine that draws with scroll while the environment readout cools from +4°C → −18°C
- **Interactive temperature experience** — draggable control that freezes the environment (illustrative values only)
- **Product showcase** — four industries with accent lighting, cross-fading imagery and environment-mode HUD
- **Facility exploration** — interactive SVG plan with six zones and live info panel
- **Inventory scan demo** — animated barcode sequence (interface demonstration only)
- **Security map** — glowing monitoring nodes + facility status panel
- **Logistics route** — animated route line with moving vehicle indicator
- **Inquiry form** — full validation with loading / success / error states (frontend only — nothing is transmitted)
- **Login / Signup** — branded split-screen pages with glass-slide transitions, password strength meter and demo states

## Design integrity

No invented certifications, statistics, customer logos, capacities or delivery claims. Demo-only data is labelled as such, and unverifiable contact details are rendered as neutral placeholders.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
npm start
```

## Deploy on Vercel

Zero configuration required — Vercel auto-detects Next.js.

1. Push/import this repository on [vercel.com](https://vercel.com) (or run `npx vercel`).
2. Use the defaults: **Framework: Next.js**, **Build: `next build`**, **Install: `npm install`**.
3. (Optional) set the environment variable `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://your-domain.com`) so Open Graph / Twitter card links resolve to the right domain.
4. Deploy — every route (`/`, `/login`, `/signup`) is statically prerendered.

Requires Node 20+ (`engines` is set in `package.json`).

## Project structure

```
src/
  app/                  # /, (auth)/login, (auth)/signup, globals.css, layout
  components/
    chrome/             # smooth scroll, custom cursor, scroll progress
    navigation/         # floating nav + mobile overlay
    hero/               # cinematic hero
    cold-chain/         # journey storytelling
    temperature/        # interactive temperature experience
    products/           # industries showcase
    facility/           # interactive facility plan + gallery
    inventory/          # scan demo
    security/           # monitoring map
    logistics/          # route experience
    storage/            # solutions rows
    trust/              # corporate trust
    inquiry/            # CTA + request form
    auth/               # login/signup shell + forms
    footer/ ui/         # shared primitives
  lib/                  # tokens helpers, animation utilities, site content
public/images/          # generated brand imagery
```

## Notes for the next phase

- Inquiry/auth submissions are simulated on the client — wire to real endpoints later
- `COMPANY` constants in `src/lib/site.ts` keep verifiable business data in one place
