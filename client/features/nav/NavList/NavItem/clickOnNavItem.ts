import { MenuType } from 'client/features/nav/navStructure'
import { closeMenu, openMenuWithId, setNavItemRightPos } from 'client/features/nav/navSlice'
import { store } from 'client/store'
import { EventType } from 'client/types'

type PropsType = {
  e: EventType
  navItem: MenuType | undefined
  id: string
  navItemRef: React.MutableRefObject<HTMLLIElement>
  disabled: boolean
}

export function clickOnNavItem({ e, navItem, id, navItemRef, disabled }: PropsType) {
  (document.activeElement as HTMLElement).blur() // to prevent open an active navItem link on Enter key

  const link = navItem?.link
  const func = navItem?.func

  if (disabled) return

  if (link && func) {
    // just follow the link natively and call the func
    func()
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
  const isBurger = store.getState().nav.idsToCurrentMenuItems.includes('burger')
  if (isBurger) {
    store.dispatch(closeMenu())
    return
  }

  // if click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
  const currentMenuId = store.getState().nav.idsToCurrentMenuItems.at(-1)
  const isMenuOpenedUnderThisNavItem = currentMenuId === id && currentMenuId !== 'top'

  if (isMenuOpenedUnderThisNavItem) {
    store.dispatch(closeMenu())
    return
  }

  if (func) {
    func()
    return
  }

  // open menu and determine its position (right: 0 OR left: 0)
  const navItemRightPos = navItemRef.current.getBoundingClientRect().right
  store.dispatch(setNavItemRightPos(navItemRightPos))
  store.dispatch(openMenuWithId(id))
}
