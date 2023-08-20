import type { MenuItemTypes } from './TMenuItem'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

export const setMenuItemPropValue = <K extends keyof MenuItemTypes>({ menu, id, prop, value }: {
  menu: MenuItemTypes[]
  id: string
  prop: K
  value: MenuItemTypes[K]
}): void => {
  menu.forEach((el) => {
    if (el.id === id) {
      el[prop] = value
      return
    }

    if (el.menuItems)
      setMenuItemPropValue({ menu: el.menuItems, id, prop, value })
  })
}
