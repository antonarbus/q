/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import type { AxiosInstance } from 'axios'

type AxiosWithAuth = AxiosInstance

export let axiosWithAuth = null as unknown as AxiosInstance

export const instantiateAxiosWithAuth = (instance: AxiosWithAuth): void => {
  if (axiosWithAuth !== null) {
    throw new Error('axiosWithAuth is already instantiated')
  }

  axiosWithAuth = instance
}
