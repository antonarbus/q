import type { MenuItemType, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

export const setMenuItemPropValue = <K extends keyof MenuItemType>({
  menu,
  navItemId,
  prop,
  value,
}: {
  menu: MenuItemType[]
  navItemId: NavItemId
  prop: K
  value: MenuItemType[K]
}): void => {
  menu.forEach((el) => {
    if (el.id === navItemId) {
      el[prop] = value

      return
    }

    if (el.menuItems) {
      setMenuItemPropValue({
        menu: el.menuItems,
        navItemId,
        prop,
        value,
      })
    }
  })
}
