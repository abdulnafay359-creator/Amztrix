# AMZTRIX

Starter website for an Amazon creative and catalog agency. It uses the Threads & Trends stack: Next.js App Router, React, TypeScript, Tailwind CSS, Drizzle ORM, and Neon Postgres.

## Start locally

Use Node.js 24 and npm.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000.

## Database

Create `.env.local` from `.env.example` if it does not already exist. Set `DATABASE_URL` to the direct Neon connection string and `DATABASE_URL_POOLED` to the pooled string. Drizzle uses the direct URL for migrations. App code uses the pooled URL with the direct URL as a fallback.

Run `npm run db:check` to test both connections. Add table definitions in `src/db/schema.ts` when the first database-backed feature needs them, then use `npm run db:generate` and `npm run db:migrate` to generate and apply migrations.

## Checks

```powershell
npm run lint
npm run build
```

