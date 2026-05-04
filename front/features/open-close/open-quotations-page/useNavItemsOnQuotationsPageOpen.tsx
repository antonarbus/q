import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffectOnce, useUnmount } from 'react-use'

export const useNavItemsOnQuotationsPageOpen = (): void => {
  useEffectOnce(() => {
    reduxHolder.dispatch(
      navSlice.actions.disableNavItems({
        navItemIds: [
          navItemId.save,
          navItemId.pdf,
          navItemId.excel,
          navItemId.share,
          navItemId.download,
          navItemId.quotationList,
          navItemId.insert,
        ],
      }),
    )

    reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())

    reduxHolder.dispatch(
      navSlice.actions.underlineNavItem({
        navItemId: navItemId.quotationList,
      }),
    )
  })

  useUnmount(() => {
    reduxHolder.dispatch(navSlice.actions.enableTopNavItems())
  })
}
