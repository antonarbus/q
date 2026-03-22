import type { NavItemId } from '@front/entities/nav/navItemId'
import type { NavItem } from '@front/entities/nav/type'
import { getState, type RootState } from '@front/shared/lib/redux'

type Props = {
  navItemId: NavItemId | null
  navState?: RootState['nav']
}

type Res = {
  current: NavItem | null
  parent: NavItem | null
}

export const getNavItem = (props: Props): Res => {
  const recursivelySearchForNavItemByNavItemId = (navItem: NavItem): Res => {
    if (navItem.id === props.navItemId) {
      return {
        current: navItem,
        parent: navItem,
      }
    }

    for (const item of navItem.nestedItemList ?? []) {
      if (item.id === props.navItemId) {
        return {
          current: item,
          parent: navItem,
        }
      }

      if (item.nestedItemList !== undefined) {
        const found = recursivelySearchForNavItemByNavItemId(item)

        if (found.current !== null) {
          return {
            current: found.current,
            parent: item,
          }
        }
      }
    }

    return {
      current: null,
      parent: null,
    }
  }

  const navLevel =
    props.navState?.navStructure.at(0) ?? getState().nav.navStructure.at(0)

  if (navLevel === undefined) {
    return {
      current: null,
      parent: null,
    }
  }

  const data = recursivelySearchForNavItemByNavItemId(navLevel)

  return data
}
