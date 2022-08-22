import axios from 'axios'

export const baseURL = 'http://localhost:3009'

export const axiosWithAuth = axios.create({ withCredentials: true, baseURL })

axiosWithAuth.interceptors.request.use((config) => {
  config.headers['['access-jwt-token']'] = localStorage.getItem('accessJwtToken') || ''
  return config
})
