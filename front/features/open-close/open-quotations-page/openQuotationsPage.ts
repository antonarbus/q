import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { backToQuotationRef } from '@front/entities/quotation/ref/backToQuotationRef'
import { route } from '@front/shared/lib/react-router-dom/route'
import { router } from '@front/shared/lib/react-router-dom/router'
import { dispatch, getState } from '@front/shared/lib/redux'

export const openQuotationsPage = (): void => {
  const currentQuotation = getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backToQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.back] }))
  }

  void router.navigate(`/${route.quotationList}`)
}
