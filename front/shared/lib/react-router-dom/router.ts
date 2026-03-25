/* eslint-disable @typescript-eslint/member-ordering */
import type { createBrowserRouter } from 'react-router-dom'

type Router = ReturnType<typeof createBrowserRouter>

class RouterHolder {
  #router: Router | null = null

  public set router(instance: Router) {
    if (this.#router !== null) {
      throw new Error('router is already instantiated')
    }

    this.#router = instance
  }

  public get router(): Router {
    if (this.#router === null) {
      throw new Error('router is not initialized')
    }

    return this.#router
  }
}

export const routerHolder = new RouterHolder()
