import { TMenu, navStructure } from 'client/features/nav/navStructure'

/**
 * returns clicked menu object from navStructure
 * @descriptions
 * - we track what menu was clicked
 * - put array of clicked menu ids into the store
 * - keep ids in array starting from the top to the clicked one
 * - in function we go through the chain of ids and search for the clicked one
 * @param idsToCurrentMenuItems array of menu ids from the top to the clicked one
 */

export function getMenuItemByIdsChain(idsToCurrentMenuItems: string[]) {
  let clicked: TMenu[] = navStructure
  let tempMenu: TMenu[] = navStructure
  idsToCurrentMenuItems.forEach((id: string) => {
    if (id === 'burger') {
      clicked = navStructure[0].menuItems!
      return clicked
    }
    if (id !== 'burger') {
      clicked = tempMenu.find(menuItem => menuItem.id === id)?.menuItems || []
    }
    tempMenu = clicked
  })
  return clicked
}
