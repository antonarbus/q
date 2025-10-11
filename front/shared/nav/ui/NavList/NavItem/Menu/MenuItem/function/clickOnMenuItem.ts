import { dispatch, getState } from '@shared/lib/redux'
import type { NavItemId } from '@shared/nav/navItemId'
import type { MouseEvent } from 'react'
import { navSlice } from '../../../../../../navSlice'
import { getNavItem } from '../../functions/getNavItem'
import { navigateInMenu } from '../../functions/useMenuAnimation'

export const clickOnMenuItem = (
  event: MouseEvent,
  navItemId: NavItemId,
  disabled: boolean,
): void => {
  const { navItem } = getNavItem({ navItemId })

  const nextMenuItems = navItem?.navItems ?? []

  const isNestedMenuAvailable = Boolean(nextMenuItems.length)

  const { navItem: currentMenuNavItem } = getNavItem({
    navItemId: getState().nav.currentMenuNavItemId,
  })

  const menuItems = currentMenuNavItem?.navItems ?? []

  const menuItem = menuItems.find((item) => item.id === navItemId)
  const link = menuItem?.link
  const func = menuItem?.func

  if (disabled === true) {
    return
  }

  if (link !== undefined) {
    // follow the link natively and call the func
    void func?.(event)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  event.preventDefault()

  if (func !== undefined) {
    void func(event)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (isNestedMenuAvailable === true) {
    void navigateInMenu.down({ navItemId })
  }
}
