import { router } from '@lib_instances/Router'
import axios, { AxiosError } from 'axios'
import { apiUrl } from 'server/consts/apiUrl'
import { headerName } from 'server/consts/headerName'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'

//* for protected routes we use this special axios instance which automatically attach access token into the header

//* tokens are checked and refreshed at two places with useRefreshTokens() hook
//* ones we enter the app at the < Main /> component
//* and every time we hit any route under <PersistentAuth />

//* protected routes have a middleware which checks the token against db
//* middleware throw 401 error response if token is not valid
//* if error is thrown for the 1st time the interceptor bellow will try to refresh the token as it may be simply expired after 15 min
//* then it will try to make original call again with refreshed token (if it is refreshed)
//* and if it has again fail with 401 status then we need to show the login form

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use((config) => {
  if (config.headers && accessTokenSignal.value !== null) {
    config.headers[headerName.accessJwtToken] = accessTokenSignal.value
  }

  return config
})

axiosWithAuth.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalRequest = error.config
  const isTokenProbablyExpired = error.response.status === 401 && error.config && !error.config._isRetry
  if (isTokenProbablyExpired) {
    originalRequest._isRetry = true
    try {
      const response = await axios.get(apiUrl.getAccessToken, { withCredentials: true })
      const { accessJwtToken } = response.data

      if (accessJwtToken) {
        accessTokenSignal.value = accessJwtToken
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await axiosWithAuth.request(originalRequest)
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        accessTokenSignal.value = null
        console.warn('not authorized')
        console.error(err)
        void router.navigate('/login')
      }
    }
  }

  throw error
})
