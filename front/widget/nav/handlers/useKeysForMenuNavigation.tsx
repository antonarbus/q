import { navSlice } from '@entity/nav/navSlice'
import { useMenuNavigation } from '@entity/nav/provider/MenuNavigationProvider'
import { getNavItem } from '@entity/nav/ui/NavList/NavItem/Menu/functions/getNavItem'
import { dispatch, getState } from '@shared/lib/redux'
import { functionRegistry } from '@widget/nav/functionRegistry'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useKeysForMenuNavigation = (): void => {
  const navigate = useNavigate()
  const menuNavigation = useMenuNavigation()

  useEffect(() => {
    const controller = new AbortController()

    const navKeyboardHandler = (event: KeyboardEvent): void => {
      const state = getState()

      const navItem = getNavItem({
        navItemId: state.nav.currentMenuNavItemId,
      })

      // +1 for "Close" or "Back" item before currentMenuItems
      const navItems = (navItem.current?.nestedItemList ?? []).filter(
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

        const navItemIdHovered = navItems[state.nav.hoverIndex - 1]?.id

        if (navItemIdHovered === undefined) {
          return
        }

        const navItemHovered = getNavItem({ navItemId: navItemIdHovered })

        const externalLink = navItemHovered.current?.externalLink

        if (externalLink !== undefined) {
          window.open(externalLink, '_blank', 'noopener,noreferrer')
          dispatch(navSlice.actions.closeMenu())

          return
        }

        const link = navItemHovered.current?.link

        if (link !== undefined) {
          void navigate(link)
          dispatch(navSlice.actions.closeMenu())

          return
        }

        const funcId = navItemHovered.current?.funcId

        const func = funcId === undefined ? undefined : functionRegistry[funcId]

        if (func !== undefined) {
          func()
          dispatch(navSlice.actions.closeMenu())

          return
        }

        const isNestedMenuAvailable = Boolean(
          navItemHovered.current?.nestedItemList,
        )

        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )

        if (isNestedMenuAvailable === true) {
          void menuNavigation.goDown({ navItemId: navItemIdHovered })

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
        const indexToJump = navItems.findIndex((item, index) => {
          const isiKeySameAsFirstItemLetter = item.name
            .toLowerCase()
            .startsWith(event.key)

          if (isiKeySameAsFirstItemLetter === false) {
            return false
          }

          if (index + 2 > state.nav.hoverIndex) {
            return true
          }

          return false
        })

        if (indexToJump > -1) {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: indexToJump + 1,
            }),
          )
        }

        // if no found below hovered item, do it again from the top
        if (indexToJump === -1) {
          const newIndex = navItems.findIndex((item) => {
            const isiKeySameAsFirstItemLetter = item.name
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
