/* eslint-disable @typescript-eslint/member-ordering */
import type { QueryClientType } from '@app/queryClient'
import type { NavItem } from './nav'

class Instance {
  #queryClientInstance: QueryClientType | null = null
  #navStructureInstance: NavItem[] | null = null

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
