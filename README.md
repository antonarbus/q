# Quotation Management App

Full-stack quotation management application built with React (frontend) and Express (backend).

## Development Commands

### Start Development

```bash
npm start                 # Start frontend (3000) and backend (4000)
npm run start-front       # Start frontend only
npm run start-back        # Start backend only
npm stop                  # Kill ports 3000 and 4000
```

**Testing Blog Locally:**

- Visit app at `https://localhost:3000` → Click "Blog" in navigation
- Or directly: `https://localhost:3000/blog/`
- Blog files are served by Vite from `front/public/blog/`

### Build

```bash
npm run build-all         # Build both frontend and backend
npm run build-front       # Build frontend only (Vite)
npm run build-back        # Build backend only (Rollup)
```

### Testing

```bash
npm test                  # Run Vitest unit tests
npm run unit-test-ui           # Run Vitest with UI
npm run coverage          # Run tests with coverage report
npm run e2e-test        # Run Playwright e2e tests
npm run e2e-test-ui     # Run Playwright with UI
npm run e2e-test-debug  # Debug Playwright tests
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
npm run find-unused-files # Find unused files with Knip
npm run find-circular-deps     # Detect circular dependencies with Madge
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

---

# CODE IMPROVEMENT GUIDE

## Critical Issues to Address

### 2. Monolithic Redux Slice (HIGH PRIORITY)

**Problem:** `/front/entities/quotation/redux/quotationSlice.ts` contains 30+ reducers handling diverse concerns

**Current Structure:**
- Delete operations (deleteBlockReducer, deleteRowReducer)
- Insert operations (insertPasteBlockReducer, insertRowReducer)
- Update operations (pinItemPriceReducer, updateCellReducer)
- Layout operations (resizeReducer, moveReducer)

**Solution:** Split into feature-based slices
```typescript
// quotationSlice.ts - Main coordinator
// quotationDeleteSlice.ts - Delete operations
// quotationInsertSlice.ts - Insert operations
// quotationUpdateSlice.ts - Update operations
// quotationLayoutSlice.ts - Resize, move, pin operations

// Combine in store:
export const quotationReducer = combineReducers({
  data: quotationSlice.reducer,
  delete: quotationDeleteSlice.reducer,
  insert: quotationInsertSlice.reducer,
  // ...
})
```

**Benefits:** Easier testing, better code organization, faster file navigation

---

### 3. Global Redux Access Pattern (HIGH PRIORITY)

**Problem:** Using global `dispatch()` and `getState()` exports makes testing difficult

**Current Pattern:**
```typescript
// /front/shared/lib/redux/redux.ts
export let dispatch = null as unknown as Dispatch

// Usage in functions:
import { dispatch, getState } from '@shared/lib/redux'
export const movePasteTextItem = (event: MouseEvent): void => {
  const { isPasteTextShown } = getState().copy
  dispatch(copySlice.actions.hidePasteText())
}
```

**Solution:** Use React hooks instead
```typescript
// Convert to custom hook:
export const useMovePasteTextItem = () => {
  const dispatch = useDispatch()
  const isPasteTextShown = useSelector(state => state.copy.isPasteTextShown)

  return useCallback((event: MouseEvent) => {
    if (isPasteTextShown) {
      dispatch(copySlice.actions.hidePasteText())
    }
  }, [isPasteTextShown, dispatch])
}

// Usage in component:
const movePasteTextItem = useMovePasteTextItem()
```

**Benefits:** Testable, follows React patterns, better type safety

**Files affected:**
- `/front/features/blocks/paste/useMovePasteText.tsx`
- All functions using `dispatch()` outside components

---

### 4. Deep Folder Nesting (MEDIUM PRIORITY)

**Problem:** 5-6 level nesting makes navigation difficult

**Current:**
```
features/blocks/update/update-cell-at-boq-block/price/updatePriceCell.ts
features/blocks/update/update-header-at-boq-block/subtotal-price/updateSubtotalPrice.ts
```

**Solution:** Flatten to 3-4 levels
```
features/blocks/update-cell/boq/price/updatePriceCell.ts
features/blocks/update-header/boq/subtotal/updateSubtotalPrice.ts
```

**Alternative:** Group by operation type
```
features/blocks/price/updateCell.ts
features/blocks/price/updateHeader.ts
features/blocks/price/validatePrices.ts
```

---

### 5. Repetitive Conditional Chains (MEDIUM PRIORITY)

**Problem:** Same removal logic repeated 5+ times in paste handler

**Current:** `/front/features/blocks/paste/useMovePasteText.tsx:42-70`
```typescript
const navElement = event.target.closest('nav')
if (navElement !== null) { removePasteIfNeeded(); return }

const elementsUnderCursor = document.elementsFromPoint(event.x, event.y)
const isCursorOverActionsContainer = elementsUnderCursor.some(...)
if (isCursorOverActionsContainer === true) { removePasteIfNeeded(); return }

const isSearchElement = elementsUnderCursor.some(...)
if (isSearchElement === true) { removePasteIfNeeded(); return }
// ... 3 more times
```

**Solution:** Extract helper function
```typescript
const shouldRemovePaste = (event: MouseEvent): boolean => {
  const navElement = event.target.closest('nav')
  if (navElement !== null) return true

  const elementsUnderCursor = document.elementsFromPoint(event.x, event.y)
  const removeOnSelectors = [
    '.actions-container',
    '.search-element',
    '.modal-dialog',
    // ... other selectors
  ]

  return removeOnSelectors.some(selector =>
    elementsUnderCursor.some(el => el.closest(selector))
  )
}

// Usage:
if (shouldRemovePaste(event)) {
  removePasteIfNeeded()
  return
}
```

---

### 6. Missing Error Boundaries (MEDIUM PRIORITY)

**Problem:** No error boundaries visible at page/route level - single error crashes entire app

**Solution:** Add error boundaries at route level
```typescript
// /front/shared/component/ErrorBoundary/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>
    }
    return this.props.children
  }
}

// Wrap routes:
<ErrorBoundary fallback={<ErrorPage />}>
  <QuotationPage />
</ErrorBoundary>
```

**Where to add:**
- `/front/pages/quotation-page/`
- `/front/pages/quotation-list-page/`
- All modal pages

---

### 7. Large Handler Functions (LOW PRIORITY)

**Problem:** Backend handlers contain mixed concerns

**Example:** `/back/api/auth/logInHandler.ts` (224 LOC) handles:
- Password validation
- JWT generation
- Cookie setting
- Super-admin flow

**Solution:** Extract utilities
```typescript
// /back/shared/lib/auth/generateTokens.ts
export const generateTokens = (email: string, role: string) => ({
  access: generateAccessToken({ email, role }),
  refresh: generateRefreshToken({ email, role })
})

// /back/shared/lib/auth/setCookies.ts
export const setAuthCookies = (res: Response, refreshToken: string) => {
  res.cookie('refresh-jwt-token', refreshToken, {
    httpOnly: true,
    secure: config.isProd,
    sameSite: 'strict',
    maxAge: 90 * 24 * 60 * 60 * 1000
  })
}

// Simplified handler:
export const logInHandler = async (req, res) => {
  const user = await validateCredentials(req.body)
  const tokens = generateTokens(user.email, user.role)
  setAuthCookies(res, tokens.refresh)
  res.json({ accessToken: tokens.access })
}
```

**Files to refactor:**
- `/back/api/auth/logInHandler.ts:224`
- `/back/api/user/deleteUserHandler.ts:195`

---

## Best Practices to Maintain

### 1. Feature-Sliced Design Import Rules

**Always follow layer hierarchy:**
```
app → pages → widgets → features → entities → shared
```

**BAD:**
```typescript
// In entities/quotation/
import { NavBar } from '@widgets/nav' // ❌ entities can't import widgets
```

**GOOD:**
```typescript
// In widgets/nav/
import { Quotation } from '@entities/quotation' // ✅ widgets can import entities
```

### 2. Public API via index.ts

**Each slice must export public API:**
```typescript
// features/blocks/insert/index.ts
export { insertBoqBlock } from './insertBoqBlock'
export { insertPriceBlock } from './insertPriceBlock'
// Don't export internal helpers
```

**Usage:**
```typescript
// ✅ Good - uses public API
import { insertBoqBlock } from '@features/blocks/insert'

// ❌ Bad - references internal structure
import { insertBoqBlock } from '@features/blocks/insert/insertBoqBlock'
```

### 3. Type Safety Patterns

**Use const assertions for literal types:**
```typescript
// ✅ Good
export const itemType = {
  text: 'text',
  boq: 'boq',
  price: 'price',
} as const

type ItemType = typeof itemType[keyof typeof itemType]

// ❌ Bad - allows any string
export const itemType = {
  text: 'text',
  boq: 'boq',
}
```

### 4. Naming Conventions

**Maintain consistency:**
- Reducers: `*Reducer` suffix (`deleteBlockReducer`)
- Hooks: `use*` prefix (`useLoadQuotation`)
- Handlers: `*Handler` suffix (`logInHandler`)
- Utilities: Descriptive names (`getStringWithNewFormattedNumber`)

---

## Testing Strategy

### Current State
- Only 7 test files for 662 frontend files
- E2E tests exist but coverage unclear

### Recommended Approach

**1. Unit Tests for Pure Functions**
```typescript
// /front/shared/util/getStringWithNewFormattedNumber.test.ts
import { describe, it, expect } from 'vitest'
import { getStringWithNewFormattedNumber } from './getStringWithNewFormattedNumber'

describe('getStringWithNewFormattedNumber', () => {
  it('formats number with spaces', () => {
    expect(getStringWithNewFormattedNumber('1000')).toBe('1 000')
  })
})
```

**2. Integration Tests for Redux Slices**
```typescript
// /front/entities/quotation/redux/quotationSlice.test.ts
import { configureStore } from '@reduxjs/toolkit'
import { quotationSlice } from './quotationSlice'

describe('quotationSlice', () => {
  it('deletes block correctly', () => {
    const store = configureStore({ reducer: { quotation: quotationSlice.reducer } })
    store.dispatch(quotationSlice.actions.deleteBlockReducer({ id: '123' }))
    expect(store.getState().quotation.blocks).not.toContainEqual(expect.objectContaining({ id: '123' }))
  })
})
```

**3. E2E Tests for Critical Flows**
```typescript
// /tests/quotation-save.spec.ts
import { test, expect } from '@playwright/test'

test('saves quotation successfully', async ({ page }) => {
  await page.goto('/quotation/new')
  await page.fill('[data-testid="quotation-title"]', 'Test Quote')
  await page.click('[data-testid="save-button"]')
  await expect(page.locator('.success-toast')).toBeVisible()
})
```

**Priority Tests to Add:**
1. Auth flow (login, register, token refresh)
2. Quotation CRUD (create, save, load, delete)
3. Block operations (insert, update, delete)
4. Bookmark management
5. File upload/download

---

## Performance Optimization

### 1. Memoization for Large Components

**Candidates for optimization:**
- `/front/widgets/nav/navStructure.tsx` (303 LOC)
- `/front/widgets/quotation/search/Search.tsx` (190 LOC)
- `/front/features/quotation/load-quotation/useLoadQuotation.tsx` (282 LOC)

**Example:**
```typescript
// Before
export const Search = (props) => {
  const results = expensiveSearch(props.query)
  return <SearchResults results={results} />
}

// After
import { useMemo } from 'react'
export const Search = (props) => {
  const results = useMemo(() => expensiveSearch(props.query), [props.query])
  return <SearchResults results={results} />
}
```

### 2. Code Splitting for Routes

**Already implemented in router.tsx:**
```typescript
const QuotationPage = lazy(() => import('@pages/quotation-page'))
const BookmarkListPage = lazy(() => import('@pages/bookmark-list-page'))
```

**Ensure all pages are lazy-loaded**

### 3. Bundle Analysis

**Run periodically:**
```bash
npm run build-front
npx vite-bundle-visualizer
```

**Monitor chunking effectiveness:**
- Froala → `qwerty` chunk
- AG Grid → `ag-grid` chunk
- MUI → `@mui` chunk

---

## Tooling Recommendations

### 1. Run Architecture Checks Regularly

```bash
npm run fsd                    # Verify FSD boundaries
npm run find-unused-files      # Find dead code with Knip
npm run find-circular-deps     # Detect circular deps with Madge
```

**Add to CI pipeline:**
```yaml
# .github/workflows/quality.yml
- name: Architecture checks
  run: |
    npm run fsd
    npm run find-unused-files
    npm run find-circular-deps
```

### 2. Type Coverage

**Add type coverage tool:**
```bash
npm install --save-dev type-coverage
```

**In package.json:**
```json
{
  "scripts": {
    "type-coverage": "type-coverage --detail --at-least 95"
  }
}
```

---

## Migration Plan (Suggested Order)

### Phase 1: Quick Wins (1-2 weeks)
1. Extract HTML templates from `insertBoqBlock.ts`
2. Add error boundaries to all pages
3. Refactor repetitive conditional chains
4. Add 10 unit tests for critical utilities

### Phase 2: Architecture Improvements (2-3 weeks)
5. Split `quotationSlice` into feature-based slices
6. Flatten deep folder nesting in `features/blocks/update/`
7. Replace global `dispatch()` usage with hooks
8. Add integration tests for Redux slices

### Phase 3: Backend Refactoring (1-2 weeks)
9. Extract utilities from large handlers
10. Add API contract validation with Zod
11. Add unit tests for backend utilities

### Phase 4: Performance & Polish (1-2 weeks)
12. Add memoization to large components
13. Analyze bundle size and optimize chunks
14. Add E2E tests for critical flows
15. Setup continuous architecture checks in CI

---

## Code Review Checklist

Before merging PRs, verify:

- [ ] Follows FSD layer hierarchy (no upward imports)
- [ ] Public API exported via `index.ts`
- [ ] No inline HTML templates over 50 lines
- [ ] No functions over 100 lines (extract helpers)
- [ ] Uses React hooks instead of global Redux access
- [ ] Tests added for new features
- [ ] TypeScript strict mode passes
- [ ] Biome linting passes
- [ ] No new circular dependencies (`npm run find-circular-deps`)

---

## Resources

**Feature-Sliced Design:**
- Official docs: https://feature-sliced.design/
- Layer reference: https://feature-sliced.design/docs/reference/layers

**Testing:**
- Vitest: https://vitest.dev/
- Playwright: https://playwright.dev/
- Testing Library: https://testing-library.com/

**TypeScript:**
- Strict mode guide: https://www.typescriptlang.org/tsconfig#strict
- Type challenges: https://github.com/type-challenges/type-challenges

---

# TO-DO

- [ ] Refactor CI/CD workflow: Run e2e tests against deployed dev environment instead of local server, enforce dev->main merge flow with branch protection
- [ ] froalaPkg.js file is deoptimised during build
- [ ] use cloud secretes for passwords instead of .env
- [ ] use `useDeferredValue` in bookmark search https://react.dev/reference/react/useDeferredValue
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
