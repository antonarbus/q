// axios.ts
import { rememberLoggedUser, forgetLoggedUser } from '@redux/slices/userSlice'
import { store } from '@redux/store'
import axios from 'axios'

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use((config) => {
  const accessJwtToken = localStorage.getItem('accessJwtToken')
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
          localStorage.setItem('accessJwtToken', accessJwtToken)
          store.dispatch(rememberLoggedUser({ email, isLogged: true, role: 'viewer' }))
        }
        if (!accessJwtToken) {
          localStorage.removeItem('accessJwtToken')
          store.dispatch(forgetLoggedUser())
        }
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        console.log('not authorized')
        console.log(error)
      }
    }

    if (error.response.status === 401) {
      // todo: logout in redux
      // todo: suggest to login
      console.log('show login card')
    }

    throw error
  }
)
