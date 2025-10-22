import { navSlice } from '@entities/nav/navSlice'
import { backToQuotationRef } from '@entities/quotation/ref/backToQuotationRef'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch, getState } from '@shared/lib/redux'

export const openBookmarksPage = (): void => {
  const currentQuotation = getState().quotation

  if (Boolean(currentQuotation.id) === true) {
    backToQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIds: ['back'] }))
  }

  void router.navigate(`/${route.bookmarkList}`)
}
