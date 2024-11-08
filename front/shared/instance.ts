import type { ReactQuery } from '@app/reactQuery'

class Instance {
  #reactQuery: ReactQuery | null = null

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
