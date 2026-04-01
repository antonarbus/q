import { useContext } from 'react'
import type { MenuNavigation } from './MenuNavigationProvider'
import { MenuNavigationContext } from './MenuNavigationContext'

export const useMenuNavigation = (): MenuNavigation => {
  const context = useContext(MenuNavigationContext)

  if (context === null) {
    throw new Error('useMenuNavigation must be used within a MenuNavigationProvider')
  }

  return context
}
