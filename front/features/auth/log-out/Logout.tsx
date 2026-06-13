import { deleteBookmarkListCache } from '@front/entities/bookmark/cache-updater/deleteBookmarkListCache'
import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { deleteQuotationListCache } from '@front/entities/quotation/cache-updater/deleteQuotationListCache'
import { useLogOutUserMutation } from '@front/entities/user/api/useLogOutUserMutation'
import { userSlice } from '@front/entities/user/redux/userSlice'
import { appSlice } from '@front/shared/appSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const Logout = (): React.ReactNode => {
  const navigate = useNavigate()

  const logOutUserMutation = useLogOutUserMutation()

  useEffectOnce(logOutUserMutation.mutate)

  useUpdateEffect(() => {
    if (logOutUserMutation.isPending === true) {
      reduxHolder.dispatch(
        appSlice.actions.showLoadingOverlay({
          shouldShowLoader: true,
          text: 'Logging out',
        }),
      )
    }
  }, [logOutUserMutation.isPending])

  useUpdateEffect(() => {
    if (logOutUserMutation.isSuccess === true) {
      deleteQuotationListCache()
      deleteBookmarkListCache()

      reduxHolder.dispatch(userSlice.actions.setAccessToken({ accessToken: null }))

      reduxHolder.dispatch(userSlice.actions.forgetLoggedUser())

      reduxHolder.dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.login] }))

      reduxHolder.dispatch(
        navSlice.actions.hideNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))

      setTimeout(() => {
        reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [logOutUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (logOutUserMutation.isError === true) {
      toast.error('Problems with logging out')

      setTimeout(() => {
        reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [logOutUserMutation.isError])

  return null
}
