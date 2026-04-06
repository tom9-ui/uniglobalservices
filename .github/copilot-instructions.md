# Copilot Instructions for This Repository

## Build, test, and lint commands

- Install dependencies: `npm install`
- Run dev server: `npm run dev` (serves at `http://localhost:3000`)
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`

Testing:

- There is currently no test runner or test script configured in `package.json`, so there is no command for full-suite or single-test execution yet.

## High-level architecture

This is a Next.js 14 App Router project with a client-driven, multi-step login flow:

- `app/layout.js` wraps the app in `AuthProvider` from `app/context/AuthContext.js`.
- `app/page.js` is the first step (username/password form). On valid submit, it posts form content to `POST /api/send-email`, then calls `login()` in context and routes to `/otp`.
- `app/otp/page.js` is the second step (OTP entry). It guards access using `isAuthenticated`, redirects unauthenticated users to `/`, posts OTP to the same API route, then routes to `/success`.
- `app/success/page.js` is a final confirmation page.
- `app/api/send-email/route.js` is the server route that sends email using `resend` with `RESEND_API_KEY` from environment variables.

Data/control flow to keep in mind:

1. Client forms submit to one shared API endpoint (`/api/send-email`) with different subjects/bodies.
2. Auth gating between steps is entirely in-memory (`useState` context), not persisted across refreshes.
3. Email delivery is delegated to Resend from the server route.

## Key conventions in this codebase

- Use App Router conventions (`app/**/page.js`, `app/api/**/route.js`) rather than `pages/`.
- Use `'use client'` explicitly for interactive pages/components and hooks-based logic.
- Keep auth step state in `AuthContext` and use `useAuth()` for navigation guards in multi-step pages.
- Keep form state local with `useState`, validate required fields on submit, and store per-field validation messages in an `errors` object.
- Use `next/navigation` (`useRouter`) for redirects between flow steps.
- Styling is Tailwind-first (utility classes directly in JSX) with base directives in `app/globals.css`.
- TypeScript path alias `@/*` is available via `tsconfig.json` and can be used for absolute imports.
- The email API route validates required payload fields (`from`, `to`, `subject`, `html`) and returns JSON responses with HTTP status codes.

