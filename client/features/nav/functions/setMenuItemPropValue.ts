import { MenuType } from '../navStructure'

type Props = {
  menu: MenuType[]
  id: string
  prop: keyof MenuType
  value: any
}

export function setMenuItemPropValue ({ menu, id, prop, value }: Props) {
  menu.forEach((el) => {
    if (el.id === id) {
      el[prop] = value
      return
    }
    if (el.menuItems) setMenuItemPropValue({ menu: el.menuItems, id, prop, value })
  })
}
