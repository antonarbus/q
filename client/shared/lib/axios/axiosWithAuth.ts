import { router } from '@lib_instances/Router'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { apiUrl } from 'server/consts/apiUrl'
import { headerName } from 'server/consts/headerName'
import { accessTokenSignal } from '../../auth/accessTokenSignal'
import { httpStatus } from '../../consts/httpStatus'
import { route } from '../../consts/route'

export const {
  promise: initAccessTokenFetchingPromise,
  resolve: resolveInitAccessTokenFetching,
} = Promise.withResolvers<'fetched' | 'failed'>()

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use(async (config) => {
  // wait till initial access token if fetched, otherwise token is null and another immediate duplicate request for access token will be sent
  await initAccessTokenFetchingPromise
  config.headers[headerName.accessJwtToken] = accessTokenSignal.value
  return config
})

type ExtendedAxiosRequestConfig = AxiosRequestConfig & { _isRetry?: boolean }

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequestConfig = error.config as ExtendedAxiosRequestConfig

    const isUnauthorizedAfterCheckingAccessToken =
      error instanceof AxiosError &&
      error.response?.status === httpStatus.unauthorized_401 &&
      !(error.config as ExtendedAxiosRequestConfig)._isRetry

    if (isUnauthorizedAfterCheckingAccessToken) {
      originalRequestConfig._isRetry = true

      try {
        const res = await axios.get(apiUrl.getAccessToken, {
          withCredentials: true,
        })

        if (res.data.accessJwtToken) {
          accessTokenSignal.value = res.data.accessJwtToken
        }

        return await axiosWithAuth.request(originalRequestConfig)
      } catch (err: unknown) {
        const isUnauthorized =
          err instanceof AxiosError &&
          err.response?.status === httpStatus.unauthorized_401

        if (isUnauthorized) {
          accessTokenSignal.value = null
          console.warn('not authorized')
          console.error(err)

          // if (!location.pathname.includes(route.login)) {
          //   void router.navigate(`./${route.login}`)
          // }
        }
      }
    }

    throw error
  },
)
