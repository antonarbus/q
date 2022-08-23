import axios from 'axios'

export const baseURL = 'http://localhost:3009'

export const axiosWithAuth = axios.create({ withCredentials: true, baseURL })

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
        const response = await axios.get(`${baseURL}/api/refresh`, { withCredentials: true })
        const accessJwtToken = response.data.accessJwtToken
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
    }

    throw error
  }
)
