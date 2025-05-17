import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import { navSlice } from '../../../../../../navSlice'
import { navigateInMenu } from '../../functions/useMenuAnimation'
import type { NavItemId } from '@shared/consts/navItemId'
import { getNavItem } from '../../functions/getNavItem'

export const clickOnMenuItem = (
  e: MouseEvent,
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

  if (disabled) {
    return
  }

  if (link !== undefined) {
    // follow the link natively and call the func
    void func?.(e)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  e.preventDefault()

  if (func !== undefined) {
    void func(e)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (isNestedMenuAvailable) {
    void navigateInMenu.down({ navItemId })
  }
}
