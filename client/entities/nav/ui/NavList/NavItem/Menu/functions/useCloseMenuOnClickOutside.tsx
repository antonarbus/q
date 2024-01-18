import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
import { dispatch } from '@shared/clients'
import { didClickInsideThisElement } from '@shared/lib/isClickInsideThisElement'
import { navSlice } from '../../../../../navSlice'

type Props = {
  menuContainerRef: MutableRefObject<HTMLDivElement | null>
}

export const useCloseMenuOnClickOutside = ({ menuContainerRef }: Props): void => {
  /**
   * - menu is absolutely positioned inside NavItem li element
   * - if click outside menu - close
   * - if click on navItem do not close, but close it in NavItem onClick handler, otherwise it closes and opens immediately
   */

  const mouseDownHandler = (e: Event): void => {
    const menuContainer = menuContainerRef.current
    if (!menuContainer) return
    const navItem = menuContainerRef.current?.parentElement
    if (!navItem) return
    const clickedElement = e.target
    if (!(clickedElement instanceof HTMLElement)) return
    const isClickOnOpenedNavItem =
      didClickInsideThisElement({ clickedElement, thisElement: navItem }) &&
      !didClickInsideThisElement({ clickedElement, thisElement: menuContainer })
    if (isClickOnOpenedNavItem) return
    if (!didClickInsideThisElement({ clickedElement, thisElement: menuContainer })) {
      dispatch(navSlice.actions.closeMenu())
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
