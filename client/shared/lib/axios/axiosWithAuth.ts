import { router } from '@lib_instances/Router'
import axios, { AxiosError } from 'axios'
import { apiUrl } from 'server/consts/apiUrl'
import { headerName } from 'server/consts/headerName'
import { accessTokenSignal } from '../../auth/accessTokenSignal'
import { route } from '../../consts/route'

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

        if (!location.pathname.includes(route.login)) {
          void router.navigate(`./${route.login}`)
        }
      }
    }
  }

  throw error
})
