import { dispatch, getState } from '@shared/lib/redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { navSlice } from '../../../../../navSlice'
import { navigateInMenu } from './useMenuAnimation'
import { getNavItem } from './getNavItem'

export const useKeysForMenuNavigation = (): void => {
  const navigate = useNavigate()

  const navKeyboardHandler = (event: KeyboardEvent): void => {
    const { currentMenuNavItemId } = getState().nav

    const { navItem: currentNavItem } = getNavItem({
      navItemId: currentMenuNavItemId,
    })

    // +1 for "Close" or "Back" item before currentMenuItems
    const navItems = (currentNavItem?.navItems ?? []).filter(
      (item) => item.isHidden === false,
    ) // 3 items without first "close" or "Back"

    const menuItemsQty = navItems.length // 3

    const { hoverIndex } = getState().nav // -1

    const isNestedMenu = getState().nav.idsToCurrentMenuItems.length > 2

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const isLastMenuItem = hoverIndex === menuItemsQty

      if (isLastMenuItem === true) {
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

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const isTopMenuItem = hoverIndex < 1

      if (isTopMenuItem === true) {
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

    const shouldGoBack = isNestedMenu && event.key === 'Backspace'

    if (shouldGoBack === true) {
      dispatch(
        navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
      )

      void navigateInMenu.up()

      return
    }

    const shouldClose = isNestedMenu === false && event.key === 'Backspace'

    if (shouldClose === true) {
      dispatch(navSlice.actions.closeMenu())

      return
    }

    if (event.key === 'Escape') {
      dispatch(navSlice.actions.closeMenu())

      return
    }

    if (event.key === 'Enter') {
      const isBackMenuItem = hoverIndex === 0 && isNestedMenu

      if (isBackMenuItem === true) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        void navigateInMenu.up()

        return
      }

      const isCloseMenuItem = hoverIndex === 0 && isNestedMenu === false

      if (isCloseMenuItem === true) {
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const navItemId = navItems[hoverIndex - 1]?.id

      if (navItemId === undefined) {
        return
      }

      const { navItem } = getNavItem({ navItemId })

      const link = navItem?.link

      if (link !== undefined) {
        void navigate(link)
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const func = navItem?.func

      if (func !== undefined) {
        void func()
        dispatch(navSlice.actions.closeMenu())

        return
      }

      const isNestedMenuAvailable = Boolean(navItem?.navItems)

      dispatch(
        navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
      )

      if (isNestedMenuAvailable === true) {
        void navigateInMenu.down({ navItemId })

        return
      }
    }

    const anyLetter = /\w/u
    const anyLetterPressed = anyLetter.exec(event.key)

    // jump to "Close" & "Back"
    if (anyLetterPressed !== null) {
      const shouldJumpToClose = isNestedMenu === false && event.key === 'c'

      if (shouldJumpToClose === true) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        return
      }

      const shouldJumpToGoBack = isNestedMenu && event.key === 'b'

      if (shouldJumpToGoBack === true) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        return
      }

      // jump to item by letter
      const index = navItems.findIndex((navItem, navIndex) => {
        const isiKeySameAsFirstItemLetter = navItem.name
          .toLowerCase()
          .startsWith(event.key)

        if (isiKeySameAsFirstItemLetter === false) {
          return false
        }

        if (navIndex + 2 > hoverIndex) {
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
            .startsWith(event.key)

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
