import type { AxiosWithAuth } from '@app/axiosWithAuth'

export let axiosWithAuth: null | AxiosWithAuth = null

export const instantiateAxiosWithAuth = (instance: AxiosWithAuth): void => {
  if (axiosWithAuth !== null) {
    throw new Error('axiosWithAuth is already instantiated')
  }

  axiosWithAuth = instance
}
