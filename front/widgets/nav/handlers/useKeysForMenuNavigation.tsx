import { navSlice } from '@front/entities/nav/navSlice'
import { useMenuNavigation } from '@front/entities/nav/provider/MenuNavigationProvider'
import { getNavItem } from '@front/entities/nav/ui/NavList/NavItem/Menu/functions/getNavItem'
import { reduxHolder } from '@front/shared/lib/redux'
import { functionRegistry } from '@front/widgets/nav/functionRegistry'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useKeysForMenuNavigation = (): void => {
  const navigate = useNavigate()
  const menuNavigation = useMenuNavigation()

  useEffect(() => {
    const controller = new AbortController()

    const navKeyboardHandler = (event: KeyboardEvent): void => {
      const state = reduxHolder.getState()

      const navItem = getNavItem({
        navItemId: state.nav.currentMenuNavItemId,
      })

      // +1 for "Close" or "Back" item before currentMenuItems
      // 3 items without first "close" or "Back"
      const navItems = (navItem.current?.nestedItemList ?? []).filter(
        (item) => item.isHidden === false,
      )

      // 3
      const menuItemsQty = navItems.length

      const isNestedMenu = state.nav.idsToCurrentMenuItems.length > 2

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const isLastMenuItem = state.nav.hoverIndex === menuItemsQty

        if (isLastMenuItem === true) {
          reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))

          return
        }

        reduxHolder.dispatch(
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
          reduxHolder.dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: menuItemsQty,
            }),
          )

          return
        }

        reduxHolder.dispatch(
          navSlice.actions.setMenuItemHoverIndex({
            menuItemHoverIndex: state.nav.hoverIndex - 1,
          }),
        )

        return
      }

      const shouldGoBack = isNestedMenu && event.key === 'Backspace'

      if (shouldGoBack === true) {
        reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))

        menuNavigation.goUp()

        return
      }

      const shouldClose = isNestedMenu === false && event.key === 'Backspace'

      if (shouldClose === true) {
        reduxHolder.dispatch(navSlice.actions.closeMenu())

        return
      }

      if (event.key === 'Escape') {
        reduxHolder.dispatch(navSlice.actions.closeMenu())

        return
      }

      if (event.key === 'Enter') {
        const isBackMenuItem = state.nav.hoverIndex === 0 && isNestedMenu

        if (isBackMenuItem === true) {
          reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))

          menuNavigation.goUp()

          return
        }

        const isCloseMenuItem = state.nav.hoverIndex === 0 && isNestedMenu === false

        if (isCloseMenuItem === true) {
          reduxHolder.dispatch(navSlice.actions.closeMenu())

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
          reduxHolder.dispatch(navSlice.actions.closeMenu())

          return
        }

        const link = navItemHovered.current?.link

        if (link !== undefined) {
          navigate(link)
          reduxHolder.dispatch(navSlice.actions.closeMenu())

          return
        }

        const funcId = navItemHovered.current?.funcId

        const func = funcId === undefined ? undefined : functionRegistry[funcId]

        if (func !== undefined) {
          func()
          reduxHolder.dispatch(navSlice.actions.closeMenu())

          return
        }

        const isNestedMenuAvailable = Boolean(navItemHovered.current?.nestedItemList)

        reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))

        if (isNestedMenuAvailable === true) {
          menuNavigation.goDown({ navItemId: navItemIdHovered })

          return
        }
      }

      const anyLetter = /\w/u
      const anyLetterPressed = anyLetter.exec(event.key)

      // jump to "Close" & "Back"
      if (anyLetterPressed !== null) {
        const shouldJumpToClose = isNestedMenu === false && event.key === 'c'

        if (shouldJumpToClose === true) {
          reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))

          return
        }

        const shouldJumpToGoBack = isNestedMenu && event.key === 'b'

        if (shouldJumpToGoBack === true) {
          reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))

          return
        }

        // jump to item by letter
        const indexToJump = navItems.findIndex((item, index) => {
          const isiKeySameAsFirstItemLetter = item.name.toLowerCase().startsWith(event.key)

          if (isiKeySameAsFirstItemLetter === false) {
            return false
          }

          if (index + 2 > state.nav.hoverIndex) {
            return true
          }

          return false
        })

        if (indexToJump !== -1) {
          reduxHolder.dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: indexToJump + 1,
            }),
          )
        }

        // if no found below hovered item, do it again from the top
        if (indexToJump === -1) {
          const newIndex = navItems.findIndex((item) => {
            const isiKeySameAsFirstItemLetter = item.name.toLowerCase().startsWith(event.key)

            return isiKeySameAsFirstItemLetter
          })

          if (newIndex !== -1) {
            reduxHolder.dispatch(
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
