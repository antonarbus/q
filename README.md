# Quotation Management App

Full-stack quotation management application built with React (frontend) and Express (backend).

## Development Commands

### Start Development

```bash
npm start                 # Start frontend (3000) and backend (4000)
npm run start_front       # Start frontend only
npm run start_back        # Start backend only
npm stop                  # Kill ports 3000 and 4000
```

**Testing Blog Locally:**

- Visit app at `https://localhost:3000` → Click "Blog" in navigation
- Or directly: `https://localhost:3000/blog/`
- Blog files are served by Vite from `front/public/blog/`

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
npm run biome             # Lint and format
npm run prettier          # Check code formatting
npm run prettier_fix      # Auto-format code
```

### Architecture Analysis

```bash
npm run fsd               # Verify Feature-Sliced Design structure with Steiger
npm run find_unused_files # Find unused files with Knip
npm run circular_deps     # Detect circular dependencies with Madge
```

# Feature-Sliced Design (FSD) for front-end applications

https://feature-sliced.design/docs/get-started/overview

In FSD, a project consists of _layers_, _slices_ and _segments_.

![FSD diagram](./fsd.png)

## Layers

_Layers_ are vertically arranged. ❗️Code on one _layer_ can only interact with code from the _layers_ below.

### 1. `shared/`

Reusable functionality, detached from the business (e.g. UIKit, libs, API). ❗️No business logic here.

### 2. `entities/`

Elements which have a business value (e.g. BlogPost, User, Order, Product). Can be a components with slots for content/interactive elements.

Should contain the logic to describe how _entity_ looks and behaves (e.g. static UI elements, data stores, CRUD operations, reducers, selectors, mappers).

### 3. `features/`

_Entity_ can act differently depending on _features_ we apply on top of it (e.g. the User _entity_ with different _features_ can show a contact card or get a personal ad or be granted access etc...).

_Feature_ is an action on _entity_ to achieve a valuable outcome (e.g. create-blog-post, login-by-auth, edit-account, publish-video).

Can contain interactive UI elements, internal state and API calls that enable value-producing actions.

### 4. `widgets/`

Compositional _layer_ to combine lower-level units from _entities_ + _features_ into meaningful assembled blocks with content and interactive buttons wired to the api calls (e.g. PostCard, IssuesList, UserProfile).

In this _layer_ we fill slots left in the UI of _Entities_ with other _Entities_ and interactive elements from _Features_.

Usually non-business logic come here (e.g. gestures, keyboard interaction, etc). For reach widgets business logic is permitted.

❗️It might be hard to decide what goes into _Entities_ and _Features_. Do not worry. Just put all logic into _Widgets_ layer. You will feel later if it should be split into _Entities_ and _Features_.

### 5. `pages/`

Compositional layer to construct full pages or views from _entities_, _features_ and _widgets_ (e.g. route components for each page/slot). ❗️No business and minimum other logic here.

### 6. `app/`

App-wide settings, (e.g. styles, providers, router, store).

https://feature-sliced.design/docs/reference/layers

## Slices

A _layer_ can be divided into business oriented _slices_ to keep related code together (e.g. post, add-user-to-friends, news-feed...)

1. `Shared` and `App` _layers_ never have _slices_ (they do not have business logic inside).
2. ❗️*Slices* cannot use other _slices_ on the same _layer_.
3. Closely related slices can be grouped in a directory, but they still should follow rule above.
4. ❗️*Slices* (and _segments_ without _slices_) must contain the `index.ts` entry points (public API) with module re-exports. Code outside should not reference internal _slice_ file structure, but public API only.

## Segments

A _slice_ consists of _segments_ to separate code by its technical nature, common _segments_, ❗️but not necessarily are:

1. `ui/` ui-logic, components
2. `model/` business logic, store, actions, selectors
3. `lib/` utils, helpers, hooks
4. `api/` communication with external APIs, backend API methods

# Auth

Authentication - verifying user identity (checking password correctness)

Authorization - verifying user permissions (checking user roles/access rights)

(A) At registration we store at db email + hashed salted password +
`refresh` jwt token with 90d validity which contains email & role payload.

(B) Client is authenticated by comparing email & password's hash
against stored email and hashed password at the login stage.

(C) On successful authentication the server issues 15 min `access` jwt token and
rarely issues new `refresh` jwt token if previous one is expired (once per 90d).

(D) `refresh` jwt token is needed to issue `access` token for a user without
asking for credentials.

(E) `refresh` token is saved by server in db + in secured cookies on login.

(F) If we want to forbid user's access we may simply delete or modify `refresh` token from db.

(G) `access` token is stored locally in memory on client side and is
attached to request's http headers `access-jwt-token` for protected api requests.

(H) `access` token is attached by 'request' interceptor at `axiosWithAuth`.
If we do a request to a protected endpoint we just use `axiosWithAuth`
instance to avoid attaching token manually.

(I) At protected routes we get user details from `access` token.
Verification is fast and does not involve database. If token is expired or wrong
en error response of status `401` with message "Not logged in" is returned.

(J) `access` token expires every 15 min.
'Response' interceptor in `axiosWithAuth` checks for `401` status and
if it is the `401` status, it makes additional request to get new `access` token by
checking already attached `refresh` token from cookies, which has 90d expiry time.

(K) `axiosWithAuth` remembers initial request with all parameters when it
got first `401` error and after getting new refreshed `access` token it
repeats remembered initial http request.

(L) If `refresh` token is invalid or old, then `access` token is not
issued, client is considered to be unauthenticated and new login action
is required.

(M) If a user is deleted from the database, the user is still authenticated for
current browser session until `access` token is expired (15 min).
We should consider the duration of access token depending on
sensitivity of our data.

(N) Apart from protected routes tokens are also checked and refreshed at
the initial app load in `<AccessToken />` to avoid prompting a user
for credentials on every page refresh.

(O) We use JWT token which contains **base64-encoded** (not encrypted)
payload with user email & role data, validation time,
and a signature based on secret keys kept on the server in env variables.
**Note:** JWT payload is readable by anyone; never store sensitive data in it.

(P) Server can validate the token only if it knows the secret key.

# Email

For emails sending MailerSend is used.

# Item

- `Item` in the code is a thing which can be sorted or bookmarked: text, boq, price, row.
- `Block` in the code is a direct defendant in quotation document: text, boq, price.

# Files

- Files are stored at https://console.cloud.google.com/storage/browser/quotation-app-bucket/
- path: email/files/new_fileName.jpg (for unsaved quotations)
- path: email/files/12345_fileName.jpg (for saved quotations)
- when quotation is saved file names are modified

# CI/CD (outdated)

- create the project and get project ID
- add project into session env
- add project also into env var at deployment.yaml

```bash
gcloud projects list
```

```bash
export PROJECT_ID="<your-project-id>"
```

- create the folder (repository) for docker in Artifact Registry with name "cloud-run" at "us-central1 (Iowa)" with "Delete artifacts" option
- add the "cloud-run" folder name into env var at deployment.yaml

- get github user and repo names

```bash
export REPO_OWNER="<your-github-username>"
```

```bash
export REPO_NAME="<your-repo-name>"
```

- enable service

```bash
gcloud services enable iamcredentials.googleapis.com \
run.googleapis.com \
artifactregistry.googleapis.com --project="${PROJECT_ID}"
```

- create Service Account in Google Cloud IAM, Service Account functions as a restriction on access to resources we use later

```bash
gcloud iam service-accounts create "cloud-run-sa" \
--project="${PROJECT_ID}" \
--description="Cloud Run Service Account" \
--display-name="Cloud Run Service Account"
```

- set roles as Artifact Registry Admin and Cloud Run Admin

```bash
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
--member="serviceAccount:cloud-run-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
--role="roles/artifactregistry.repoAdmin"
```

```bash
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
--member="serviceAccount:cloud-run-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
--role="roles/run.admin"
```

```bash
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
--member="serviceAccount:cloud-run-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
--role="roles/iam.serviceAccountUser"
```

- create a Workload Identity Pool we named “github”

```bash
gcloud iam workload-identity-pools create "github" \
--project="${PROJECT_ID}" \
--location="global" \
--display-name="GitHub Actions Pool"

```

- check WIP was successfully created or not

```bash
gcloud iam workload-identity-pools describe "github" \
--project="${PROJECT_ID}" \
--location="global" \
--format="value(name)"

```

- sets up an OIDC identity provider that allows Google Cloud to trust tokens issued by GitHub Actions

```bash
gcloud iam workload-identity-pools providers create-oidc "github-repo-provider" \
--project="${PROJECT_ID}" \
--location="global" \
--workload-identity-pool="github" \
--display-name="My GitHub repo Provider" \
--attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner,attribute.repository_id=assertion.repository_id" \
--issuer-uri="https://token.actions.githubusercontent.com"
```

- allow GitHub repos to assume the cloud-run-sa service account's identity to interact with Google Cloud resources as this service account. This setup is useful for securely granting permissions to GitHub Actions workflows to interact with Google Cloud

```bash
export SA_EMAIL="cloud-run-sa@${PROJECT_ID}.iam.gserviceaccount.com"
```

```bash
export WORKLOAD_POOL=`gcloud iam workload-identity-pools describe "github" \
--project="${PROJECT_ID}" \
--location="global" \
--format="value(name)"`
```

```bash
gcloud iam service-accounts add-iam-policy-binding ${SA_EMAIL} \
--project="${PROJECT_ID}" \
--role="roles/iam.workloadIdentityUser" \
--member="principalSet://iam.googleapis.com/${WORKLOAD_POOL}/attribute.repository/${REPO_OWNER}/${REPO_NAME}"
```

- add PROJECT_ID, SERVICE_ACCOUNT, WORKLOAD_IDENTITY_PROVIDER to env var at deployment.yaml

```bash
echo $PROJECT_ID
```

```bash
echo $SA_EMAIL
```

```bash
gcloud iam workload-identity-pools providers describe "github-repo-provider" \
--project="${PROJECT_ID}" \
--location="global" \
--workload-identity-pool="github" \
--format="value(name)"
```

## CI/CD with Github Actions

- Container is automatically build, dockerized, uploaded to Artifact Registry and deployed to Cloud Run with github actions on merge to main and dev branches
- Configuration is kept at /.github/workflows/deployment.yml

## Database

https://cloud.mongodb.com/v2/62def546ebe15846276a5a82#/serverless/detail/ServerlessInstance

## Cloud Run

- create a cloud run container with unauthenticated access + min 0 instances + 'us-central1' region
- give it a name "cloud-run" (not sure it is used anywhere)
- env.REGION goes to workflows/deployment.yml
- it is possible that on first deployment you have to adjust security --> "Allow unauthenticated invocations"
- go to Manage custom domains --> Add mapping --> Select domain --> generate dns settings --> add it to your hosting

https://console.cloud.google.com/run?inv=1&invt=AblO7A&project=quotationapp-8014c

## Artifact Registry

- create repository for docker + 'us-central1' region + with delete artifacts option
- give it a name "cloud-run"
- env.ARTIFACTS_REGISTRY_NAME goes to workflows/deployment.yml

https://console.cloud.google.com/artifacts?inv=1&invt=AblO7A&project=quotationapp-8014c

## IAM-Admin

- go to Service Accounts --> Create Service Account to let github actions upload docker to Artifact Registery
- give it a name "github-actions-sa"
- add roles: 1. "Cloud Run Admin" 2. "Artifact Registry Administrator" 3. "Service Account User"
- go into created account --> keys --> add key --> create new json key
- copy full content of the key (big object) and add into github --> settings --> secretes & variables --> actions --> New repository secrets --> under "GCP_SA_KEY" name
- secrets.GCP_SA_KEY goes to workflows/deployment.yml

https://console.cloud.google.com/iam-admin/serviceaccounts?inv=1&invt=AblPCg&project=quotationapp-8014c&supportedpurview=project

# TO-DO

- [ ] use `useDeferredValue` in bookmark search https://react.dev/reference/react/useDeferredValue
- [ ] Upgrade vitejs/plugin-react (currently blocked by TS declaration issue in ^5.0.4)
- [ ] Add delete account button
- [ ] Prevent re-uploading the same file
- [ ] Remove file from DB on delete
- [ ] Instead of preview, render same component but scale it down (save bucket space)
- [ ] Add app description on Q logo
- [ ] Make info field use Froala editor
- [ ] Visual indicator when item is bookmarked (yellow star)
- [ ] Add price, valid to, status fields to quotation model and table
- [ ] Evaluate pdfkit library for text-based PDF generation
- [ ] Copy shared quotations to prevent file deletion issues (need URL rewriting)
- [ ] Investigate Google Cloud Run deployment via template.yaml
- [ ] Add Cloudflare integration
- [ ] Fix activation flow for unregistered users saving quotations
- [ ] Replace re-resizable library (maintenance issues) with react-rnd or @dnd-kit/sortable
