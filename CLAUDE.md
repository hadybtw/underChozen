# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

UnderChozen — a salary intelligence SaaS tool. Users input job info, see if they're underpaid vs market data, and can unlock a paid ($29) negotiation strategy pack.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Tech Stack

- **Next.js 16** (App Router, `src/app/`)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (configured via `@tailwindcss/postcss`, no `tailwind.config` — theme in `globals.css` using `@theme`)
- **Framer Motion** for animations
- **jsPDF** for PDF report generation
- **Stripe** (placeholder — see `src/app/api/checkout/route.ts`)

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing page (hero + form + how-it-works + why-it-matters)
│   ├── analysis/page.tsx     # Results dashboard (metrics, percentile bar, locked negotiation section)
│   ├── api/checkout/route.ts # Stripe checkout placeholder
│   ├── api/verify/route.ts   # Payment verification placeholder
│   ├── layout.tsx            # Root layout with Inter font + ambient glow
│   └── globals.css           # Tailwind v4 @theme tokens, glass utilities, shimmer animation
├── components/               # All UI components (glass-card, button, metric-card, percentile-bar, etc.)
├── data/
│   └── salaries.ts           # Salary dataset: role bands, location/industry/company-size multipliers
└── lib/
    ├── calculator.ts         # Salary analysis engine (market range, percentile, delta, status)
    ├── negotiation.ts        # Generates negotiation pack (email script, talking points, objections, 3yr model)
    ├── pdf.ts                # PDF report generation using jsPDF
    └── utils.ts              # cn(), formatCurrency(), formatPercent(), ordinal()
```

## Key Data Flow

1. User fills form on `/` → navigates to `/analysis?jobTitle=...&currentSalary=...` (query params)
2. `analysis/page.tsx` parses params → calls `analyzeSalary()` → renders free tier metrics
3. "Unlock" button triggers payment (currently simulated) → reveals `NegotiationReveal` component
4. PDF download calls `generatePdf()` client-side via jsPDF

## Design System

- Dark theme: background `#0A0A0F`, foreground `#F5F5F7`
- Glassmorphism: `.glass` class (`bg-white/5`, `backdrop-blur-xl`, `border-white/10`)
- Color tokens defined in `globals.css` under `@theme` (accent, accent-blue, positive, negative, warning, muted)
- All interactive components use Framer Motion (`whileHover`, `whileTap`, staggered fade-in)
- No emojis in UI. Apple-native aesthetic.

## Salary Calculation

- `src/data/salaries.ts` has 9 roles × 3 levels (entry/mid/senior) with p25/median/p75 bands
- Adjusted market = base band × location multiplier × industry multiplier × company size multiplier
- Percentile maps salary position within the adjusted quartile range
- Status: below median = underpaid, above p75 = above-market, else market-aligned

## Stripe Integration

Not yet wired up. To enable:
1. `npm install stripe`
2. Set `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` in `.env.local`
3. Uncomment the Stripe code in `src/app/api/checkout/route.ts`
4. Replace `handleUnlock` in `analysis/page.tsx` to call the checkout API and redirect
