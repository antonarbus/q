import { navItemId, type NavItemId } from '@entities/nav/navItemId'
import { useMenuAnimation } from '@entities/nav/ui/NavList/NavItem/Menu/functions/useMenuAnimation'
import { useSelector } from '@shared/lib/redux'
import {
  type ComponentRef,
  type Context,
  createContext,
  type JSX,
  type ReactNode,
  type RefObject,
  useContext,
  useRef,
} from 'react'

type MenuNavigation = {
  goUp: () => Promise<void>
  goDown: (args: { navItemId: NavItemId }) => Promise<void>
  menuContainerRef: RefObject<ComponentRef<'div'> | null>
  currentMenuRef: RefObject<ComponentRef<'div'> | null>
  nextMenuRef: RefObject<ComponentRef<'div'> | null>
  fakeMenuRef: RefObject<ComponentRef<'div'> | null>
  currentMenuNavItemId: NavItemId | null
  nextMenuNavItemId: NavItemId | null
  idsToCurrentMenuItems: NavItemId[]
  isProfileMenu: boolean
}

type Props = {
  children: ReactNode
}

const MenuNavigationContext: Context<MenuNavigation | null> =
  createContext<MenuNavigation | null>(null)

export const MenuNavigationProvider = (props: Props): JSX.Element => {
  const menuContainerRef = useRef<ComponentRef<'div'> | null>(null)
  const currentMenuRef = useRef<ComponentRef<'div'> | null>(null)
  const nextMenuRef = useRef<ComponentRef<'div'> | null>(null)
  const fakeMenuRef = useRef<ComponentRef<'div'> | null>(null)

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

  const navigationContextData: MenuNavigation = {
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
  }

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
