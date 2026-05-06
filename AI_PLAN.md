# AI Integration Plan — Phase 1: Row Magic Wand

## Context

The quotation app is feature-complete. The first AI feature is a "magic wand" button on each row
that lets the user describe what they're looking for and gets back a description, price, and
sourcing info — filling in the row automatically.

Quotation-level AI generation is deferred to a future phase.

## Technology Decisions

**AI provider: Google Gemini 2.0 Flash**
- Already on GCP; API key goes into Google Secret Manager alongside existing keys
- Native "Google Search Grounding" searches the internet for real supplier/pricing data
- `@google/generative-ai` SDK, same lightweight pattern as Stripe/MailerSend integrations

**Non-streaming** — row suggestion is a small payload, returns in ~3 seconds. Standard request/response is sufficient.

**Frontend: `useMutation` from TanStack Query** — existing pattern throughout the app.

---

## Backend

### 1. Add secret
**`back/shared/lib/secret-manager/getSecret.ts`**
- Add `'GEMINI_API_KEY'` to `SecretName` union (line 4) and `cachedSecrets` record (line 23)

### 2. Gemini client wrapper
**New: `back/shared/lib/gemini/getGemini.ts`**
- Module-level cached instance, same pattern as `getStripe.ts`
- Calls `getSecret('GEMINI_API_KEY')` on first use, caches result
- Exports `getGemini()` returning `{ client: GoogleGenerativeAI }`
- Add `@google/generative-ai` to `back/package.json`

### 3. Prompt builder
**New: `back/shared/lib/gemini/prompts/buildRowSuggestionPrompt.ts`**
- Input: `{ userQuery: string }`
- Returns a prompt instructing Gemini to search the internet and return strict JSON (no markdown fences):
  ```json
  {
    "description": "clear item description",
    "itemPrice": 45.00,
    "supplierNotes": "Supplier: X, Region: Y, typical lead time, etc."
  }
  ```
- Numeric price (not string), concise sourcing notes

### 4. Route handler
**New: `back/api/ai/suggestRowHandler.ts`**
- Auth: `getUserFromAccessTokenOrThrowUnauthorized`
- Zod body: `{ userQuery: string }`
- Calls `getGemini()` → `gemini-2.0-flash` model with `googleSearch` tool (internet search grounding)
- `model.generateContent()` with `responseMimeType: 'application/json'`
- Validates response with Zod, returns `{ description, itemPrice, supplierNotes }` via `httpJsonResponse`
- Fits standard `HttpHandler` type

### 5. Route registration
**`back/api/route.ts`** — add `aiSuggestRow` entry:
```ts
aiSuggestRow: { path: '/api/ai/suggest-row', url: '/api/ai/suggest-row', method: 'post', description: '...' }
```
**`back/api/index.ts`** — import and add `suggestRowHandler` to the `api` object (standard pattern)

---

## Frontend

### 6. Entity API hook
**New: `front/entities/ai/api/useAiSuggestRowMutation.tsx`**
- `useMutation` with `axiosHolder.axiosWithAuth`, imports `ReqBody`/`ResBody` types from handler
- Add `aiSuggestRow` key to `front/shared/lib/tanstack-query/queryKey.ts`

### 7. Feature hook
**New: `front/features/blocks/ai-suggest-row/useAiSuggestRow.ts`**
- Reads `blockIndex` from `useBlock()`, `rowIndex` from `useRow()` context hooks
- Manages `isOpen` state for the modal
- On accept: dispatches `quotationSlice.actions.updateCell` for `description` and `itemPrice`:
  - description: `html: '<p>' + suggestion.description + '</p>', value: 0`
  - itemPrice: `html: '<p>' + suggestion.itemPrice + '</p>', value: suggestion.itemPrice`
- After dispatch, syncs live TipTap editors via `editorRegistry.get(getRegistryKey(...))?.commands.setContent(html)`

### 8. Modal component
**New: `front/features/blocks/ai-suggest-row/AiSuggestRowModal.tsx`**
- MUI `Dialog` (not route-based — direct Dialog, not `BackdropWithSlidableModal`)
- Input: multiline `TextField` for the user's item description
- "Ask AI" button triggers the mutation
- Results card (shown after response): description, price, supplier notes
- Actions: "Accept" (fills row + closes) / "Cancel" (closes without changes)

### 9. Icon button
**New: `front/features/blocks/ai-suggest-row/AiSuggestRowIcon.tsx`**
- `Tooltip` + `span.actionIconContainer` + sparkle icon from `react-icons` (already installed)
- Calls `openModal()` on click; renders `<AiSuggestRowModal />` inline when `isOpen`

### 10. Wire into Row
**`front/widgets/block/boq-block/boq-table/row/Row.tsx`** (right `RowActionButtonsLayout`, line 32)
- Add `<AiSuggestRowIcon />` above `<BookmarkRowIcon />`

---

## Files Summary

### New (7)
```
back/shared/lib/gemini/getGemini.ts
back/shared/lib/gemini/prompts/buildRowSuggestionPrompt.ts
back/api/ai/suggestRowHandler.ts

front/entities/ai/api/useAiSuggestRowMutation.tsx
front/features/blocks/ai-suggest-row/useAiSuggestRow.ts
front/features/blocks/ai-suggest-row/AiSuggestRowIcon.tsx
front/features/blocks/ai-suggest-row/AiSuggestRowModal.tsx
```

### Modified (6)
```
back/package.json                                          — add @google/generative-ai
back/shared/lib/secret-manager/getSecret.ts               — add GEMINI_API_KEY
back/api/route.ts                                         — add aiSuggestRow route
back/api/index.ts                                         — add suggestRowHandler
front/shared/lib/tanstack-query/queryKey.ts               — add aiSuggestRow key
front/widgets/block/boq-block/boq-table/row/Row.tsx       — add AiSuggestRowIcon
```

---

## Setup Required Before Implementation

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add `GEMINI_API_KEY=...` to `.env` for local dev
3. Add `GEMINI_API_KEY` secret to Google Secret Manager for cloud environments

---

## Verification

1. Open a quotation in editor mode → hover a row → sparkle icon appears
2. Click sparkle → modal opens → type "waterproof LED strip lights outdoor IP65" → click "Ask AI"
3. Verify description, price, and supplier notes appear in the results card
4. Click "Accept" → row description and item price cells update with AI content

---

## STATUS: Implementation complete — action required before testing

All 13 files have been written and pass TypeScript checks (`@google/generative-ai@0.24.1` installed).
One note: SDK v0.24 uses `googleSearchRetrieval` (not `googleSearch`) — already applied.

### What you need to do before running locally

**Step 1 — Get a Gemini API key**
- Go to https://aistudio.google.com/app/apikey
- Create a new key (free tier is fine for testing)

**Step 2 — Add it to your local `.env`**
- File: `back/.env`
- Add this line:
  ```
  GEMINI_API_KEY=your_key_here
  ```

**Step 3 — Test it**
```
# In one terminal
cd back && bun dev

# In another terminal
cd front && bun dev
```
Then open a quotation → hover a row → click the ✦ sparkle icon (right side, above the bookmark star).

### What you need to do before deploying to cloud

**Step 4 — Add secret to Google Secret Manager**
```bash
echo -n "your_key_here" | gcloud secrets create GEMINI_API_KEY --data-file=-
# or if the secret already exists:
echo -n "your_key_here" | gcloud secrets versions add GEMINI_API_KEY --data-file=-
```
The app will pick it up automatically on next deploy — no code changes needed.

### Known limitation to watch during testing
`responseMimeType: 'application/json'` + `googleSearchRetrieval` grounding may not always
produce valid JSON on the first try (Gemini can occasionally wrap it in markdown).
If you see "AI response parsing failed" errors, the fix is to strip markdown fences before
`JSON.parse` in `suggestRowHandler.ts`:
```ts
const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
const parsed = responseSchema.safeParse(JSON.parse(cleaned))
```
