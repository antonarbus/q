import { useDispatchTyped } from 'client/shared/hooks'
import { useEffect } from 'react'
import { navSlice } from 'client/entities/nav'
import { getMenuItemByIdsChain } from './getMenuItemByIdsChain'
import { useNavigate } from 'react-router-dom'
import { navigateInMenu } from './useMenuAnimation'
import { getState } from 'client/shared/clients'

export const useKeysForMenuNavigation = (): void => {
  const dispatch = useDispatchTyped()
  const navigate = useNavigate()

  const navKeyboardHandler = (e: KeyboardEvent): void => {
    const currentMenuItems = getMenuItemByIdsChain(
      getState().nav.idsToCurrentMenuItems,
    )
    const currentMenuItemsNotHidden = currentMenuItems.filter((menuItem) => !menuItem.isHidden)
    const menuItemsQty = currentMenuItemsNotHidden.length + 1
    const hoveredMenuItemIndex = getState().nav.menuItemHoverIndex
    const isNestedMenu = getState().nav.idsToNextMenuItems.length > 2

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const isLastMenuItem = hoveredMenuItemIndex === menuItemsQty
      if (isLastMenuItem) {
        dispatch(navSlice.actions.setMenuItemHoverIndex(1))
        return
      }
      dispatch(navSlice.actions.setMenuItemHoverIndex(hoveredMenuItemIndex + 1))
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const isTopMenuItem = hoveredMenuItemIndex < 2
      if (isTopMenuItem) {
        dispatch(navSlice.actions.setMenuItemHoverIndex(menuItemsQty))
        return
      }
      dispatch(navSlice.actions.setMenuItemHoverIndex(hoveredMenuItemIndex - 1))
      return
    }

    if (isNestedMenu && e.key === 'Backspace') {
      navigateInMenu.up?.()
      return
    }

    if (!isNestedMenu && e.key === 'Backspace') {
      dispatch(navSlice.actions.closeMenu())
      return
    }

    if (e.key === 'Escape') {
      dispatch(navSlice.actions.closeMenu())
      return
    }

    if (e.key === 'Enter') {
      const nextMenu = getMenuItemByIdsChain(
        getState().nav.idsToNextMenuItems,
      )
      const menuId = nextMenu[hoveredMenuItemIndex - 2]?.id ?? ''
      const menuItem = currentMenuItemsNotHidden.find((item) => item.id === menuId)

      const isBackMenuItem = hoveredMenuItemIndex === 1 && isNestedMenu
      if (isBackMenuItem) {
        navigateInMenu.up?.()
        return
      }

      const isCloseMenuItem = hoveredMenuItemIndex === 1 && !isNestedMenu
      if (isCloseMenuItem) {
        dispatch(navSlice.actions.closeMenu())
        return
      }

      const link = menuItem?.link
      if (link) {
        navigate(link)
        dispatch(navSlice.actions.closeMenu())
        return
      }

      const func = menuItem?.func
      if (func) {
        void func()
        dispatch(navSlice.actions.closeMenu())
        return
      }

      const isNestedMenuAvailable = !!menuItem?.menuItems
      if (isNestedMenuAvailable) {
        navigateInMenu.down?.(menuId)
        return
      }
    }

    const anyLetter = /\w/
    if (anyLetter.exec(e.key)) {
      if (!isNestedMenu && e.key === 'c') {
        dispatch(navSlice.actions.setMenuItemHoverIndex(1))
        return
      }
      if (isNestedMenu && e.key === 'b') {
        dispatch(navSlice.actions.setMenuItemHoverIndex(1))
        return
      }
      // search in items below hovered item
      const index = currentMenuItemsNotHidden.findIndex((menuItem, i) => {
        const isiKeySameAsFirstItemLetter = menuItem.name && menuItem.name.toLowerCase().startsWith(e.key)
        if (!isiKeySameAsFirstItemLetter) return false
        if (i + 2 > hoveredMenuItemIndex) return true
        return false
      })
      if (index > -1) {
        dispatch(navSlice.actions.setMenuItemHoverIndex(index + 2))
      }
      // if no found below hovered item, do it again from the top
      if (index === -1) {
        const newIndex = currentMenuItemsNotHidden.findIndex((menuItem) => {
          const isiKeySameAsFirstItemLetter = menuItem.name && menuItem.name.toLowerCase().startsWith(e.key)
          return isiKeySameAsFirstItemLetter
        })
        if (newIndex > -1) {
          dispatch(navSlice.actions.setMenuItemHoverIndex(newIndex + 2))
        }
      }
    }
  }


  useEffect(() => {
    window.addEventListener('keydown', navKeyboardHandler)
    return (): void => {
      window.removeEventListener('keydown', navKeyboardHandler)
    }
  }, [])
}
