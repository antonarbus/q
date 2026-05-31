import type { Quotation } from '@back/entity/quotation/schema'

const KEY = 'back-quotation'

/**
 * Persists the "back to quotation" state across navigations, including full page reloads
 * (e.g. Stripe checkout redirect). Stored in sessionStorage so it survives browser-level
 * redirects but is discarded when the tab closes.
 *
 * Written when the user navigates away from an unsaved quotation (to bookmarks, quotation
 * list, or the subscription page on quota limit). Read and cleared by
 * `openQuotationPageAndLoadPrev` + `useLoadQuotation` when the user clicks "Back".
 */
export const backQuotationStorage = {
  save: (quotation: Quotation): void => {
    sessionStorage.setItem(KEY, JSON.stringify(quotation))
  },
  load: (): Quotation | null => {
    const stored = sessionStorage.getItem(KEY)

    if (stored === null) {
      return null
    }
    try {
      return JSON.parse(stored) as Quotation
    } catch {
      return null
    }
  },
  clear: (): void => {
    sessionStorage.removeItem(KEY)
  },
}
