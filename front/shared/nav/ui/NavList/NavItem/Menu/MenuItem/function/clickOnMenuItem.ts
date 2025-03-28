import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import { navSlice } from '../../../../../../navSlice'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'
import { navigateInMenu } from '../../functions/useMenuAnimation'
import type { NavItemId } from '@shared/consts/navItemId'

export const clickOnMenuItem = (
  e: MouseEvent,
  navItemId: NavItemId,
  disabled: boolean,
): void => {
  const chainToClickedItem = [
    ...getState().nav.idsToCurrentMenuItems,
    navItemId,
  ]

  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = Boolean(nextMenu.length)
  const menuItems = getMenuItemByIdsChain(getState().nav.idsToCurrentMenuItems)
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
