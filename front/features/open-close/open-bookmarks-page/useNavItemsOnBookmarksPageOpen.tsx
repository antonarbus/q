import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffectOnce, useUnmount } from 'react-use'

export const useNavItemsOnBookmarksPageOpen = (): void => {
  useEffectOnce(() => {
    reduxHolder.dispatch(
      navSlice.actions.disableNavItems({
        navItemIds: [
          navItemId.save,
          navItemId.pdf,
          navItemId.excel,
          navItemId.share,
          navItemId.download,
          navItemId.bookmarkList,
          navItemId.insert,
        ],
      }),
    )

    reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())

    reduxHolder.dispatch(navSlice.actions.underlineNavItem({ navItemId: navItemId.bookmarkList }))
  })

  useUnmount(() => {
    reduxHolder.dispatch(navSlice.actions.enableTopNavItems())
  })
}
