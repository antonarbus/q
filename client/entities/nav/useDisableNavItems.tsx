import { useEffectOnce, useUnmount } from 'react-use'
import { navSlice } from 'client/entities/nav'
import { dispatch } from 'client/shared/clients'

export const useDisableNavItems = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopMenuItemsExceptItemId({ exceptItemId: 'Offers' }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
