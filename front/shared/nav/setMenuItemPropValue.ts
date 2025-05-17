import type { NavItem, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

export const setMenuItemPropValue = <K extends keyof NavItem>({
  menu,
  navItemId,
  prop,
  value,
}: {
  menu: NavItem[]
  navItemId: NavItemId
  prop: K
  value: NavItem[K]
}): void => {
  menu.forEach((el) => {
    if (el.id === navItemId) {
      el[prop] = value

      return
    }

    if (el.navItems !== undefined) {
      setMenuItemPropValue({
        menu: el.navItems,
        navItemId,
        prop,
        value,
      })
    }
  })
}
