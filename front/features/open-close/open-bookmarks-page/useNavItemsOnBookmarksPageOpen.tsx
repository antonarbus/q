import { navItemId } from '@entities/nav/navItemId'
import { navSlice } from '@entities/nav/navSlice'
import { dispatch } from '@shared/lib/redux'
import { useEffectOnce, useUnmount } from 'react-use'

export const useNavItemsOnBookmarksPageOpen = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableNavItems({
        navItemIds: [
          navItemId.save,
          navItemId.pdf,
          navItemId.excel,
          navItemId.share,
          navItemId.bookmarkList,
          navItemId.insert,
        ],
      }),
    )

    dispatch(navSlice.actions.removeUnderlineFromTopNav())

    dispatch(
      navSlice.actions.underlineNavItem({ navItemId: navItemId.bookmarkList }),
    )
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopNavItems())
  })
}
