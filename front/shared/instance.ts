/* eslint-disable @typescript-eslint/member-ordering */
import type { QueryClientType } from '@front/shared/lib/tanstack-query/queryClient'

class Instance {
  #queryClientInstance: QueryClientType | null = null

  public set queryClient(queryClientInstance: QueryClientType) {
    if (this.#queryClientInstance !== null) {
      throw new Error('Query client instance has already been initialized')
    }

    this.#queryClientInstance = queryClientInstance
  }

  public get queryClient(): QueryClientType {
    if (this.#queryClientInstance === null) {
      throw new Error('Query client instance is not initialized')
    }

    return this.#queryClientInstance
  }
}

export const instance = new Instance()
