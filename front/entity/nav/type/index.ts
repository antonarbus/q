import type { FunctionId } from '@widget/nav/functionRegistry'
import type { IconId } from '@widget/nav/iconRegistry'
import type { NavItemId } from '../navItemId'

export type NavItem = {
  id: NavItemId
  name: string
  /** Save --> Saving... */
  maxName?: string
  iconId?: IconId
  link?: string
  externalLink?: string
  funcId?: FunctionId
  shortcut?: string[]
  nestedItemList?: NavItem[]
  isHidden: boolean
  disabled?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  isActive?: boolean
  tooltip?: string
}

export type { NavItemId } from '../navItemId'
