/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import type { Router } from '@app/router'

export let router = null as unknown as Router

export const instantiateRouter = (instance: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (router !== null) {
    throw new Error('router is already instantiated')
  }

  router = instance
}
