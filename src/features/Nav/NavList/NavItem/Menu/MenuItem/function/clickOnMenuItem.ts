import { closeMenu } from '@features/nav/navSlice'
import { store } from '@src/store'
import { globalObject } from '@src/globalObject'
import { EventType } from '@src/types'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'

export const clickOnMenuItem = (e: EventType, menuId: string) => {
  const chainToClickedItem = [...store.getState().nav.idsToCurrentMenuItems, menuId]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length
  const menuItems = getMenuItemByIdsChain(store.getState().nav.idsToCurrentMenuItems)
  const menuItem = menuItems!.find(menuItem => menuItem.id === menuId)
  const link = menuItem?.link
  const func = menuItem?.func

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
    globalObject.goDownInMenu && globalObject.goDownInMenu(menuId)
  }
}
