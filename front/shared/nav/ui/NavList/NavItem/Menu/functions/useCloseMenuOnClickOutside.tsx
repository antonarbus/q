import { dispatch } from '@shared/lib/redux'
import { useEffect } from 'react'
import { didClickInsideThisElement } from '../../../../../../utils/isClickInsideThisElement'
import { navSlice } from '../../../../../navSlice'

type Props = {
  menuContainerRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const useCloseMenuOnClickOutside = ({
  menuContainerRef,
}: Props): void => {
  /**
   * - menu is absolutely positioned inside NavItem li element
   * - if click outside menu - close
   * - if click on navItem do not close, but close it in NavItem onClick handler, otherwise it closes and opens immediately
   */

  const mouseDownHandler = (event: Event): void => {
    if (menuContainerRef.current !== null) {
      const menuContainer = menuContainerRef.current

      const navItem = menuContainerRef.current.parentElement

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
