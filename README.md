# Quotation Management App

https://sendmequotation.today

Full-stack quotation management app — React frontend + Express backend, deployed to Google Cloud Run via Terraform and GitHub Actions.

## Project Structure

Follows [Feature-Sliced Design](https://feature-sliced.design/) on both frontend and backend.

![FSD Architecture](./fsd.png)

```
front/                       # React frontend
  app/                       # App bootstrap (router, store, global styles)
  page/                      # Route-level pages (quotation-page, bookmark-list-page, ...)
  widget/                    # Composite UI sections (nav, block, footer, ...)
  feature/                   # User interactions (auth, quotation, bookmark, file, ...)
  entity/                    # Business entities (quotation, bookmark, user, nav, ...)
  shared/                    # Reusable UI, utils, libs (no business logic)

back/                        # Express + Bun backend
  api/                       # Route handlers (quotation, bookmark, file, user, ...)
  entity/                    # DB models / data access (quotation, bookmark, user, ...)
  shared/                    # Shared utils, error handling, constants

config/                      # configVariables.ts (source of truth) + generated .tfvars
deploy-scripts/              # TypeScript CLI for deployment automation
terraform/
  bootstrap/                 # One-time shared infrastructure
  infrastructure/            # Per-environment Cloud Run resources
.github/workflows/
  deploy.yml                 # Auto-deploy on push to main
  promote.yml                # Manual image promotion
tests/                       # Playwright e2e tests
Dockerfile.prod               # Single container: Bun serves frontend static + backend API
```

## Stack

- **Frontend**: React (Vite, served as static files by the backend)
- **Backend**: Express + Bun
- **Database**: Neon (serverless Postgres) via Drizzle ORM
- **Storage**: Google Cloud Storage (document content)
- **Infra**: GCP Cloud Run (single service), Terraform, GitHub Actions

## Environments

| Env   | Service            | Domain           |
| ----- | ------------------ | ---------------- |
| Dev   | `<APP_NAME>-dev`   | dev.\<DOMAIN\>   |
| Test  | `<APP_NAME>-test`  | test.\<DOMAIN\>  |
| Pilot | `<APP_NAME>-pilot` | pilot.\<DOMAIN\> |
| Prod  | `<APP_NAME>-prod`  | \<DOMAIN\>       |

Single `main` branch. `MASTER_DEPLOYS_TO_ENV` in `config/configVariables.ts` sets the deployment target (`prod` = direct to prod, `dev` = use promotion workflow).

## Development

```bash
bun install
bun dev                      # Frontend (3000) + Backend (8080) concurrently
bun run test
bun run playwright
bun run cli                  # Interactive deployment CLI
```

## First-Time Setup

### 1. Prerequisites

```bash
curl -fsSL https://bun.sh/install | bash
bun install

# Enable GCP bootstrap APIs (one-time, requires Owner/Admin)
gcloud auth application-default login
gcloud services enable serviceusage.googleapis.com --project=<PROJECT_ID>
gcloud services enable cloudresourcemanager.googleapis.com --project=<PROJECT_ID>
```

### 2. Configure

Edit `config/configVariables.ts`:

```typescript
export const sharedConfigVariables = {
  projectId: '<PROJECT_ID>',
  projectNumber: '<PROJECT_NUMBER>',
  githubRepository: '<GITHUB_USER>/<REPO_NAME>',
  bucketForTerraformStateName: '<BUCKET_NAME>',
  region: 'us-central1',
  // ...
}
```

### 3. Generate Terraform variables

```bash
bun run cli generate-tfvars
```

### 4. Bootstrap (one-time)

```bash
cd terraform/bootstrap
rm -rf .terraform .terraform.lock.hcl terraform.tfstate*
terraform init
terraform apply -var-file="../../config/prod.tfvars"
```

Creates: state bucket, Artifact Registry, service accounts, Workload Identity Federation.

### 5. Domain Verification (one-time)

Add `github-actions-sa@<PROJECT_ID>.iam.gserviceaccount.com` as **Owner** in [Google Search Console](https://search.google.com/search-console) for your domain.

### 6. GitHub Environments

Create environments `dev`, `test`, `pilot`, `prod` in **Repo Settings → Environments**. Enable **Required reviewers** on `prod` (and optionally `pilot`).

### 7. DNS

After first deployment, copy DNS records from Cloud Run → Manage Custom Domains and add to your registrar.

## Deployment

**Automatic**: Push to `main` triggers CI/CD — Terraform apply, Docker build+push, Cloud Run deploy, e2e tests, auto-rollback on failure.

**Promotion** (when `MASTER_DEPLOYS_TO_ENV='dev'`):

```
dev → test → pilot → prod
```

Go to **Actions → Promote Release → Run workflow**, select source/target environment. Re-tags the image (no rebuild) and redeploys.

## CLI

```bash
bun run cli generate-tfvars
bun run cli terraform-apply --env dev
bun run cli deploy-cloudrun --env dev
bun run cli verify-deployment --env dev
bun run cli show-deployment-info --env dev
```

## Testing & Code Quality

```bash
bun run test                  # Vitest unit tests
bun run test-ui               # Unit tests with UI
bun run playwright            # Playwright e2e
bun run playwright-debug      # Debug mode
bun run tsc                   # Type check
bun run lint-fix              # Lint check
bun run fmt-fix               # Formatting
bun run check                 # All checks (tsc, lint, format, tests, build)
```

## Database Migrations

Schema changes go through Drizzle Kit migrations. The `drizzle/` folder is the source of truth — every change to `back/entity/*/db/*TableSchema.ts` must be followed by a generated migration before it reaches the database.

### How it works

`db-generate-migration` reads the latest `snapshot.json` in `drizzle/` (which represents the schema state after the last migration), compares it against the current TypeScript schema files, and writes a new `.sql` file containing only the diff — `ALTER TABLE`, `ADD COLUMN`, `CREATE TABLE`, etc. The entire `drizzle/` folder (`.sql` files, `snapshot.json` files) must be committed — without the snapshots, Drizzle has no baseline to diff against.

### Workflow

```bash
# 1. Edit a schema file in back/entity/*/db/*TableSchema.ts
# 2. Generate the migration — produces a new .sql + snapshot.json
bun db-generate-migration

# 3. Review the generated SQL in drizzle/<timestamp>_<name>/migration.sql
# 4. Apply to the target DB
bun db-migrate-dev      # dev / local  → NEON_DATABASE_URL_DEV
bun db-migrate-test     # test         → NEON_DATABASE_URL_TEST
bun db-migrate-prod     # prod + pilot → NEON_DATABASE_URL_PROD

# 5. Commit drizzle/ together with the schema change
```

### Available commands

| Command                     | What it does                                                             |
| --------------------------- | ------------------------------------------------------------------------ |
| `bun db-generate-migration` | Diffs schema files against last snapshot → writes a new migration `.sql` |
| `bun db-migrate-dev`        | Applies pending migrations to the dev DB                                 |
| `bun db-migrate-test`       | Applies pending migrations to the test DB                                |
| `bun db-migrate-prod`       | Applies pending migrations to the prod DB (pilot shares prod)            |
| `bun db-push-dev`           | Pushes schema directly to dev DB (no migration file, no audit trail)     |
| `bun db-push-test`          | Pushes schema directly to test DB                                        |
| `bun db-push-prod`          | Pushes schema directly to prod DB                                        |
| `bun db-pull`               | Introspects the live DB and updates local schema (rarely needed)         |
| `bun db-check`              | Checks for migration consistency issues without applying anything        |
| `bun db-studio`             | Opens Drizzle Studio — a browser UI for browsing/editing the DB          |

### Rules

- **Never edit a migration file after it has been applied** to any shared environment. Generate a new one instead.
- **`db-push` skips the migration file** — useful during local development but bypasses the audit trail. Use `db-migrate` for anything that touches a shared DB.
- The first migration (`20260516134228_happy_doctor_octopus`) is the baseline. It uses `IF NOT EXISTS` guards so it is safe to run against both a fresh DB and the pre-existing production DB.

### Fresh database setup

On a completely empty database, run `db-migrate` — the baseline migration creates all tables, indexes, and columns from scratch.

---

## FSD: Cross-Layer Singleton Pattern

FSD forbids `shared/` from importing higher layers (`entities`, `features`, `app`). This creates a tension: infrastructure singletons like the router, Redux store, and axios instance are _created_ in `app/` (where all dependencies are available), but need to be _accessed_ from anywhere (`shared/`, `entities/`, `features/`).

### Solution: holder + side-effect import + module augmentation

**Three techniques used together:**

#### 1. Class holder in `shared/`

Each singleton lives in `shared/` as a class with a private field, a setter (throws on double-set) and a getter (throws if uninitialized):

```ts
// shared/lib/react-router-dom/router.ts
class RouterHolder {
  #router: Router | null = null
  set router(r: Router) { /* throws if already set */ }
  get router(): Router { /* throws if not set */ }
}
export const routerHolder = new RouterHolder()

// shared/lib/redux/redux.ts
class ReduxHolder {
  #store: Store | null = null
  set store(s: Store) { ... }
  get store(): Store { ... }
  get dispatch() { return this.store.dispatch }
  get getState() { return this.store.getState }
  readonly useSelector = useSelectorFromReactRedux
}
export const reduxHolder = new ReduxHolder()

// shared/instance.ts  (queryClient, navStructure, etc.)
class Instance {
  #queryClient: QueryClient | null = null
  set queryClient(qc) { ... }
  get queryClient() { ... }
}
export const instance = new Instance()
```

#### 2. Side-effect imports at the top of `app/App.tsx`

`app/` creates the concrete instances and injects them into the holders. The side-effect import pattern means no explicit `initialize()` call is needed at the `App` component level — importing the module _is_ the initialization:

```ts
// app/App.tsx — import order matters: these run before anything renders
import './router' // creates router, sets routerHolder.router = router
import './redux' // creates store,  sets reduxHolder.store = store
import './axiosConfig' // creates axios instance, sets axiosWithAuth
import '../shared/lib/tanstack-query/queryClient' // sets instance.queryClient
```

```ts
// app/router.tsx
const router = createBrowserRouter([...])
routerHolder.router = router  // inject into shared holder

// app/redux.ts
const store = configureStore({ reducer: { ... } })
reduxHolder.store = store     // inject into shared holder
```

#### 3. Module augmentation for Redux types (`shared` never imports `app`)

The Redux holder needs typed `dispatch`/`getState`/`useSelector`, but those types come from the concrete store in `app/`. The fix: declare an empty `Register` interface in `shared`, and augment it from `app/` — same pattern used by TanStack Query.

```ts
// shared/lib/redux/register.ts
export interface Register {} // augmented externally

// shared/lib/redux/redux.ts — types derived without importing app
export type RootState = Register extends { state: infer S } ? S : never
type AppDispatch = Register extends { dispatch: infer D } ? D : never
type Store = Register extends { store: infer ST } ? ST : never

// app/redux.ts — fills in the concrete types globally at compile time
declare module '@front/shared/lib/redux/register' {
  interface Register {
    state: ReturnType<typeof store.getState>
    dispatch: typeof store.dispatch
    store: typeof store
  }
}
```

### Usage across all layers

```ts
// any layer (entities, features, widgets, pages)
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { reduxHolder }  from '@front/shared/lib/redux'
import { instance }     from '@front/shared/instance'

routerHolder.router.navigate('/path')
reduxHolder.dispatch(someAction())
reduxHolder.getState().user.accessToken
reduxHolder.useSelector(selectSomething)
instance.queryClient.invalidateQueries({ queryKey: [...] })
```

---

## Stripe

The platform uses Stripe for two independent payment flows sharing a single webhook endpoint:

- **Quotation payments** (Stripe Connect) — clients pay service providers directly. Each user connects their own Stripe account; the platform is never in the money flow.
- **Platform subscriptions** — users pay the platform to unlock more than 100 quotations. One-time payment ($99 for 365 days). Multiple purchases stack: buying while a subscription is still active extends from the current expiry date.

### How it works

**Quotation payments (Connect)**

- Each user connects their Stripe account via OAuth. Payments go directly to that account.
- Server-side Stripe Payment Links are generated (no Stripe.js on the frontend), stored in the quotation, and rendered as a "Pay Now" button for the client.
- Webhook: `checkout.session.completed` with `metadata.quotationId` → sets `paidAt` in the database.
- Webhook: `account.application.deauthorized` → clears `stripeAccountId` when a user disconnects the platform from their Stripe account.

**Platform subscriptions**

- `saveQuotationHandler` checks the user's quotation count and `subscriptionExpiresAt` before every create. If count ≥ `FREE_QUOTATION_LIMIT` (100) and no active subscription exists, it returns `402 SUBSCRIPTION_REQUIRED`.
- The frontend calls `POST /api/stripe/subscription-checkout`. The backend creates a Stripe Checkout Session (`mode: 'payment'`) using the Price ID from Secret Manager, embedding `userEmail` in session metadata.
- Webhook: `checkout.session.completed` with `metadata.userEmail` → adds 365 days (stacking on active subscription if any) and writes to `users.subscriptionExpiresAt`.
- On `SUBSCRIPTION_REQUIRED`, the user is navigated to `/subscription` (a dedicated checkout page). The Settings modal always shows current quota status.
- The `$99` label in the UI is cosmetic — what Stripe actually charges is determined by the price configured in the Stripe dashboard.

**Webhook handler**

Both flows post to the same URL (`/api/stripe/webhook`). Stripe does not allow a single destination to cover both scopes, so each URL has **two destinations** — one per scope. Each has its own signing secret; the handler tries "Your account" first, then "Connected accounts" — whichever verifies the signature wins.

| Scope                  | Events                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Your account**       | `checkout.session.completed` — platform subscription payments originate here                                                 |
| **Connected accounts** | `checkout.session.completed`, `account.application.deauthorized` — quotation payments and Connect disconnects originate here |

> Scope cannot be changed after a destination is created — add a new destination at the same URL if needed. Bun requires `constructEventAsync` (not `constructEvent`) due to its async-only Web Crypto API.

### Required secrets

All secrets are stored in GCP Secret Manager (registered via Terraform bootstrap) and loaded by `getStripe.ts` on first request.

**API keys and Connect client IDs** — binary test/live split:

| Secret                   | Where to get it                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STRIPE_SECRET_KEY_TEST` | [API keys (test)](https://dashboard.stripe.com/test/apikeys) → Secret key (`sk_test_…`)                                                                                    |
| `STRIPE_SECRET_KEY_LIVE` | [API keys (live)](https://dashboard.stripe.com/apikeys) → Secret key (`sk_live_…`)                                                                                         |
| `STRIPE_CLIENT_ID_TEST`  | [Connect → Onboarding options → OAuth (test)](https://dashboard.stripe.com/test/settings/connect/onboarding-options/oauth) → Test client ID (`ca_…`)                       |
| `STRIPE_CLIENT_ID_LIVE`  | [Connect → Onboarding options → OAuth (live)](https://dashboard.stripe.com/settings/connect/onboarding-options/oauth) → Live client ID (`ca_…`) — requires Stripe approval |

**Webhook secrets** — per-environment, per-scope. Each destination in the Stripe dashboard has its own signing secret:

| Secret                                           | Scope              | Environment |
| ------------------------------------------------ | ------------------ | ----------- |
| `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV`   | Connected accounts | `dev`       |
| `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV`         | Your account       | `dev`       |
| `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_TEST`  | Connected accounts | `test`      |
| `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_TEST`        | Your account       | `test`      |
| `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_PILOT` | Connected accounts | `pilot`     |
| `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_PILOT`       | Your account       | `pilot`     |
| `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_LIVE`  | Connected accounts | `prod`      |
| `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_LIVE`        | Your account       | `prod`      |

> For local dev, `stripe listen` covers all events with a single secret. Both `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV` and `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV` should be set to the same `whsec_…` value from `stripe listen`.

**Subscription Price ID** — binary test/live split. Created in the Stripe dashboard when setting up the product:

| Secret                                     | What it is                            |
| ------------------------------------------ | ------------------------------------- |
| `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST` | Price ID for $99 one-time (test mode) |
| `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE` | Price ID for $99 one-time (live mode) |

### Test mode vs live mode

Stripe has two completely separate sets of keys — both coexist simultaneously, no dashboard toggle needed at runtime. The Dashboard **Test / Live toggle** only affects what you see in the UI when copying keys.

| Environment | Secret key               | Client ID               | Webhook secrets                                                                               | Price IDs                                  |
| ----------- | ------------------------ | ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `local`     | `STRIPE_SECRET_KEY_TEST` | `STRIPE_CLIENT_ID_TEST` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV` (both scopes, from `stripe listen`)            | `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST` |
| `dev`       | `STRIPE_SECRET_KEY_TEST` | `STRIPE_CLIENT_ID_TEST` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV` + `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV`     | `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST` |
| `test`      | `STRIPE_SECRET_KEY_TEST` | `STRIPE_CLIENT_ID_TEST` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_TEST` + `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_TEST`   | `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST` |
| `pilot`     | `STRIPE_SECRET_KEY_LIVE` | `STRIPE_CLIENT_ID_LIVE` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_PILOT` + `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_PILOT` | `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE` |
| `prod`      | `STRIPE_SECRET_KEY_LIVE` | `STRIPE_CLIENT_ID_LIVE` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_LIVE` + `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_LIVE`   | `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE` |

### Step-by-step setup

#### 1. Create a Stripe account

Go to [stripe.com](https://stripe.com) and register. The Dashboard starts in **test mode** by default — you can complete the entire setup and test the full payment flow without going live.

#### 2. Get your API key

[Dashboard → Developers → API keys](https://dashboard.stripe.com/test/apikeys) — copy the **Secret key** (`sk_test_…`). For live key: [API keys (live)](https://dashboard.stripe.com/apikeys).

#### 3. Enable Stripe Connect

Go to [Dashboard → Settings → Connect → Onboarding options → OAuth](https://dashboard.stripe.com/test/settings/connect/onboarding-options/oauth)

1. Enable **OAuth for Stripe Dashboard accounts**
2. Copy the **Test client ID** (`ca_…`) — this is `STRIPE_CLIENT_ID_TEST` and `STRIPE_CLIENT_ID_LIVe`
3. Add all redirect URIs under **Redirects**:

```
http://localhost:8080/api/stripe/connect-callback
https://dev.sendmequotation.today/api/stripe/connect-callback
https://test.sendmequotation.today/api/stripe/connect-callback
https://pilot.sendmequotation.today/api/stripe/connect-callback
https://sendmequotation.today/api/stripe/connect-callback
```

The **Live client ID** is unavailable until Stripe approves your platform profile.

#### 4. Create the subscription product and prices

1. Open the dashboard — confirm **Test mode** is on (header turns orange).
2. Left sidebar → **Product catalog** → **+ Add product**.
3. Name: `Platform Subscription`.
4. Under **Pricing** → **Add a price**: `Standard pricing`, `99.00` USD, **One time** (not recurring) → Save.
5. **Save product**.
6. Copy the Price ID (`price_…`) — this is `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST` and `STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE`.

#### 5. Register webhook destinations

Each URL needs **two destinations** — one per scope. Create them in [Webhooks (test)](https://dashboard.stripe.com/test/workbench/webhooks) and [Webhooks (live)](https://dashboard.stripe.com/workbench/webhooks).

**Test mode** (two destinations per URL, four destinations total):

| URL                                                     | Scope              | Events                                                           | Secret name                                     |
| ------------------------------------------------------- | ------------------ | ---------------------------------------------------------------- | ----------------------------------------------- |
| `https://dev.sendmequotation.today/api/stripe/webhook`  | Connected accounts | `checkout.session.completed`, `account.application.deauthorized` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV`  |
| `https://dev.sendmequotation.today/api/stripe/webhook`  | Your account       | `checkout.session.completed`                                     | `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV`        |
| `https://test.sendmequotation.today/api/stripe/webhook` | Connected accounts | `checkout.session.completed`, `account.application.deauthorized` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_TEST` |
| `https://test.sendmequotation.today/api/stripe/webhook` | Your account       | `checkout.session.completed`                                     | `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_TEST`       |

**Live mode** (two destinations per URL, four destinations total):

| URL                                                      | Scope              | Events                                                           | Secret name                                      |
| -------------------------------------------------------- | ------------------ | ---------------------------------------------------------------- | ------------------------------------------------ |
| `https://pilot.sendmequotation.today/api/stripe/webhook` | Connected accounts | `checkout.session.completed`, `account.application.deauthorized` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_PILOT` |
| `https://pilot.sendmequotation.today/api/stripe/webhook` | Your account       | `checkout.session.completed`                                     | `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_PILOT`       |
| `https://sendmequotation.today/api/stripe/webhook`       | Connected accounts | `checkout.session.completed`, `account.application.deauthorized` | `STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_LIVE`  |
| `https://sendmequotation.today/api/stripe/webhook`       | Your account       | `checkout.session.completed`                                     | `STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_LIVE`        |

- API version: **2026-03-25.dahlia** (latest)
- Copy the **Signing secret** (`whsec_…`) shown after each destination is created — each has a different secret.

For local development, use the [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
stripe listen --forward-to localhost:8080/api/stripe/webhook
# prints a whsec_… secret — use it as both STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV and STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV locally
```

#### 6. Add secrets to your environment

**Local** — the local environment reads from the same GCP Secret Manager as `dev`, so most secrets don't need to be in `.env`. The exceptions are the webhook secret (generated by `stripe listen`, not stored in Secret Manager) and any secrets you haven't added to Secret Manager yet:

```
STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV=whsec_…                    # from stripe listen
STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV=whsec_…            # same value as above
```

Values in `.env` always take priority over Secret Manager, so you can also override any secret locally if needed.

**GCP Secret Manager** — add all 14 secrets from the Required secrets tables above. The containers are already registered via Terraform bootstrap.

#### 7. Push the DB migration

The feature needs `stripe_account_id` on `users` and `paid_at` on `quotations`.

#### 8. Test the flows

**Quotation payments:**

1. Log in → open Settings → click **Connect Stripe Account** → authorize with a Stripe test account.
2. Open/create an offer → add a **Payment Block** → fill in amount, currency, description → click **Generate Payment Link**.
3. Copy the offer URL and open it in an incognito window (simulates the client).
4. Click **Pay Now** → use Stripe test card `4242 4242 4242 4242` (any future expiry, any CVC).
5. Payment completes → webhook fires → quotation shows **PAID**.

**Platform subscription:**

1. Run `bun stripe-listen` in a separate terminal.
2. Log in with an account that has 100+ quotations, or temporarily lower `FREE_QUOTATION_LIMIT` to 0.
3. Try saving a quotation — you are redirected to `/subscription`.
4. Click a subscription button → Stripe Checkout opens → use test card `4242 4242 4242 4242`.
5. After payment, verify `subscriptionExpiresAt` is set on your user row via `bun db-studio`.

---

## Competitors

- PandaDoc — most feature-complete, expensive, enterprise-focused
- Proposify — similar to PandaDoc, mid-market
- Better Proposals — simpler, more design-focused
- Qwilr — web-based proposals with analytics (closest in concept to yours)
- Quote Roller / CongaCPQ — more CPQ/sales-pipeline oriented
- Quoter — specifically for MSPs/IT service companies

Adjacent (invoicing with some quoting):

- FreshBooks, QuickBooks, Wave, Zoho Invoice — primarily invoicing but have basic quote features

Where yours could differentiate:

Most of the above are $30–100/month per seat, aimed at sales teams, and have heavy feature bloat. Yours is
simpler and the UX looks cleaner from what I've seen of the codebase.

The Stripe payment link built directly into the quotation is actually not standard — most competitors require a  
 separate invoicing step after the quote is accepted. Quote → pay in one link is a genuine differentiator for
freelancers and small businesses who want fewer steps.

---

Honest take: the market exists and people pay for these tools. The challenge isn't differentiation — it's
discoverability. That's the actual moat the big players have.

## Package Notes

### ag-grid-community / ag-grid-react

**Do not upgrade past 35.2.1 without testing in Chrome dev mode.**

AG Grid 35.3.0 introduced a regression where all grid pages render as a blank white page in Chrome under Vite's dev server. Firefox and the production build are unaffected. The DOM and row data are both present (visible in DevTools), but the grid's internal viewport collapses to 0×0, clipping all content. Resizing the browser window triggers AG Grid's ResizeObserver and makes the grid appear.

Root cause (unconfirmed): 35.3.0 changed initialization timing — `runWhenReadyAsync()` now returns `true` for React 19, firing the "ready" event asynchronously via `window.setTimeout`, and `ready.current` is reset to `false` during cleanup. In Chrome's rendering pipeline this creates a race where the ResizeObserver callback fires before the grid has re-initialized after its first async ready cycle, leaving the viewport at zero height permanently.

Workarounds tried that did NOT fix it: `renderingMode='legacy'`, clearing Vite cache, making the grid container a flex column, adding `display: flex` to `GridPageLayout`.

Pinned to: `35.2.1` (exact, no `^`).

---

## Troubleshooting

**409 Already Exists** — Import existing resource into Terraform state:

```bash
cd terraform/infrastructure
terraform init -reconfigure \
  -backend-config=bucket=<BUCKET_NAME> \
  -backend-config=prefix=terraform/state/<env>

terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_v2_service.app \
  projects/<PROJECT_ID>/locations/us-central1/services/<APP_NAME>-<env>
```

**State lock error** — Remove stale lock:

```bash
gcloud storage rm gs://<BUCKET_NAME>/terraform/state/<env>.tflock
```

**Domain not authorized** — Complete [Domain Verification](#5-domain-verification-one-time).

## Naming convention

### Function prefixes

| Prefix               | Mental model                                                        | When to use                              |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------------- |
| `get`                | trivial access — just return a value                                | `getUser()`, `getName()`                 |
| `fetch`              | go somewhere external (network, DB)                                 | `fetchUser()`, `fetchQuotes()`           |
| `resolve`            | determine/derive through logic — input conditions → output decision | `resolveStatusLabel()`, `resolveBadge()` |
| `compute` / `derive` | mathematical or data transformation                                 | `computeTotal()`, `deriveStats()`        |
| `build`              | construct a complex object                                          | `buildPayload()`, `buildQuery()`         |
| `create`             | instantiate and return a new entity/resource                        | `createUser()`, `createSession()`        |

## Agent skills

https://github.com/mattpocock/skills/tree/main
https://www.youtube.com/watch?v=M6mYodf0dJM
