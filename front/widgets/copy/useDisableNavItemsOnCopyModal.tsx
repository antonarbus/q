import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'
import { route } from '@shared/consts/route'

export const useDisableNavItemsOnCopyModal = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableTopNavItems({
        exceptNavItemIdKeys: [
          navItemKey.quotations,
          navItemKey.bookmarks,
          navItemKey.new,
          navItemKey.back,
          navItemKey.profile,
        ],
      }),
    )
  })

  useUnmount(() => {
    if (window.location.pathname.includes(route.bookmarks)) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIdKeys: [
            navItemKey.save,
            navItemKey.pdf,
            navItemKey.insert,
            navItemKey.bookmarks,
          ],
        }),
      )

      return
    }

    if (window.location.pathname.includes(route.quotations)) {
      dispatch(
        navSlice.actions.enableTopNavItems({
          exceptNavItemIdKeys: [
            navItemKey.save,
            navItemKey.pdf,
            navItemKey.insert,
            navItemKey.quotations,
          ],
        }),
      )

      return
    }

    dispatch(navSlice.actions.enableTopNavItems())
  })
}
