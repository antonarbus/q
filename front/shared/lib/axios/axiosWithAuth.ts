import type { AxiosInstance } from 'axios'

type AxiosWithAuth = AxiosInstance

export let axiosWithAuth = null as unknown as AxiosInstance

export const instantiateAxiosWithAuth = (instance: AxiosWithAuth): void => {
  if (axiosWithAuth !== null) {
    throw new Error('axiosWithAuth is already instantiated')
  }

  axiosWithAuth = instance
}
