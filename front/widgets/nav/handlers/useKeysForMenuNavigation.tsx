import { navSlice } from '@front/shared/nav/navSlice'
import { useMenuNavigation } from '@front/widgets/nav/provider/useMenuNavigation'
import { getNavItem } from '@front/shared/nav/getNavItem'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
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

      // oxlint-disable-next-line unicorn/consistent-function-scoping
      const setHoverIndex = (menuItemHoverIndex: number): void => {
        reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex }))
      }

      const handleArrowDown = (): void => {
        event.preventDefault()
        const isLastMenuItem = state.nav.hoverIndex === menuItemsQty
        setHoverIndex(isLastMenuItem === true ? 0 : state.nav.hoverIndex + 1)
      }

      const handleArrowUp = (): void => {
        event.preventDefault()
        const isTopMenuItem = state.nav.hoverIndex < 1
        setHoverIndex(isTopMenuItem === true ? menuItemsQty : state.nav.hoverIndex - 1)
      }

      const handleBackspace = (): void => {
        if (isNestedMenu === true) {
          setHoverIndex(0)
          void menuNavigation.goUp()
        } else {
          reduxHolder.dispatch(navSlice.actions.closeMenu())
        }
      }

      const handleEnter = (): void => {
        if (state.nav.hoverIndex === 0) {
          if (isNestedMenu === true) {
            setHoverIndex(0)
            void menuNavigation.goUp()
          } else {
            reduxHolder.dispatch(navSlice.actions.closeMenu())
          }

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
          void navigate(link)
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

        setHoverIndex(0)

        const isNestedMenuAvailable = Boolean(navItemHovered.current?.nestedItemList)

        if (isNestedMenuAvailable === true) {
          void menuNavigation.goDown({ navItemId: navItemIdHovered })
        }
      }

      const handleLetter = (): void => {
        const shouldJumpToClose = isNestedMenu === false && event.key === 'c'

        if (shouldJumpToClose === true) {
          setHoverIndex(0)

          return
        }

        const shouldJumpToGoBack = isNestedMenu === true && event.key === 'b'

        if (shouldJumpToGoBack === true) {
          setHoverIndex(0)

          return
        }

        // jump to item by letter, starting from below the current hover position
        let indexToJump = navItems.findIndex(
          (item, index) =>
            item.name.toLowerCase().startsWith(event.key) && index + 2 > state.nav.hoverIndex,
        )

        // if not found below, wrap around from the top
        if (indexToJump === -1) {
          indexToJump = navItems.findIndex((item) => item.name.toLowerCase().startsWith(event.key))
        }

        if (indexToJump !== -1) {
          setHoverIndex(indexToJump + 1)
        }
      }

      const keyHandlers: Partial<Record<string, () => void>> = {
        ArrowDown: handleArrowDown,
        ArrowUp: handleArrowUp,
        Backspace: handleBackspace,
        Escape: (): void => {
          reduxHolder.dispatch(navSlice.actions.closeMenu())
        },
        Enter: handleEnter,
      }

      const handler = keyHandlers[event.key]

      if (handler !== undefined) {
        handler()

        return
      }

      const anyLetter = /\w/u
      const anyLetterPressed = anyLetter.exec(event.key)

      // jump to "Close" & "Back"
      if (anyLetterPressed !== null) {
        handleLetter()
      }
    }

    globalThis.addEventListener('keydown', navKeyboardHandler, {
      signal: controller.signal,
    })

    return (): void => {
      controller.abort()
    }
  }, [menuNavigation, navigate])
}
