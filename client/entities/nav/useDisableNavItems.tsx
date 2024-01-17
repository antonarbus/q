import { useEffectOnce, useUnmount } from 'react-use'
import { navSlice } from '@entities/nav'
import { dispatch } from '@shared/clients'

export const useDisableNavItems = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopMenuItemsExceptItemId({ exceptItemId: 'Offers' }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
