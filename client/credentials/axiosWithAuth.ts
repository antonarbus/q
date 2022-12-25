// axios.ts
import { forgetLoggedUser, rememberLoggedUser } from '@client/credentials/credentialsSlice'
import { globalObject } from '@client/globalObject'
import { store } from '@client/store'
import axios from 'axios'

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use((config) => {
  const accessJwtToken = globalObject.accessJwtToken
  if (config.headers && accessJwtToken) {
    config.headers['access-jwt-token'] = accessJwtToken
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
        const response = await axios.get('/api/refresh', { withCredentials: true })
        const { accessJwtToken, email } = response.data
        if (accessJwtToken) {
          globalObject.accessJwtToken = accessJwtToken
          store.dispatch(rememberLoggedUser({ email, isLogged: true, roles: 'viewer' }))
        }
        if (!accessJwtToken) {
          globalObject.accessJwtToken = ''
          store.dispatch(forgetLoggedUser())
        }
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        console.log('not authorized')
        console.log(error)
      }
    }

    if (error.response.status === 401) {
      store.dispatch(forgetLoggedUser())
    }

    throw error
  }
)
