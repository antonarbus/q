import type { RouterType } from '@app/router'

class Instance {
  #router: RouterType | null = null

  public get router(): RouterType {
    if (this.#router === null) {
      throw new Error('Router instance is not initialized')
    }

    return this.#router
  }

  public set router(routerInstance: RouterType) {
    if (this.#router !== null) {
      throw new Error('Router instance has already been initialized')
    }

    this.#router = routerInstance
  }
}

export const instance = new Instance()
