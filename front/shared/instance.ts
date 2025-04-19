/* eslint-disable @typescript-eslint/member-ordering */
import type { ReactQuery } from '@app/reactQuery'
import type { NavItem } from './nav'

class Instance {
  #queryClientInstance: ReactQuery | null = null
  #navStructureInstance: NavItem[] | null = null

  public set queryClient(queryClientInstance: ReactQuery) {
    if (this.#queryClientInstance !== null) {
      throw new Error('Query client instance has already been initialized')
    }

    this.#queryClientInstance = queryClientInstance
  }

  public get queryClient(): ReactQuery {
    if (this.#queryClientInstance === null) {
      throw new Error('Query client instance is not initialized')
    }

    return this.#queryClientInstance
  }

  public set navStructure(navStructureInstance: NavItem[]) {
    if (this.#navStructureInstance !== null) {
      throw new Error('navStructure instance has already been initialized')
    }

    this.#navStructureInstance = navStructureInstance
  }

  public get navStructure(): NavItem[] {
    if (this.#navStructureInstance === null) {
      throw new Error('navStructure instance is not initialized')
    }

    return this.#navStructureInstance
  }
}

export const instance = new Instance()
