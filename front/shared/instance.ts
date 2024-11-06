import type { RouterType } from '@app/router'

class Instance {
  #router: RouterType | null = null

  public get router(): RouterType {
    if (this.#router === null) {
      throw new Error(
        'Router instance is not initialized. Call "initializeRouter" first',
      )
    }

    return this.#router
  }

  public initializeRouter({
    routerInstance,
  }: {
    routerInstance: RouterType
  }): void {
    if (this.#router !== null) {
      throw new Error('Router instance has already been initialized')
    }

    this.#router = routerInstance
  }
}

export const instance = new Instance()
