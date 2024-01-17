import { navSlice } from '@entities/nav'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'
import { navigateInMenu } from '../../functions/useMenuAnimation'
import type { MouseEvent } from 'react'
import { dispatch, getState } from '@shared/clients'

export const clickOnMenuItem = (e: MouseEvent, menuId: string, disabled: boolean): void => {
  const chainToClickedItem = [
    ...getState().nav.idsToCurrentMenuItems,
    menuId,
  ]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length
  const menuItems = getMenuItemByIdsChain(
    getState().nav.idsToCurrentMenuItems,
  )
  const menuItem = menuItems.find((item) => item.id === menuId)
  const link = menuItem?.link
  const func = menuItem?.func

  if (disabled) return

  if (link && func) {
    // follow the link natively and call the func
    void func()
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
    void func()
    dispatch(navSlice.actions.closeMenu())
    return
  }

  if (isNestedMenuAvailable) {
    navigateInMenu.down?.(menuId)
  }
}
