import type { MenuItemType, NavItemKey } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

export const setMenuItemPropValue = <K extends keyof MenuItemType>({
  menu,
  navItemIdKey,
  prop,
  value,
}: {
  menu: MenuItemType[]
  navItemIdKey: NavItemKey
  prop: K
  value: MenuItemType[K]
}): void => {
  menu.forEach((el) => {
    if (el.id === navItemIdKey) {
      el[prop] = value

      return
    }

    if (el.menuItems) {
      setMenuItemPropValue({ menu: el.menuItems, navItemIdKey, prop, value })
    }
  })
}
