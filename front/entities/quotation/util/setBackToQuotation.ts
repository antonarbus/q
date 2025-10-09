import { dispatch, getState } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { backToQuotationRef } from '../ref/backToQuotationRef'

export const setBackToQuotation = (): void => {
  const currentQuotation = getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backToQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIds: ['back'] }))
  }
}
