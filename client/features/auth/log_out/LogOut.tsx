import { dispatch } from '@lib_instances/store'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { deleteItemsCache } from '@entities/item'
import { deleteQuotationsCache } from '@entities/quotation'
import { useLogOutMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { navItemId } from '@shared/consts/navItemId'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'

export const LogOut = (): JSX.Element => {
  const navigate = useNavigate()
  const { mutate: logOut, isPending, data, isSuccess, isError, error } = useLogOutMutation()

  useEffectOnce(logOut)

  useUpdateEffect(() => {
    if (isPending) {
      loadingDotsOverlayTextSignal.value = 'Logging out'
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'logged out') {
        deleteQuotationsCache()
        deleteItemsCache()

        accessTokenSignal.value = null
        dispatch(userSlice.actions.forgetLoggedUser())
        dispatch(navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.login] }))
        dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.account] }))
        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
          navigate('..')
        }, 1000)
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'no user in db') {
        notify({ msg: 'Already logged out', type: 'info', theme: 'light' })
      } else if (error.response?.data.message === 'token not found') {
        notify({ msg: 'Already logged out', type: 'info', theme: 'light' })
      } else if (error.response?.data.message === 'user not found') {
        notify({ msg: 'Already logged out', type: 'info', theme: 'light' })
      } else {
        notify({ msg: 'Problems with logging out', type: 'error', theme: 'light' })
      }

      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
        navigate('..')
      }, 1000)
    }
  }, [isError])

  return <></>
}
