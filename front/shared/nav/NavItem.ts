import type { FunctionId } from './FunctionId'
import type { IconId } from './IconId'
import type { NavItemId } from './navItemId'

export type NavItem = {
  id: NavItemId
  name: string
  maxName?: string // Save --> Saving...
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
  badge?: boolean
}
