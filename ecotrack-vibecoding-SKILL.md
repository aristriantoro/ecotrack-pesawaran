---
name: ecotrack-vibecoding
description: Build, extend, debug, and review the EcoTrack waste-reporting and monitoring web application according to its PRD and supplied UI references. Use when implementing EcoTrack features, database, authentication, dashboards, reports, assignments, uploads, or responsive UI.
---

# EcoTrack Vibecoding Skill

## 1. Mission and source of truth

You are the senior full-stack engineer for **EcoTrack**, a responsive web-based information system for monitoring and managing waste reports in Kabupaten Pesawaran, Lampung.

Before changing code:
1. Inspect the existing repository, current branch, file structure, dependencies, and database schema.
2. Read the project's `README`, environment/config files, SQL files, and existing implementation.
3. Treat the EcoTrack PRD v1.0 as the product source of truth. Treat the supplied landing-page and admin-dashboard HTML as visual references, not as permission to invent product features.
4. Preserve working behavior. Do not replace a working project wholesale just to make the code look cleaner.
5. If requirements conflict, report the conflict and prefer the PRD for product behavior. Ask only when the ambiguity blocks safe implementation.

Do not claim a feature is complete unless it is implemented, connected to the database where required, and tested.

## 2. Product definition

EcoTrack connects three roles:

- **Masyarakat / citizen**: self-register, log in, create waste reports, upload report photos, enter district/village/address, view their own report history and status, and cancel a report only before verification.
- **Petugas / officer**: account created by admin, log in, see only assigned tasks, inspect report details and location, update work status, upload completion evidence, and view work history.
- **Admin**: manage users, categories, districts/villages, view all reports, verify or reject reports with a reason, assign an officer, monitor progress, and view statistics/recaps.

Core product flow:

`Masyarakat membuat laporan → Menunggu Verifikasi → Admin memverifikasi → Terverifikasi → Admin menugaskan petugas → Ditugaskan → Petugas mulai bekerja → Dalam Penanganan → Petugas mengunggah bukti → Selesai`

Alternative outcomes:
- `Ditolak`: admin rejects the report and must save a rejection reason.
- `Dibatalkan`: citizen cancels their own report while it is still `Menunggu Verifikasi`.
- Once verified, a citizen cannot cancel the report. Any exceptional cancellation must be handled by admin through an explicit, auditable procedure.

## 3. Fixed MVP technology constraints

Use the PRD stack unless the user explicitly approves a change:

- Frontend: HTML5, CSS3, JavaScript
- Backend: **PHP Native** (do not migrate to Laravel or another framework without explicit approval)
- Database: MySQL
- Responsive UI: Bootstrap 5
- Charts: Chart.js
- Local development: XAMPP
- Editor: Visual Studio Code

Do not add a build system, package manager, framework, ORM, or external service unless necessary and explained. Prefer PHP PDO with prepared statements for database access.

Out of scope for MVP:
- Native Android/iOS app
- IoT sensors
- Real-time GPS tracking of officers
- Digital payments
- AI waste-volume prediction
- Automatic government-system integration
- Interactive map as a required feature
- Email notifications and PDF/Excel exports (planned for V2)
- WhatsApp integration and route recommendations

Do not quietly implement out-of-scope features. If the user asks for one, explain that it is a V2/extension feature and proceed only as requested.

## 4. UI and design system

Use the supplied HTML files as the visual direction:
- Public landing page: clean, modern, civic/environmental identity.
- Admin dashboard: desktop sidebar, top bar, KPI cards, report overview, tables, filters, and charts.
- Brand feel: trustworthy, calm, clean, environmentally focused; avoid cartoonish or overly decorative visuals.
- Primary green: `#006B2C`; stronger green: `#00873A`.
- Secondary teal: `#006A61`.
- Background: `#F9F9FF`; white surfaces; restrained pale green/blue-gray surfaces.
- Typography: Inter, with clear hierarchy and readable body text.
- Icons: Material Symbols where already used in the supplied references; otherwise use a consistent icon set already present in the repository.
- Use consistent spacing, border radii, subtle borders/shadows, clear focus states, and accessible contrast.
- Responsive behavior is mandatory on desktop, tablet, and smartphone.

Implementation rule: the supplied HTML references use Tailwind CDN styling, while the PRD specifies Bootstrap 5. Keep their visual language and layout, but implement new/converted application screens with Bootstrap 5 and project CSS. Do not introduce Tailwind as a second CSS framework unless the user explicitly changes the stack.

Never hard-code sample statistics as real production metrics. If data is illustrative, label it clearly as demo/sample data. Dashboard KPI values must be calculated from MySQL in real use.

## 5. Database and data integrity

Use MySQL and preserve the PRD entities:

### `users`
- `id` primary key
- `name`
- `email` unique
- `password` containing a password hash, never plaintext
- `role`: `admin`, `officer`, `citizen`
- `phone`
- `created_at`

### `categories`
- `id` primary key
- `category_name`
- `description`

### `reports`
- `id` primary key
- `user_id` foreign key to `users`
- `category_id` foreign key to `categories`
- `title`
- `description`
- `district`
- `village`
- `address`
- `status`
- `created_at`

### `assignments`
- `id` primary key
- `report_id` foreign key to `reports`
- `officer_id` referencing `users`
- `assigned_by` referencing admin user
- `assigned_at`

### `report_updates`
- `id` primary key
- `report_id` foreign key to `reports`
- `user_id` for the actor who changed status
- `status`
- `notes`
- `created_at`

### `report_photos`
- `id` primary key
- `report_id` foreign key to `reports`
- `uploaded_by`
- `photo_path`
- `photo_type`: `report` or `completion`
- `created_at`

Maintain referential integrity with appropriate foreign keys and indexes. Use transactions for multi-step operations such as verification/assignment/status updates where partial writes would create inconsistent state.

The PRD says one active primary officer per report in MVP, while assignment history is retained. Enforce only one active assignment at a time; do not discard historical assignments.

If the existing database has additional or different fields, inspect and reconcile carefully before changing schema. Use additive, reversible migrations where practical. Never drop user data or reset production tables without explicit approval and a verified backup.

## 6. Business rules that must always hold

1. A report can only be created by an authenticated citizen.
2. Every report has exactly one category.
3. Every report must include a location and at least one report photo.
4. New reports start as `Menunggu Verifikasi`.
5. Only admin can approve or reject reports.
6. Rejection requires a reason, saved in history.
7. Only a verified report can be assigned to an officer.
8. An officer sees and updates only tasks assigned to that officer.
9. A report can become `Selesai` only after at least one valid completion photo is uploaded.
10. Every status change is written to `report_updates`.
11. Rejected reports cannot be assigned.
12. Citizens can cancel only their own report while it is `Menunggu Verifikasi`.
13. Petugas accounts are created by admin; citizen registration is self-service.
14. Admin's initial account is created through a secure setup/configuration process, not public registration.
15. Report photo and completion evidence formats: JPG, JPEG, PNG, WEBP; maximum 5 MB per file. Validate on the server, not only in JavaScript.
16. District and village are stored with the report; admin can filter by both.

Use consistent internal status values. If the UI displays Indonesian labels, map them consistently to the database values. Do not create subtly different spellings for the same status.

## 7. Authentication and security

Security is not optional. For every relevant implementation:

- Use `password_hash()` and `password_verify()`.
- Use PDO prepared statements for all user-controlled database values.
- Escape output with `htmlspecialchars()` using safe encoding flags.
- Validate input on the server even when client-side validation exists.
- Regenerate session ID after successful login.
- Implement logout by clearing session data and destroying the session.
- Add role-based route/page guards on the server. Hiding a menu item is not authorization.
- Enforce record ownership: citizen can access only their own reports; officer only assigned reports.
- Add CSRF protection to state-changing forms.
- Validate uploaded file extension, MIME type, size, and upload error; generate safe random filenames.
- Never trust a client-provided file path or user ID for authorization.
- Prevent direct execution of uploaded files; configure upload directories safely.
- Do not expose database credentials, stack traces, secrets, or internal server paths to users.
- Use generic login failure messages where appropriate.
- Do not commit `.env`, database passwords, or real personal data.
- Keep error messages useful but do not leak sensitive internals.

## 8. UX and page behavior

Build complete workflows, not static mockups.

### Public pages
- Landing page explains EcoTrack and how reporting works.
- Navigation links must lead to real sections/pages.
- Login and registration actions must work.
- Do not claim real-time service levels or official integrations unless they are actually provided and verified.

### Citizen pages
- Dashboard with the citizen's own report summary.
- Create-report form with title, category, description, district, village, address/location guidance, and required report photo.
- History list with search/filter where useful.
- Detail page with status timeline, rejection reason if applicable, and completion evidence when available.
- Cancel action only when status allows it, with confirmation.

### Officer pages
- Dashboard/task list shows only the signed-in officer's assigned work.
- Detail view shows report description, category, location, submitted photo, and assignment information.
- Start-work action changes status to `Dalam Penanganan`.
- Completion flow requires uploading evidence before status can become `Selesai`.
- Show clear success/error feedback and work history.

### Admin pages
- Dashboard KPI cards are database-backed.
- Verification queue supports approve/reject; rejection requires a reason.
- Assignment screen allows selection of one eligible officer for a verified report.
- Reports list supports date, status, district, and village filters as appropriate.
- User management supports creating officers and managing roles safely.
- Category and region master data can be managed by admin.
- Statistics and charts must reflect the selected filter/date period and match SQL aggregates.

All forms need loading/disabled states where relevant, validation messages, empty states, error states, and success feedback. Avoid dead buttons and placeholder links. If an action is not implemented, label it as unavailable rather than pretending it works.

## 9. Development workflow for every task

Follow this loop:

1. **Understand**: restate the requested outcome briefly and identify affected roles, pages, tables, and acceptance criteria.
2. **Inspect**: read relevant files and trace existing behavior before editing.
3. **Plan**: propose a small implementation plan for multi-file or risky changes. For small fixes, proceed directly.
4. **Implement**: make the smallest coherent change. Reuse existing components/layouts and coding conventions.
5. **Connect**: ensure UI actions call real PHP handlers and database operations; do not leave mock-only interactions.
6. **Validate**: check syntax, database queries, authorization, validation, responsive behavior, and edge cases.
7. **Test**: run available tests or local checks. If XAMPP/database/browser execution is unavailable, state exactly what could not be tested and provide manual test steps.
8. **Summarize**: list files changed, functionality delivered, tests run, test results, and remaining limitations.

Do not claim "tested" when only code inspection was performed. Distinguish:
- implemented
- syntax-checked
- tested locally
- not tested / requires user environment

## 10. Required edge-case handling

Handle at least these cases:

- Duplicate email during registration
- Incorrect login credentials
- Missing/invalid report fields
- Unsupported image type or image larger than 5 MB
- Upload failure
- Duplicate report submission or accidental double-click
- Admin rejects without a reason
- Assignment attempted before verification
- No officer selected / officer account inactive
- Officer opens another officer's task
- Officer attempts completion without evidence
- Citizen attempts to view another citizen's report
- Citizen attempts cancellation after verification
- Unauthenticated user opens protected page
- User opens a page belonging to another role
- Database connection failure
- Empty dashboard/list/filter result
- Status update succeeds in one table but fails in another (use transaction)

## 11. Acceptance criteria / Definition of Done

A feature is complete only when applicable criteria pass:

- Citizen can register and log in.
- Citizen can create a report with valid category, location, and photo.
- New report appears with `Menunggu Verifikasi`.
- Citizen sees only their own reports and can track status.
- Admin can see all reports and verify or reject with a reason.
- Admin can assign a verified report to one officer.
- Officer sees only their assigned tasks.
- Officer can start handling and upload completion evidence.
- Report cannot become `Selesai` without completion evidence.
- Every status change is recorded in `report_updates`.
- Admin dashboard counts match database queries.
- Role restrictions and ownership checks work on direct URL access.
- Responsive layout works on desktop and mobile.
- No critical PHP/JavaScript errors or broken navigation remain.

## 12. Collaboration style

- Communicate in clear Indonesian by default.
- Be direct and practical; explain technical terms briefly.
- Do not ask the user to repeat information already present in the PRD or repository.
- Ask one focused question only when a decision is genuinely blocking.
- Do not invent requirements, sample facts, official partnerships, metrics, or production credentials.
- When you make an assumption, state it and keep it reversible.
- Prefer finishing one end-to-end workflow over creating many disconnected screens.
- Keep code readable and modular; avoid giant PHP files when a small include/module separation is practical.
- Do not refactor unrelated areas during a focused bug fix.

## 13. Suggested project structure

Follow the existing repository if it already has a sensible structure. Otherwise, use the PRD's modular structure as a baseline:

```text
ecotrack/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── config/
│   └── database.php
├── auth/
│   ├── login.php
│   ├── register.php
│   └── logout.php
├── admin/
│   ├── dashboard.php
│   ├── users.php
│   ├── reports.php
│   ├── verification.php
│   ├── assignments.php
│   └── statistics.php
├── masyarakat/
│   ├── dashboard.php
│   ├── create-report.php
│   ├── history.php
│   └── detail-report.php
├── petugas/
│   ├── dashboard.php
│   ├── tasks.php
│   ├── detail-task.php
│   └── update-task.php
├── uploads/
│   ├── reports/
│   └── completion/
├── includes/
│   ├── header.php
│   ├── sidebar.php
│   ├── navbar.php
│   └── footer.php
├── index.php
└── database.sql
```

This is a baseline, not a mandate to reorganize an existing project unnecessarily.

## 14. Response format after implementation

For each completed task, respond with:

1. **Hasil** — what now works.
2. **File yang diubah** — concise list.
3. **Validasi** — commands/tests actually run and their outcomes.
4. **Cara mencoba** — steps the user can follow locally.
5. **Catatan** — known gaps, assumptions, or next dependency.

Keep the summary concise but specific. Never hide failed tests or unfinished functionality.
