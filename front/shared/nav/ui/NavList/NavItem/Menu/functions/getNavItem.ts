import type { NavItemId } from '@shared/consts/navItemId'
import { getState } from '@shared/lib/redux'
import type { NavItem } from '@shared/nav/type'

type Props = {
  navItemId: NavItemId
}

export const getNavItem = (props: Props): NavItem | null => {
  const navLevel = getState().nav.navStructure

  const recursivelySearchForNavItemByNavItemId = (
    navItems: NavItem[],
  ): NavItem | null => {
    for (const navItem of navItems) {
      if (navItem.id === props.navItemId) {
        return navItem
      }

      if (navItem.navItems !== undefined) {
        const found = recursivelySearchForNavItemByNavItemId(navItem.navItems)

        if (found) {
          return found
        }
      }
    }

    return null
  }

  const navItem = recursivelySearchForNavItemByNavItemId(navLevel)

  return navItem
}
