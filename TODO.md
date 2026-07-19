# TODO

---

## Security Issues (Fix These)

- [ ] **Missing `SameSite` on refresh token cookie** — `setRefreshTokenCookie` sets `httpOnly` and `secure` but omits `sameSite`. Should be `sameSite: 'strict'` to prevent CSRF. This is an OWASP-level gap.
- [ ] **No rate limiting** — `/api/users` (register), `/api/users/sessions` (login), `/api/users/password-reset-requests` are wide open. Look into `express-rate-limit` middleware.
- [ ] **`express.json({ limit: '50mb' })` globally** — enormous attack surface for DoS. Only the file proxy and quotation save need large limits. Set a small default (e.g. 1mb) and override per-route.
- [ ] **No security headers** — Express serves nothing like `X-Content-Type-Options`, `X-Frame-Options`, or a `Content-Security-Policy`. Learn **Helmet.js** — one `app.use(helmet())` covers most of OWASP A05.
- [ ] **TipTap HTML is stored and presumably rendered raw** — if any HTML ever leaves a user's editor and appears in another user's browser without sanitization, that's stored XSS. Look into **DOMPurify** for sanitizing on the way out, or a strict CSP.
- [ ] **Activation & reset-password keys have no expiry** — `activationKey` and `resetPasswordKey` are nullable `varchar` in `usersTable` with no `expiresAt` column. An old reset link stays valid forever.
- [ ] **`refreshJwtToken` stored in `usersTable`** — one token per user means one session globally. No multi-device support and no per-device revocation. Consider a separate `sessions` table (`id`, `email`, `token_hash`, `createdAt`, `expiresAt`).
- [ ] **`logOutHandler` doesn't revoke anything server-side** — it only calls `removeRefreshTokenCookie`/`removeNoTraceMode`, never touches the DB. The `refreshJwtToken` value on the user row stays valid, so a stolen/copied refresh cookie keeps working for up to 3 months after the user "logs out", until it naturally expires or gets overwritten by another login/reset. This is the concrete, exploitable consequence of the item above — a `sessions` table fixes both at once (logout = `DELETE` the session row).
- [ ] **Refresh token validity is checked by string equality against the raw JWT stored in the DB** (`refreshJwtToken`) rather than a hash of it. If the DB ever leaked (backup exposure, SQL injection, etc.), the leaked value is a directly-usable bearer credential, not something that needs cracking first. Storing `sha256(refreshToken)` (or switching to the `sessions` table idea with a `token_hash` column, already proposed above) means a DB leak alone doesn't hand over working sessions.
- [ ] **Worth reconsidering: do you need the JWT access/refresh split at all, once you have a `sessions` table?** Came up while explaining this design to port to another project, and it's worth writing down here too. The _entire_ reason the 15-min access token exists is to avoid a DB lookup on every request (verifying a JWT signature is just math, no I/O) — that's a real, legitimate trade, but only _if_ a per-request DB hit is actually too slow at your real traffic. If you add the `sessions` table above (to fix logout/multi-device), you're already paying that DB-lookup cost on every request that needs to refresh anyway — at which point you could just check the session table directly on _every_ request and drop JWTs (and the two secrets, and the client-side silent-refresh interceptor) entirely: one opaque token cookie, one indexed lookup per request, no expiry tiers to reason about. Don't keep the two-tier JWT design out of habit — keep it only if you've actually measured that the DB lookup is a real cost at your scale. If you haven't measured it, it's worth trying the simpler version first.
- [ ] **Follow-on: dropping JWTs also collapses the entire boot-time "silent login" dance.** Right now, on every page load, `front` has to: create a `getAccessTokenDeferred` promise, mount `AccessToken.tsx` to fire `GET /api/users/access-token` (reading the refresh cookie), wait for it to resolve before the axios request interceptor lets _any_ other request through, decode the resulting JWT client-side just to read `email`/`roles`, and separately wire a response interceptor to catch a `401` on an expired access token and retry once after a refresh. That whole apparatus exists only because the access token is JWT-based and memory-only (gone on every reload) while the refresh token is a _different_ credential you have to trade it in for. With a single opaque session-cookie token instead, "am I logged in" becomes **one plain request** (e.g. `GET /api/users/me`, cookie sent automatically by the browser, server does one `sessions` lookup, returns the user or a 401) - no deferred-promise gate, no client-side JWT decode, no separate "refresh vs retry" interceptor logic, since there's only one credential and one check, not two tiers to reconcile. (Note: this app is a client-rendered SPA - `front` has no server-rendering - so you'd still need that one boot-time request; a framework with SSR, like TanStack Start, can skip even that by checking the session cookie on the very first server-rendered response. Not relevant to `q` as currently built, but worth knowing why the _other_ project doesn't need this request at all.)

---

## Inconsistencies Found

- [ ] **`type?: 'json'` is optional in `HttpJsonResponse`** — in `httpResponse.ts` the field is declared `type?: 'json'`, but `httpHandler` branches on `response.type === 'json'`. If someone constructs the object manually without the factory, the response is silently never sent. Make `type` required in the type definition (the factory always sets it anyway).
- [ ] **`pilot` environment uses the production database** — noted in `getDbUrl.ts` ("same as in prod"). This means a bad pilot deploy can corrupt real user data. Consider a dedicated pilot DB.
- [ ] **Email as primary key in `usersTable`** — makes it impossible to ever let a user change their email without cascading updates across all other tables. A surrogate `id` (UUID/nanoid) as PK with `email` as a unique index is the standard approach.
- [ ] **Lodash imported as 3 separate packages** — `lodash.isequal`, `lodash.throttle`, `lodash.uniq` are each their own npm package. The native alternatives are available: `structuredClone` + comparison, `setTimeout` debounce, `[...new Set(arr)]`. Or switch to `lodash-es` for one tree-shakable package.
- [ ] **`BOOKMARK_POS_AT_BLOCKS = 1000` hack** — acknowledged in comments. A proper fix is a separate Redux slice key (e.g. `previewBookmark`) outside the `blocks` array, so the array is never polluted and `arrayShapesEqualityFn` doesn't need to filter position 1000.
- [ ] **XState actors created at module scope** — `loadingIconActor` instances are created outside React components (module-level `createActor(...).start()`). They accumulate across hot-reloads in dev and never stop. Prefer creating actors inside a hook or `useEffect` with a cleanup.
- [ ] **No input validation Zod middleware** — each handler manually calls `quotationSchema.safeParse(...)`. Look into a small Express middleware factory that runs Zod against `req.body` and throws `HttpError` automatically, keeping handlers clean.
- [ ] **Access token in custom header `access-jwt-token`** — non-standard. The convention is `Authorization: Bearer <token>`. Not a bug, but deviates from every HTTP client default and confuses tooling like Swagger.
- [ ] **bcrypt salt rounds (`10`) hardcoded in 3 separate places** (`registerUserHandler.ts`, `logInHandler.ts` comparison path implicitly relies on it, `resetPasswordHandler.ts`) instead of one shared constant. Harmless today, but if you ever bump the cost factor you have to remember all three call sites.

---

## Technical Improvements

- [ ] **QueryClient has zero default configuration** — `new QueryClient()` with no options means React Query uses its defaults (3 retries, no staleTime, gcTime 5 min). At minimum set `defaultOptions: { queries: { staleTime: 60_000, retry: 1 } }` to avoid waterfalls.
- [ ] **No request correlation / tracing IDs** — errors logged in `errorHandlerMiddleware` have no request ID. Add a middleware that stamps `req.id = crypto.randomUUID()` and includes it in every log and error response. Invaluable for debugging production issues.
- [ ] **No API versioning** — all routes live at `/api/*`. When you need to ship a breaking change, you'll regret this. Even `/api/v1/*` with a plan to add `/api/v2/*` later is enough.
- [ ] **Workers created fresh on every download** — `new Worker(new URL('pdfWorker', ...), ...)` on every call to `downloadPdf`. The worker is never explicitly terminated (though it likely dies after posting). Add `worker.terminate()` in the `message` and `error` handlers after the work is done.
- [ ] **No cursor-based pagination** — `getQuotationListHandler` presumably fetches all rows. As data grows, add a `cursor` / `limit` pattern (Drizzle supports `where(gt(table.createdAt, cursor))`).
- [ ] **Secret Manager called per-request during startup** — `getDbUrl()` is called at module evaluation (`const dbUrl = await getDbUrl()`) which is fine. But `generateAccessToken` calls `getSecret('JWT_ACCESS_SECRET')` on every token generation, relying on the in-memory cache. The cache has no TTL — if GCP rotates a secret, the server must restart to pick it up. Document this constraint.
- [ ] **No health check for DB** — `healthCheckHandler` should verify a live DB ping, not just return 200. Cloud Run will route traffic to a pod that has a dead DB connection.
- [ ] **No soft delete** — everything is hard-deleted. For quotations especially, accidental deletes are unrecoverable. Even a simple `deletedAt: timestamp` nullable column gives you a recycle bin.

---

## Architecture Issues

- [ ] **Redux is the orchestration/logic layer for quotation document load & edit, not just state storage** — found while redesigning the document-load flow (load-path fix in progress; write-path below is a known follow-on with the same root cause, deliberately deferred).
  - `useLoadQuotation` hand-rolls thunk-like sequencing entirely inside a React hook (loading overlay, background message, nav state, `resetQuotation()` → `await asyncDelay(0)` → `loadQuotation()`) with no `createAsyncThunk` and no middleware anywhere in `front/app/redux.ts`.
  - The reset→delay→load dance exists solely to force every `Block`/`TiptapEditor` to unmount and remount, because `useEditor({ content: tiptapCtx.contentGetter() }, [])` seeds content once, non-reactively — `contentGetter` reads `reduxHolder.getState()` imperatively outside render (`front/entities/quotation/redux/getter/*`, ~18 files). Not an inherent requirement of loading a document, just a workaround for TipTap's one-shot content contract.
  - `useGetQuotationMutation` (`front/entities/quotation/api/useGetQuotationMutation.tsx`) is a `useMutation` used for a GET — no caching, no dedup, no `staleTime`/`gcTime` reuse. Its `mutationKey` is never used to read/invalidate a cache. Redux (plus a sessionStorage-backed `draftQuotationStorage`) stands in for what a React Query cache would give for free, including the "restore previous quotation on Back" and "restore in-progress draft" flows.
  - The `isModified` dirty flag is derived as a side effect via a cross-slice `addMatcher` in `front/shared/appSlice.ts` that string-matches `action.type.startsWith('quotation/')`, rather than importing `quotationSlice` — a workaround for an FSD `shared → entities` layering violation that embeds action-type knowledge as literal strings.
  - Write path (deferred, same disease): `front/entities/quotation/redux/updater/*` are imperative dispatch wrappers called directly from TipTap `onUpdate` callbacks outside React lifecycle; `redux/reducer/**` is ~40 files; none of it has test coverage.

---

## Missing Programming Concepts (Worth Learning)

- [ ] **React Query `select` option** — transforms query data before it reaches the component and memoizes the result. Instead of `useSelector` + transform, do it at the query layer: `useQuery({ ..., select: (data) => data.filter(...) })`.
- [ ] **Optimistic updates with React Query** — `useMutation({ onMutate, onError, onSettled })`. Update the cache immediately, roll back on error. Especially useful for the quotation save mutation.
- [ ] **Error Boundaries** — there are no `<ErrorBoundary>` components anywhere. React 19 supports `<ErrorBoundary fallback={...}>`. Any unhandled error inside a subtree crashes the whole app silently. Add at the page level at minimum.
- [ ] **`useTransition` / `startTransition`** — mark non-urgent state updates so React can interrupt them. Useful for the search/filter in AG Grid or loading quotation blocks.
- [ ] **`useDeferredValue`** — defer an expensive derived value. Pair with `React.memo` to skip re-renders while the user types.
- [ ] **AbortController for requests** — when a component unmounts mid-request, the axios call still completes. Pass `signal: controller.signal` to cancel. React Query supports this natively via `queryFn({ signal })`.
- [ ] **Immer `produceWithPatches` / undo-redo** — you already use Immer for Redux reducers. `produceWithPatches` returns `[nextState, patches, inversePatches]`. Store the inverse patches in a stack to implement Ctrl+Z undo for quotation editing.
- [ ] **`structuredClone()`** — built into modern runtimes (Bun, Node 17+, browsers). Replaces `JSON.parse(JSON.stringify(...))` for deep cloning with support for Dates, Maps, Sets, etc.
- [ ] **Broadcast Channel API** — `new BroadcastChannel('quotation')` lets different tabs sync state without a server. If a user has two tabs open editing the same quotation, they can warn each other.
- [ ] **Server-Sent Events (SSE)** — one-directional real-time push from server. Cheaper than WebSockets for notifications like "your quotation was viewed" (`viewedAt` updates).
- [ ] **CSS Custom Properties for theming** — your theme is a JS object (`theme.ts`). CSS variables (`:root { --color-accent: #6488cf }`) let you switch themes at runtime without a re-render and work in plain CSS too.
- [ ] **`satisfies` operator (TypeScript)** — `const theme = { ... } satisfies ThemeOptions` — checks against a type without widening. Useful for the route object, queryKey, etc., where you want both type-safety and `const` inference.
- [ ] **`using` / Explicit Resource Management (TypeScript 5.2)** — for objects with cleanup needs (`[Symbol.dispose]`). Potential use: auto-terminate Web Workers, auto-unsubscribe from event listeners.
- [ ] **Zod `transform` / `coerce`** — normalize data on parse. E.g. `z.string().toLowerCase().trim()` on the email field in schemas so you never store mixed-case emails, instead of manually calling `.toLowerCase()` in handlers.
- [ ] **OpenAPI / Swagger documentation** — `@asteasolutions/zod-to-openapi` generates an OpenAPI spec from your existing Zod schemas. Your route metadata in `route.ts` + handlers are 80% of the way there.
- [ ] **`references()` + `onDelete: 'cascade'` for real foreign keys** — checked, and none of your Drizzle tables currently declare a `.references()` on their user-id-style columns, so there's no actual FK constraint in Postgres tying e.g. a quotation back to its owning user - deleting a user (if/when that ever becomes a feature) would either leave orphaned rows in every other table or require you to remember to manually delete from each one in the right order. The fix is one line per column: `userId: varchar(...).notNull().references(() => usersTable.id, { onDelete: 'cascade' })`. Once that's in place, a single `DELETE FROM users WHERE id = ...` cascades automatically - Postgres deletes every dependent row in every table that references it, in one transaction, with zero application code to write or maintain. Ported this exact pattern to the myvocab rewrite (5 tables all cascade off `users`) and it's been genuinely nice to not have a "delete user" function that has to know about every other table.

---

## Modern Libraries to Explore

- [ ] **Helmet.js** (`helmet`) — Express middleware that sets ~14 security headers in one line. Should be first middleware added.
- [ ] **express-rate-limit** — simple rate limiting for Express. Protect auth routes with `rateLimit({ windowMs: 15 * 60 * 1000, max: 10 })`.
- [ ] **drizzle-zod** — `createInsertSchema(usersTable)` / `createSelectSchema(...)` auto-generates Zod schemas from your Drizzle table definitions. Eliminates the manual duplication between DB schema and Zod schema.
- [ ] **tRPC** — if you ever find the `@back/` import sharing pattern fragile, tRPC gives you end-to-end type safety without any manual type exports. The router becomes the contract.
- [ ] **Hono** — a tiny (~14kb) Express-compatible framework with first-class TypeScript, middleware, and edge runtime support. Worth knowing as an Express alternative.
- [ ] **Pino** — structured JSON logger with levels and serializers. Replaces the custom `log` utility. Ships a Pino-Express middleware out of the box. Much better for searching logs in GCP Cloud Logging.
- [ ] **React Hook Form** — form state, validation, and submission handling. Your modals manage form state manually via Preact Signals right now; RHF + Zod resolver integrates natively and removes boilerplate.
- [ ] **TanStack Virtual (`@tanstack/react-virtual`)** — virtual scrolling for large lists. If the quotation or bookmark list grows, rendering thousands of AG Grid rows or DOM nodes gets expensive.
- [ ] **MSW (Mock Service Worker)** — intercept HTTP at the service worker level for unit/integration tests without a running backend. Could simplify Vitest tests that currently need the real server.
- [ ] **Storybook** — isolate and develop UI components (`ButtonCustom`, `CardCustom`, block components) without the full app. Especially useful for the many block types.
- [ ] **Temporal API** — the successor to `Date`. Available behind a polyfill today (`@js-temporal/polyfill`). Much more ergonomic than `date-fns` for date arithmetic, timezones, and durations.
- [ ] **Valibot** — Zod-compatible validator that is tree-shakable and ~10x smaller. Worth benchmarking if bundle size becomes a concern.
- [ ] **pino-http** — request logging middleware that logs structured JSON per request including duration, status, and method. Replaces Morgan with something GCP Cloud Logging understands natively.
- [ ] **Zod `z.discriminatedUnion`** — you have block types (`row`, `boq`, `text`, `price`, `payment`). Using `z.discriminatedUnion('type', [...])` gives faster parsing and better TypeScript narrowing than `z.union`.

---

## Best Practices & Conventions

- [ ] **Conventional Commits** — `feat:`, `fix:`, `chore:`, `refactor:` commit prefixes. Enables auto-generated changelogs and semantic versioning. Enforce with `commitlint` + `husky`.
- [ ] **Architecture Decision Records (ADRs)** — short markdown files in `docs/adr/` that explain _why_ a decision was made (e.g. "why FSD", "why Neon over Supabase", "why custom header for access token"). Invaluable for future-you.
- [ ] **Query key factory pattern** — your `queryKey` constant object is good. The next level is factory functions: `quotationKeys.detail(id)` returns `['quotation', id]`, `quotationKeys.list()` returns `['quotation', 'list']`. This enables `queryClient.invalidateQueries({ queryKey: quotationKeys.all() })` to invalidate everything quotation-related atomically.
- [ ] **Prefer `Authorization: Bearer` for access tokens** — the standard header expected by proxies, API gateways, and tools like Postman/Swagger out of the box.
- [ ] **Validate request body at the router with a middleware** — a thin Zod validation middleware (`validateBody(schema)`) keeps handler code clean and ensures every route is validated before business logic runs.
- [ ] **Add a `CHANGELOG.md`** — even a manually maintained one. Useful when debugging production regressions.
- [ ] **SameSite cookie attribute** — explicitly set `sameSite: 'lax'` (or `'strict'`) on the refresh token cookie. Without it, the browser default varies by version and can allow cross-site request forgery.
- [ ] **Dedicated integration test DB** — Playwright tests run against the test environment. Consider a local Docker Postgres in CI so tests are fully isolated from the shared test DB.
- [ ] **Separate `pilot` from `prod` database** — pilot and prod sharing a DB means a buggy pilot migration can corrupt production data. Even a Neon branch would be safer.
- [ ] **Document the `no-trace` cookie** — there is a `noTrace` cookie and `getShouldTrace` / `setNoTraceMode` mechanism. Its purpose (super-admin browsing as a regular user?) should be in an ADR or README section so it isn't accidentally removed.

---

## Cool Things Already Done Well (Worth Knowing About)

- [ ] **`Promise.withResolvers()`** — the deferred pattern for `getAccessTokenDeferred` is elegant and modern. Good use of the new built-in.
- [ ] **FSD + Steiger enforcement** — enforcing Feature-Sliced Design with a linter (`steiger`) is rare and excellent. Keeps imports disciplined.
- [ ] **Holder + module augmentation pattern** — the `reduxHolder` / `routerHolder` with `Register` interface augmentation is a clever solution to the FSD singleton problem.
- [ ] **Route metadata shared between front and back** — `@back/api/route` imported by the frontend is a great way to keep URL strings in one place and share HTTP method info.
- [ ] **XState for UI state machines** — using XState for loading icon state (show spinner → success/error → back to idle) is the right tool for sequential async UI states.
- [ ] **Web Workers for PDF/Excel** — offloading jsPDF and exceljs to workers keeps the UI thread unblocked during heavy document generation.
- [ ] **Template literal types for editor registry keys** — `` `${editorName}:${blockIndex}:${rowIndex}` `` as a type is a smart way to get type-safe Map keys.
- [ ] **`knip` for dead code detection** — running `knip` in CI catches unused exports/files before they accumulate.
- [ ] **`madge` for circular dependency detection** — circular imports are a subtle source of bugs in large TS projects, especially with module augmentation.
- [ ] **Environment-typed config** — `runtimeEnvironmentSchema = z.enum(...)` with compile-time types for `RuntimeEnvironment` and `DeployedEnvironment` is clean.
