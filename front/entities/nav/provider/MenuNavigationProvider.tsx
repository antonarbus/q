import { navItemId } from '@front/entities/nav/navItemId'
import { useMenuAnimation } from '@front/entities/nav/ui/NavList/NavItem/Menu/functions/useMenuAnimation'
import { reduxHolder } from '@front/shared/lib/redux'
import { useRef, useMemo } from 'react'
import { MenuNavigationContext } from './MenuNavigationContext'
import type { MenuNavigation } from './types'

type Props = {
  children: React.ReactNode
}

export const MenuNavigationProvider = (props: Props): React.JSX.Element => {
  const menuContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
  const currentMenuRef = useRef<React.ComponentRef<'div'> | null>(null)
  const nextMenuRef = useRef<React.ComponentRef<'div'> | null>(null)
  const fakeMenuRef = useRef<React.ComponentRef<'div'> | null>(null)

  const currentMenuNavItemId = reduxHolder.useSelector((state) => state.nav.currentMenuNavItemId)

  const nextMenuNavItemId = reduxHolder.useSelector((state) => state.nav.nextMenuNavItemId)

  const idsToCurrentMenuItems = reduxHolder.useSelector((state) => state.nav.idsToCurrentMenuItems)

  const menuAnimation = useMenuAnimation({
    currentMenuRef,
    nextMenuRef,
    menuContainerRef,
    fakeMenuRef,
  })

  const navigationContextData: MenuNavigation = useMemo(
    () => ({
      goUp: menuAnimation.goUp,
      goDown: menuAnimation.goDown,
      menuContainerRef,
      currentMenuRef,
      nextMenuRef,
      fakeMenuRef,
      currentMenuNavItemId,
      nextMenuNavItemId,
      idsToCurrentMenuItems,
      isProfileMenu: idsToCurrentMenuItems.includes(navItemId.profile),
    }),
    [
      menuAnimation.goUp,
      menuAnimation.goDown,
      menuContainerRef,
      currentMenuRef,
      nextMenuRef,
      fakeMenuRef,
      currentMenuNavItemId,
      nextMenuNavItemId,
      idsToCurrentMenuItems,
    ],
  )

  return (
    <MenuNavigationContext.Provider value={navigationContextData}>
      {props.children}
    </MenuNavigationContext.Provider>
  )
}
