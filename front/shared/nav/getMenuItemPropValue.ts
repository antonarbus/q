import { getNavStructure } from './navStructureHolder'
import type { NavItem, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

type Props<NavItemKey> = {
  menu?: NavItem[]
  navItemId: NavItemId
  prop: NavItemKey
}

type Res<NavItemKey extends keyof NavItem> = NavItem[NavItemKey] | undefined

export const getMenuItemPropValue = <NavItemKey extends keyof NavItem>(
  props: Props<NavItemKey>,
): Res<NavItemKey> => {
  for (const el of props.menu ?? getNavStructure()) {
    if (el.id === props.navItemId) {
      return el[props.prop]
    }

    if (el.nestedItemList !== undefined) {
      const value = getMenuItemPropValue({
        menu: el.nestedItemList,
        navItemId: props.navItemId,
        prop: props.prop,
      })

      if (value !== undefined) {
        return value
      }
    }
  }

  return undefined
}
