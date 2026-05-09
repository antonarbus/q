import type { NavItemId } from './navItemId'
import type { NavItem } from './NavItem'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { RootState } from '@front/shared/lib/redux/reduxHolder'

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
    props.navState?.navStructure.at(0) ?? reduxHolder.getState().nav.navStructure.at(0)

  if (navLevel === undefined) {
    return {
      current: null,
      parent: null,
    }
  }

  const data = recursivelySearchForNavItemByNavItemId(navLevel)

  return data
}
