import type { MouseEvent, ReactNode } from 'react'
import type { NavItemId } from '../../const/navItemId'

export type NavItem = {
  id: NavItemId
  name: string
  icon?: ReactNode | string
  link?: string
  externalLink?: string
  func?: (e?: MouseEvent) => Promise<void> | void
  shortcut?: string[]
  navItems?: NavItem[]
  isHidden: boolean
  disabled?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  isActive?: boolean
  tooltip?: string
}

export type { NavItemId } from '../../const/navItemId'
