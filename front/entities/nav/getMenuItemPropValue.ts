import { instance } from '@front/shared/instance'
import type { NavItem, NavItemId } from './type'

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://stackoverflow.com/a/49286056/7239778

type Props<K> = {
  menu?: NavItem[]
  navItemId: NavItemId
  prop: K
}

type Res<K extends keyof NavItem> = NavItem[K] | undefined

export const getMenuItemPropValue = <K extends keyof NavItem>(
  props: Props<K>,
): Res<K> => {
  for (const el of props.menu ?? instance.navStructure) {
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
