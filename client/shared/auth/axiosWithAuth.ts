/* eslint-disable */
import axios from 'axios'
import { store } from 'client/app/store'
import { token } from './token'
import { forgetLoggedUser, rememberLoggedUser } from 'client/entities/user'

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

        const response = await axios.get('/api/refresh', {
          withCredentials: true,
        })

        const { accessJwtToken, email } = response.data

        if (accessJwtToken) {
          token.access = accessJwtToken
          store.dispatch(rememberLoggedUser({ email, isLogged: true, roles: ['viewer'] }))
        }

        if (!accessJwtToken) {
          token.access = ''
          store.dispatch(forgetLoggedUser())
        }

        return await axiosWithAuth.request(originalRequest)
      } catch (err) {
        console.log('not authorized')
        console.log(err)
      }
    }

    if (error.response.status === 401) {
      store.dispatch(forgetLoggedUser())
    }

    throw error
  },
)
