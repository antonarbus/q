import type { NavItemId } from '@front/entities/nav/navItemId'

export type MenuNavigation = {
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
