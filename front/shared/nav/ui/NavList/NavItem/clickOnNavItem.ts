import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import { navSlice } from '../../../navSlice'
import type { MenuItemType } from '../../../type'
import { navItemId } from '@shared/consts/navItemId'

type Props = {
  e: MouseEvent
  navItem: MenuItemType
  navItemRef: React.RefObject<React.ComponentRef<'li'> | null>
  disabled: boolean
}

export const clickOnNavItem = ({
  e,
  navItem,
  navItemRef,
  disabled,
}: Props): void => {
  ;(document.activeElement as HTMLElement).blur() // to prevent open an active navItem link on Enter key

  const link = navItem.link
  const func = navItem.func

  if (disabled) {
    return
  }

  if (link && func) {
    // just follow the link natively and call the func
    void func(e)

    return
  }

  if (link) {
    // just follow the link natively
    return
  }

  // all navItems are links, which were already opened above,
  // but these ones we do not want to follow
  e.preventDefault()

  // handle burger close separately
  const isBurger = getState().nav.idsToCurrentMenuItems.includes(
    navItemId.burger,
  )

  if (isBurger) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  // if click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
  const currentMenuId = getState().nav.idsToCurrentMenuItems.at(-1)

  const isMenuOpenedUnderThisNavItem =
    currentMenuId === navItem.id && currentMenuId !== navItemId.top

  if (isMenuOpenedUnderThisNavItem) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (func) {
    void func(e)

    return
  }

  if (navItemRef.current !== null) {
    // open menu and determine its position (right: 0 OR left: 0)
    const navItemRightPos = navItemRef.current.getBoundingClientRect().right
    dispatch(navSlice.actions.setNavItemRightPos({ navItemRightPos }))
    dispatch(navSlice.actions.openMenuWithId({ navItemId: navItem.id }))
  }
}
