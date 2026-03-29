import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import type { NavItem } from '@front/entities/nav/type'
import { reduxHolder } from '@front/shared/lib/redux'
import { functionRegistry } from '@front/widgets/nav/functionRegistry'

type Props = {
  event: React.MouseEvent

  navItem: NavItem
  navItemRef: React.RefObject<React.ComponentRef<'li'> | null>
  disabled: boolean
}

export const clickOnNavItem = (props: Props): void => {
  if (document.activeElement instanceof HTMLElement === false) {
    return
  }

  document.activeElement.blur() // to prevent open an active navItem link on Enter key

  const func =
    props.navItem.funcId === undefined ? undefined : functionRegistry[props.navItem.funcId]

  if (props.disabled === true) {
    return
  }

  if (props.navItem.link !== undefined) {
    // just follow the link natively and call the func
    func?.(props.event)

    return
  }

  // all navItems are links, which were already opened above,
  // but these ones we do not want to follow
  props.event.preventDefault()

  // handle burger close separately
  const isBurger = reduxHolder.getState().nav.currentMenuNavItemId === navItemId.burger

  if (isBurger === true) {
    reduxHolder.dispatch(navSlice.actions.closeMenu())

    return
  }

  // if click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
  const state = reduxHolder.getState()

  const isMenuOpenedUnderThisNavItem =
    state.nav.currentMenuNavItemId === props.navItem.id &&
    state.nav.currentMenuNavItemId !== navItemId.burger

  if (isMenuOpenedUnderThisNavItem === true) {
    reduxHolder.dispatch(navSlice.actions.closeMenu())

    return
  }

  if (func !== undefined) {
    func(props.event)

    return
  }

  if (props.navItemRef.current !== null) {
    // open menu and determine its position (right: 0 OR left: 0)
    const navItemRightPos = props.navItemRef.current.getBoundingClientRect().right

    reduxHolder.dispatch(navSlice.actions.setNavItemRightPos({ navItemRightPos }))

    reduxHolder.dispatch(navSlice.actions.openMenuWithId({ navItemId: props.navItem.id }))
  }
}
