// Tracks the ID of the quotation to navigate back to when the user clicks "Back".
// Module-level (resets on page reload) — sufficient since there's no reload in the Back flow.
let backId: string | null = null

export const setBackQuotationId = (id: string): void => {
  backId = id
}

export const getBackQuotationId = (): string | null => {
  return backId
}

export const clearBackQuotationId = (): void => {
  backId = null
}
