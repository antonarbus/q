import { router } from '@lib_instances/Router'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { apiUrl } from 'server/consts/apiUrl'
import { headerName } from 'server/consts/headerName'
import { accessTokenSignal } from '../../auth/accessTokenSignal'
import { httpStatus } from '../../consts/httpStatus'
import { route } from '../../consts/route'

export const { promise: initAccessTokenFetchingPromise, resolve: resolveInitAccessTokenFetching } = Promise.withResolvers<'fetched' | 'failed'>()

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use(async (config) => {
  // wait till initial access token if fetched, otherwise we put null and another vain request for access token will be sent
  await initAccessTokenFetchingPromise
  config.headers[headerName.accessJwtToken] = accessTokenSignal.value
  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config as (AxiosRequestConfig & { _isRetry: boolean })
    const isTokenProbablyExpired = error.response.status === httpStatus.unauthorized_401 && error.config && !error.config._isRetry

    if (isTokenProbablyExpired) {
      originalRequest._isRetry = true

      try {
        const res = await axios.get(apiUrl.getAccessToken, { withCredentials: true })

        if (res.data.accessJwtToken) {
          accessTokenSignal.value = res.data.accessJwtToken
        }

        return await axiosWithAuth.request(originalRequest)
      } catch (err: unknown) {
        const unauthorized = err instanceof AxiosError && err.response?.status === httpStatus.unauthorized_401

        if (unauthorized) {
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
