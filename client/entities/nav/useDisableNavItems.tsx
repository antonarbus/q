import { dispatch } from '@libras/store'
import { useEffectOnce, useUnmount } from 'react-use'
import { navSlice } from './navSlice'

export const useDisableNavItems = (): void => {
  useEffectOnce(() => {
    dispatch(navSlice.actions.disableTopMenuItemsExceptItemId({ exceptItemId: 'Offers' }))
  })

  useUnmount(() => {
    dispatch(navSlice.actions.enableTopMenuItems())
  })
}
