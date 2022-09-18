import { isClickInsideThisElement } from '@src/functions/isClickInsideThisElement'
import { useDispatchTyped } from '@src/store'
import { useEffect } from 'react'
import { closeMenu } from '@components/Nav/navSlice'
import { EventType } from '@src/types'

type Props = {
  menuContainerRef: React.MutableRefObject<HTMLDivElement>
}

export function useCloseMenuOnClickOutside({ menuContainerRef }: Props) {
  const dispatch = useDispatchTyped()

  /**
   * @descriptions
   * - menu is absolutely positioned inside NavItem li element
   * - if click outside menu - close
   * - if click on navItem do not close, but close it in NavItem onClick handler, otherwise it closes and opens immediately
   */

  function mouseDownHandler(e: EventType) {
    const menuContainer = menuContainerRef.current
    if (!menuContainer) return
    const navItem = menuContainerRef.current.parentElement
    if (!navItem) return
    const clickedEl = e.target as HTMLElement
    const isClickOnOpenedNavItem = isClickInsideThisElement(clickedEl, navItem) && !isClickInsideThisElement(clickedEl, menuContainer)
    if (isClickOnOpenedNavItem) return
    if (!isClickInsideThisElement(clickedEl, menuContainer)) {
      dispatch(closeMenu())
    }
  }

  function hideMenuOnClickOutside() {
    document.addEventListener('mousedown', mouseDownHandler)
    return () => { document.removeEventListener('mousedown', mouseDownHandler) }
  }

  useEffect(hideMenuOnClickOutside, [])
}
