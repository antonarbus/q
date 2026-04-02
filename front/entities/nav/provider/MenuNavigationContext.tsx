import { createContext } from 'react'
import type { MenuNavigation } from './types'

export const MenuNavigationContext: React.Context<MenuNavigation | null> =
  createContext<MenuNavigation | null>(null)
