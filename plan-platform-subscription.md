# Plan: Platform Access Billing via Stripe

## Context

The app already has **Stripe Connect** so users can accept payments from their own clients on quotations. That is a separate concern and is unchanged.

This plan is about **platform-level billing**: charging users for using the app once they exceed the free-tier quota. Payments flow to the platform owner's Stripe account (not a connected account).

**Key design choice**: one-time payments that grant a fixed access window (1 month or 1 year), not recurring subscriptions. This keeps the implementation minimal — no subscription lifecycle management, no billing portal, just a checkout and a webhook.

---

## Decisions

| #                    | Decision                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Default quota        | 200 quotations                                                                             |
| Paid quota           | Unlimited                                                                                  |
| Warning threshold    | 180 quotations (20 before the limit)                                                       |
| Over-limit behaviour | Every `saveQuotation` call checks count + access; blocked if over limit and access expired |
| Monthly price        | $12 — grants unlimited quota until `now + 30 days`                                         |
| Annual price         | $100 — grants unlimited quota until `now + 365 days`                                       |
| Plan naming          | None — UI speaks in quota terms only, never tier names                                     |
| Tiers                | One flat option                                                                            |
| Auto-renewal         | None — user pays manually when access expires                                              |

---

## Stripe Setup

### How it works

- **One-time Checkout Sessions** — when a user wants unlimited quota, the backend creates a Stripe Checkout Session (`mode: 'payment'`) against the platform's own Stripe account (not a connected account). The user is redirected to Stripe's hosted page.
- **Webhook** — on `checkout.session.completed`, the handler reads `metadata.period` and `metadata.userEmail` and sets `unlimitedQuotaExpiresAt` in the database. This event is already registered from the existing payment flow — no new webhook endpoints needed.

### New secrets

Price IDs follow the same test/live split as the existing API keys.

| Secret                      | Where to get it                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `STRIPE_TEST_PRICE_MONTHLY` | [Products (test)](https://dashboard.stripe.com/test/products) → Q App Access → Monthly price → Price ID (`price_…`) |
| `STRIPE_TEST_PRICE_ANNUAL`  | [Products (test)](https://dashboard.stripe.com/test/products) → Q App Access → Annual price → Price ID (`price_…`)  |
| `STRIPE_LIVE_PRICE_MONTHLY` | [Products (live)](https://dashboard.stripe.com/products) → Q App Access → Monthly price → Price ID (`price_…`)      |
| `STRIPE_LIVE_PRICE_ANNUAL`  | [Products (live)](https://dashboard.stripe.com/products) → Q App Access → Annual price → Price ID (`price_…`)       |

### Which price ID is used per environment

| Environment | Monthly secret              | Annual secret              |
| ----------- | --------------------------- | -------------------------- |
| `local`     | `STRIPE_TEST_PRICE_MONTHLY` | `STRIPE_TEST_PRICE_ANNUAL` |
| `dev`       | `STRIPE_TEST_PRICE_MONTHLY` | `STRIPE_TEST_PRICE_ANNUAL` |
| `test`      | `STRIPE_TEST_PRICE_MONTHLY` | `STRIPE_TEST_PRICE_ANNUAL` |
| `pilot`     | `STRIPE_LIVE_PRICE_MONTHLY` | `STRIPE_LIVE_PRICE_ANNUAL` |
| `prod`      | `STRIPE_LIVE_PRICE_MONTHLY` | `STRIPE_LIVE_PRICE_ANNUAL` |

### Step-by-step setup

#### 1. Create the product and prices in test mode

Go to [Dashboard → Products (test)](https://dashboard.stripe.com/test/products) → **+ Add product**:

- Name: `Q App Access`
- Pricing model: **One-time**
- Add two prices:
  - `$12.00 USD` — copy the **Price ID** (`price_…`) → this is `STRIPE_TEST_PRICE_MONTHLY`
  - `$100.00 USD` — copy the **Price ID** (`price_…`) → this is `STRIPE_TEST_PRICE_ANNUAL`

#### 2. Create the same product and prices in live mode

Switch to live mode, go to [Dashboard → Products (live)](https://dashboard.stripe.com/products) → repeat step 1:

- `STRIPE_LIVE_PRICE_MONTHLY` → `$12.00 USD` price ID
- `STRIPE_LIVE_PRICE_ANNUAL` → `$100.00 USD` price ID

#### 3. Verify the webhook already covers `checkout.session.completed`

The existing webhook endpoints are already subscribed to `checkout.session.completed`. No new endpoints or events need to be added. Verify at:

- [Webhooks (test)](https://dashboard.stripe.com/test/workbench/webhooks) → each endpoint → confirm `checkout.session.completed` is listed
- [Webhooks (live)](https://dashboard.stripe.com/workbench/webhooks) → same check

#### 4. Add secrets to your environment

**Local** — add to `.env`:

```
STRIPE_TEST_PRICE_MONTHLY=price_…
STRIPE_TEST_PRICE_ANNUAL=price_…
```

**Deployed environments** — add all four price secrets to GCP Secret Manager:

```
STRIPE_TEST_PRICE_MONTHLY   # shared by local / dev / test
STRIPE_TEST_PRICE_ANNUAL    # shared by local / dev / test
STRIPE_LIVE_PRICE_MONTHLY   # shared by pilot / prod
STRIPE_LIVE_PRICE_ANNUAL    # shared by pilot / prod
```

#### 5. Test the flow

1. Hit the quotation limit (or temporarily lower `FREE_QUOTATION_LIMIT` to 1 for testing).
2. Attempt to create a quotation → paywall modal appears.
3. Click **1 month — $12** → redirected to Stripe Checkout.
4. Use test card `4242 4242 4242 4242` (any future expiry, any CVC).
5. Payment completes → webhook fires → `unlimitedQuotaExpiresAt` set to `now + 30 days`.
6. Quotation creation works again, Settings shows _"Quota: Unlimited (until …)"_.

---

## DB Changes

Add to `usersTable` (one new column):

```ts
unlimitedQuotaExpiresAt: timestamp({ mode: 'string', withTimezone: true }),
// null   → never paid, free quota (200) applies
// past   → access lapsed, free quota enforced again
// future → unlimited quota active until this date
```

That's it. No `stripeCustomerId`, no subscription status fields. Access is time-windowed and self-contained.

> **Note**: `stripeAccountId` (existing, Stripe Connect) is entirely unrelated — it stays as-is.

---

## Backend Changes

### New routes in `route.ts`

```ts
stripeAccessCheckout: POST / api / stripe / access - checkout
stripeAccessStatus: GET / api / stripe / access - status
```

### `accessCheckoutHandler.ts`

```
POST /api/stripe/access-checkout
ReqBody: { period: 'monthly' | 'annual' }
ResBody: { checkoutUrl: string, message: string }
```

1. Auth required.
2. Read `STRIPE_PRICE_MONTHLY` or `STRIPE_PRICE_ANNUAL` from secrets based on `period`.
3. Create a Stripe Checkout Session:
   - `mode: 'payment'` (one-time)
   - `line_items`: the selected price
   - `metadata: { userEmail, period }`
   - `success_url`: frontend `/settings?access=success`
   - `cancel_url`: frontend `/settings?access=canceled`
4. Return `{ checkoutUrl }`.

### `accessStatusHandler.ts`

```
GET /api/stripe/access-status
ResBody: { unlimitedQuotaExpiresAt: string | null, quotationCount: number, freeLimit: number, message: string }
```

Used by the frontend to determine which UI state to show. `unlimitedQuotaExpiresAt` is either null, a past date (lapsed), or a future date (active). Frontend derives `hasAccess` from that.

### `saveQuotation` — guard

Add to the existing handler, **only on new quotation creation** (not on update):

```
quotationCount = COUNT(quotations WHERE email = user.email)
hasAccess = user.unlimitedQuotaExpiresAt != null AND user.unlimitedQuotaExpiresAt > now()

if quotationCount >= FREE_QUOTATION_LIMIT and not hasAccess:
  throw HttpError { errorCode: 'ACCESS_REQUIRED', statusCode: 402 }
```

Every save re-checks, so access lapses are enforced on the next attempted creation.

### `stripeWebhookHandler.ts` — extend existing handler

The existing `checkout.session.completed` handler already handles quotation payments (via `session.metadata.quotationId`). Extend it to also handle access purchases:

```
if session.metadata.period exists ('monthly' | 'annual'):
  userEmail = session.metadata.userEmail
  daysToAdd = period === 'annual' ? 365 : 30

  currentExpiry = user.unlimitedQuotaExpiresAt
  base = currentExpiry > now() ? currentExpiry : now()   // extend if already active
  newExpiry = base + daysToAdd

  UPDATE users SET unlimitedQuotaExpiresAt = newExpiry WHERE email = userEmail
```

Stacking: if a user pays again before expiry, the new period is added on top of the remaining time.

---

## Frontend Changes

### `useAccessStatusQuery`

`front/entities/user/api/useAccessStatusQuery.tsx` — fetches on app load. Provides `{ hasAccess, unlimitedQuotaExpiresAt, quotationCount, freeLimit }`.

### Paywall modal

`front/features/user/access-paywall/AccessPaywall.tsx`

- Triggered when `saveQuotation` returns error code `ACCESS_REQUIRED`.
- Copy: _"You've used all 200 free quotations. Get unlimited access."_
- Two buttons: **1 month — $12** and **1 year — $100**.
- On click → `POST /api/stripe/access-checkout` → `window.location.href = checkoutUrl`.

### Warning banner

`front/features/user/access-warning/AccessWarningBanner.tsx`

- Shown in the quotation list when `quotationCount >= 180` and no active access.
- Copy: _"180 / 200 quotations used. Get unlimited access before you hit the limit."_
- Disappears once access is active.

### Settings page — Quota section

- Free, under limit: _"Quota: X / 200"_
- Free, at limit: _"Quota: 200 / 200 — get unlimited access"_ + two pricing buttons.
- Paid, active: _"Quota: Unlimited (until Jan 15, 2027)"_ + optional Extend buttons.
- Paid, lapsed: _"Quota: 200 (unlimited access expired on X)"_ + two pricing buttons.

---

## Constants

```ts
// back/shared/const/access.ts
export const FREE_QUOTATION_LIMIT = 200
export const ACCESS_WARNING_THRESHOLD = 180
// no plan label — UI uses quota numbers only
```

---

## What is NOT in scope

- Auto-renewing subscriptions
- Stripe Billing Portal
- Invoices or receipts beyond what Stripe sends automatically
- Multiple tiers or per-seat pricing
- Free trial
- Prorated upgrades/downgrades
