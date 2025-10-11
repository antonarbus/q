import { dispatch, getState } from '@shared/lib/redux'
import { navSlice } from '@shared/nav/navSlice'
import { backToQuotationRef } from '../ref/backToQuotationRef'

export const showBackIconAtNav = (): void => {
  const currentQuotation = getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backToQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIds: ['back'] }))
  }
}
