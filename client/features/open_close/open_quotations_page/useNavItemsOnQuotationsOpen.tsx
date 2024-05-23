import { dispatch } from '@lib_instances/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

export const useNavItemsOnQuotationsOpen = (): void => {
  useEffectOnce(() => {
    dispatch(
      navSlice.actions.disableNavItems({
        navItemIdKeys: [
          navItemId.save,
          navItemId.pdf,
          navItemId.share,
          navItemId.quotations,
          navItemId.insert,
        ],
      }),
    )

    dispatch(navSlice.actions.removeUnderlineFromTopNav())
    dispatch(
      navSlice.actions.underlineNavItem({ navItemIdKey: navItemId.quotations }),
    )
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableAllTopNavItems())
  })
}
