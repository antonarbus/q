import axios from 'axios'

export const baseURL = 'http://localhost:3009'

export const $axios = axios.create({ withCredentials: true, baseURL })

$axios.interceptors.request.use((config) => {
  config.headers.auth = localStorage.getItem('accessJwtToken') || ''
  return config
})
