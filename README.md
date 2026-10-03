# Kavya Labs

Kavya Labs is a Bengaluru-based fictional AI startup demo. The application brings the
marketing site, Google sign-in, a protected customer workspace, and a server-authorized
administrator console together in one responsive TanStack Start application.

## Product walkthrough

- **Landing page:** responsive company navigation, early-access request flow, product
  dashboard preview, platform capabilities, mission, metrics, and closing CTA.
- **Authentication:** Auth.js Google OAuth with encrypted server-side JWT sessions.
- **Workspace:** protected `/dashboard` with the signed-in profile and product activity.
- **Admin console:** protected `/admin/` overview, user directory, analytics, and settings.
  Roles are assigned and checked server-side; the browser cannot grant itself admin access.
- **Demo data:** seeded directory and analytics make the console useful without a database.
  Role edits live in process memory and reset when the server restarts. Replace this store
  with a database and durable role records before production or multi-instance deployment.
- **Early-access requests:** server-validated submissions enter a capped in-memory demo queue.
  They are not emailed or persisted; connect a CRM/email provider before using the form for
  real customer acquisition.

## Technology

- TypeScript, React, TanStack Start and TanStack Router
- Tailwind CSS 4, shadcn/ui primitives, Lucide icons
- Auth.js (`@auth/core`) with Google OAuth
- Recharts for admin analytics

## Local setup

Requirements: Node.js 20 or newer and npm.

```sh
npm install
```

Copy `.env.example` to `.env` and fill in the Google OAuth settings below. Generate an
Auth.js secret, for example:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Then run the app:

```sh
npm run dev
```

The development server is available at `http://localhost:8080` by default.

## Google OAuth configuration

1. In Google Cloud Console, create or select a project and configure the OAuth consent
   screen with the requested profile and email scopes.
2. Create an OAuth 2.0 **Web application** client.
3. Add the development origin `http://localhost:8080` to Authorized JavaScript origins.
4. Add `http://localhost:8080/api/auth/callback/google` to Authorized redirect URIs.
5. Set `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, and a unique `AUTH_SECRET` in `.env`.
   Set `AUTH_URL` to the canonical origin of the app.
6. Put administrator Google account email addresses, comma-separated, in `ADMIN_EMAILS`.

The app deliberately does not provide fake login credentials or client-side role switching.
If OAuth is not configured, the sign-in page displays a setup message and Google sign-in
is disabled.

## Roles and authorization

Every authenticated Google account starts as a `user`. The server grants `admin` only to
emails in the server-side `ADMIN_EMAILS` allowlist or users promoted by an already
authorized administrator. `/dashboard` requires a valid Auth.js session. `/admin/` and
all admin data/role operations independently verify the session and role on the server.
Users cannot promote themselves.

The demo user directory is seeded in `src/lib/auth.server.ts`. Its role changes use an
in-memory map, so edits are suitable for a walkthrough only. Before production, persist
users and roles in a database, audit role changes, and keep the initial administrator
allowlist limited to trusted accounts.

## Build and deployment

```sh
npm run build
npm run preview
```

Deploy the generated TanStack Start server using a Node-compatible host that supports
server rendering and server functions. Configure `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`,
`AUTH_SECRET`, `AUTH_URL`, and `ADMIN_EMAILS` as private deployment environment variables.
Register the deployed origin and `${AUTH_URL}/api/auth/callback/google` as the production
Google OAuth origin and redirect URI. Use HTTPS and a stable canonical host.

The included analytics and user records are illustrative, not production telemetry. A
real deployment should connect a durable database and live metrics provider before
presenting operational counts as factual.
