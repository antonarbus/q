import { closeMenu } from 'client/nav/navSlice'
import { store } from 'client/store'
import { EventType } from 'client/types'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'
import { navigateInMenu } from '../../functions/useMenuAnimation'

export const clickOnMenuItem = (e: EventType, menuId: string, disabled: boolean) => {
  const chainToClickedItem = [...store.getState().nav.idsToCurrentMenuItems, menuId]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length
  const menuItems = getMenuItemByIdsChain(store.getState().nav.idsToCurrentMenuItems)
  const menuItem = menuItems!.find(menuItem => menuItem.id === menuId)
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
