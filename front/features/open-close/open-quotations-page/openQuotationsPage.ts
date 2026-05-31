import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { backQuotationStorage } from '@front/entities/quotation/storage/backQuotationStorage'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openQuotationsPage = (): void => {
  const currentQuotation = reduxHolder.getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backQuotationStorage.save(currentQuotation)

    reduxHolder.dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.back] }))
  }

  routerHolder.router.navigate(`/${route.quotationList}`)
}
