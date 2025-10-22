import type { FunctionId } from '@widgets/nav/functionRegistry'
import type { IconId } from '@widgets/nav/iconRegistry'
import type { NavItemId } from '../navItemId'

export type NavItem = {
  id: NavItemId
  name: string
  iconId?: IconId
  link?: string
  externalLink?: string
  funcId?: FunctionId
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

export type { NavItemId } from '../navItemId'
