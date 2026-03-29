import { route } from '@back/api/route'
import type { ResBody } from '@back/api/user/getAccessTokenHandler'
import { headerName } from '@back/shared/headers'
import { userSlice } from '@front/entities/user/redux/userSlice'
import { getAccessTokenDeferred } from '@front/features/auth/try-to-log-in-without-prompt/AccessToken'
import { instantiateAxiosWithAuth } from '@front/shared/lib/axios/axiosWithAuth'
import { reduxHolder } from '@front/shared/lib/redux'
import { log } from '@front/shared/util/log'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use(async (config) => {
  // wait until initial access token if fetched, otherwise token is null and another immediate duplicate request for access token will be sent
  await getAccessTokenDeferred.promise

  config.headers[headerName.accessJwtToken] = reduxHolder.getState().user.accessToken

  return config
})

type ExtendedAxiosRequestConfig = AxiosRequestConfig & { isRetry?: boolean }

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error: AxiosError) => {
    // remember original request to use it when we refresh user's access token
    const originalRequestConfig: ExtendedAxiosRequestConfig | undefined = error.config

    const isRetry = originalRequestConfig?.isRetry

    // most likely access token was expired
    const isUnauthorizedAfterCheckingAccessToken =
      error instanceof AxiosError &&
      error.response?.status === 401 &&
      (isRetry === false || isRetry === undefined)

    const shouldRetry =
      isUnauthorizedAfterCheckingAccessToken === true && originalRequestConfig !== undefined

    if (shouldRetry === true) {
      originalRequestConfig.isRetry = true

      try {
        // refresh expired or invalid access token & extend refresh token if it is about to expire
        const res = await axios[route.getAccessToken.method]<ResBody>(route.getAccessToken.url, {
          withCredentials: true,
        })

        if (res.data.accessJwtToken !== undefined) {
          reduxHolder.dispatch(
            userSlice.actions.setAccessToken({
              accessToken: res.data.accessJwtToken,
            }),
          )
        }

        // make original request
        return await axiosWithAuth.request(originalRequestConfig)
      } catch (err: unknown) {
        const isUnauthorized = err instanceof AxiosError && err.response?.status === 401

        if (isUnauthorized === true) {
          // still unauthorized after attempt to refresh the access token
          reduxHolder.dispatch(userSlice.actions.setAccessToken({ accessToken: null }))

          log.warn('not authorized')
        }
      }
    }

    throw error
  },
)

instantiateAxiosWithAuth(axiosWithAuth)
