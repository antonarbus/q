import { dispatch } from '@shared/lib/redux'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { route } from '@shared/consts/route'

export const useDisableNavItemsOnCopyModal = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableTopNavItems({
        exceptNavItemIds: [
          navItemId.quotations,
          navItemId.bookmarks,
          navItemId.new,
          navItemId.back,
          navItemId.profile,
        ],
      }),
    )
  })

  useUnmount(() => {
    const isBookmarkPage = window.location.pathname.includes(route.bookmarkList)

    if (isBookmarkPage) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIds: [
            navItemId.save,
            navItemId.pdf,
            navItemId.excel,
            navItemId.insert,
            navItemId.bookmarks,
          ],
        }),
      )

      return
    }

    const isQuotationListPage = window.location.pathname.includes(
      route.quotationList,
    )

    if (isQuotationListPage) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIds: [
            navItemId.save,
            navItemId.pdf,
            navItemId.excel,
            navItemId.insert,
            navItemId.quotations,
          ],
        }),
      )

      return
    }

    dispatch(navSlice.actions.enableTopNavItems())
  })
}
