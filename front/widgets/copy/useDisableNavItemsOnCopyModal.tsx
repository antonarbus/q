import { dispatch } from '@shared/lib/redux'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { route } from '@shared/consts/route'

export const useDisableNavItemsOnCopyModal = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableTopNavItems({
        exceptNavItemIdKeys: [
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
    if (window.location.pathname.includes(route.bookmarks)) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIdKeys: [
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

    if (window.location.pathname.includes(route.quotations)) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIdKeys: [
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
