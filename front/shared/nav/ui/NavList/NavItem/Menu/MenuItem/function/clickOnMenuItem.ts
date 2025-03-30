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
  const nextMenu = getNavItem({ navItemId })?.navItems ?? []

  const isNestedMenuAvailable = Boolean(nextMenu.length)

  const menuItems =
    getNavItem({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      navItemId: getState().nav.idsToCurrentMenuItems.at(-1)!,
    })?.navItems ?? []

  const menuItem = menuItems.find((item) => item.id === navItemId)
  const link = menuItem?.link
  const func = menuItem?.func

  if (disabled) {
    return
  }

  if (link && func) {
    // follow the link natively and call the func
    void func(e)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (link) {
    // just follow the link natively
    dispatch(navSlice.actions.closeMenu())

    return
  }

  e.preventDefault()

  if (func) {
    void func(e)
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (isNestedMenuAvailable) {
    void navigateInMenu.down({ navItemId })
  }
}
