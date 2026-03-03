import { navItemId } from '@entity/nav/navItemId'
import { navSlice } from '@entity/nav/navSlice'
import { backToQuotationRef } from '@entity/quotation/ref/backToQuotationRef'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch, getState } from '@shared/lib/redux'

export const openQuotationsPage = (): void => {
  const currentQuotation = getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backToQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.back] }))
  }

  void router.navigate(`/${route.quotationList}`)
}
