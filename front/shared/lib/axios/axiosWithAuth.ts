/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import type { AxiosWithAuth } from '@app/axiosWithAuth'

export let axiosWithAuth = null as unknown as AxiosWithAuth

export const instantiateAxiosWithAuth = (instance: AxiosWithAuth): void => {
  if (axiosWithAuth !== null) {
    throw new Error('axiosWithAuth is already instantiated')
  }

  axiosWithAuth = instance
}
