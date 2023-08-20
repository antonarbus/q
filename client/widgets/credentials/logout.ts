import { notify } from 'client/shared/ui/top_msg/notify'
import { store } from 'client/app/store'
import { navUpdate } from './navUpdate'
import { token } from '../../shared/auth/token'
import { forgetLoggedUser } from 'client/entities/user'
import type { LogoutApiRes } from 'server/api/logoutRouter'
import { apiUrl } from 'server/apiUrls'

export const logoutUser = async (): Promise<void> => {
  const method = 'GET'
  const options = { method }
  try {
    const res = await fetch(apiUrl.logout, options)
    const data = await res.json() as LogoutApiRes
    const { status, message, email } = data

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
    store.dispatch(forgetLoggedUser())
    navUpdate.logout()
  } catch (err) {
    console.log(err)
    notify({ msg: 'Internal error', type: 'error', theme: 'light' })
  } finally {
    token.access = ''
  }
}
