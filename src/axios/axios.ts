// axios.ts
import axios from 'axios'

export const axiosWithAuth = axios.create({ withCredentials: true })

axiosWithAuth.interceptors.request.use((config) => {
  const accessJwtToken = localStorage.getItem('accessJwtToken')
  if (config.headers && accessJwtToken) {
    config.headers['access-jwt-token'] = accessJwtToken
  }
  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true
        const response = await axios.get('/api/refresh', { withCredentials: true })
        const { accessJwtToken } = response.data
        accessJwtToken && localStorage.setItem('accessJwtToken', accessJwtToken)
        !accessJwtToken && localStorage.removeItem('accessJwtToken')
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        console.log('not authorized')
        console.log(error)
      }
    }

    if (error.response.status === 401) {
      // todo: logout in redux
      // todo: suggest to login
      console.log('show login card')
    }

    throw error
  }
)
