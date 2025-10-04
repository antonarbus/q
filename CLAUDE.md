# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack quotation management application built with React (frontend) and Express (backend). Users can create, save, and share quotations with bill-of-quantities, pricing, and file attachments. Files are stored in Google Cloud Storage, with MongoDB as the database.

## Development Commands

### Start Development
```bash
npm start                 # Start both frontend (port 3000) and backend (port 4000)
npm run start_front       # Start frontend only
npm run start_back        # Start backend only
npm stop                  # Kill ports 3000 and 4000
```

### Build
```bash
npm run build_all         # Build both frontend and backend
npm run build_front       # Build frontend only (Vite)
npm run build_back        # Build backend only (Rollup)
```

### Testing
```bash
npm test                  # Run Vitest unit tests
npm run test:ui           # Run Vitest with UI
npm run coverage          # Run tests with coverage report
npm run playwright        # Run Playwright e2e tests
npm run playwright_ui     # Run Playwright with UI
npm run playwright_debug  # Debug Playwright tests
```

### Code Quality
```bash
npm run check             # Run all checks: tsc, lint, prettier, test, playwright
npm run tsc               # TypeScript type checking (no emit)
npm run lint              # ESLint with all errors/warnings
npm run lint:fix          # Auto-fix ESLint issues
npm run prettier          # Check code formatting
npm run prettier_fix      # Auto-format code
```

### Architecture Analysis
```bash
npm run fsd               # Verify Feature-Sliced Design structure with Steiger
npm run find_unused_files # Find unused files with Knip
npm run circular_deps     # Detect circular dependencies with Madge
```

## Architecture

### Frontend Structure (Feature-Sliced Design)

The frontend follows [Feature-Sliced Design](https://feature-sliced.design/), organized in vertical layers with strict import rules:

**Layers** (can only import from layers below):
1. `app/` - App initialization, router, global styles, Redux store, Axios config, React Query
2. `pages/` - Route components, modals (quotation-page, bookmark-modal, save-quotation-modal, etc.)
3. `widgets/` - Composed UI blocks from entities + features (nav, footer, copy)
4. `features/` - User actions on entities (auth/*, quotation/load-quotation)
5. `entities/` - Business domain models (user, quotation, bookmark, file)
6. `shared/` - Reusable utilities, UI components, constants, layouts (no business logic)

**Key Rules:**
- Layers can only import from lower layers
- Slices within a layer cannot import from each other
- Each slice must have `index.ts` as public API
- Use `@shared`, `@entities`, `@features`, `@widgets`, `@pages`, `@app` path aliases

### Backend Structure (Feature-Sliced Design)

Similar FSD organization:
- `api/` - Express route handlers grouped by domain (auth, quotation, bookmark, file, user, visitors)
- `entities/` - Database models (user, quotation, bookmark, file, visitors-count)
- `shared/` - Utilities, middleware, external service wrappers (jwt, mongoose, mailersend, google-cloud-storage)

### API Architecture

The `back/api/api.ts` file exports a single `api` object containing all routes with `{ url, method, handler, description }`.

**Critical:** The Vite plugin `stripHandlerFromApiRoutes()` removes `handler` properties when importing `api` on the frontend to prevent leaking backend code. Frontend imports `api` for type-safe endpoint URLs.

Routes are automatically registered in `back/index.ts` by iterating over the `api` object.

### Authentication Flow

JWT-based auth with refresh + access tokens:
- **Refresh token**: 30-day validity, stored in httpOnly cookie + MongoDB, used to issue access tokens
- **Access token**: 15-min validity, stored in memory (frontend state), attached to requests via `access-jwt-token` header
- Axios interceptor (`axiosWithAuth`) auto-refreshes access token on 401 responses
- Protected routes verify access token from header (fast, no DB lookup)
- `<AccessToken />` component refreshes token on app load

### File Storage

- Files uploaded to Google Cloud Storage bucket via signed URLs
- File metadata stored in MongoDB
- Files accessed via `/uploads/:fileId` proxy endpoint (generates 5-min signed URL)
- File paths: `email/files/new_fileName.jpg` (unsaved) → `email/files/12345_fileName.jpg` (saved)

### State Management

- **Redux Toolkit**: Global state for user auth, UI flags
- **React Query**: Server state caching for quotations, bookmarks, files
- **@preact/signals**: Reactive state for fine-grained updates (enabled via Babel transform)

### Key Terminology

- **Item**: Sortable/bookmarkable unit (text, BOQ, price, row)
- **Block**: Direct quotation document element (text, BOQ, price)

## TypeScript Paths

Shared paths for both frontend and backend (defined in root `tsconfig.json`):
```
@back/*       → ./back/*
@app/*        → ./front/app/*
@pages/*      → ./front/pages/*
@widgets/*    → ./front/widgets/*
@features/*   → ./front/features/*
@entities/*   → ./front/entities/*
@shared/*     → ./front/shared/*
```

## Testing

- **Vitest**: Unit tests for utilities and components (test-setup.ts configures jsdom)
- **Playwright**: E2e tests with authenticated user setup (tests/setup/*)
- Test files use `INSTALLATION=local` env var
- Playwright ignores certificate errors for local HTTPS

## Environment Variables

Required in `.env`:
- `INSTALLATION` - "local" or "production"
- MongoDB connection string
- JWT secrets (access + refresh)
- MailerSend API key
- Google Cloud Storage credentials

See `back/config.ts` for configuration logic.
