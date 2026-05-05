# Welcome Guide Modal

## Context

The app (SendMeQuotation.today) is not immediately self-explanatory to new users. A friend flagged this. The user wants a welcome guide but dislikes auto-popup modals (first-visit popups are dismissed before users understand their value; post-login is too late). Chosen approach: a persistent "How it works" button in the nav that opens a multi-step slideshow modal, optionally with a one-time gentle toast on first visit to surface it.

---

## Approach

**Core:** A nav button opens a route-based modal (`/guide`) containing a multi-step slideshow. Always accessible, never forced.

**Optional first-visit hint:** On the very first visit (localStorage flag), a Sonner toast appears saying *"First time? See how it works →"* with a link to `/guide`. It auto-dismisses after 6s. The badge disappears after the guide is viewed. No auto-modal popup.

**Step content:** 4 slides covering the app's key concepts:
1. Create a quotation (the editor)
2. Customize with blocks (text, products, prices)
3. Share with clients (share link/PDF)
4. Get paid (Stripe payment block)

---

## Implementation Steps

### 1. Add the route

File: `front/app/router.tsx`

Add a new child route `guide` (same pattern as existing modal routes like `save`, `share`, `settings`).

### 2. Create the feature folder

`front/features/welcome-guide/`

Files:
- `WelcomeGuideModal.tsx` — the modal component
- `WelcomeGuideSlide.tsx` — a single slide (title + description + illustration placeholder)
- `SLIDES.ts` — the slide content data (text, step labels)
- `index.ts` — barrel export

### 3. WelcomeGuideModal component

- Reuse the existing `BackdropWithSlidableModal` for the outer shell (handles ESC, backdrop click, scroll lock)
- Inner content: step indicator dots, slide content, Prev/Next buttons
- Use **Motion** (`animate`, `AnimatePresence`) already installed — slide transition between steps with `x` axis motion
- MUI `Typography`, `Button`, `Box` for layout (existing stack)
- A `[screenshot]` placeholder `Box` (grey rounded rectangle) for each slide — user can replace with real screenshots later

### 4. Add nav trigger

File: `front/widgets/Nav/` (wherever the nav component lives)

Add a small `?` icon button or `"How it works"` link that navigates to `/guide`. On first visit (before localStorage flag is set), show a small blue dot badge on the button to draw attention.

### 5. First-visit toast (optional, lightweight)

File: `front/features/on-init-load/useFirstVisitGuideHint.tsx`

On mount, check `localStorage.getItem('guideVisited')`. If null, call:
```ts
toast('First time here? See how it works →', {
  action: { label: 'Show me', onClick: () => navigate('/guide') },
  duration: 6000,
})
```
Using **Sonner** (already installed). Sets `localStorage.setItem('guideVisited', '1')` when guide route is visited.

### 6. Mark guide as visited

In `WelcomeGuideModal` on close/mount, set `localStorage.setItem('guideVisited', '1')` to remove the nav badge.

---

## Key files to modify

| File | Change |
|------|--------|
| `front/app/router.tsx` | Add `guide` child route |
| `front/widgets/Nav/` | Add "How it works" button with optional badge |
| `front/features/on-init-load/OnInitLoad.tsx` | Mount the first-visit hint hook |

## New files to create

| File | Purpose |
|------|---------|
| `front/features/welcome-guide/SLIDES.ts` | Slide content data array |
| `front/features/welcome-guide/WelcomeGuideSlide.tsx` | Single slide UI |
| `front/features/welcome-guide/WelcomeGuideModal.tsx` | Full modal with step navigation |
| `front/features/welcome-guide/index.ts` | Barrel export |
| `front/pages/GuidePage/index.tsx` | Route-level lazy wrapper (same pattern as other modal pages) |
| `front/features/on-init-load/useFirstVisitGuideHint.tsx` | First-visit toast logic |

---

## Reuse (no new dependencies needed)

- `BackdropWithSlidableModal` — `front/shared/component/BackdropWithSlidableModal.tsx`
- `motion` from `motion/react` — already installed (Motion 12)
- `toast` from `sonner` — already installed (Sonner 2)
- Existing modal route pattern from `front/app/router.tsx`

---

## Verification

1. Visit the app — a Sonner toast appears: "First time here? See how it works →"
2. Click the action — guide modal opens, slides through 4 steps with animation
3. Close and revisit — toast no longer appears, nav badge is gone
4. Click the nav "?" button any time — guide reopens
5. Press ESC — modal closes (BackdropWithSlidableModal handles this)
