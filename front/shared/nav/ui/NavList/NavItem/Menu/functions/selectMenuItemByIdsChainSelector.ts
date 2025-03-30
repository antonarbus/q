import type { RootState } from '@shared/lib/redux'
import type { NavItem, NavItemId } from '../../../../../type'

export const selectMenuItemByIdsChainSelector =
  (idsToCurrentMenuItems: NavItemId[]) =>
  (state: RootState): NavItem[] => {
    const topLevelNavMenu = state.nav.navStructure[0]

    if (!topLevelNavMenu) {
      return state.nav.navStructure
    }

    let clicked: NavItem[] = state.nav.navStructure
    let tempMenu: NavItem[] = state.nav.navStructure

    idsToCurrentMenuItems.forEach((navItemId) => {
      if (navItemId === 'burger') {
        clicked = topLevelNavMenu.navItems ?? state.nav.navStructure

        return clicked
      }

      clicked =
        tempMenu.find((menuItem) => menuItem.id === navItemId)?.navItems ?? []

      tempMenu = clicked
    })

    return clicked
  }
