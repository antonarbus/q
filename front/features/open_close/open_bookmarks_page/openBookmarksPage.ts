import { dispatch, getState } from '@lib_instances/store'
import { previousQuotationRef } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { navSlice } from '@shared/nav'
import { router } from '@lib_instances/router_'

export const openBookmarksPage = (): void => {
  // save current quotation into previousQuotationRef to be able to return to it with the Back button
  const currentQuotation = getState().quotation

  if (currentQuotation.id) {
    previousQuotationRef.current = currentQuotation
    dispatch(navSlice.actions.showNavItems({ navItemIdKeys: ['back'] }))
  }

  void router.navigate(`/${route.bookmarks}`)
}
