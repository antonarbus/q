import { createContext } from 'react'

import type { MenuNavigation } from './MenuNavigationProvider'

export const MenuNavigationContext: React.Context<MenuNavigation | null> =
  createContext<MenuNavigation | null>(null)
