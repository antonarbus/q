import { navItemId } from '@shared/const/navItemId'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { useEffectOnce, useUnmount } from 'react-use'

export const useNavItemsOnQuotationsPageOpen = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableNavItems({
        navItemIds: [
          navItemId.save,
          navItemId.pdf,
          navItemId.excel,
          navItemId.share,
          navItemId.quotationList,
          navItemId.insert,
        ],
      }),
    )

    dispatch(navSlice.actions.removeUnderlineFromTopNav())

    dispatch(
      navSlice.actions.underlineNavItem({
        navItemId: navItemId.quotationList,
      }),
    )
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopNavItems())
  })
}
