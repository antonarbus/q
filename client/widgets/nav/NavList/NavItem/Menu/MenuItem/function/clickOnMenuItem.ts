import { closeMenu } from 'client/entities/nav'
import { store } from 'client/app/store'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'
import { navigateInMenu } from '../../functions/useMenuAnimation'
import type { MouseEvent } from 'react'

export const clickOnMenuItem = (e: MouseEvent, menuId: string, disabled: boolean): void => {
  const chainToClickedItem = [
    ...store.getState().nav.idsToCurrentMenuItems,
    menuId,
  ]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length
  const menuItems = getMenuItemByIdsChain(
    store.getState().nav.idsToCurrentMenuItems,
  )
  const menuItem = menuItems.find((item) => item.id === menuId)
  const link = menuItem?.link
  const func = menuItem?.func

  if (disabled) return

  if (link && func) {
    // follow the link natively and call the func
    void func()
    store.dispatch(closeMenu())
    return
  }

  if (link) {
    // just follow the link natively
    store.dispatch(closeMenu())
    return
  }

  e.preventDefault()

  if (func) {
    void func()
    store.dispatch(closeMenu())
    return
  }

  if (isNestedMenuAvailable) {
    navigateInMenu.down?.(menuId)
  }
}
