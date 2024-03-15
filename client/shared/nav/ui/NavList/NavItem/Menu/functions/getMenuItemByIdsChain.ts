import { getState } from '@lib_instances/store'
import type { MenuItemType } from '../../../../../type'

/**
 * returns clicked menu object from navStructure
 * @descriptions
 * - we track what menu was clicked
 * - put array of clicked menu ids into the store
 * - keep ids in array starting from the top to the clicked one
 * - in function we go through the chain of ids and search for the clicked one
 * @param idsToCurrentMenuItems array of menu ids from the top to the clicked one
 */

export const getMenuItemByIdsChain = (idsToCurrentMenuItems: string[]): MenuItemType[] => {
  const navStructure = getState().nav.navStructure
  let clicked: MenuItemType[] = navStructure
  let tempMenu: MenuItemType[] = navStructure
  idsToCurrentMenuItems.forEach((id: string) => {
    if (id === 'burger') {
      if (!navStructure[0]) return clicked
      if (!navStructure[0].menuItems) return clicked
      clicked = navStructure[0].menuItems
      return clicked
    }
    if (id !== 'burger') {
      clicked = tempMenu.find((menuItem) => menuItem.id === id)?.menuItems ?? []
    }
    tempMenu = clicked
  })
  return clicked
}
