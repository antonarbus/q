import type { NavItem, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

type Props<K extends keyof NavItem> = {
  menu: NavItem[]
  navItemId: NavItemId
  prop: K
  value: NavItem[K]
}

export const setMenuItemPropValue = <K extends keyof NavItem>(
  props: Props<K>,
): void => {
  props.menu.forEach((el) => {
    if (el.id === props.navItemId) {
      el[props.prop] = props.value

      return
    }

    if (el.nestedItemList !== undefined) {
      setMenuItemPropValue({
        menu: el.nestedItemList,
        navItemId: props.navItemId,
        prop: props.prop,
        value: props.value,
      })
    }
  })
}
