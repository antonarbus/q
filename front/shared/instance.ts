/* eslint-disable @typescript-eslint/member-ordering */
import type { ReactQuery } from '@app/reactQuery'
import type { Router } from '@app/router'

class Instance {
  #router: Router | null = null
  #reactQuery: ReactQuery | null = null

  public get router(): Router {
    if (this.#router === null) {
      throw new Error('Router instance is not initialized')
    }

    return this.#router
  }

  public set router(routerInstance: Router) {
    if (this.#router !== null) {
      throw new Error('Router instance has already been initialized')
    }

    this.#router = routerInstance
  }

  public get reactQuery(): ReactQuery {
    if (this.#reactQuery === null) {
      throw new Error('React query instance is not initialized')
    }

    return this.#reactQuery
  }

  public set reactQuery(reactQueryInstance: ReactQuery) {
    if (this.#reactQuery !== null) {
      throw new Error('React query instance has already been initialized')
    }

    this.#reactQuery = reactQueryInstance
  }
}

export const instance = new Instance()
