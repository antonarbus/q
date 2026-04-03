import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { backToQuotationRef } from '@front/entities/quotation/ref/backToQuotationRef'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openQuotationsPage = (): void => {
  const currentQuotation = reduxHolder.getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backToQuotationRef.current = currentQuotation

    reduxHolder.dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.back] }))
  }

  routerHolder.router.navigate(`/${route.quotationList}`)
}
