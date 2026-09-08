# StudyTrack — Next.js Edition

> Migrasi penuh dari Laravel 12 (Breeze + Blade) ke **Next.js 15 App Router + TypeScript + Auth.js v5 + Prisma + Supabase Postgres**. Deploy-native di Vercel (region `sin1`, dekat Supabase).

## Fitur (port 1:1 dari Laravel)

| Laravel | Next.js |
|---|---|
| `welcome.blade.php` | `src/app/page.tsx` |
| Breeze login/register | `src/app/(auth)/{login,register}` + Auth.js Credentials |
| `DashboardController` + `dashboard.blade.php` | `src/app/(protected)/dashboard/page.tsx` |
| `TaskController` resource + 3 blade views | `src/app/(protected)/tasks/**` (list + search, new, edit, delete via Server Actions) |
| `ProfileController` + 3 partials | `src/app/(protected)/profile/**` (info, password, delete) |
| Session DB driver | JWT session via Auth.js + tabel `sessions` Prisma |
| `tasks` migration | `prisma/schema.prisma` model `Task` |

Bonus Next.js: REST API (`/api/tasks`, `/api/health`), `sitemap.xml`, `robots.txt`, `manifest`, security headers, `loading`/`error`/`not-found` boundaries.

## Prasyarat

- Node.js ≥ 20
- Database Supabase Postgres (gunakan **Pooler URL**, port `6543`, agar bisa diakses dari Vercel — ini sekaligus memperbaiki masalah IPv6-only `db.xxx.supabase.co` di versi Laravel)

## Setup lokal

```bash
cp .env.example .env
# Isi DATABASE_URL (pooler), DIRECT_URL (direct), AUTH_SECRET (npx auth secret)

npm install
npm run db:push        # buat tabel di Supabase (tanpa file migrasi)
# atau: npm run db:migrate  # bila ingin migration history

npm run dev            # http://localhost:3000
```

## Env yang wajib di Vercel

| Key | Keterangan |
|---|---|
| `DATABASE_URL` | Pooler URL Supabase (`...pooler.supabase.com:6543/...?pgbouncer=true`) |
| `DIRECT_URL` | Direct URL Supabase (port `5432`, untuk migrate) |
| `AUTH_SECRET` | `npx auth secret` (min 32 char) |
| `AUTH_URL` | URL produksi, mis. `https://studytrack.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Sama dengan `AUTH_URL` |

## Perintah

```bash
npm run dev       # dev server
npm run build     # prisma generate + next build
npm start         # serve production
npm run db:studio # GUI database
```

## Struktur

```
src/
  auth.ts                 # Auth.js v5 (Credentials + PrismaAdapter + bcrypt)
  middleware.ts           # proteksi /dashboard /tasks /profile, redirect /login|/dashboard
  lib/{prisma,validations,utils}.ts
  app/
    page.tsx              # landing
    (auth)/{login,register}
    (protected)/{dashboard,tasks,profile}
    api/{health,tasks,auth/[...nextauth]}
prisma/schema.prisma      # User/Account/Session/VerificationToken + Task
```
