import { dispatch, getState } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { navSlice } from '../../../../../../navSlice'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'
import { navigateInMenu } from '../../functions/useMenuAnimation'

export const clickOnMenuItem = (
  e: MouseEvent,
  menuId: string,
  disabled: boolean,
): void => {
  const chainToClickedItem = [...getState().nav.idsToCurrentMenuItems, menuId]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length
  const menuItems = getMenuItemByIdsChain(getState().nav.idsToCurrentMenuItems)
  const menuItem = menuItems.find((item) => item.id === menuId)
  const link = menuItem?.link
  const func = menuItem?.func

  if (disabled) return

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
    navigateInMenu.down?.(menuId)
  }
}
