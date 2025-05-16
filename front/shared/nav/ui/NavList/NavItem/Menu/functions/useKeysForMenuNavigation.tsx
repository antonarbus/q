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
    const navItems = (currentNavItem?.navItems ?? []).filter(
      (item) => item.isHidden === false,
    ) // 3 items without first "close" or "Back"

    const menuItemsQty = navItems.length // 3

    const hoverIndex = getState().nav.hoverIndex // -1

    const isNestedMenu = getState().nav.idsToCurrentMenuItems.length > 2

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const isLastMenuItem = hoverIndex === menuItemsQty

      if (isLastMenuItem) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        return
      }

      dispatch(
        navSlice.actions.setMenuItemHoverIndex({
          menuItemHoverIndex: hoverIndex + 1,
        }),
      )

      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const isTopMenuItem = hoverIndex < 1

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
          menuItemHoverIndex: hoverIndex - 1,
        }),
      )

      return
    }

    if (isNestedMenu && e.key === 'Backspace') {
      dispatch(
        navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
      )

      void navigateInMenu.up()

      return
    }

    if (isNestedMenu === false && e.key === 'Backspace') {
      dispatch(navSlice.actions.closeMenu())

      return
    }

    if (e.key === 'Escape') {
      dispatch(navSlice.actions.closeMenu())

      return
    }

    if (e.key === 'Enter') {
      const isBackMenuItem = hoverIndex === 0 && isNestedMenu

      if (isBackMenuItem) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        void navigateInMenu.up()

        return
      }

      const isCloseMenuItem = hoverIndex === 0 && isNestedMenu === false

      if (isCloseMenuItem) {
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const navItemId = navItems[hoverIndex - 1]?.id

      if (navItemId === undefined) {
        return
      }

      const { navItem } = getNavItem({ navItemId })

      const link = navItem?.link

      if (link) {
        void navigate(link)
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const func = navItem?.func

      if (func) {
        void func()
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const isNestedMenuAvailable = Boolean(navItem?.navItems)

      dispatch(
        navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
      )

      if (isNestedMenuAvailable) {
        void navigateInMenu.down({ navItemId })

        return
      }
    }

    const anyLetter = /\w/u

    // jump to "Close" & "Back"
    if (anyLetter.exec(e.key)) {
      if (isNestedMenu === false && e.key === 'c') {
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
      const index = navItems.findIndex((navItem, i) => {
        const isiKeySameAsFirstItemLetter = navItem.name
          .toLowerCase()
          .startsWith(e.key)

        if (isiKeySameAsFirstItemLetter === false) {
          return false
        }

        if (i + 2 > hoverIndex) {
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
        const newIndex = navItems.findIndex((navItem) => {
          const isiKeySameAsFirstItemLetter = navItem.name
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
