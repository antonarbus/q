import type { NavItemId } from '@entity/nav/navItemId'
import { navSlice } from '@entity/nav/navSlice'
import { getNavItem } from '@entity/nav/ui/NavList/NavItem/Menu/functions/getNavItem'
import { dispatch, getState } from '@shared/lib/redux'
import { functionRegistry } from '@widget/nav/functionRegistry'
import type { MouseEvent } from 'react'

type MenuNavigation = {
  goDown: (args: { navItemId: NavItemId }) => Promise<void>
}

export const clickOnMenuItem = (
  event: MouseEvent,
  navItemId: NavItemId,
  disabled: boolean,
  menuNavigation: MenuNavigation,
): void => {
  const navItem = getNavItem({ navItemId })
  const nextMenuItems = navItem.current?.nestedItemList ?? []
  const isNestedMenuAvailable = Boolean(nextMenuItems.length)

  const menuNavItem = getNavItem({
    navItemId: getState().nav.currentMenuNavItemId,
  })

  const menuItems = menuNavItem.current?.nestedItemList ?? []
  const menuItem = menuItems.find((item) => item.id === navItemId)
  const link = menuItem?.link
  const funcId = menuItem?.funcId
  const func = funcId === undefined ? undefined : functionRegistry[funcId]

  if (disabled === true) {
    return
  }

  if (link !== undefined) {
    // follow the link natively and call the func
    func?.(event)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  event.preventDefault()

  if (func !== undefined) {
    func(event)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (isNestedMenuAvailable === true) {
    void menuNavigation.goDown({ navItemId })
  }
}
