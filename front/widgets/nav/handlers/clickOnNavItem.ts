import { navItemId } from '@entities/nav/navItemId'
import { navSlice } from '@entities/nav/navSlice'
import type { NavItem } from '@entities/nav/type'
import { dispatch, getState } from '@shared/lib/redux'
import { functionRegistry } from '@widgets/nav/functionRegistry'
import type { ComponentRef, MouseEvent, RefObject } from 'react'

type Props = {
  event: MouseEvent
  navItem: NavItem
  navItemRef: RefObject<ComponentRef<'li'> | null>
  disabled: boolean
}

export const clickOnNavItem = (props: Props): void => {
  if (document.activeElement instanceof HTMLElement === false) {
    return
  }

  document.activeElement.blur() // to prevent open an active navItem link on Enter key

  const { link, funcId } = props.navItem
  const func = funcId === undefined ? undefined : functionRegistry[funcId]

  if (props.disabled === true) {
    return
  }

  if (link !== undefined) {
    // just follow the link natively and call the func
    func?.(props.event)

    return
  }

  // all navItems are links, which were already opened above,
  // but these ones we do not want to follow
  props.event.preventDefault()

  // handle burger close separately
  const isBurger = getState().nav.currentMenuNavItemId === navItemId.burger

  if (isBurger === true) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  // if click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
  const { currentMenuNavItemId } = getState().nav

  const isMenuOpenedUnderThisNavItem =
    currentMenuNavItemId === props.navItem.id &&
    currentMenuNavItemId !== navItemId.burger

  if (isMenuOpenedUnderThisNavItem === true) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (func !== undefined) {
    func(props.event)

    return
  }

  if (props.navItemRef.current !== null) {
    // open menu and determine its position (right: 0 OR left: 0)
    const navItemRightPos =
      props.navItemRef.current.getBoundingClientRect().right

    dispatch(navSlice.actions.setNavItemRightPos({ navItemRightPos }))
    dispatch(navSlice.actions.openMenuWithId({ navItemId: props.navItem.id }))
  }
}
