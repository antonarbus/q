import { navStructure } from '@widgets/nav/navStructure'
import type { MenuItemType, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

export const getMenuItemPropValue = <K extends keyof MenuItemType>({
  menu = navStructure,
  navItemIdKey,
  prop,
}: {
  menu?: MenuItemType[]
  navItemIdKey: NavItemId
  prop: K
}): MenuItemType[K] | undefined => {
  for (const el of menu) {
    if (el.id === navItemIdKey) {
      return el[prop]
    }

    if (el.menuItems) {
      const value = getMenuItemPropValue({
        menu: el.menuItems,
        navItemIdKey,
        prop,
      })

      if (value !== undefined) {
        return value
      }
    }
  }

  return undefined
}
