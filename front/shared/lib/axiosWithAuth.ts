import type { AxiosWithAuth } from '@app/axiosWithAuth'

export let axiosWithAuth = null as unknown as AxiosWithAuth

export const instantiateAxiosWithAuth = (instance: AxiosWithAuth): void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (axiosWithAuth !== null) {
    throw new Error('axiosWithAuth is already instantiated')
  }

  axiosWithAuth = instance
}
