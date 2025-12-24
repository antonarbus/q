# Quotation Management App

Full-stack quotation management application with React frontend and Express backend, deployed to Google Cloud Run with Terraform infrastructure as code.

## Table of Contents

- [Architecture](#architecture)
- [Development](#development)
- [First-Time Setup](#first-time-setup)
- [Deployment](#deployment)
- [CLI Commands](#cli-commands)
- [Release Promotion](#release-promotion)
- [Configuration](#configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Monitoring](#monitoring)

---

## Architecture

**Project**: All environments run in GCP project `<PROJECT_ID>`

| Environment | Frontend Service            | Backend Service            | Domain         |
| ----------- | --------------------------- | -------------------------- | -------------- |
| **Dev**     | `<APP_NAME>-frontend-dev`   | `<APP_NAME>-backend-dev`   | dev.<DOMAIN>   |
| **Test**    | `<APP_NAME>-frontend-test`  | `<APP_NAME>-backend-test`  | test.<DOMAIN>  |
| **Pilot**   | `<APP_NAME>-frontend-pilot` | `<APP_NAME>-backend-pilot` | pilot.<DOMAIN> |
| **Prod**    | `<APP_NAME>-frontend-prod`  | `<APP_NAME>-backend-prod`  | <DOMAIN>       |

**Git workflow**: Single `main` branch. Environments are deployment targets.

**Deployment mode** (configured via `MASTER_DEPLOYS_TO_ENV` in `config/configVariables.ts`):

- `prod`: Main deploys directly to production (single-stage workflow)
- `dev`: Main deploys to dev, promotion workflow for test → pilot → prod

### Infrastructure Organization

**Bootstrap** (`terraform/bootstrap/`) - One-time shared infrastructure:

- State bucket: `gs://<BUCKET_NAME>/` (Terraform state storage)
- Service accounts: `github-actions-sa`, `cloud-run-sa`
- Workload Identity Federation: Keyless GitHub Actions authentication
- Infrastructure-level APIs: IAM, Storage, Cloud Run, Logging, Monitoring

**Infrastructure** (`terraform/infrastructure/`) - Application resources (CI/CD managed):

- Artifact Registry: `docker-images` (shared registry, per-env tags)
- Cloud Run services: 2 services per environment (frontend + backend)
- Custom domain mappings: Frontend only (backend uses Cloud Run URL)
- Terraform state: Separate files per environment via prefix `terraform/state/{env}/`

**Docker Images**:

- Frontend: `us-central1-docker.pkg.dev/<PROJECT_ID>/docker-images/<APP_NAME>-frontend:<env>`
- Backend: `us-central1-docker.pkg.dev/<PROJECT_ID>/docker-images/<APP_NAME>-backend:<env>`
- Tags: `dev`, `test`, `pilot`, `prod` (enables image promotion)

**Database**: MongoDB Atlas (external) - not managed by Terraform

### Data Storage Architecture (TODO: Refactor Types)

The application uses a **hybrid storage pattern** for bookmarks and quotations, separating metadata from large document content:

#### Storage Strategy

```
┌─────────────────────────────────────────────────┐
│ PostgreSQL (Metadata - Fast Queries)            │
│ • id, email, type, name, category, desc         │
│ • createdAt, updatedAt                          │
│ • Used for: Listing, filtering, searching       │
└─────────────────────────────────────────────────┘
                    +
┌─────────────────────────────────────────────────┐
│ Google Cloud Storage (Full Document)            │
│ • Complete Item data with HTML blocks/rows      │
│ • Large unstructured JSON                       │
│ • Used for: Full document retrieval, editing    │
└─────────────────────────────────────────────────┘
```

**Why this pattern?**

- **Performance**: Query/filter metadata without loading large HTML documents
- **Scalability**: Object storage is cheaper and scales better for large files
- **Flexibility**: Can store arbitrarily large documents without DB limits

#### Current Type Issues

The current implementation has **confusing type naming** that needs refactoring:

**Problem 1: Type Overlap**

- `SelectBookmark` (from DB) has: `id`, `email`, `type`, `name`, `category`, `desc`, `createdAt`, `updatedAt`
- `Item` (from GCS) has same fields PLUS HTML blocks/rows/cells data
- Overlap creates confusion about which type to use where

**Problem 2: Inconsistent Handler Types**

- `saveBookmarkHandler`: Request uses `InsertBookmark` picks, Response uses `SelectBookmark` (❌ wrong - should return full `Item`)
- `getBookmarkHandler`: Response uses `Item` (✅ correct)
- No clear naming indicating storage layer

#### Proposed Refactoring (TODO)

**Option 1: Explicit Layer Types (Recommended)**

Create clear type names showing the storage layer:

```typescript
// back/entities/bookmark/types.ts

// 1. Database layer (PostgreSQL metadata)
export type BookmarkMetadata = typeof bookmarksTable.$inferSelect
export type InsertBookmarkMetadata = typeof bookmarksTable.$inferInsert

// 2. Storage layer (GCS document)
export type BookmarkDocument = Item // Full document with HTML/blocks

// 3. API/DTO layer (what handlers return)
export type BookmarkDTO = {
  // Metadata from PostgreSQL
  id: string
  email: string
  type: BookmarkMetadata['type']
  name: string
  category: string
  desc: string
  createdAt: Date
  updatedAt: Date

  // Document data from GCS (optional for list responses)
  document?: BookmarkDocument
}

// 4. Save request (client -> server)
export type SaveBookmarkRequest = {
  metadata: Pick<
    InsertBookmarkMetadata,
    'id' | 'type' | 'name' | 'category' | 'desc'
  >
  document: BookmarkDocument // Full Item data
}
```

**Option 2: Composition Pattern**

```typescript
// Base metadata (what's in PostgreSQL)
export type BookmarkMetadata = typeof bookmarksTable.$inferSelect

// Extended bookmark (metadata + document)
export type Bookmark = BookmarkMetadata & {
  content: Item // Explicitly show this is additional data
}

// Clear separation
export type BookmarkListItem = BookmarkMetadata // No content
export type BookmarkDetail = Bookmark // With content
```

**Benefits of refactoring:**

1. ✅ Clear naming shows which layer each type belongs to
2. ✅ No confusion between database types and document types
3. ✅ Type safety catches when you mix layers
4. ✅ Easy for new developers to understand the architecture

**Similar patterns used by:**

- **Notion**: Metadata in PostgreSQL, content in S3
- **GitHub**: Repo metadata in MySQL, Git objects in distributed storage
- **Stripe**: Transaction metadata in PostgreSQL, logs in object storage

---

## Development

```bash
bun install                     # Install dependencies
bun start                       # Start both frontend and backend locally
bun run start-front             # Frontend only (port 3000)
bun run start-back              # Backend only (port 4000)
bun run build-all               # Build both for production
bun run unit-test                    # Run unit tests
bun run e2e-test                # Run Playwright e2e tests
bun deploy-scripts/cli.ts       # Interactive deployment CLI
```

**Local development:**

- Frontend: https://localhost:3000
- Backend API: https://localhost:4000
- E2E tests run against local services

---

## First-Time Setup

### 1. Prerequisites

**Install Bun:**

```bash
# Install Bun runtime
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version

# Install project dependencies
bun install
```

**Configure GCP:**

```bash
# Authenticate with GCP (requires Owner/Admin permissions)
gcloud auth application-default login

# Verify project
gcloud projects describe <PROJECT_ID>

# Enable bootstrap APIs
# IMPORTANT: These APIs have a circular dependency and must be enabled manually
# before Terraform can manage other APIs. One-time operation, requires Owner/Admin permissions.
# See: https://github.com/hashicorp/terraform-provider-google/issues/8544
gcloud services enable serviceusage.googleapis.com --project=<PROJECT_ID>
gcloud services enable cloudresourcemanager.googleapis.com --project=<PROJECT_ID>

# Verify bootstrap APIs are enabled
gcloud services list --enabled --filter="name:serviceusage.googleapis.com OR name:cloudresourcemanager.googleapis.com"
```

**Database Setup:**

This app uses MongoDB Atlas (external). Configure your MongoDB connection string as an environment variable or in Google Secret Manager.

### 2. Configure Project

Edit `config/configVariables.ts` with your project details:

```typescript
export const sharedConfigVariables = {
  projectId: '<PROJECT_ID>', // Your GCP project ID
  projectNumber: '<PROJECT_NUMBER>', // Find in GCP console dashboard
  githubRepository: '<GITHUB_USER>/<REPO_NAME>', // e.g., 'yourusername/q'
  bucketForTerraformStateName: '<BUCKET_NAME>', // Unique bucket for Terraform state
  region: 'us-central1',
  // ... other settings
}
```

### 3. Generate Terraform Variables

Generate `.tfvars` files from the TypeScript configuration:

```bash
bun deploy-scripts/cli.ts generate-tfvars
```

This creates/updates all environment `.tfvars` files from "./config/infrastructure.ts`.

### 4. Run Bootstrap (One-Time)

Bootstrap creates shared resources that all environments use.

```bash
cd terraform/bootstrap

# Remove any leftovers from the template or old project
rm -rf .terraform .terraform.lock.hcl terraform.tfstate terraform.tfstate.backup

# Initialize Terraform
terraform init

# Review what will be created
terraform plan -var-file="../../config/prod.tfvars"

# Create resources
terraform apply -var-file="../../config/prod.tfvars"
```

**Resources created:**

- GCS bucket: Terraform state storage with versioning
- Artifact Registry: `docker-images` (shared)
- Service accounts: `github-actions-sa`, `cloud-run-sa`
- IAM permissions: Roles for GitHub Actions SA
- Workload Identity Federation: Keyless GitHub Actions authentication
- Infrastructure-level APIs

### 5. Domain Verification (One-Time)

To allow automated domain mapping creation, add the service account as a verified owner:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your domain property (e.g., `<DOMAIN>`)
3. **Settings** → **Users and permissions** → **Add user**
4. Enter: `github-actions-sa@<PROJECT_ID>.iam.gserviceaccount.com`
5. Grant **Owner** permission
6. Click **Add**

### 6. Configure GitHub Environments

Set up approval gates for release promotion:

1. Go to **Repository Settings** → **Environments**
2. Click **New environment**, create: `dev`, `test`, `pilot`, `prod`
3. Click on each environment name to configure it
4. For `prod` (and optionally `pilot`):
   - Enable **Required reviewers** checkbox
   - Add GitHub usernames who must approve deployments

### 7. DNS Setup (Per Environment)

After first deployment to each environment:

1. Go to Cloud Run → Manage Custom Domains
2. Copy DNS records shown
3. Add them to your domain registrar (e.g., GoDaddy, Namecheap)

---

## Deployment

### Automatic (via GitHub Actions)

Push to `main` branch triggers deployment to the environment specified by `MASTER_DEPLOYS_TO_ENV`:

1. Push/merge to `main` branch
2. Detects target environment from `MASTER_DEPLOYS_TO_ENV` config
3. Generates `.tfvars` files from TypeScript config
4. Runs Terraform format check
5. Applies Terraform infrastructure (idempotent - runs every time)
6. Builds and pushes frontend Docker image (tagged with environment + git SHA)
7. Builds and pushes backend Docker image (tagged with environment + git SHA)
8. Deploys both images to Cloud Run services
9. Runs Playwright e2e tests against deployed services
10. Verifies deployment (auto-rollback on failure)

- **`MASTER_DEPLOYS_TO_ENV='prod'`**: Direct to production deployment. Other environments remain as config templates.
- **`MASTER_DEPLOYS_TO_ENV='dev'`**: Main deploys to dev, then use [Release Promotion](#release-promotion) for test/pilot/prod.

---

## CLI Commands

All deployment automation is handled by an interactive TypeScript CLI:

```bash
bun deploy-scripts/cli.ts
```

This will prompt you to:

1. Select a command (generate-tfvars, show-deployment-info, terraform-apply)
2. Select an environment (if needed)
3. Execute the command

**Direct usage examples:**

```bash
# Generate tfvars files
bun deploy-scripts/cli.ts generate-tfvars

# Apply Terraform for dev environment
bun deploy-scripts/cli.ts terraform-apply --env dev

# Deploy both services to dev
bun deploy-scripts/cli.ts deploy-cloudrun --env dev

# Deploy only frontend
bun deploy-scripts/cli.ts deploy-cloudrun --env dev --service frontend

# Verify deployment
bun deploy-scripts/cli.ts verify-deployment --env dev

# Show deployment info
bun deploy-scripts/cli.ts show-deployment-info --env dev
```

---

## Release Promotion

**Promote tested images between environments** (instead of rebuilding):

```
dev → test → pilot → prod
```

**NOTE**: Promotion workflow applies only when `MASTER_DEPLOYS_TO_ENV='dev'`. When set to `'prod'`, deployment goes directly to production and promotion workflow is unused.

### Using the Promotion Workflow

1. Go to **Actions** → **Promote Release** → **Run workflow**
2. Select source environment (e.g., `dev`)
3. Select target environment (e.g., `test`)
4. Click **Run workflow**

The workflow:

- Validates promotion path (dev → test, test → pilot, pilot → prod only)
- Requires approval from configured reviewers
- Re-tags both Docker images (instant, no rebuild)
- Deploys both images to target Cloud Run services
- Runs e2e tests
- Verifies with health checks
- Auto-rollback on failure

---

## Configuration

### Single Source of Truth

All configuration lives in `config/configVariables.ts`:

```typescript
export const sharedConfigVariables = {
  // Google Cloud Project
  projectId: '<PROJECT_ID>',
  projectNumber: '<PROJECT_NUMBER>',
  region: 'us-central1',

  // GitHub
  githubRepository: '<GITHUB_USER>/<REPO_NAME>',

  // Terraform State
  bucketForTerraformStateName: '<BUCKET_NAME>',

  // Artifact Registry (Docker images)
  artifactRegistryName: 'docker-images',
  dockerImageNameFrontend: '<APP_NAME>-frontend',
  dockerImageNameBackend: '<APP_NAME>-backend',

  // Service Accounts
  githubActionsSaName: 'github-actions-sa',
  cloudRunSaName: 'cloud-run-sa',

  // Cloud Run Configuration - Frontend
  minInstancesFrontend: '0',
  maxInstancesFrontend: '5',
  cpuLimitFrontend: '1',
  memoryLimitFrontend: '512Mi',
  containerPortFrontend: '80',

  // Cloud Run Configuration - Backend
  minInstancesBackend: '0',
  maxInstancesBackend: '5',
  cpuLimitBackend: '1',
  memoryLimitBackend: '512Mi',
  containerPortBackend: '4000',
}
```

The `.tfvars` files are **generated** from this TypeScript config using `bun deploy-scripts/cli.ts generate-tfvars`.

### Key Variables

| Variable                      | Environment-Specific | Shared |
| ----------------------------- | -------------------- | ------ |
| `projectId`                   |                      | ✓      |
| `region`                      |                      | ✓      |
| `artifactRegistryName`        |                      | ✓      |
| `dockerImageNameFrontend`     |                      | ✓      |
| `dockerImageNameBackend`      |                      | ✓      |
| `cloudRunServiceNameFrontend` | ✓                    |        |
| `cloudRunServiceNameBackend`  | ✓                    |        |
| `customDomainFrontend`        | ✓                    |        |
| `maxInstancesFrontend`        | ✓                    |        |
| `maxInstancesBackend`         | ✓                    |        |

### Changing Configuration

1. Edit `config/configVariables.ts`
2. Run `bun deploy-scripts/cli.ts generate-tfvars` to regenerate `.tfvars` files
3. Commit both files
4. Push to `main` (auto-applies to target environment)
5. For non-target environments: manual Terraform or promotion workflow

---

## Testing

### Unit Tests

```bash
bun test                # Run Vitest unit tests
bun run unit-test-ui    # Run with UI
```

### E2E Tests

```bash
bun run e2e-test        # Run Playwright tests against local services
bun run e2e-test-ui     # Run with Playwright UI
bun run e2e-test-debug  # Debug mode
```

**E2E tests in CI/CD:**

- Run automatically after each deployment
- Test against deployed Cloud Run services
- Verify end-to-end functionality including API calls
- Auto-rollback deployment if tests fail

### Code Quality

```bash
bun run tsc             # TypeScript type checking
bun run biome           # Lint and format
bun run check           # Run all checks (tsc, biome, tests)
```

---

## Troubleshooting

### "409: Already Exists" Errors

Resource was created manually before Terraform. **Import it:**

```bash
cd terraform/infrastructure
terraform init -reconfigure -backend-config=bucket=<BUCKET_NAME> -backend-config=prefix=terraform/state/<env>
```

**Frontend Cloud Run Service:**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_v2_service.frontend \
  projects/<PROJECT_ID>/locations/us-central1/services/<APP_NAME>-frontend-<env>
```

**Backend Cloud Run Service:**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_v2_service.backend \
  projects/<PROJECT_ID>/locations/us-central1/services/<APP_NAME>-backend-<env>
```

**Domain Mapping:**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_domain_mapping.frontend \
  locations/us-central1/namespaces/<PROJECT_ID>/domainmappings/<DOMAIN>
```

**Public Access IAM (Frontend):**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_v2_service_iam_member.frontend_public_access \
  "projects/<PROJECT_ID>/locations/us-central1/services/<APP_NAME>-frontend-<env> roles/run.invoker allUsers"
```

**Public Access IAM (Backend):**

```bash
terraform import -var-file="../../config/<env>.tfvars" \
  google_cloud_run_v2_service_iam_member.backend_public_access \
  "projects/<PROJECT_ID>/locations/us-central1/services/<APP_NAME>-backend-<env> roles/run.invoker allUsers"
```

### "Error acquiring the state lock"

Terraform is already running or has a stale lock from a crashed operation.

**Check lock owner** (from error message):

```
Who: runner@runnervmw9dnm    # CI/CD
Who: <USER>@<MACHINE>         # Your local machine
```

```bash
# Find locks
gcloud storage ls --recursive gs://<BUCKET_NAME>/terraform/state/ | grep -i lock

# Remove specific lock
gcloud storage rm gs://<BUCKET_NAME>/terraform/state/<env>.tflock

# Or remove all locks (use with caution!)
gcloud storage rm gs://<BUCKET_NAME>/terraform/state/**/*.tflock
```

### "Caller is not authorized to administer the domain"

Domain verification missing. See [Domain Verification](#5-domain-verification-one-time) section.

### E2E Tests Failing

```bash
# Check service logs
gcloud run services logs read <APP_NAME>-frontend-<env> --limit=50
gcloud run services logs read <APP_NAME>-backend-<env> --limit=50

# Test services manually
curl https://<FRONTEND_URL>
curl https://<BACKEND_URL>/api/health

# Run tests locally
bun run e2e-test-debug
```

### CLI Command Errors

**"Command not found"**

- Install Bun: `bun --version` to verify
- Run `bun install` in project root

**Config validation fails**

- Check `config/configVariables.ts` for missing properties
- Regenerate: `bun deploy-scripts/cli.ts generate-tfvars`

**GCP commands fail**

- Authenticate: `gcloud auth login`
- Set project: `gcloud config set project <PROJECT_ID>`
- Verify APIs enabled (see [Prerequisites](#1-prerequisites))

### Finding Resource IDs for Import

```bash
# Service accounts
gcloud iam service-accounts list

# Artifact Registry
gcloud artifacts repositories list --location=us-central1

# Cloud Run services
gcloud run services list --region=us-central1

# Domain mappings
gcloud run domain-mappings list --region=us-central1
```

---

## Monitoring

- [Cloud Run Console](https://console.cloud.google.com/run?project=<PROJECT_ID>)
- [Logs](https://console.cloud.google.com/logs/query?project=<PROJECT_ID>)
- [Artifact Registry](https://console.cloud.google.com/artifacts?project=<PROJECT_ID>)
- GitHub Actions: Repository → Actions tab

**View logs:**

```bash
# Frontend logs
gcloud run services logs read <APP_NAME>-frontend-<env> --limit=100

# Backend logs
gcloud run services logs read <APP_NAME>-backend-<env> --limit=100

# Follow logs in real-time
gcloud run services logs tail <APP_NAME>-backend-<env>
```

---

## Project Structure

```
/
├── config/                          # Single source of truth for configuration
│   ├── configVariables.ts           # TypeScript config (authoritative)
│   ├── dev.tfvars                   # Generated from configVariables.ts
│   ├── test.tfvars                  # Generated from configVariables.ts
│   ├── pilot.tfvars                 # Generated from configVariables.ts
│   └── prod.tfvars                  # Generated from configVariables.ts
├── deploy-scripts/                  # TypeScript CLI for deployment automation
│   ├── cli.ts                       # Main CLI entry point
│   ├── commands/                    # Command implementations
│   │   ├── deploy-cloudrun.ts       # Deploy both services
│   │   ├── promote-image.ts         # Promote both images
│   │   ├── verify-deployment.ts     # Verify both services
│   │   └── ...
│   └── lib/                         # Shared utilities (gcloud, output, etc.)
├── terraform/
│   ├── bootstrap/                   # One-time setup (shared resources)
│   │   ├── provider.tf              # Provider configuration
│   │   ├── state-bucket.tf          # Terraform state bucket
│   │   ├── apis.tf                  # Infrastructure-level APIs
│   │   ├── service-accounts.tf      # Service accounts & IAM
│   │   └── workload-identity.tf     # GitHub Actions authentication
│   └── infrastructure/              # Application resources (per environment)
│       ├── provider.tf              # Provider configuration
│       ├── backend.tf               # GCS backend config
│       ├── variables.tf             # Variables for 2 services
│       ├── data-sources.tf          # References to bootstrap resources
│       ├── apis.tf                  # Application-specific APIs (empty)
│       ├── artifact-registry.tf     # Shared Docker registry
│       ├── cloud-run.tf             # 2 Cloud Run services (frontend + backend)
│       ├── domain.tf                # Custom domain for frontend
│       ├── outputs.tf               # Outputs for both services
│       └── cloud-sql.tf.disabled    # Disabled (using MongoDB Atlas)
├── .github/
│   └── workflows/
│       ├── deploy.yml               # Auto-deploy on push to main (2 images + e2e)
│       └── promote.yml              # Manual image promotion (both images)
├── front/                           # React frontend
├── back/                            # Express backend
├── tests/                           # Playwright e2e tests
├── Dockerfile.prod.front            # Frontend production image (Nginx)
├── Dockerfile.prod.back             # Backend production image (Bun)
├── playwright.config.ts             # E2E test configuration
└── README.md                        # This file
```

---

## Environment Variables in Cloud Run

Understanding how environment variables are configured across different layers of the deployment pipeline.

### The 3-Layer Hierarchy

Environment variables in Cloud Run can be set at three different stages, each serving a specific purpose:

#### Layer 1: Dockerfile (Baked into Image) 🍞

```dockerfile
# Dockerfile.prod.back:28
ENV NODE_ENV=production
```

- **When**: Build time (when Docker image is created)
- **Scope**: Inside the Docker image itself
- **Can be overridden**: Yes, by Cloud Run runtime configuration

This sets default values that are baked into the image. These are baseline values that can be overridden by subsequent layers.

#### Layer 2: Terraform (Infrastructure Baseline) 🏗️

```hcl
# terraform/infrastructure/cloud-run.tf
env {
  name  = "NODE_ENV"
  value = "production"
}

env {
  name  = "ENVIRONMENT"
  value = var.environment  # "dev", "test", "pilot", or "prod"
}
```

- **When**: Infrastructure provisioning (initial Cloud Run service creation)
- **Scope**: Cloud Run service configuration
- **Can be overridden**: Yes, by gcloud CLI updates

Terraform defines what the infrastructure **should** look like. This is your infrastructure-as-code source of truth.

**Why you need this layer:**

- **Initial creation**: When you run `terraform apply` for the first time, there's no Cloud Run service yet
- **Disaster recovery**: If the service is deleted and recreated with Terraform, it will have correct env vars
- **Drift detection**: Terraform can detect and fix manual changes made in GCP Console
- **Documentation**: Infrastructure-as-code serves as documentation for your team

#### Layer 3: GitHub Actions Deployment (Runtime Updates) 🚀

```typescript
// deploy-scripts/lib/gcloud/updateCloudRunService.ts:23
await $`gcloud run services update ${cloudRunServiceName} \
  --image ${imageUrl} \
  --set-env-vars NODE_ENV=production,ENVIRONMENT=${environment}`
```

- **When**: Every deployment (when you push new code)
- **Scope**: Updates the running Cloud Run service
- **Can be overridden**: No (this is the final layer)

GitHub Actions explicitly sets all environment variables on each deployment, ensuring runtime state matches infrastructure configuration.

**IMPORTANT**: We use `--set-env-vars` to declaratively define the complete set of environment variables. This replaces all user-defined env vars with exactly what we specify, preventing configuration drift. While Terraform documents the expected env vars, GitHub Actions is the source of truth for runtime configuration. Cloud Run system variables (PORT, K_SERVICE, etc.) are unaffected and managed separately by the platform.

### How They Work Together

**Scenario 1: Fresh Terraform Apply (First Time)**

```bash
terraform apply
```

**Result:** Cloud Run service created with:

- `NODE_ENV="production"` (from Terraform)
- `ENVIRONMENT="dev"` (from Terraform, using `var.environment`)

**Scenario 2: GitHub Actions Deployment (Every Push)**

```bash
gcloud run services update backend \
  --image <new-image> \
  --set-env-vars NODE_ENV=production,ENVIRONMENT=dev
```

**Result:** Cloud Run service updated with:

- `NODE_ENV="production"` (explicitly set by gcloud CLI)
- `ENVIRONMENT="dev"` (explicitly set by gcloud CLI)

**Scenario 3: Terraform Apply Again (After Deployments)**

```bash
terraform apply
```

**What Terraform sees:**

- Current state: `NODE_ENV="production"`, `ENVIRONMENT="dev"`
- Desired state: `NODE_ENV="production"`, `ENVIRONMENT="dev"`
- **No changes needed** ✅

### Visual Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. Build Time (Dockerfile)                             │
│    ENV NODE_ENV=production                              │
│    (Baked into image)                                   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Infrastructure Creation (Terraform - First Time)     │
│    env { NODE_ENV = "production" }                      │
│    env { ENVIRONMENT = "dev" }                          │
│    (Creates Cloud Run service with these defaults)      │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Deployment (GitHub Actions - Every Push)             │
│    gcloud run services update                           │
│      --set-env-vars NODE_ENV=production,ENVIRONMENT=dev │
│    (Replaces all env vars - declarative & explicit)     │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ Final Running Container                                 │
│    NODE_ENV=production   ← From Terraform/Dockerfile    │
│    ENVIRONMENT=dev       ← From GitHub Actions          │
└─────────────────────────────────────────────────────────┘
```

### Understanding NODE_ENV vs ENVIRONMENT

**NODE_ENV** (Node.js standard):

- Values: `"development"`, `"test"`, or `"production"`
- Purpose: Controls Node.js behavior, npm install mode, and framework optimizations
- In Cloud Run: Always `"production"` (running production builds)

**ENVIRONMENT** (Your custom variable):

- Values: `"dev"`, `"test"`, `"pilot"`, or `"prod"`
- Purpose: Identifies which deployed environment you're running in
- In Cloud Run: Set per environment (`dev`, `test`, `pilot`, `prod`)

### Why All 3 Layers Are Needed

Each layer serves a different purpose at different stages:

- **Dockerfile**: Default baked into image (portable baseline for local development)
- **Terraform**: Infrastructure documentation (defines contract for what env vars should exist)
- **GitHub Actions**: Runtime enforcement (single source of truth for deployed environments)

This separation allows for:

- **Clarity**: Terraform documents infrastructure expectations
- **Consistency**: GitHub Actions explicitly enforces runtime state on every deployment
- **Safety**: No drift because both layers agree on values
- **Speed**: Update environment variables instantly without re-provisioning infrastructure

---

## To-Do

### Backend Middleware & Infrastructure

The backend main file (`/back/index.ts`) is minimal and clean, but consider adding:

1. **CORS middleware** - Required if frontend is on a different domain/port in development
2. **Security headers (Helmet)** - Best practice security headers (CSP, HSTS, etc.)
3. **Rate limiting** - Prevent abuse and DoS attacks
4. **Compression middleware** - gzip/brotli compression for API responses
5. **Health check endpoint** - For load balancers, monitoring, and container orchestration
6. **Graceful shutdown** - Handle SIGTERM/SIGINT for clean shutdowns (close DB connections, finish requests)
7. **Process error handlers** - Global handlers for `uncaughtException` and `unhandledRejection`

---

## Notes

**Database**: This app uses MongoDB Atlas (external), not Cloud SQL. Configure your MongoDB connection string via environment variables or Google Secret Manager.

**Container Architecture**: Frontend (Nginx) and Backend (Express/Bun) run as separate Cloud Run services. Frontend proxies API requests to backend.
