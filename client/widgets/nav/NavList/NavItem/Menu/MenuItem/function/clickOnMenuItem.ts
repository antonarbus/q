import { closeMenu } from 'client/entities/nav'
import { store } from 'client/app/store'
import type { Event } from 'client/shared/types'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'
import { navigateInMenu } from '../../functions/useMenuAnimation'

export const clickOnMenuItem = (
  e: Event,
  menuId: string,
  disabled: boolean,
) => {
  const chainToClickedItem = [
    ...store.getState().nav.idsToCurrentMenuItems,
    menuId,
  ]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length
  const menuItems = getMenuItemByIdsChain(
    store.getState().nav.idsToCurrentMenuItems,
  )
  const menuItem = menuItems.find((menuItem) => menuItem.id === menuId)
  const link = menuItem?.link
  const func = menuItem?.func

  if (disabled) return

  if (link && func) {
    // follow the link natively and call the func
    func()
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
    func()
    store.dispatch(closeMenu())
    return
  }

  if (isNestedMenuAvailable) {
    navigateInMenu.down && navigateInMenu.down(menuId)
  }
}
