import { useEffectOnce, useUnmount } from 'react-use'
import { dispatch } from '@shared/clients'
import { navSlice } from './navSlice'

export const useDisableNavItems = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopMenuItemsExceptItemId({ exceptItemId: 'Offers' }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
