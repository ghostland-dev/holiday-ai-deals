# TravelAI

Aggregates the best travel deals from several booking sites.

## Features

- Deal search and details
- Stripe payments
- PWA support, Supabase back-end

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI)
- TanStack Query
- React Router
- Supabase
- Stripe

## Getting Started

```bash
git clone https://github.com/ghostland-dev/holiday-ai-deals.git
cd holiday-ai-deals
cp .env.example .env   # then fill in your own values
npm install
npm run dev
```

Other scripts:

- `npm run build`: vite build
- `npm run lint`: eslint .
- `npm run preview`: vite preview

> The committed `.env` contains placeholder values only. Replace them with your own credentials locally.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fghostland-dev%2Fholiday-ai-deals)

Click the button to deploy your own copy on Vercel in one step.

Set these environment variables in the Vercel project settings (see `.env.example`):

- `VITE_AGODA_AFFILIATE_ID`
- `VITE_API_BASE_URL`
- `VITE_APP_DOMAIN`
- `VITE_APP_NAME`
- `VITE_APP_VERSION`
- `VITE_BOOKING_AFFILIATE_ID`
- `VITE_ENABLE_MONITORING_API`
- `VITE_EXPEDIA_AFFILIATE_ID`
- `VITE_GEMINI_API_KEY`
- `VITE_GOOGLE_ANALYTICS_ID`
- `VITE_PUSH_NOTIFICATION_KEY`
- `VITE_RECAPTCHA_SITE_KEY`
- `VITE_SENTRY_DSN`
- `VITE_SKYSCANNER_AFFILIATE_ID`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_URL`

## Author

**Ismail.M**, Software Engineer & DevOps

- GitHub: [@ghostland-dev](https://github.com/ghostland-dev)
- Website: [ismail-mouyahada.com](https://www.ismail-mouyahada.com)
