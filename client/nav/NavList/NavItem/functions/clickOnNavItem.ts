import { MenuType } from '@client/nav/navStructure'
import { closeMenu, openMenuWithId, setNavItemRightPos } from '@client/nav/navSlice'
import { store } from '@client/store'
import { EventType } from '@client/types'

type PropsType = {
  e: EventType
  navItem: MenuType | undefined
  id: string
  navItemRef: React.MutableRefObject<HTMLLIElement>
}

export function clickOnNavItem({ e, navItem, id, navItemRef }: PropsType) {
  (document.activeElement as HTMLElement).blur() // to prevent open an active navItem link on Enter key

  const link = navItem?.link
  const func = navItem?.func

  if (link && func) {
    // just follow the link natively and call the func
    func()
    return
  }

  if (link) {
    // just follow the link natively
    return
  }

  // all navItems are links and we do not to follow them if they are not really links
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
