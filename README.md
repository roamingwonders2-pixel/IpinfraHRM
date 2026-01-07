# Ipinfra Networks HRM

Laravel + Inertia (React) HRM platform with multi-module HR workflows, roles/permissions, localization, and many payment gateway integrations.

## Tech Stack

- Backend: Laravel 12 (PHP 8.2+)
- Frontend: React 19 + Inertia.js + Vite
- Styling: Tailwind CSS
- Database: MySQL (default in `.env`)
- Background jobs: Laravel queue

## Features (high level)

- HR core: employees, departments, roles/permissions, documents, announcements
- Attendance/leave, performance reviews, goals, training, assets, payroll artifacts
- Recruitment pipeline: jobs, candidates, interviews, onboarding
- SaaS plans/subscriptions, coupons, referrals
- Many payment gateways (Stripe, PayPal, Razorpay, Paytabs, etc.)
- Multi-language UI and translation endpoints

## Requirements

- PHP 8.2+
- Composer
- Node.js 18+ and npm
- MySQL (or update `.env` for another driver)

## Setup

```bash
cd /mnt/c/Users/Garcia/Documents/ipinfra/hrmSoft/main-file
composer install
npm install
```

Update environment settings in `.env` (DB credentials, APP_URL, mail, payment keys, etc.).

Generate app key (if needed) and migrate:

```bash
php artisan key:generate
php artisan migrate
```

Optional seed data:

```bash
php artisan db:seed
```

If you use file uploads:

```bash
php artisan storage:link
```

## Run Locally (Dev)

Single command (recommended):

```bash
composer dev
```

This starts:
- Laravel dev server
- Queue listener
- Pail logs
- Vite dev server

Then open `http://127.0.0.1:8000`.

## Build for Production

```bash
npm run build
php artisan optimize
```

Serve the app with your web server pointing to `public/`.

## Testing

```bash
php artisan test
```

## Project Structure

- `app/` Laravel application code (controllers, models, etc.)
- `routes/` Web/auth/console routes
- `resources/` React frontend, CSS, and Inertia pages
- `database/` Migrations and extensive seeders
- `public/` Web root
- `build-ui/` Build UI helper scripts

## Notes

- The repo already includes `.env`; keep secrets out of version control.
- Many payment gateways are wired in routes/controllers; enable only the ones you configure in `.env` and `config/services.php`.
