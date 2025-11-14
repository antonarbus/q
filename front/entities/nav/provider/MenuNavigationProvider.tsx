import type { NavItemId } from '@entities/nav/navItemId'
import {
  type Context,
  createContext,
  type JSX,
  type ReactNode,
  useContext,
} from 'react'

type MenuNavigation = {
  goUp: () => Promise<void>
  goDown: (args: { navItemId: NavItemId }) => Promise<void>
}

type Props = MenuNavigation & {
  children: ReactNode
}

const MenuNavigationContext: Context<MenuNavigation | null> =
  createContext<MenuNavigation | null>(null)

export const MenuNavigationProvider = (props: Props): JSX.Element => {
  const navigationContextData: MenuNavigation = {
    goUp: props.goUp,
    goDown: props.goDown,
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
