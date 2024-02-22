import { dispatch, getState } from '@lib_instances/store'
import axios, { AxiosError } from 'axios'
import { apiUrl } from 'server/consts/apiUrl'
import { headerName } from 'server/consts/headerName'
import { userSlice } from '../redux/userSlice'
import { accessTokenRef } from './accessTokenRef'

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
  if (config.headers && accessTokenRef.current !== null) {
    config.headers[headerName.accessJwtToken] = accessTokenRef.current
    config.headers.email = getState().user.email ?? null
  }

  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    const isTokenProbablyExpired = error.response.status === 401 && error.config && !error.config._isRetry
    if (isTokenProbablyExpired) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(apiUrl.refresh, { withCredentials: true })
        const { accessJwtToken } = response.data

        if (accessJwtToken) {
          accessTokenRef.current = accessJwtToken
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return await axiosWithAuth.request(originalRequest)
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          if (getState().user.isLogged) {
            dispatch(userSlice.actions.forgetLoggedUser())
          }
          accessTokenRef.current = null
          console.log('show login window')
          console.warn('not authorized')
          console.error(err)
          // todo: show login window
          // todo: need to navigate for the route and router to be exposed, fuck!
        }
      }
    }

    throw error
  },
)
