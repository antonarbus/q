import { getState, type RootState } from '@shared/lib/redux'
import type { NavItemId } from '@shared/nav/navItemId'
import type { NavItem } from '@shared/nav/type'

type Props = {
  navItemId: NavItemId | null
  navState?: RootState['nav']
}

type Res = {
  navItem: NavItem | null
  parentNavItem: NavItem | null
}

export const getNavItem = (props: Props): Res => {
  const recursivelySearchForNavItemByNavItemId = (navItem: NavItem): Res => {
    if (navItem.id === props.navItemId) {
      return { navItem, parentNavItem: navItem }
    }

    for (const item of navItem.navItems ?? []) {
      if (item.id === props.navItemId) {
        return { navItem: item, parentNavItem: navItem }
      }

      if (item.navItems !== undefined) {
        const found = recursivelySearchForNavItemByNavItemId(item)

        if (found.navItem !== null) {
          return {
            navItem: found.navItem,
            parentNavItem: item,
          }
        }
      }
    }

    return { navItem: null, parentNavItem: null }
  }

  const navLevel =
    props.navState?.navStructure.at(0) ?? getState().nav.navStructure.at(0)

  if (navLevel === undefined) {
    return { navItem: null, parentNavItem: null }
  }

  const data = recursivelySearchForNavItemByNavItemId(navLevel)

  return data
}
