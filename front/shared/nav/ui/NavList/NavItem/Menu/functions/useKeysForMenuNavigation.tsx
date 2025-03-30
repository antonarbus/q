import { dispatch, getState } from '@shared/lib/redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { navSlice } from '../../../../../navSlice'
import { navigateInMenu } from './useMenuAnimation'
import { getNavItem } from './getNavItem'

export const useKeysForMenuNavigation = (): void => {
  const navigate = useNavigate()

  const navKeyboardHandler = (e: KeyboardEvent): void => {
    const currentMenuItems =
      getNavItem({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        navItemId: getState().nav.idsToCurrentMenuItems.at(-2)!, // -2 to be -1 when burger will be  on top
      })?.navItems ?? []

    const currentMenuItemsNotHidden = currentMenuItems.filter(
      (menuItem) => !menuItem.isHidden,
    )

    const menuItemsQty = currentMenuItemsNotHidden.length + 1
    const menuItemHoverIndex = getState().nav.menuItemHoverIndex
    const isNestedMenu = getState().nav.idsToNextMenuItems.length > 2

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const isLastMenuItem = menuItemHoverIndex === menuItemsQty

      if (isLastMenuItem) {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 1 }),
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
      const isTopMenuItem = menuItemHoverIndex < 2

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
      // const nextMenu = getMenuItemByIdsChain(getState().nav.idsToNextMenuItems)

      const nextMenu =
        getNavItem({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          navItemId: getState().nav.idsToNextMenuItems.at(-2)!, // -2 to be -1 when burger will be  on top
        })?.navItems ?? []

      const nextMenuNotHidden = nextMenu.filter(
        (menuItem) => !menuItem.isHidden,
      )

      const navItemId = nextMenuNotHidden[menuItemHoverIndex - 2]?.id ?? 'top'

      const menuItem = currentMenuItemsNotHidden.find(
        (item) => item.id === navItemId,
      )

      const isBackMenuItem = menuItemHoverIndex === 1 && isNestedMenu

      if (isBackMenuItem) {
        void navigateInMenu.up()

        return
      }

      const isCloseMenuItem = menuItemHoverIndex === 1 && !isNestedMenu

      if (isCloseMenuItem) {
        dispatch(navSlice.actions.closeMenu())

        return
      }

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

    if (anyLetter.exec(e.key)) {
      if (!isNestedMenu && e.key === 'c') {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 1 }),
        )

        return
      }

      if (isNestedMenu && e.key === 'b') {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 1 }),
        )

        return
      }

      // search in items below hovered item
      const index = currentMenuItemsNotHidden.findIndex((menuItem, i) => {
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
            menuItemHoverIndex: index + 2,
          }),
        )
      }

      // if no found below hovered item, do it again from the top
      if (index === -1) {
        const newIndex = currentMenuItemsNotHidden.findIndex((menuItem) => {
          const isiKeySameAsFirstItemLetter = menuItem.name
            .toLowerCase()
            .startsWith(e.key)

          return isiKeySameAsFirstItemLetter
        })

        if (newIndex > -1) {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: newIndex + 2,
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
