# Backend CMS — Design Spec

**Date:** 2026-05-03
**Sub-project:** 3 of 3 (parent: emergency intro + team redesign + Laravel/Filament backend)
**Status:** Approved for implementation planning

## Goal

Give the clinic a small, self-serve admin to edit team members and contact info without a developer. The React marketing site fetches both from a public read-only API and falls back to bundled static data if the backend is unreachable, so the site never breaks.

## Non-goals

- Authentication on the public API (read-only marketing data)
- A CMS for any other content (services, departments, blog, testimonials remain static)
- Multi-admin user management, roles, audit logs, draft/publish workflow
- Image optimization / CDN delivery
- Automated deploy pipelines, SSR, build-time data baking

## Architecture

Two repos, two deploys, one shared JSON contract.

```
tannjes-care-portal/              # this repo — React/Vite (existing)
  src/data/team.ts                # static fallback (existing)
  src/data/settings.ts            # static fallback (NEW)
  src/lib/api.ts                  # fetch helpers (NEW)
  src/hooks/useTeam.ts            # React Query hook (NEW)
  src/hooks/useSettings.ts        # React Query hook (NEW)

tannjes-care-portal-backend/      # sibling repo — Laravel 11 + Filament 3 (NEW)
  app/Models/{TeamMember,Setting,User}.php
  app/Http/Controllers/Api/{TeamController,SettingsController}.php
  app/Filament/Resources/TeamMemberResource.php
  app/Filament/Pages/SiteSettings.php
  routes/api.php                  # GET /api/team, GET /api/settings
  database/migrations/            # team_members, settings, users
  database/seeders/               # 4 doctors + 4 settings + 1 admin
  storage/app/public/team/        # uploaded portraits (symlinked to public/storage)
```

Backend deployed to HostAfrica (MySQL, shared/VPS PHP host) on a subdomain (e.g., `api.tannjes.com`). Frontend stays on its current host with one new env var pointing at the backend.

## Data contract

The only thing both sides must agree on.

```
GET /api/team
→ 200 application/json
[
  {
    "name": "Dr. ...",
    "role": "...",
    "bio": "...",
    "credentials": null,
    "image_url": "https://api.tannjes.com/storage/team/dr-x.jpg",
    "sort_order": 1
  },
  ...
]
```

- Returns only `is_active = true` rows, ordered by `sort_order` ascending.
- `image_url` is an absolute URL built from `config('app.url')`.
- `credentials` is nullable.

```
GET /api/settings
→ 200 application/json
{
  "phone_primary": "+2347019090013",
  "phone_secondary": "+2347086113160",
  "email": "tannjes03@gmail.com",
  "address": "Drive 2, 1st Crescent, 3rd Avenue, House 38, Prince and Princess Estate, Kaura District, Abuja"
}
```

- Returns the four known keys. Frontend tolerates missing keys by falling back to its static defaults per-key.

Both endpoints public, no auth, no rate limiting beyond Laravel defaults.

## Backend (Laravel + Filament)

### Stack
Laravel 11, Filament 3, PHP 8.2+, MySQL. Bootstrapped via `composer create-project laravel/laravel` then `composer require filament/filament` and `php artisan filament:install --panels`.

### Schema

`team_members`:
- `id` bigint pk
- `name` string
- `role` string
- `bio` text
- `credentials` string nullable
- `image` string nullable (relative path within the public disk, e.g. `team/dr-x.jpg`)
- `sort_order` int default 0
- `is_active` boolean default true
- `created_at`, `updated_at`

`settings` (key/value):
- `id` bigint pk
- `key` string unique
- `value` text nullable
- `created_at`, `updated_at`
- Seeded keys: `phone_primary`, `phone_secondary`, `email`, `address`

`users` (Laravel default):
- One row seeded from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.

### Controllers (thin)

`Api\TeamController@index`:
```php
return TeamMember::query()
    ->where('is_active', true)
    ->orderBy('sort_order')
    ->get()
    ->map(fn ($m) => [
        'name' => $m->name,
        'role' => $m->role,
        'bio' => $m->bio,
        'credentials' => $m->credentials,
        'image_url' => $m->image
            ? rtrim(config('app.url'), '/') . '/storage/' . $m->image
            : null,
        'sort_order' => $m->sort_order,
    ]);
```

`Api\SettingsController@index`:
```php
return Setting::pluck('value', 'key');
```

### Filament admin

- `TeamMemberResource` — table view with reorder enabled (Filament built-in drag handle on `sort_order`), `is_active` toggle column, image thumbnail. Form fields: name, role, bio (textarea), credentials, image (`FileUpload` → `team/` directory on the public disk), is_active, sort_order.
- `SiteSettings` Filament Page — single form rendering each known key as a labeled `TextInput` (or `Textarea` for `address`). On save, upserts each row in `settings`. Better admin UX than a generic key/value resource.
- Single seeded admin user. No invitation flow.
- Admin lives at `/admin`; session cookie auth (Filament default). No Sanctum needed since admin is same-origin.

### CORS

`config/cors.php` — allow the frontend origin(s) on `/api/*`. List dev (`http://localhost:8080`) and prod frontend domain. `supports_credentials: false` (no cookies on public API).

### Image storage

`php artisan storage:link` once per environment. Files saved by Filament land in `storage/app/public/team/` and serve from `/storage/team/...`. The API returns absolute URLs so the frontend never has to know the backend hostname twice.

### Seeders

`DatabaseSeeder` runs:
- `TeamMemberSeeder` — inserts the 4 current doctors mirrored from `src/data/team.ts` (no images on first seed; admin uploads after).
- `SettingSeeder` — inserts the 4 contact values from current frontend hard-codes.
- `AdminUserSeeder` — creates one user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars; idempotent (`firstOrCreate`).

### Backend tests

Two feature tests (the contract):
- `test_team_endpoint_returns_active_members_ordered_by_sort_order` — seeds 3 members (one inactive), asserts response contains 2 rows in expected order.
- `test_settings_endpoint_returns_key_value_map` — seeds 2 settings, asserts response is `{key: value}` shape.

Filament resources use framework code; no need to test Filament internals.

## Frontend wiring

### New files

`src/lib/api.ts`:
```ts
const BASE = import.meta.env.VITE_API_URL;

export const fetchTeam = async (): Promise<TeamMember[]> => {
  const r = await fetch(`${BASE}/api/team`);
  if (!r.ok) throw new Error(`team ${r.status}`);
  const data = await r.json();
  // normalize image_url -> image so consumers stay unchanged
  return data.map((m: any) => ({ ...m, image: m.image_url ?? "" }));
};

export const fetchSettings = async (): Promise<Settings> => {
  const r = await fetch(`${BASE}/api/settings`);
  if (!r.ok) throw new Error(`settings ${r.status}`);
  return r.json();
};
```

`src/data/settings.ts`:
```ts
export type Settings = {
  phone_primary: string;
  phone_secondary: string;
  email: string;
  address: string;
};

export const settings: Settings = {
  phone_primary: "+2347019090013",
  phone_secondary: "+2347086113160",
  email: "tannjes03@gmail.com",
  address:
    "Drive 2, 1st Crescent, 3rd Avenue, House 38, Prince and Princess Estate, Kaura District, Abuja",
};
```

`src/hooks/useTeam.ts`:
```ts
export const useTeam = (): TeamMember[] => {
  const { data } = useQuery({
    queryKey: ["team"],
    queryFn: fetchTeam,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return data ?? staticTeam;
};
```

`src/hooks/useSettings.ts` — same shape, returns `Settings` with per-key fallback to `staticSettings`.

### Consumers refactored

Replace direct imports with hooks:

- `TeamPreview.tsx`, `pages/Team.tsx` → `useTeam()`
- `Hero.tsx`, `Navbar.tsx`, `MobileBookCTA.tsx`, `Footer.tsx`, `Contact.tsx`, `EmergencyFloatingButton.tsx`, `EmergencySplash.tsx` → `useSettings()` for phones / email / address
- `src/lib/contact.ts` — re-export the static fallback values so any non-React caller (currently none) still has a constant. The exported names (`TCL_PHONE_PRIMARY`, `TCL_PHONE_SECONDARY`) stay for backward compatibility but now read from `staticSettings`.

`TeamMember` type in `src/data/team.ts` gains nothing new — the API normalizes `image_url` → `image` in `fetchTeam` so consumers see the same shape.

### Environment

Frontend:
- `.env.local`: `VITE_API_URL=http://localhost:8000`
- `.env.production` (or host env panel): `VITE_API_URL=https://api.tannjes.com`

Backend (`.env`):
- `APP_URL=https://api.tannjes.com` (must match deployed origin — image URLs depend on this)
- `DB_CONNECTION=mysql`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (consumed only by `AdminUserSeeder`)

### Frontend tests

Two new tests:
- `useTeam.test.tsx` — when `fetchTeam` rejects, hook returns `staticTeam`.
- `useSettings.test.tsx` — when `fetchSettings` rejects, hook returns `staticSettings`.

Existing 25 tests stay untouched; the hooks return synchronously-available fallback data on first render in jsdom (React Query's `data` is `undefined` initially → `?? staticTeam`).

## Local dev workflow

1. Backend: `cd ../tannjes-care-portal-backend && php artisan serve` (port 8000). MySQL via local phpMyAdmin, `root` user, no password — credentials only in local `.env`, never committed.
2. Frontend: `npm run dev` (port 8080) — existing config.
3. `php artisan storage:link` once per machine.
4. CORS in `config/cors.php` includes `http://localhost:8080`.

## Deploy notes (informational, not implementation)

- Backend on HostAfrica: upload via FTP or git, point a subdomain at `public/`, run `php artisan migrate --seed` and `php artisan storage:link`, set production `.env`.
- Frontend: set `VITE_API_URL` to the backend subdomain, rebuild.
- First-deploy smoke test: hit `https://api.tannjes.com/api/team` and `/api/settings` directly, then load the deployed frontend with devtools open and confirm both fetches succeed.

## Risks

- **CORS misconfigured on prod.** Symptom: API works in browser tab but frontend gets blocked. Mitigation: explicit post-deploy smoke test from the deployed frontend, not just curl.
- **`APP_URL` wrong in production `.env`.** Symptom: image URLs return 404 or wrong host. Mitigation: post-deploy checklist item; the value is set once and rarely changes.
- **Static fallback drift.** Over months, the seeded values diverge from the DB. Acceptable — only matters during full backend outage, and the seeder file is a clear one-page reference for periodic sync.
- **MySQL on shared hosting connection limits.** Unlikely at this traffic, but if it ever bites, switching to Laravel's built-in cache for the two endpoints is a 5-line fix.

## Out of scope (deferred)

- API authentication / rate limiting beyond defaults
- Other content types (services, departments, testimonials, blog) — stay static
- Multi-admin, roles, audit log, draft/publish, scheduled publish
- Image optimization, responsive image variants, CDN delivery
- Per-doctor profile pages (still deferred from sub-project 2)
- Automated CI/CD, infra-as-code, staging environment
- Frontend SSR / build-time data fetch
