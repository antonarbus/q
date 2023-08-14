import { didClickInsideThisElement } from 'client/shared/lib/isClickInsideThisElement'
import { useDispatchTyped } from 'client/shared/hooks'
import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
import { closeMenu } from 'client/entities/nav'

interface Props {
  menuContainerRef: MutableRefObject<HTMLDivElement | null>
}

export const useCloseMenuOnClickOutside = ({ menuContainerRef }: Props): void => {
  const dispatch = useDispatchTyped()

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
      dispatch(closeMenu())
    }
  }

  type TReturn = () => void
  const hideMenuOnClickOutside = (): TReturn => {
    document.addEventListener('mousedown', mouseDownHandler)
    return () => {
      document.removeEventListener('mousedown', mouseDownHandler)
    }
  }

  useEffect(hideMenuOnClickOutside, [])
}
