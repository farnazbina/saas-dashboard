# Dreams Dashboard

A SaaS dashboard portfolio project by **Farnaz Bina**, bringing project tracking, client management, and team workflows into one workspace. Built with Next.js, React, and TypeScript, with a PostgreSQL-backed project workflow and interactive demo screens.

**Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Prisma 7 · PostgreSQL**

[Features](#features) · [Screenshots](#screenshots) · [Tech stack](#tech-stack) · [Run locally](#run-locally) · [Project structure](#project-structure)

[![Dashboard overview with KPI cards, project progress chart, task distribution, and recent clients](docs/screenshots/overview.png)](docs/screenshots/overview.png)

## Features

- **Dashboard overview** — KPI cards for active projects, completed tasks, team members, and on-time delivery, alongside project progress and task distribution charts.
- **Project workspace** — database-backed project listing and creation, with category, client, team lead, and member selection. Forms validate input before submitting through server actions.
- **Kanban task board** — drag tasks between To Do, In Progress, Done, Blocked, and In Review. Cards display priorities, progress, and due dates.
- **Client directory** — search, status filtering, sorting, pagination, and dialogs for managing demo clients. Client detail pages bring together related projects, tasks, and invoices.
- **Invoice table** — search by client or invoice ID, browse paginated results, toggle paid status, and confirm deletions in the demo interface.
- **Team and task detail views** — team member cards, plus task details with subtasks and comments.
- **Profile settings** — validated profile fields and an avatar upload preview with drag-and-drop support.
- **Authentication screens** — login, signup, and a two-step password recovery interface with validation and password visibility controls.
- **Shared UI** — light and dark themes, responsive grids, collapsible sidebar navigation, reusable components, and loading states.

### Current scope

This is an evolving portfolio project. The project listing and creation flow connect to PostgreSQL through Prisma; API routes provide projects, categories, clients, and users. The overview, task board, client directory, invoices, and team screens use sample data. Changes on those demo screens stay in local component state and reset on reload.

Authentication and profile saving are UI demonstrations with simulated submissions. Account sessions, email delivery, Google sign-in, and persistent profile updates are not connected yet. Dashboard metrics are illustrative rather than calculated from the database.

## Screenshots

Actual captures of the local application in light mode at a 1600 × 1080 desktop viewport, using the included demo data. Click an image to view it at full size.

### Task board

Five workflow columns make task status, priorities, and progress easy to scan.

[![Kanban task board showing five status columns with priority badges and progress bars](docs/screenshots/tasks.png)](docs/screenshots/tasks.png)

### Client directory

Summary cards, search and filter controls, and a client table with revenue and status information.

[![Client directory with summary cards, filters, and a table of sample clients](docs/screenshots/clients.png)](docs/screenshots/clients.png)

## Tech stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, semantic theme tokens, tw-animate-css |
| UI components | shadcn/ui, Base UI, Lucide icons |
| Charts | Recharts 3 |
| Forms and validation | React Hook Form, Zod 4, Hook Form resolvers |
| Data fetching | TanStack Query 5, Next.js server actions and route handlers |
| Database | PostgreSQL, Prisma ORM 7, PostgreSQL driver adapter |
| Drag and drop | React DnD with the HTML5 backend |
| Themes and feedback | next-themes, Sonner |
| Tooling | pnpm, ESLint 9, tsx |

## Run locally

### Prerequisites

- Node.js **22.12+ within the 22.x release line**, or another version supported by the installed Prisma package (`^20.19`, `^22.12`, or `>=24`).
- pnpm.
- A PostgreSQL database for the project workflow.

### 1. Install dependencies

```bash
git clone https://github.com/farnazbina/saas-dashboard.git
cd saas-dashboard
pnpm install
```

### 2. Configure the database

Create a `.env` file in the project root and set your PostgreSQL connection string:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/saas_dashboard?schema=public"
```

Use a fresh development database for the following setup commands. The initial migration creates the tables, relations, indexes, and enums.

```bash
pnpm db:deploy
pnpm db:generate
pnpm exec prisma db seed
```

The seed script adds sample categories, clients, users, and projects so the project form has selectable records. Run it once on an empty database: it uses direct inserts and is not designed for repeated runs.

### 3. Start the application

```bash
pnpm dev
```

Open [localhost:3000/overview](http://localhost:3000/overview). The root route `/` also redirects to `/overview`; no sign-in is required to explore the dashboard. If port 3000 is occupied, use the URL printed by Next.js.

The overview, task board, and other sample-data screens can be previewed without populated database tables. The project pages and database API routes require the database setup above.

### Available scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Generate Prisma Client and start the development server |
| `pnpm build` | Generate Prisma Client and build the application |
| `pnpm start` | Serve an existing production build |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Regenerate Prisma Client after schema changes |
| `pnpm db:deploy` | Apply committed database migrations |
| `pnpm vercel-build` | Apply migrations, generate Prisma Client, and build for Vercel |

## Deploy to Vercel

Set `DATABASE_URL` in the Vercel project's environment variables to the intended PostgreSQL database. Configure the environment you are deploying (Production or Preview); use a separate database for previews. The migration connection must have permission to create tables and enums.

The committed `vercel.json` selects `pnpm vercel-build`, which runs migrations before Next.js builds pages that query the database. `prisma generate` alone only generates client code; it does not create tables. Commit the migration files along with the build configuration, then redeploy.

For a fresh database, the initial migration creates the schema automatically. Seeding is optional and is not run during deployment. An empty projects list is expected until projects are added.

### Existing databases created with `db push`

If a database already contains **all** tables, relations, enums, and indexes defined in `prisma/schema.prisma`, baseline it once before deploying. First verify it matches the schema using a connection to that database:

```bash
pnpm exec prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code
```

Only when this reports no differences (exit code 0), record the initial migration as already applied:

```bash
pnpm exec prisma migrate resolve --applied 20260916000000_init
```

This records migration history without recreating existing tables. Do not mark the migration as applied on an empty or partially initialized database: missing tables would remain missing. If there are differences, reconcile the schema before baselining.

If deployment still reports `TableDoesNotExist`, check that Vercel's `DATABASE_URL` targets the same database and PostgreSQL schema that received the migrations. `Project` maps to the lowercase `projects` table; related `categories`, `clients`, and `users` tables must also exist.

See Prisma's guides to [production migrations](https://docs.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate) and [baselining existing databases](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining).

## Project structure

```text
app/
  (auth)/             Login, signup, and password recovery screens
  (dashboard)/        Overview, projects, clients, tasks, invoices, teams, settings
  actions/            Project server actions
  api/                Projects, categories, clients, and users endpoints
components/
  dashboard/          Overview cards, charts, and project components
  layout/             Sidebar, header, and theme toggle
  ui/                 Shared UI primitives
lib/                  Prisma client, query hooks, and utilities
prisma/               Database schema and sample-data seed
providers/            Theme and TanStack Query providers
docs/
  screenshots/        Screenshots used in this README
  style-guide.md      Design tokens and component styling guidance
```

## Explore the code

- [Overview page](app/%28dashboard%29/overview/page.tsx) — composition of the dashboard cards, charts, and recent clients.
- [Task board](app/%28dashboard%29/tasks/page.tsx) — drag-and-drop interactions with React DnD.
- [Project creation](app/%28dashboard%29/projects/create/page.tsx) — form validation and related-record selection.
- [Database schema](prisma/schema.prisma) — projects, categories, clients, users, and their relationships.
- [Style guide](docs/style-guide.md) — shared visual conventions.

Created by [Farnaz Bina](https://github.com/farnazbina).
