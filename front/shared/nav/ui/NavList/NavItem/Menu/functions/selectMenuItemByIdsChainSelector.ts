import { type RootState } from '@lib_instances/store'
import { type MenuItemType } from '../../../../../type'

export const selectMenuItemByIdsChainSelector =
  (idsToCurrentMenuItems: string[]) =>
  (state: RootState): MenuItemType[] => {
    const topLevelNavMenu = state.nav.navStructure[0]
    if (!topLevelNavMenu) return state.nav.navStructure

    let clicked: MenuItemType[] = state.nav.navStructure
    let tempMenu: MenuItemType[] = state.nav.navStructure

    idsToCurrentMenuItems.forEach((id: string) => {
      if (id === 'burger') {
        clicked = topLevelNavMenu.menuItems ?? state.nav.navStructure
        return clicked
      }

      if (id !== 'burger') {
        clicked =
          tempMenu.find((menuItem) => menuItem.id === id)?.menuItems ?? []
      }

      tempMenu = clicked
    })

    return clicked
  }
