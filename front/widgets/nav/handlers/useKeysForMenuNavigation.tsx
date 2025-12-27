import { navSlice } from '@entities/nav/navSlice'
import { useMenuNavigation } from '@entities/nav/provider/MenuNavigationProvider'
import { getNavItem } from '@entities/nav/ui/NavList/NavItem/Menu/functions/getNavItem'
import { dispatch, getState } from '@shared/lib/redux'
import { functionRegistry } from '@widgets/nav/functionRegistry'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useKeysForMenuNavigation = (): void => {
  const navigate = useNavigate()
  const menuNavigation = useMenuNavigation()

  useEffect(() => {
    const controller = new AbortController()

    const navKeyboardHandler = (event: KeyboardEvent): void => {
      const state = getState()

      const { navItem: currentNavItem } = getNavItem({
        navItemId: state.nav.currentMenuNavItemId,
      })

      // +1 for "Close" or "Back" item before currentMenuItems
      const navItems = (currentNavItem?.navItems ?? []).filter(
        (item) => item.isHidden === false,
      ) // 3 items without first "close" or "Back"

      const menuItemsQty = navItems.length // 3

      const isNestedMenu = state.nav.idsToCurrentMenuItems.length > 2

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const isLastMenuItem = state.nav.hoverIndex === menuItemsQty

        if (isLastMenuItem === true) {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
          )

          return
        }

        dispatch(
          navSlice.actions.setMenuItemHoverIndex({
            menuItemHoverIndex: state.nav.hoverIndex + 1,
          }),
        )

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const isTopMenuItem = state.nav.hoverIndex < 1

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
            menuItemHoverIndex: state.nav.hoverIndex - 1,
          }),
        )

        return
      }

      const shouldGoBack = isNestedMenu && event.key === 'Backspace'

      if (shouldGoBack === true) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        void menuNavigation.goUp()

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
        const isBackMenuItem = state.nav.hoverIndex === 0 && isNestedMenu

        if (isBackMenuItem === true) {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
          )

          void menuNavigation.goUp()

          return
        }

        const isCloseMenuItem =
          state.nav.hoverIndex === 0 && isNestedMenu === false

        if (isCloseMenuItem === true) {
          dispatch(navSlice.actions.closeMenu())

          return
        }

        const navItemId = navItems[state.nav.hoverIndex - 1]?.id

        if (navItemId === undefined) {
          return
        }

        const { navItem } = getNavItem({ navItemId })

        const externalLink = navItem?.externalLink

        if (externalLink !== undefined) {
          window.open(externalLink, '_blank', 'noopener,noreferrer')
          dispatch(navSlice.actions.closeMenu())

          return
        }

        const link = navItem?.link

        if (link !== undefined) {
          void navigate(link)
          dispatch(navSlice.actions.closeMenu())

          return
        }

        const funcId = navItem?.funcId

        const func = funcId === undefined ? undefined : functionRegistry[funcId]

        if (func !== undefined) {
          func()
          dispatch(navSlice.actions.closeMenu())

          return
        }

        const isNestedMenuAvailable = Boolean(navItem?.navItems)

        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        if (isNestedMenuAvailable === true) {
          void menuNavigation.goDown({ navItemId })

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

          if (navIndex + 2 > state.nav.hoverIndex) {
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

    window.addEventListener('keydown', navKeyboardHandler, {
      signal: controller.signal,
    })

    return (): void => {
      controller.abort()
    }
  }, [menuNavigation, navigate])
}
