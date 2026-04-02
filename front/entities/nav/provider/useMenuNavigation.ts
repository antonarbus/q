import { useContext } from 'react'
import { MenuNavigationContext } from './MenuNavigationContext'
import type { MenuNavigation } from './types'

export const useMenuNavigation = (): MenuNavigation => {
  const context = useContext(MenuNavigationContext)

  if (context === null) {
    throw new Error('useMenuNavigation must be used within a MenuNavigationProvider')
  }

  return context
}
