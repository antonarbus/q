import { dispatch } from '@lib_instances/store'
import type { LogoutApiRes } from 'server/api/logoutRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { deleteQuotationsCache } from '@entities/quotation'
import { userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/ui/top_msg/notify'

export const logOut = async (): Promise<void> => {
  try {
    const res = await fetch(apiUrl.logout)
    const { status, message }: LogoutApiRes = await res.json()

    if (status === 'error') {
      if (message === 'no refresh token in cookies') {
        notify({
          msg: 'Already logged out before',
          type: 'info',
          theme: 'light',
        })
      }

      if (message === 'no email in refresh token') {
        notify({
          msg: 'No email in refresh token, smth is wrong',
          type: 'info',
          theme: 'light',
        })
      }

      if (message === 'no user with such refresh token') {
        notify({
          msg: 'No user with such refresh token',
          type: 'info',
          theme: 'light',
        })
      }
    }

    dispatch(userSlice.actions.forgetLoggedUser())
    deleteQuotationsCache()
    dispatch(navSlice.actions.showLogInMenuItem())
    dispatch(navSlice.actions.hideAccountMenuItem())
  } catch (err) {
    console.error(err)
    notify({ msg: 'Internal error', type: 'error', theme: 'light' })
  } finally {
    accessTokenSignal.value = null
  }
}
