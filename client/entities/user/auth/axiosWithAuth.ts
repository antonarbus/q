import { dispatch, getState } from '@lib_instances/store'
import axios from 'axios'
import { apiUrl } from 'server/consts/apiUrl'
import { headerName } from 'server/consts/headerName'
import { userSlice } from '../redux/userSlice'
import { token } from './token'

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use((config) => {
  if (config.headers && token.access) {
    config.headers[headerName.accessJwtToken] = token.access
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
        const { accessJwtToken, email } = response.data

        if (accessJwtToken) {
          token.access = accessJwtToken
        }

        // if (!accessJwtToken) {
        //   console.log(777)
        //   token.access = ''
        //   dispatch(userSlice.actions.forgetLoggedUser())
        // }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return await axiosWithAuth.request(originalRequest)
      } catch (err) {
        token.access = null
        if (getState().user.isLogged) {
          dispatch(userSlice.actions.forgetLoggedUser())
        }
        console.warn('not authorized')
        console.error(err)
      }
    }

    // if (error.response.status === 401) {
    //   dispatch(userSlice.actions.forgetLoggedUser())
    //   // todo: navigate to login route
    // }

    throw error
  },
)
