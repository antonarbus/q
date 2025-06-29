import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import { navSlice } from '../../../navSlice'
import type { NavItem } from '../../../type'
import { navItemId } from '@shared/const/navItemId'

type Props = {
  event: MouseEvent
  navItem: NavItem
  navItemRef: React.RefObject<React.ComponentRef<'li'> | null>
  disabled: boolean
}

export const clickOnNavItem = ({
  event,
  navItem,
  navItemRef,
  disabled,
}: Props): void => {
  if (document.activeElement instanceof HTMLElement === false) {
    return
  }

  document.activeElement.blur() // to prevent open an active navItem link on Enter key

  const { link, func } = navItem

  if (disabled === true) {
    return
  }

  if (link !== undefined) {
    // just follow the link natively and call the func
    void func?.(event)

    return
  }

  // all navItems are links, which were already opened above,
  // but these ones we do not want to follow
  event.preventDefault()

  // handle burger close separately
  const isBurger = getState().nav.currentMenuNavItemId === navItemId.burger

  if (isBurger === true) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  // if click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
  const { currentMenuNavItemId } = getState().nav

  const isMenuOpenedUnderThisNavItem =
    currentMenuNavItemId === navItem.id &&
    currentMenuNavItemId !== navItemId.burger

  if (isMenuOpenedUnderThisNavItem === true) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (func !== undefined) {
    void func(event)

    return
  }

  if (navItemRef.current !== null) {
    // open menu and determine its position (right: 0 OR left: 0)
    const navItemRightPos = navItemRef.current.getBoundingClientRect().right
    dispatch(navSlice.actions.setNavItemRightPos({ navItemRightPos }))
    dispatch(navSlice.actions.openMenuWithId({ navItemId: navItem.id }))
  }
}
