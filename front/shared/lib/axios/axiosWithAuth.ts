/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import type { AxiosWithAuth } from '@shared/lib/axios/axiosConfig'

export let axiosWithAuth = null as unknown as AxiosWithAuth

export const instantiateAxiosWithAuth = (instance: AxiosWithAuth): void => {
  if (axiosWithAuth !== null) {
    throw new Error('axiosWithAuth is already instantiated')
  }

  axiosWithAuth = instance
}
