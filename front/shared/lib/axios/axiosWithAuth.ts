import { apiUrl } from '@back/consts/apiUrl'
import { headerName } from '@back/consts/headerName'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { accessTokenSignal } from '../../auth/accessTokenSignal'

export const {
  promise: initAccessTokenFetchingPromise,
  resolve: resolveInitAccessTokenFetching,
  // @ts-expect-error: Promise.withResolvers is too new
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
    // remember original request to use it when we refresh user's access token
    const originalRequestConfig = error.config as ExtendedAxiosRequestConfig

    // most likely access token was expired
    const isUnauthorizedAfterCheckingAccessToken =
      error instanceof AxiosError &&
      error.response?.status === 401 &&
      !(error.config as ExtendedAxiosRequestConfig)._isRetry

    if (isUnauthorizedAfterCheckingAccessToken) {
      originalRequestConfig._isRetry = true

      try {
        // refresh expired or invalid access token
        const res = await axios.get(apiUrl.getAccessToken, {
          withCredentials: true,
        })

        if (res.data.accessJwtToken) {
          accessTokenSignal.value = res.data.accessJwtToken
        }

        // make original request
        return await axiosWithAuth.request(originalRequestConfig)
      } catch (err: unknown) {
        const isUnauthorized =
          err instanceof AxiosError && err.response?.status === 401

        if (isUnauthorized) {
          // still unauthorized after attempt to refresh the access token
          accessTokenSignal.value = null
          console.warn('not authorized')
          console.error(err)
        }
      }
    }

    throw error
  },
)
