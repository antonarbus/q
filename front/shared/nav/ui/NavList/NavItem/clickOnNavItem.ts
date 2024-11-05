import { dispatch, getState } from '@lib_instances/store'
import type { MouseEvent, MutableRefObject } from 'react'
import { navSlice } from '../../../navSlice'
import type { MenuItemType } from '../../../type'

type Props = {
  e: MouseEvent
  navItem: MenuItemType | undefined
  id: string
  navItemRef: MutableRefObject<HTMLLIElement>
  disabled: boolean
}

export const clickOnNavItem = ({
  e,
  navItem,
  id,
  navItemRef,
  disabled,
}: Props): void => {
  ;(document.activeElement as HTMLElement).blur() // to prevent open an active navItem link on Enter key

  const link = navItem?.link
  const func = navItem?.func

  if (disabled) return

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
  const isBurger = getState().nav.idsToCurrentMenuItems.includes('burger')

  if (isBurger) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  // if click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
  const currentMenuId = getState().nav.idsToCurrentMenuItems.at(-1)

  const isMenuOpenedUnderThisNavItem =
    currentMenuId === id && currentMenuId !== 'top'

  if (isMenuOpenedUnderThisNavItem) {
    dispatch(navSlice.actions.closeMenu())

    return
  }

  if (func) {
    void func(e)

    return
  }

  // open menu and determine its position (right: 0 OR left: 0)
  const navItemRightPos = navItemRef.current.getBoundingClientRect().right
  dispatch(navSlice.actions.setNavItemRightPos(navItemRightPos))
  dispatch(navSlice.actions.openMenuWithId(id))
}
