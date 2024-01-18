import { dispatch } from '@libras/store'
import axios from 'axios'
import { apiUrl } from 'server/apiUrls'
import { userSlice } from '../userSlice'
import { token } from './token'

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use((config) => {
  if (config.headers && token.access) {
    config.headers['access-jwt-token'] = token.access
  }

  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true

        const response = await axios.get(apiUrl.refresh, {
          withCredentials: true,
        })

        const { accessJwtToken, email } = response.data

        if (accessJwtToken) {
          token.access = accessJwtToken
          dispatch(userSlice.actions.rememberLoggedUser({ email, isLogged: true, roles: ['viewer'] }))
        }

        if (!accessJwtToken) {
          token.access = ''
          dispatch(userSlice.actions.forgetLoggedUser())
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return await axiosWithAuth.request(originalRequest)
      } catch (err) {
        console.warn('not authorized')
        console.error(err)
      }
    }

    if (error.response.status === 401) {
      dispatch(userSlice.actions.forgetLoggedUser())
    }

    throw error
  },
)
