import { router } from '@lib_instances/router'
import { dispatch, getState } from '@lib_instances/store'
import { previousQuotationRef } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { navSlice } from '@shared/nav'

export const openQuotationsPage = (): void => {
  // save current quotation into previousQuotationRef to be able to return
  const currentQuotation = getState().quotation

  if (currentQuotation.id) {
    previousQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIdKeys: ['back'] }))
  }

  void router.navigate(`/${route.quotations}`)
}
