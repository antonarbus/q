import type { MenuItemType, NavMenuItemIdKey } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

export const setMenuItemPropValue = <K extends keyof MenuItemType>({ menu, navMenuItemIdKey, prop, value }: {
  menu: MenuItemType[]
  navMenuItemIdKey: NavMenuItemIdKey
  prop: K
  value: MenuItemType[K]
}): void => {
  menu.forEach((el) => {
    if (el.id === navMenuItemIdKey) {
      el[prop] = value
      return
    }

    if (el.menuItems) {
      setMenuItemPropValue({ menu: el.menuItems, navMenuItemIdKey, prop, value })
    }
  })
}
