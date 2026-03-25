/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { NavItem } from './type'

let navStructureInstance: NavItem[] | null = null

export const setNavStructure = (items: NavItem[]): void => {
  if (navStructureInstance !== null) {
    throw new Error('navStructure is already initialized')
  }

  navStructureInstance = items
}

export const getNavStructure = (): NavItem[] => {
  if (navStructureInstance === null) {
    throw new Error('navStructure is not initialized')
  }

  return navStructureInstance
}
