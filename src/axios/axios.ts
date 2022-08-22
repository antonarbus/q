import axios from 'axios'

export const baseURL = 'http://localhost:3009'

export const axiosWithAuth = axios.create({ withCredentials: true, baseURL })

axiosWithAuth.interceptors.request.use((config) => {
  config.headers['access-jwt-token'] = localStorage.getItem('accessJwtToken') || ''
  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    console.log(666)
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true
        const response = await axios.get(`${baseURL}/api/refresh`, { withCredentials: true })
        if (!response.data.accessJwtToken) return
        const accessJwtToken = response.data.accessJwtToken
        localStorage.setItem('accessJwtToken', accessJwtToken)
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        console.log('not authorized')
      }
    }
    throw error
  }
)
