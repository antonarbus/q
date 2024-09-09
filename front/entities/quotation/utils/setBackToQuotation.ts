import { dispatch, getState } from '@lib_instances/store'
import { backToQuotationRef } from '../refs/backToQuotationRef'
import { navSlice } from '@shared/nav'

export const setBackToQuotation = (): void => {
  const currentQuotation = getState().quotation

  if (currentQuotation.id) {
    backToQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIdKeys: ['back'] }))
  }
}
