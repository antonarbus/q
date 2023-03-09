import { notify } from 'client/features/notifier/notify'
import { store } from 'client/store'
import { forgetLoggedUser } from './credentialsSlice'
import { navUpdate } from './navUpdate'
import { token } from './token'

export async function logoutUser() {
  const method = 'GET'
  const options = { method }
  try {
    const res = await fetch('/api/logout', options)
    const data = await res.json()
    const { status, message, email } = data
    if (status === 'error') {
      message === 'no refresh token in cookies' && notify({ msg: 'Already logged out before', type: 'info', theme: 'light' })
      message === 'no email in refresh token' && notify({ msg: 'No email in refresh token, smth is wrong', type: 'info', theme: 'light' })
      message === 'no user with such refresh token' && notify({ msg: 'No user with such refresh token', type: 'info', theme: 'light' })
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
