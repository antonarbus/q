/* eslint-disable @typescript-eslint/member-ordering */
import type { ReactQuery } from '@app/reactQuery'
import type { NavItem } from './nav'

class Instance {
  #reactQuery: ReactQuery | null = null
  #navStructure: NavItem[] | null = null

  public set reactQuery(reactQueryInstance: ReactQuery) {
    if (this.#reactQuery !== null) {
      throw new Error('React query instance has already been initialized')
    }

    this.#reactQuery = reactQueryInstance
  }

  public get reactQuery(): ReactQuery {
    if (this.#reactQuery === null) {
      throw new Error('React query instance is not initialized')
    }

    return this.#reactQuery
  }

  public set navStructure(navStructureInstance: NavItem[]) {
    if (this.#navStructure !== null) {
      throw new Error('navStructure instance has already been initialized')
    }

    this.#navStructure = navStructureInstance
  }

  public get navStructure(): NavItem[] {
    if (this.#navStructure === null) {
      throw new Error('navStructure instance is not initialized')
    }

    return this.#navStructure
  }
}

export const instance = new Instance()
