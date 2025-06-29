/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { api } from '@back/api'
import { headerName } from '@back/shared/headers'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import type { ResBody } from '@back/api/auth/getAccessTokenHandler'
import { userSlice } from '@entities/user'
import { initAccessTokenFetchingPromise } from '@features/auth/get_access_token/AccessToken'
import { instantiateAxiosWithAuth } from '@shared/lib/axios/axiosWithAuth'
import { dispatch, getState } from '@shared/lib/redux'

const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use(async (config) => {
  // wait until initial access token if fetched, otherwise token is null and another immediate duplicate request for access token will be sent
  await initAccessTokenFetchingPromise
  config.headers[headerName.accessJwtToken] = getState().user.accessToken

  return config
})

type ExtendedAxiosRequestConfig = AxiosRequestConfig & { isRetry?: boolean }

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error: AxiosError) => {
    // remember original request to use it when we refresh user's access token
    const originalRequestConfig = error.config as ExtendedAxiosRequestConfig

    // most likely access token was expired
    const isUnauthorizedAfterCheckingAccessToken =
      (error instanceof AxiosError &&
        error.response?.status === 401 &&
        (error.config as ExtendedAxiosRequestConfig).isRetry === false) ||
      (error.config as ExtendedAxiosRequestConfig).isRetry === undefined

    if (isUnauthorizedAfterCheckingAccessToken === true) {
      originalRequestConfig.isRetry = true

      try {
        // refresh expired or invalid access token & extend refresh token if it is about to expire
        const res = await axios[api.getAccessToken.method]<ResBody>(
          api.getAccessToken.url,
          {
            withCredentials: true,
          },
        )

        if (res.data.accessJwtToken !== undefined) {
          dispatch(
            userSlice.actions.setAccessToken({
              accessToken: res.data.accessJwtToken,
            }),
          )
        }

        // make original request
        return await axiosWithAuth.request(originalRequestConfig)
      } catch (err: unknown) {
        const isUnauthorized =
          err instanceof AxiosError && err.response?.status === 401

        if (isUnauthorized === true) {
          // still unauthorized after attempt to refresh the access token
          dispatch(
            userSlice.actions.setAccessToken({
              accessToken: null,
            }),
          )

          console.warn('not authorized')
          console.error(err)
        }
      }
    }

    throw error
  },
)

export type AxiosWithAuth = typeof axiosWithAuth

instantiateAxiosWithAuth(axiosWithAuth)
