import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'

export const useNavItemsOnBookmarksPageOpen = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableNavItems({
        navItemIdKeys: [
          navItemKey.save,
          navItemKey.pdf,
          navItemKey.share,
          navItemKey.bookmarks,
          navItemKey.insert,
        ],
      }),
    )

    dispatch(navSlice.actions.removeUnderlineFromTopNav())
    dispatch(
      navSlice.actions.underlineNavItem({ navItemIdKey: navItemKey.bookmarks }),
    )
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopNavItems({}))
  })
}
