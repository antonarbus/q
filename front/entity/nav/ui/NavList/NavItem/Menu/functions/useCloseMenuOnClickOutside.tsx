import { navSlice } from '@entity/nav/navSlice'
import { dispatch } from '@shared/lib/redux'
import { didClickInsideThisElement } from '@shared/util/isClickInsideThisElement'
import { type ComponentRef, type RefObject, useEffect } from 'react'

type Props = {
  menuContainerRef: RefObject<ComponentRef<'div'> | null>
  navItemRef?: RefObject<HTMLElement | null>
}

export const useCloseMenuOnClickOutside = (props: Props): void => {
  /**
   * - menu is absolutely positioned inside NavItem li element
   * - if click outside menu - close
   * - if click on navItem do not close, but close it in NavItem onClick handler, otherwise it closes and opens immediately
   */

  const mouseDownHandler = (event: Event): void => {
    if (props.menuContainerRef.current !== null) {
      const menuContainer = props.menuContainerRef.current

      // Use provided navItemRef if available, otherwise fall back to parentElement
      const navItem =
        props.navItemRef?.current ??
        props.menuContainerRef.current.parentElement

      if (navItem === null) {
        return
      }

      const clickedElement = event.target

      if (clickedElement instanceof HTMLElement === false) {
        return
      }

      const isClickOnOpenedNavItem =
        didClickInsideThisElement({ clickedElement, thisElement: navItem }) &&
        didClickInsideThisElement({
          clickedElement,
          thisElement: menuContainer,
        }) === false

      if (isClickOnOpenedNavItem === true) {
        return
      }

      if (
        didClickInsideThisElement({
          clickedElement,
          thisElement: menuContainer,
        }) === false
      ) {
        dispatch(navSlice.actions.closeMenu())
      }
    }
  }

  type FuncReturnType = () => void

  const hideMenuOnClickOutside = (): FuncReturnType => {
    document.addEventListener('mousedown', mouseDownHandler)

    return () => {
      document.removeEventListener('mousedown', mouseDownHandler)
    }
  }

  useEffect(hideMenuOnClickOutside, [])
}
