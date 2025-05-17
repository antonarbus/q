import { dispatch, getState } from '@shared/lib/redux'
import { backToQuotationRef } from '../refs/backToQuotationRef'
import { navSlice } from '@shared/nav'

export const setBackToQuotation = (): void => {
  const currentQuotation = getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backToQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIds: ['back'] }))
  }
}
