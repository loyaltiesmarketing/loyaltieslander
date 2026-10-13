# Loyalties.marketing lander

React + Vite marketing site for [loyalties.marketing](https://loyalties.marketing).

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env` (publishable/anon key only — never commit a service-role key). `.env` is gitignored.

## Dev

```bash
npm run dev
```

Opens at **http://localhost:4000**.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server on port 4000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build on port 4000 |

## Notes

- Venue CTAs (Sign up / Get started / Log in) point to `https://app.loyalties.marketing`
- Drop real hero footage at `public/hero.mp4` when ready (poster is already in place)
- App Store / Play badge URLs are placeholders
- Do **not** upload `node_modules/`, `dist/`, or `.env`
