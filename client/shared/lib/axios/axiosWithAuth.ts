import { router } from '@lib_instances/Router'
import axios, { AxiosError } from 'axios'
import { apiUrl } from 'server/consts/apiUrl'
import { headerName } from 'server/consts/headerName'
import { accessTokenSignal } from '../../auth/accessTokenSignal'
import { httpStatus } from '../../consts/httpStatus'
import { route } from '../../consts/route'
import { asyncDelay } from '../../utils/delay'

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use(async (config) => {
  if (accessTokenSignal.value === null) {
    // wait a bit if we still do not have access token which we suppose to receive on first load
    // maybe in 500ms we already have it and do not need make same request to require access token
    await asyncDelay(500)
    config.headers[headerName.accessJwtToken] = accessTokenSignal.value
    return config
  } else {
    config.headers[headerName.accessJwtToken] = accessTokenSignal.value
    return config
  }
})

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    const isTokenProbablyExpired = error.response.status === httpStatus.unauthorized_401 && error.config && !error.config._isRetry

    if (isTokenProbablyExpired) {
      originalRequest._isRetry = true

      try {
        const res = await axios.get(apiUrl.getAccessToken, { withCredentials: true })

        if (res.data.accessJwtToken) {
          accessTokenSignal.value = res.data.accessJwtToken
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return await axiosWithAuth.request(originalRequest)
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === httpStatus.unauthorized_401) {
          accessTokenSignal.value = null
          console.warn('not authorized')
          console.error(err)

          if (!location.pathname.includes(route.login)) {
            void router.navigate(`./${route.login}`)
          }
        }
      }
    }

    throw error
  })
