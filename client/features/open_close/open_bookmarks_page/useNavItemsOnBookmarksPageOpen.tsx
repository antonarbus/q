import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

export const useNavItemsOnBookmarksPageOpen = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableNavItems({
      navItemIdKeys: [
        navItemId.save,
        navItemId.pdf,
        navItemId.share,
        navItemId.bookmarks,
        navItemId.insert,
      ],
    }))

    dispatch(navSlice.actions.removeUnderlineFromTopNav())
    dispatch(navSlice.actions.underlineNavItem({ navItemIdKey: navItemId.bookmarks }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableAllTopNavItems())
  })
}
