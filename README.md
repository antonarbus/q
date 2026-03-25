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
bun dev                      # Frontend (3000) + Backend (4000) concurrently
bun run unit-test
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
bun run unit-test            # Vitest unit tests
bun run unit-test-ui         # Unit tests with UI
bun run playwright             # Playwright e2e
bun run playwright-debug       # Debug mode
bun run tsc                  # Type check
bun run lint-fix             # ESLint
bun run prettier-fix           # Prettier
bun run check                # All checks (tsc, lint, format, tests, build)
```

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
