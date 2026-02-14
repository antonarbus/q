import { type NavItemId, navItemId } from '@entity/nav/navItemId'
import { useMenuAnimation } from '@entity/nav/ui/NavList/NavItem/Menu/functions/useMenuAnimation'
import { useSelector } from '@shared/lib/redux'
import { createContext, useContext, useRef, useMemo } from 'react'

type MenuNavigation = {
  goUp: () => Promise<void>
  goDown: (args: { navItemId: NavItemId }) => Promise<void>
  menuContainerRef: React.RefObject<React.ComponentRef<'div'> | null>
  currentMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
  nextMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
  fakeMenuRef: React.RefObject<React.ComponentRef<'div'> | null>
  currentMenuNavItemId: NavItemId | null
  nextMenuNavItemId: NavItemId | null
  idsToCurrentMenuItems: NavItemId[]
  isProfileMenu: boolean
}

type Props = {
  children: React.ReactNode
}

const MenuNavigationContext: React.Context<MenuNavigation | null> =
  createContext<MenuNavigation | null>(null)

export const MenuNavigationProvider = (props: Props): React.JSX.Element => {
  const menuContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
  const currentMenuRef = useRef<React.ComponentRef<'div'> | null>(null)
  const nextMenuRef = useRef<React.ComponentRef<'div'> | null>(null)
  const fakeMenuRef = useRef<React.ComponentRef<'div'> | null>(null)

  const currentMenuNavItemId = useSelector(
    (state) => state.nav.currentMenuNavItemId,
  )

  const nextMenuNavItemId = useSelector((state) => state.nav.nextMenuNavItemId)

  const idsToCurrentMenuItems = useSelector(
    (state) => state.nav.idsToCurrentMenuItems,
  )

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

export const useMenuNavigation = (): MenuNavigation => {
  const context = useContext(MenuNavigationContext)

  if (context === null) {
    throw new Error(
      'useMenuNavigation must be used within a MenuNavigationProvider',
    )
  }

  return context
}
