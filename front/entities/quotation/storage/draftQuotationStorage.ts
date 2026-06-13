import { quotationSchema } from '@back/entity/quotation/schema'
import type { Quotation } from '@back/entity/quotation/schema'

const KEY = 'draftQuotation'

/**
 * Auto-save draft for the quotation currently being edited. Written continuously for any
 * quotation (new or saved), so work survives page reloads (e.g. Stripe redirect).
 * On /, restored only if the draft has id='new' — navigating from a saved quotation to
 * / still loads a blank template. For saved quotations the Back button navigates to the
 * draft's id and loads it from memory. Cleared on successful save.
 */
export const draftQuotationStorage = {
  save: (quotation: Quotation): void => {
    sessionStorage.setItem(KEY, JSON.stringify(quotation))
  },
  load: (): Quotation | null => {
    const stored = sessionStorage.getItem(KEY)

    if (stored === null) {
      return null
    }

    try {
      const parsed = quotationSchema.safeParse(JSON.parse(stored))

      return parsed.success ? parsed.data : null
    } catch {
      return null
    }
  },
  clear: (): void => {
    sessionStorage.removeItem(KEY)
  },
}
