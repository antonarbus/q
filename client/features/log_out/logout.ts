import { dispatch } from '@lib_instances/store'
import type { LogoutApiRes } from 'server/api/logoutRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { notify } from '@shared/ui/top_msg/notify'
import { navUpdate } from './navUpdate'

export const logout = async (): Promise<void> => {
  const method = 'GET'
  const options = { method }
  try {
    const res = await fetch(apiUrl.logout, options)
    const data: LogoutApiRes = await res.json()
    const { status, message } = data

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

    if (status === 'ok') {
      // notify({ msg: `User with ${email} is logged out`, type: 'success', theme: 'light' })
    }
    dispatch(userSlice.actions.forgetLoggedUser())
    navUpdate.logout()
  } catch (err) {
    console.error(err)
    notify({ msg: 'Internal error', type: 'error', theme: 'light' })
  } finally {
    accessTokenSignal.value = null
  }
}
