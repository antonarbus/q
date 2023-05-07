import { TMenu } from '../navStructure'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778
export function setMenuItemPropValue<K extends keyof TMenu> ({ menu, id, prop, value }: {
  menu: TMenu[]
  id: string
  prop: K
  value: TMenu[K]
}) {
  menu.forEach((el) => {
    if (el.id === id) {
      el[prop] = value
      return
    }
    if (el.menuItems) setMenuItemPropValue({ menu: el.menuItems, id, prop, value })
  })
}
