# Backend CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a Laravel + Filament admin in a sibling repo that exposes two public read-only JSON endpoints (team + settings), and wire the React frontend to consume them with a static fallback.

**Architecture:** Two repos. Backend at `../tannjes-care-portal-backend` (Laravel 11 + Filament 3, MySQL). Public API: `GET /api/team`, `GET /api/settings`. Filament admin at `/admin` for editing. Frontend uses React Query hooks that fall back to bundled static data on fetch failure, so the site never breaks.

**Tech Stack:** Laravel 11, Filament 3, PHP 8.2+, MySQL (HostAfrica prod, local `root`/no-password dev), Vite + React 18 + TypeScript, @tanstack/react-query (already installed).

**Spec:** [docs/superpowers/specs/2026-05-03-backend-cms-design.md](../specs/2026-05-03-backend-cms-design.md)

---

## File map

**Backend repo (`../tannjes-care-portal-backend/`) — all NEW:**
- `database/migrations/*_create_team_members_table.php`
- `database/migrations/*_create_settings_table.php`
- `app/Models/TeamMember.php`
- `app/Models/Setting.php`
- `app/Http/Controllers/Api/TeamController.php`
- `app/Http/Controllers/Api/SettingsController.php`
- `routes/api.php` (modified — Laravel 11 needs to be told API routes exist)
- `database/seeders/TeamMemberSeeder.php`
- `database/seeders/SettingSeeder.php`
- `database/seeders/AdminUserSeeder.php`
- `database/seeders/DatabaseSeeder.php` (modified)
- `app/Filament/Resources/TeamMemberResource.php` + auto-generated pages
- `app/Filament/Pages/SiteSettings.php`
- `tests/Feature/Api/TeamEndpointTest.php`
- `tests/Feature/Api/SettingsEndpointTest.php`
- `config/cors.php` (modified)
- `.env` / `.env.example` (modified)

**Frontend repo (this repo):**
- `src/data/settings.ts` (NEW)
- `src/lib/api.ts` (NEW)
- `src/hooks/useTeam.ts` (NEW)
- `src/hooks/useSettings.ts` (NEW)
- `src/hooks/useTeam.test.tsx` (NEW)
- `src/hooks/useSettings.test.tsx` (NEW)
- `src/lib/contact.ts` (MODIFIED — re-export static fallback)
- `src/components/site/TeamPreview.tsx` (MODIFIED)
- `src/pages/Team.tsx` (MODIFIED)
- `src/components/site/Hero.tsx` (MODIFIED)
- `src/components/site/Navbar.tsx` (MODIFIED)
- `src/components/site/MobileBookCTA.tsx` (MODIFIED)
- `src/components/site/Footer.tsx` (MODIFIED)
- `src/components/site/Contact.tsx` (MODIFIED)
- `src/components/site/EmergencyFloatingButton.tsx` (MODIFIED)
- `src/components/site/EmergencySplash.tsx` (MODIFIED)
- `.env.local` (NEW — gitignored)
- `.env.example` (NEW or MODIFIED)

---

## Task 1: Scaffold backend repo + Laravel + Filament

**Files:**
- Create: `../tannjes-care-portal-backend/` (whole new Laravel app)

- [ ] **Step 1: Create the project (run from the parent directory of this repo)**

```bash
cd ..
composer create-project laravel/laravel tannjes-care-portal-backend
cd tannjes-care-portal-backend
git init && git add -A && git commit -m "chore: initial Laravel scaffold"
```

Expected: a fresh Laravel 11 app in `../tannjes-care-portal-backend/`.

- [ ] **Step 2: Configure local MySQL in `.env`**

Edit `../tannjes-care-portal-backend/.env`:

```
APP_NAME="Tannjes Backend"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tannjes_backend
DB_USERNAME=root
DB_PASSWORD=

ADMIN_EMAIL=admin@tannjes.local
ADMIN_PASSWORD=changeme123
```

Create the database in phpMyAdmin: `tannjes_backend` (utf8mb4).

- [ ] **Step 3: Install Filament**

```bash
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels
```

When prompted for panel id, accept `admin`. This generates `app/Providers/Filament/AdminPanelProvider.php`.

- [ ] **Step 4: Smoke test**

```bash
php artisan serve
```

Expected: server starts on `http://localhost:8000`. Hit it in a browser; default Laravel welcome page renders. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: install Filament panel and configure mysql"
```

---

## Task 2: `team_members` migration + model

**Files:**
- Create: `../tannjes-care-portal-backend/database/migrations/<timestamp>_create_team_members_table.php`
- Create: `../tannjes-care-portal-backend/app/Models/TeamMember.php`

- [ ] **Step 1: Generate the migration**

```bash
php artisan make:model TeamMember -m
```

This creates the model and a migration file.

- [ ] **Step 2: Fill in the migration**

Edit the generated `database/migrations/*_create_team_members_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->text('bio');
            $table->string('credentials')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
```

- [ ] **Step 3: Fill in the model**

Edit `app/Models/TeamMember.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'role', 'bio', 'credentials', 'image', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
```

- [ ] **Step 4: Run the migration**

```bash
php artisan migrate
```

Expected: `team_members` table created.

- [ ] **Step 5: Commit**

```bash
git add database/migrations app/Models/TeamMember.php
git commit -m "feat: add team_members migration and model"
```

---

## Task 3: `settings` migration + model

**Files:**
- Create: `../tannjes-care-portal-backend/database/migrations/<timestamp>_create_settings_table.php`
- Create: `../tannjes-care-portal-backend/app/Models/Setting.php`

- [ ] **Step 1: Generate model + migration**

```bash
php artisan make:model Setting -m
```

- [ ] **Step 2: Fill in migration**

Edit the generated `*_create_settings_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
```

- [ ] **Step 3: Fill in model**

Edit `app/Models/Setting.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function get(string $key, ?string $default = null): ?string
    {
        return static::where('key', $key)->value('value') ?? $default;
    }

    public static function set(string $key, ?string $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
```

- [ ] **Step 4: Run migration**

```bash
php artisan migrate
```

Expected: `settings` table created.

- [ ] **Step 5: Commit**

```bash
git add database/migrations app/Models/Setting.php
git commit -m "feat: add settings key-value migration and model"
```

---

## Task 4: Seeders (team + settings + admin)

**Files:**
- Create: `../tannjes-care-portal-backend/database/seeders/TeamMemberSeeder.php`
- Create: `../tannjes-care-portal-backend/database/seeders/SettingSeeder.php`
- Create: `../tannjes-care-portal-backend/database/seeders/AdminUserSeeder.php`
- Modify: `../tannjes-care-portal-backend/database/seeders/DatabaseSeeder.php`

- [ ] **Step 1: Generate seeders**

```bash
php artisan make:seeder TeamMemberSeeder
php artisan make:seeder SettingSeeder
php artisan make:seeder AdminUserSeeder
```

- [ ] **Step 2: Fill in `TeamMemberSeeder`**

Edit `database/seeders/TeamMemberSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            ['name' => 'Dr. Adaeze Okonkwo', 'role' => 'Medical Director, General Medicine', 'bio' => '20+ years leading concierge medical care in Abuja and beyond.'],
            ['name' => 'Dr. Ibrahim Bello', 'role' => 'Consultant, Geriatrics', 'bio' => 'Specialist in elderly comfort care and rehabilitative medicine.'],
            ['name' => 'Nurse Funmi Adeyemi', 'role' => 'Lead Nurse, Skilled Nursing', 'bio' => 'Expert in post-operative and tube-feeding nutrition therapy.'],
            ['name' => 'Dr. Chiamaka Eze', 'role' => 'Consultant, Paediatrics', 'bio' => 'Newborn and family-care specialist with a focus on caregiver training.'],
        ];

        foreach ($members as $i => $m) {
            TeamMember::updateOrCreate(
                ['name' => $m['name']],
                [...$m, 'sort_order' => $i + 1, 'is_active' => true],
            );
        }
    }
}
```

- [ ] **Step 3: Fill in `SettingSeeder`**

Edit `database/seeders/SettingSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'phone_primary' => '+2347019090013',
            'phone_secondary' => '+2347086113160',
            'email' => 'tannjes03@gmail.com',
            'address' => 'Drive 2, 1st Crescent, 3rd Avenue, House 38, Prince and Princess Estate, Kaura District, Abuja',
        ];

        foreach ($defaults as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
```

- [ ] **Step 4: Fill in `AdminUserSeeder`**

Edit `database/seeders/AdminUserSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@tannjes.local');
        $password = env('ADMIN_PASSWORD', 'changeme123');

        User::updateOrCreate(
            ['email' => $email],
            ['name' => 'Admin', 'password' => Hash::make($password)],
        );
    }
}
```

- [ ] **Step 5: Wire seeders into `DatabaseSeeder`**

Edit `database/seeders/DatabaseSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            TeamMemberSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
```

- [ ] **Step 6: Run seeders**

```bash
php artisan migrate:fresh --seed
```

Expected: tables recreated, 4 team rows, 4 settings rows, 1 admin user.

- [ ] **Step 7: Commit**

```bash
git add database/seeders
git commit -m "feat: seed team, settings, admin user"
```

---

## Task 5: API team endpoint (TDD)

**Files:**
- Create: `../tannjes-care-portal-backend/tests/Feature/Api/TeamEndpointTest.php`
- Create: `../tannjes-care-portal-backend/app/Http/Controllers/Api/TeamController.php`
- Modify: `../tannjes-care-portal-backend/routes/api.php` (or `bootstrap/app.php` for Laravel 11)

- [ ] **Step 1: Enable API routes (Laravel 11)**

Laravel 11 doesn't ship `routes/api.php` by default. Run:

```bash
php artisan install:api
```

Expected: creates `routes/api.php` and updates `bootstrap/app.php` to register it. (If prompted to install Sanctum, accept; we don't use it but it's harmless.)

- [ ] **Step 2: Write the failing feature test**

Create `tests/Feature/Api/TeamEndpointTest.php`:

```php
<?php

namespace Tests\Feature\Api;

use App\Models\TeamMember;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeamEndpointTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_active_members_ordered_by_sort_order(): void
    {
        TeamMember::create(['name' => 'B', 'role' => 'r', 'bio' => 'b', 'sort_order' => 2, 'is_active' => true]);
        TeamMember::create(['name' => 'A', 'role' => 'r', 'bio' => 'b', 'sort_order' => 1, 'is_active' => true]);
        TeamMember::create(['name' => 'Hidden', 'role' => 'r', 'bio' => 'b', 'sort_order' => 3, 'is_active' => false]);

        $response = $this->getJson('/api/team');

        $response->assertOk();
        $response->assertJsonCount(2);
        $response->assertJsonPath('0.name', 'A');
        $response->assertJsonPath('1.name', 'B');
        $response->assertJsonStructure([
            ['name', 'role', 'bio', 'credentials', 'image_url', 'sort_order'],
        ]);
    }

    public function test_image_url_is_absolute_when_image_set(): void
    {
        config(['app.url' => 'https://api.example.com']);
        TeamMember::create(['name' => 'A', 'role' => 'r', 'bio' => 'b', 'image' => 'team/a.jpg', 'sort_order' => 1, 'is_active' => true]);

        $response = $this->getJson('/api/team');

        $response->assertJsonPath('0.image_url', 'https://api.example.com/storage/team/a.jpg');
    }

    public function test_image_url_is_null_when_image_unset(): void
    {
        TeamMember::create(['name' => 'A', 'role' => 'r', 'bio' => 'b', 'sort_order' => 1, 'is_active' => true]);

        $response = $this->getJson('/api/team');

        $response->assertJsonPath('0.image_url', null);
    }
}
```

- [ ] **Step 3: Run test to confirm failure**

```bash
php artisan test --filter=TeamEndpointTest
```

Expected: FAIL — route `/api/team` does not exist (404).

- [ ] **Step 4: Create the controller**

Create `app/Http/Controllers/Api/TeamController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;

class TeamController extends Controller
{
    public function index()
    {
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
                    ? rtrim(config('app.url'), '/').'/storage/'.$m->image
                    : null,
                'sort_order' => $m->sort_order,
            ]);
    }
}
```

- [ ] **Step 5: Register the route**

Edit `routes/api.php`:

```php
<?php

use App\Http\Controllers\Api\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('/team', [TeamController::class, 'index']);
```

- [ ] **Step 6: Run test to confirm pass**

```bash
php artisan test --filter=TeamEndpointTest
```

Expected: 3 PASS.

- [ ] **Step 7: Commit**

```bash
git add app/Http/Controllers/Api/TeamController.php routes/api.php tests/Feature/Api/TeamEndpointTest.php bootstrap/app.php
git commit -m "feat: GET /api/team endpoint"
```

---

## Task 6: API settings endpoint (TDD)

**Files:**
- Create: `../tannjes-care-portal-backend/tests/Feature/Api/SettingsEndpointTest.php`
- Create: `../tannjes-care-portal-backend/app/Http/Controllers/Api/SettingsController.php`
- Modify: `../tannjes-care-portal-backend/routes/api.php`

- [ ] **Step 1: Write the failing feature test**

Create `tests/Feature/Api/SettingsEndpointTest.php`:

```php
<?php

namespace Tests\Feature\Api;

use App\Models\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingsEndpointTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_key_value_map(): void
    {
        Setting::create(['key' => 'phone_primary', 'value' => '+1']);
        Setting::create(['key' => 'email', 'value' => 'a@b.c']);

        $response = $this->getJson('/api/settings');

        $response->assertOk();
        $response->assertExactJson([
            'phone_primary' => '+1',
            'email' => 'a@b.c',
        ]);
    }

    public function test_returns_empty_object_when_no_settings(): void
    {
        $response = $this->getJson('/api/settings');

        $response->assertOk();
        $response->assertExactJson([]);
    }
}
```

- [ ] **Step 2: Run test to confirm failure**

```bash
php artisan test --filter=SettingsEndpointTest
```

Expected: FAIL — 404.

- [ ] **Step 3: Create the controller**

Create `app/Http/Controllers/Api/SettingsController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;

class SettingsController extends Controller
{
    public function index()
    {
        return Setting::pluck('value', 'key');
    }
}
```

- [ ] **Step 4: Register the route**

Append to `routes/api.php`:

```php
use App\Http\Controllers\Api\SettingsController;

Route::get('/settings', [SettingsController::class, 'index']);
```

(Keep the existing `TeamController` route.)

- [ ] **Step 5: Run test to confirm pass**

```bash
php artisan test --filter=SettingsEndpointTest
```

Expected: 2 PASS.

- [ ] **Step 6: Commit**

```bash
git add app/Http/Controllers/Api/SettingsController.php routes/api.php tests/Feature/Api/SettingsEndpointTest.php
git commit -m "feat: GET /api/settings endpoint"
```

---

## Task 7: CORS + storage symlink

**Files:**
- Modify: `../tannjes-care-portal-backend/config/cors.php`
- Run: `php artisan storage:link`

- [ ] **Step 1: Publish CORS config (Laravel 11 doesn't ship one by default)**

```bash
php artisan config:publish cors
```

This creates `config/cors.php`. (If the command isn't available on your Laravel version, the file may already exist — skip to step 2.)

- [ ] **Step 2: Edit `config/cors.php`**

Replace the file contents with:

```php
<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['GET'],
    'allowed_origins' => [
        'http://localhost:8080',
        env('FRONTEND_URL', ''),
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

Filter out empty origins by adding to `.env`:

```
FRONTEND_URL=
```

(Leave empty for now; set to production frontend URL on deploy.)

- [ ] **Step 3: Symlink public storage**

```bash
php artisan storage:link
```

Expected: `public/storage` → `storage/app/public`. Files saved by Filament will now serve from `/storage/...`.

- [ ] **Step 4: Manual smoke test**

```bash
php artisan serve
```

In another terminal:

```bash
curl -i http://localhost:8000/api/team
curl -i http://localhost:8000/api/settings
```

Expected: 200 with JSON arrays/objects from the seeded data.

Stop the server.

- [ ] **Step 5: Commit**

```bash
git add config/cors.php .env.example
git commit -m "chore: configure CORS for frontend and link storage"
```

---

## Task 8: Filament `TeamMemberResource`

**Files:**
- Create: `../tannjes-care-portal-backend/app/Filament/Resources/TeamMemberResource.php` (+ generated pages)

- [ ] **Step 1: Generate the resource**

```bash
php artisan make:filament-resource TeamMember --generate
```

Accept defaults. This creates:
- `app/Filament/Resources/TeamMemberResource.php`
- `app/Filament/Resources/TeamMemberResource/Pages/{ListTeamMembers,CreateTeamMember,EditTeamMember}.php`

- [ ] **Step 2: Customize the resource**

Replace `app/Filament/Resources/TeamMemberResource.php` with:

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TeamMemberResource\Pages;
use App\Models\TeamMember;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TeamMemberResource extends Resource
{
    protected static ?string $model = TeamMember::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->required()->maxLength(255),
            Forms\Components\TextInput::make('role')->required()->maxLength(255),
            Forms\Components\Textarea::make('bio')->required()->rows(4),
            Forms\Components\TextInput::make('credentials')->maxLength(255),
            Forms\Components\FileUpload::make('image')
                ->image()
                ->directory('team')
                ->disk('public')
                ->imageEditor(),
            Forms\Components\Toggle::make('is_active')->default(true),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\ImageColumn::make('image')->disk('public')->circular(),
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('role')->searchable(),
                Tables\Columns\ToggleColumn::make('is_active'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTeamMembers::route('/'),
            'create' => Pages\CreateTeamMember::route('/create'),
            'edit' => Pages\EditTeamMember::route('/{record}/edit'),
        ];
    }
}
```

- [ ] **Step 3: Manual smoke test**

```bash
php artisan serve
```

Visit `http://localhost:8000/admin`, log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`. Confirm:
- "Team Members" appears in the nav
- The 4 seeded members are listed
- You can drag rows to reorder
- Editing a member, uploading an image, and saving works
- The image appears in `storage/app/public/team/`

Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/Filament
git commit -m "feat: filament resource for team members"
```

---

## Task 9: Filament `SiteSettings` page

**Files:**
- Create: `../tannjes-care-portal-backend/app/Filament/Pages/SiteSettings.php`
- Create: `../tannjes-care-portal-backend/resources/views/filament/pages/site-settings.blade.php`

- [ ] **Step 1: Generate the page**

```bash
php artisan make:filament-page SiteSettings
```

Accept defaults. Creates the PHP file and a blade view.

- [ ] **Step 2: Replace the page class**

Edit `app/Filament/Pages/SiteSettings.php`:

```php
<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class SiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static string $view = 'filament.pages.site-settings';
    protected static ?string $title = 'Site Settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'phone_primary' => Setting::get('phone_primary'),
            'phone_secondary' => Setting::get('phone_secondary'),
            'email' => Setting::get('email'),
            'address' => Setting::get('address'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('phone_primary')->label('Primary phone')->tel(),
                TextInput::make('phone_secondary')->label('Secondary phone')->tel(),
                TextInput::make('email')->email(),
                Textarea::make('address')->rows(3),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        foreach ($this->form->getState() as $key => $value) {
            Setting::set($key, $value);
        }

        Notification::make()->title('Saved')->success()->send();
    }
}
```

- [ ] **Step 3: Replace the blade view**

Edit `resources/views/filament/pages/site-settings.blade.php`:

```blade
<x-filament-panels::page>
    <form wire:submit="save">
        {{ $this->form }}

        <div class="mt-6">
            <x-filament::button type="submit">Save</x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
```

- [ ] **Step 4: Manual smoke test**

```bash
php artisan serve
```

Visit `/admin`. Confirm:
- "Site Settings" appears in nav
- The four current values are pre-filled
- Editing and saving persists (re-open the page and values match)
- `curl http://localhost:8000/api/settings` reflects the new values

Stop the server.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Pages resources/views/filament
git commit -m "feat: filament page for editing site settings"
```

---

## Task 10: Frontend static fallback + API helpers

**Files:**
- Create: `c:/Users/ADMIN/Downloads/tannjes-care-portal-main/src/data/settings.ts`
- Create: `c:/Users/ADMIN/Downloads/tannjes-care-portal-main/src/lib/api.ts`
- Create: `c:/Users/ADMIN/Downloads/tannjes-care-portal-main/.env.example`
- Create: `c:/Users/ADMIN/Downloads/tannjes-care-portal-main/.env.local`

- [ ] **Step 1: Create `src/data/settings.ts`**

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

- [ ] **Step 2: Create `src/lib/api.ts`**

```ts
import type { TeamMember } from "@/data/team";
import type { Settings } from "@/data/settings";

const BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

type ApiTeamMember = {
  name: string;
  role: string;
  bio: string;
  credentials: string | null;
  image_url: string | null;
  sort_order: number;
};

export const fetchTeam = async (): Promise<TeamMember[]> => {
  if (!BASE) throw new Error("VITE_API_URL not set");
  const r = await fetch(`${BASE}/api/team`);
  if (!r.ok) throw new Error(`team ${r.status}`);
  const data = (await r.json()) as ApiTeamMember[];
  return data.map((m) => ({
    name: m.name,
    role: m.role,
    bio: m.bio,
    credentials: m.credentials ?? undefined,
    image: m.image_url ?? "",
  }));
};

export const fetchSettings = async (): Promise<Settings> => {
  if (!BASE) throw new Error("VITE_API_URL not set");
  const r = await fetch(`${BASE}/api/settings`);
  if (!r.ok) throw new Error(`settings ${r.status}`);
  return (await r.json()) as Settings;
};
```

- [ ] **Step 3: Create `.env.example` and `.env.local`**

`.env.example`:
```
VITE_API_URL=http://localhost:8000
```

`.env.local`:
```
VITE_API_URL=http://localhost:8000
```

Confirm `.env.local` is gitignored (Vite's default `.gitignore` covers it).

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/settings.ts src/lib/api.ts .env.example
git commit -m "feat: settings static fallback and api fetch helpers"
```

---

## Task 11: `useTeam` hook with fallback (TDD)

**Files:**
- Create: `src/hooks/useTeam.ts`
- Create: `src/hooks/useTeam.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/hooks/useTeam.test.tsx`:

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTeam } from "./useTeam";
import { team as staticTeam } from "@/data/team";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useTeam", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns static fallback while loading", () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useTeam(), { wrapper });
    expect(result.current).toEqual(staticTeam);
  });

  it("returns static fallback when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("boom"));
    const { result } = renderHook(() => useTeam(), { wrapper });
    await waitFor(() => expect(result.current).toEqual(staticTeam));
  });

  it("returns api data when fetch succeeds", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => [
        { name: "Dr. X", role: "r", bio: "b", credentials: null, image_url: "https://h/storage/x.jpg", sort_order: 1 },
      ],
    });
    const { result } = renderHook(() => useTeam(), { wrapper });
    await waitFor(() => expect(result.current[0].name).toBe("Dr. X"));
    expect(result.current[0].image).toBe("https://h/storage/x.jpg");
  });
});
```

Note: vitest config must allow JSX in `.tsx` test files (it does — see `vitest.config.ts`).

- [ ] **Step 2: Run test to confirm failure**

```bash
npx vitest run src/hooks/useTeam.test.tsx
```

Expected: FAIL — `useTeam` not found.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useTeam.ts`:

```ts
import { useQuery } from "@tanstack/react-query";
import { fetchTeam } from "@/lib/api";
import { team as staticTeam, type TeamMember } from "@/data/team";

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

For the test, `VITE_API_URL` must be set in the test environment so `fetchTeam` doesn't short-circuit. Add to `src/test/setup.ts`:

```ts
import.meta.env.VITE_API_URL = "http://localhost:8000";
```

(If `src/test/setup.ts` doesn't already use `import.meta.env`, append the line at the top.)

- [ ] **Step 4: Run test to confirm pass**

```bash
npx vitest run src/hooks/useTeam.test.tsx
```

Expected: 3 PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTeam.ts src/hooks/useTeam.test.tsx src/test/setup.ts
git commit -m "feat: useTeam hook with static fallback"
```

---

## Task 12: `useSettings` hook with fallback (TDD)

**Files:**
- Create: `src/hooks/useSettings.ts`
- Create: `src/hooks/useSettings.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/hooks/useSettings.test.tsx`:

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSettings } from "./useSettings";
import { settings as staticSettings } from "@/data/settings";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useSettings", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns static fallback when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("boom"));
    const { result } = renderHook(() => useSettings(), { wrapper });
    await waitFor(() => expect(result.current).toEqual(staticSettings));
  });

  it("merges api data over fallback per-key", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ phone_primary: "+1" }),
    });
    const { result } = renderHook(() => useSettings(), { wrapper });
    await waitFor(() => expect(result.current.phone_primary).toBe("+1"));
    expect(result.current.email).toBe(staticSettings.email);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/hooks/useSettings.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useSettings.ts`:

```ts
import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "@/lib/api";
import { settings as staticSettings, type Settings } from "@/data/settings";

export const useSettings = (): Settings => {
  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return { ...staticSettings, ...(data ?? {}) };
};
```

- [ ] **Step 4: Run to confirm pass**

```bash
npx vitest run src/hooks/useSettings.test.tsx
```

Expected: 2 PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useSettings.ts src/hooks/useSettings.test.tsx
git commit -m "feat: useSettings hook with per-key static fallback"
```

---

## Task 13: Refactor `src/lib/contact.ts` to read fallback

**Files:**
- Modify: `src/lib/contact.ts`

- [ ] **Step 1: Replace contents of `src/lib/contact.ts`**

```ts
import { settings } from "@/data/settings";

export const TCL_PHONE_PRIMARY = settings.phone_primary;
export const TCL_PHONE_SECONDARY = settings.phone_secondary;
export const TCL_EMAIL = settings.email;
export const TCL_WHATSAPP_NUMBER = settings.phone_primary.replace(/^\+/, "");

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${TCL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl({ subject, body }: { subject: string; body: string }): string {
  return `mailto:${TCL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

The exported names stay identical so any non-React caller continues to work unchanged.

- [ ] **Step 2: Run test suite**

```bash
npm run test
```

Expected: all existing 25+ tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/lib/contact.ts
git commit -m "refactor: contact constants read from settings static fallback"
```

---

## Task 14: Wire team consumers to `useTeam`

**Files:**
- Modify: `src/components/site/TeamPreview.tsx`
- Modify: `src/pages/Team.tsx`

- [ ] **Step 1: Modify `src/components/site/TeamPreview.tsx`**

Find the existing `import { team } from "@/data/team";` line (or `import { team, type TeamMember } from "@/data/team";`). Replace with:

```ts
import { useTeam } from "@/hooks/useTeam";
```

Inside the component function, add as the first line:

```ts
const team = useTeam();
```

Remove the now-unused `team` import. Leave the `TeamMember` type import if it was being used.

- [ ] **Step 2: Modify `src/pages/Team.tsx`**

Find the `import { team } from "@/data/team";` line. Replace with:

```ts
import { useTeam } from "@/hooks/useTeam";
```

Inside the component, add `const team = useTeam();` as the first line of the function body.

- [ ] **Step 3: Run tests**

```bash
npm run test
```

Expected: all tests still pass. Existing tests render via the same `QueryClientProvider` set up in `App.tsx`, but for unit tests of these components we need `team` to be present synchronously — `useTeam()` returns the static fallback on first render, so no test changes needed.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

Visit `/` (TeamPreview shows 4 doctors) and `/team` (slider works). With backend off, the static fallback is used. With backend on (`php artisan serve` in the other repo), data comes from the API. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/TeamPreview.tsx src/pages/Team.tsx
git commit -m "refactor: team consumers use useTeam hook"
```

---

## Task 15: Wire settings consumers to `useSettings`

**Files:**
- Modify: `src/components/site/Hero.tsx`
- Modify: `src/components/site/Navbar.tsx`
- Modify: `src/components/site/MobileBookCTA.tsx`
- Modify: `src/components/site/Footer.tsx`
- Modify: `src/components/site/Contact.tsx`
- Modify: `src/components/site/EmergencyFloatingButton.tsx`
- Modify: `src/components/site/EmergencySplash.tsx`

For each file, the pattern is:
1. Replace `import { TCL_PHONE_PRIMARY, TCL_PHONE_SECONDARY, TCL_EMAIL } from "@/lib/contact";` (only the constants the file actually uses) with `import { useSettings } from "@/hooks/useSettings";`.
2. Inside the component, add `const settings = useSettings();` near the top.
3. Replace usages: `TCL_PHONE_PRIMARY` → `settings.phone_primary`, `TCL_PHONE_SECONDARY` → `settings.phone_secondary`, `TCL_EMAIL` → `settings.email`.
4. If the file uses `buildWhatsAppUrl` or `buildMailtoUrl` from `@/lib/contact`, leave those imports alone.

Special case for `EmergencySplash.tsx`: it currently imports `TCL_PHONE_PRIMARY` and `TCL_PHONE_SECONDARY` for the `tel:` links. Same pattern — swap to `useSettings()`.

- [ ] **Step 1: Update `src/components/site/Hero.tsx`**

Apply the pattern. (Open file, find imports, swap, insert hook call.)

- [ ] **Step 2: Update `src/components/site/Navbar.tsx`**

Apply the pattern.

- [ ] **Step 3: Update `src/components/site/MobileBookCTA.tsx`**

Apply the pattern.

- [ ] **Step 4: Update `src/components/site/Footer.tsx`**

Apply the pattern.

- [ ] **Step 5: Update `src/components/site/Contact.tsx`**

Apply the pattern.

- [ ] **Step 6: Update `src/components/site/EmergencyFloatingButton.tsx`**

Apply the pattern.

- [ ] **Step 7: Update `src/components/site/EmergencySplash.tsx`**

Apply the pattern. The `formatNumber` helper continues to take a string and is unchanged.

- [ ] **Step 8: Lint and test**

```bash
npm run lint
npm run test
```

Expected: lint clean on touched files, all tests pass.

- [ ] **Step 9: Manual smoke test**

```bash
npm run dev
```

With backend off: site uses static fallback (looks identical to before). With backend on (`php artisan serve` in the sibling repo), edit `phone_primary` in Filament, refresh the frontend, confirm Hero/Navbar/Footer/Contact/Emergency components all show the new number.

- [ ] **Step 10: Commit**

```bash
git add src/components/site/Hero.tsx src/components/site/Navbar.tsx src/components/site/MobileBookCTA.tsx src/components/site/Footer.tsx src/components/site/Contact.tsx src/components/site/EmergencyFloatingButton.tsx src/components/site/EmergencySplash.tsx
git commit -m "refactor: settings consumers use useSettings hook"
```

---

## Task 16: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Backend full test run**

```bash
cd ../tannjes-care-portal-backend
php artisan test
```

Expected: all tests pass (5+ tests across 2 feature files plus any default Laravel tests).

- [ ] **Step 2: Frontend full test run**

```bash
cd ../tannjes-care-portal-main   # or wherever this repo lives
npm run lint
npm run test
```

Expected: lint clean, all 25+ tests pass (the 2 new hook tests included).

- [ ] **Step 3: End-to-end smoke**

In one terminal: `cd ../tannjes-care-portal-backend && php artisan serve`
In another: `npm run dev` (this repo)

Walk through:
- `/` and `/team` show 4 doctors
- Footer/Hero/Navbar/Contact show contact info
- Emergency splash phone numbers tap-to-call
- Open `http://localhost:8000/admin`, log in, change a doctor's bio, refresh `/team` → updated
- Change `email` in Site Settings, refresh `/contact` → updated
- Stop the backend, refresh the frontend → static fallback values render, site still works

- [ ] **Step 4: Final commit (if any)**

If any small fixes were needed during smoke test, commit them. Otherwise nothing to commit.

---

## Self-review notes

**Spec coverage:**
- Architecture (sibling repo) → Task 1
- `team_members` schema → Task 2
- `settings` key/value schema → Task 3
- Seeders (team + settings + admin) → Task 4
- `GET /api/team` contract → Task 5
- `GET /api/settings` contract → Task 6
- CORS + storage:link → Task 7
- Filament `TeamMemberResource` → Task 8
- Filament `SiteSettings` page → Task 9
- Frontend `src/data/settings.ts` + `src/lib/api.ts` → Task 10
- `useTeam` hook + test → Task 11
- `useSettings` hook + test → Task 12
- `src/lib/contact.ts` reads fallback → Task 13
- Team consumer refactors → Task 14
- Settings consumer refactors → Task 15
- End-to-end smoke → Task 16

All spec sections covered.
