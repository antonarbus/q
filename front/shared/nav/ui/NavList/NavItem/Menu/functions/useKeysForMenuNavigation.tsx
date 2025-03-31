import { dispatch, getState } from '@shared/lib/redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { navSlice } from '../../../../../navSlice'
import { navigateInMenu } from './useMenuAnimation'
import { getNavItem } from './getNavItem'

export const useKeysForMenuNavigation = (): void => {
  const navigate = useNavigate()

  const navKeyboardHandler = (e: KeyboardEvent): void => {
    const currentMenuNavItemId = getState().nav.currentMenuNavItemId

    const { navItem: currentNavItem } = getNavItem({
      navItemId: currentMenuNavItemId,
    })

    // +1 for "Close" or "Back" item before currentMenuItems
    const menuItems = (currentNavItem?.navItems ?? []).filter(
      (item) => !item.isHidden,
    ) // 3 items without first "close" or "Back"

    const menuItemsQty = menuItems.length // 3

    const menuItemHoverIndex = getState().nav.menuItemHoverIndex // -1

    const isNestedMenu = getState().nav.idsToCurrentMenuItems.length > 2

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const isLastMenuItem = menuItemHoverIndex === menuItemsQty

      if (isLastMenuItem) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        return
      }

      dispatch(
        navSlice.actions.setMenuItemHoverIndex({
          menuItemHoverIndex: menuItemHoverIndex + 1,
        }),
      )

      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const isTopMenuItem = menuItemHoverIndex < 1

      if (isTopMenuItem) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({
            menuItemHoverIndex: menuItemsQty,
          }),
        )

        return
      }

      dispatch(
        navSlice.actions.setMenuItemHoverIndex({
          menuItemHoverIndex: menuItemHoverIndex - 1,
        }),
      )

      return
    }

    if (isNestedMenu && e.key === 'Backspace') {
      void navigateInMenu.up()

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
      const isBackMenuItem = menuItemHoverIndex === 0 && isNestedMenu

      if (isBackMenuItem) {
        void navigateInMenu.up()

        return
      }

      const isCloseMenuItem = menuItemHoverIndex === 0 && !isNestedMenu

      if (isCloseMenuItem) {
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const navItemId = menuItems[menuItemHoverIndex - 1]?.id

      if (!navItemId) {
        return
      }

      const { navItem: menuItem } = getNavItem({ navItemId })

      const link = menuItem?.link

      if (link) {
        void navigate(link)
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const func = menuItem?.func

      if (func) {
        void func()
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const isNestedMenuAvailable = Boolean(menuItem?.navItems)

      if (isNestedMenuAvailable) {
        void navigateInMenu.down({ navItemId })

        return
      }
    }

    const anyLetter = /\w/u

    // jump to "Close" & "Back"
    if (anyLetter.exec(e.key)) {
      if (!isNestedMenu && e.key === 'c') {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        return
      }

      if (isNestedMenu && e.key === 'b') {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        return
      }

      // jump to item by letter
      const index = menuItems.findIndex((menuItem, i) => {
        const isiKeySameAsFirstItemLetter = menuItem.name
          .toLowerCase()
          .startsWith(e.key)

        if (!isiKeySameAsFirstItemLetter) {
          return false
        }

        if (i + 2 > menuItemHoverIndex) {
          return true
        }

        return false
      })

      if (index > -1) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({
            menuItemHoverIndex: index + 1,
          }),
        )
      }

      // if no found below hovered item, do it again from the top
      if (index === -1) {
        const newIndex = menuItems.findIndex((menuItem) => {
          const isiKeySameAsFirstItemLetter = menuItem.name
            .toLowerCase()
            .startsWith(e.key)

          return isiKeySameAsFirstItemLetter
        })

        if (newIndex > -1) {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: newIndex + 1,
            }),
          )
        }
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener('keydown', navKeyboardHandler, {
      signal: controller.signal,
    })

    return (): void => {
      controller.abort()
    }
  }, [])
}
