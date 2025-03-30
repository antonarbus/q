import type { RootState } from '@shared/lib/redux'
import type { NavItem } from '../../../../../type'

export const selectMenuItemByIdsChainSelector =
  (idsToCurrentMenuItems: string[]) =>
  (state: RootState): NavItem[] => {
    const topLevelNavMenu = state.nav.navStructure[0]

    if (!topLevelNavMenu) {
      return state.nav.navStructure
    }

    let clicked: NavItem[] = state.nav.navStructure
    let tempMenu: NavItem[] = state.nav.navStructure

    idsToCurrentMenuItems.forEach((id: string) => {
      if (id === 'burger') {
        clicked = topLevelNavMenu.navItems ?? state.nav.navStructure

        return clicked
      }

      if (id !== 'burger') {
        clicked =
          tempMenu.find((menuItem) => menuItem.id === id)?.navItems ?? []
      }

      tempMenu = clicked
    })

    return clicked
  }
