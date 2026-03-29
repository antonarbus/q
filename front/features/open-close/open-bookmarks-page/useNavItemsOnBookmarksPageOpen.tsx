import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { reduxHolder } from '@front/shared/lib/redux'
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
