import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { useEffectOnce, useUnmount } from 'react-use'

export const useDisableNavItemsOnCopyModal = (): void => {
  useEffectOnce(() => {
    reduxHolder.dispatch(
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
      reduxHolder.dispatch(
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

    const isQuotationListPage = window.location.pathname.includes(route.quotationList)

    if (isQuotationListPage === true) {
      reduxHolder.dispatch(
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

    reduxHolder.dispatch(navSlice.actions.enableTopNavItems())
  })
}
