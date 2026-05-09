import type { NavItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { getNavItem } from '@front/shared/nav/getNavItem'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { functionRegistry } from '@front/widgets/nav/functionRegistry'

type MenuNavigation = {
  goDown: (args: { navItemId: NavItemId }) => Promise<void>
}

type Props = {
  event: React.MouseEvent
  navItemId: NavItemId
  disabled: boolean
  menuNavigation: MenuNavigation
}

export const clickOnMenuItem = (props: Props): void => {
  const navItem = getNavItem({ navItemId: props.navItemId })
  const nextMenuItems = navItem.current?.nestedItemList ?? []
  const isNestedMenuAvailable = nextMenuItems.length > 0

  const menuNavItem = getNavItem({
    navItemId: reduxHolder.getState().nav.currentMenuNavItemId,
  })

  const menuItems = menuNavItem.current?.nestedItemList ?? []
  const menuItem = menuItems.find((item) => item.id === props.navItemId)
  const link = menuItem?.link
  const funcId = menuItem?.funcId
  const func = funcId === undefined ? undefined : functionRegistry[funcId]

  if (props.disabled === true) {
    return
  }

  if (link !== undefined) {
    // follow the link natively and call the func
    func?.(props.event)
    reduxHolder.dispatch(navSlice.actions.closeMenu())

    return
  }

  props.event.preventDefault()

  if (func !== undefined) {
    func(props.event)
    reduxHolder.dispatch(navSlice.actions.closeMenu())

    return
  }

  if (isNestedMenuAvailable === true) {
    props.menuNavigation.goDown({ navItemId: props.navItemId })
  }
}
