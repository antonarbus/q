import { navStructure } from '@widgets/nav/navStructure'
import type { NavItem, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

export const getMenuItemPropValue = <K extends keyof NavItem>({
  menu = navStructure,
  navItemId,
  prop,
}: {
  menu?: NavItem[]
  navItemId: NavItemId
  prop: K
}): NavItem[K] | undefined => {
  for (const el of menu) {
    if (el.id === navItemId) {
      return el[prop]
    }

    if (el.navItems) {
      const value = getMenuItemPropValue({
        menu: el.navItems,
        navItemId,
        prop,
      })

      if (value !== undefined) {
        return value
      }
    }
  }

  return undefined
}
