import type { NavItem, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

type Props<NavItemKey extends keyof NavItem> = {
  menu: NavItem[]
  navItemId: NavItemId
  prop: NavItemKey
  value: NavItem[NavItemKey]
}

export const setMenuItemPropValue = <NavItemKey extends keyof NavItem>(
  props: Props<NavItemKey>,
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
