import { dispatch } from '@lib_instances/store'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { deleteBookmarksCache } from '@entities/bookmark'
import { deleteQuotationsCache } from '@entities/quotation'
import { useLogOutMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { navItemKey } from '@shared/consts/navItemKey'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/toast'

export const Logout = (): JSX.Element => {
  const navigate = useNavigate()
  const { mutate: logOut, isPending, isSuccess, isError } = useLogOutMutation()

  useEffectOnce(logOut)

  useUpdateEffect(() => {
    if (isPending) {
      loadingDotsOverlayTextSignal.value = 'Logging out'
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      deleteQuotationsCache()
      deleteBookmarksCache()

      accessTokenSignal.value = null
      dispatch(userSlice.actions.forgetLoggedUser())
      dispatch(
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemKey.login] }),
      )
      dispatch(
        navSlice.actions.hideNavItems({
          navItemIdKeys: [navItemKey.profile],
        }),
      )
      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
        navigate('..')
      }, 1000)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({
        msg: 'Problems with logging out',
        type: 'error',
        theme: 'light',
      })

      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
        navigate('..')
      }, 1000)
    }
  }, [isError])

  return <></>
}
