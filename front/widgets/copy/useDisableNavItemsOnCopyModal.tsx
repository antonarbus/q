import { dispatch } from '@shared/lib/redux'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/const/navItemId'
import { navSlice } from '@shared/nav'
import { route } from '@shared/const/route'

export const useDisableNavItemsOnCopyModal = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableTopNavItems({
        exceptNavItemIds: [
          navItemId.quotationList,
          navItemId.bookmarkList,
          navItemId.new,
          navItemId.back,
          navItemId.profile,
        ],
      }),
    )
  })

  useUnmount(() => {
    const isBookmarkPage = window.location.pathname.includes(route.bookmarkList)

    if (isBookmarkPage === true) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIds: [
            navItemId.save,
            navItemId.pdf,
            navItemId.excel,
            navItemId.insert,
            navItemId.bookmarkList,
          ],
        }),
      )

      return
    }

    const isQuotationListPage = window.location.pathname.includes(
      route.quotationList,
    )

    if (isQuotationListPage === true) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIds: [
            navItemId.save,
            navItemId.pdf,
            navItemId.excel,
            navItemId.insert,
            navItemId.quotationList,
          ],
        }),
      )

      return
    }

    dispatch(navSlice.actions.enableTopNavItems())
  })
}
