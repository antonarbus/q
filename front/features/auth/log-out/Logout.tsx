import { dispatch } from '@shared/lib/redux'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { deleteBookmarkListCache } from '@entities/bookmark'
import { deleteQuotationListCache } from '@entities/quotation'
import { useLogOutUserMutation, userSlice } from '@entities/user'
import { navItemId } from '@shared/const/navItemId'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { appSlice } from '@shared/appSlice'

export const Logout = (): React.ReactNode => {
  const navigate = useNavigate()

  const logOutUserMutation = useLogOutUserMutation()

  useEffectOnce(logOutUserMutation.mutate)

  useUpdateEffect(() => {
    if (logOutUserMutation.isPending === true) {
      dispatch(
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

      dispatch(userSlice.actions.setAccessToken({ accessToken: null }))
      dispatch(userSlice.actions.forgetLoggedUser())

      dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.login] }))

      dispatch(
        navSlice.actions.hideNavItems({
          navItemIds: [navItemId.profile],
        }),
      )

      dispatch(navSlice.actions.hideNavItems({ navItemIds: ['admin'] }))

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [logOutUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (logOutUserMutation.isError === true) {
      toast.error('Problems with logging out')

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
        void navigate('..')
      }, 1000)
    }
  }, [logOutUserMutation.isError])

  return null
}
