import type { MouseEvent } from 'react'
import type { NavItemId } from '../../consts/navItemId'

export type MenuItemType = {
  id: NavItemId
  name: string
  icon?: React.ReactNode | string
  link?: string
  func?: (e?: MouseEvent) => Promise<void> | void
  shortcut?: string[]
  menuItems?: MenuItemType[]
  isHidden: boolean
  disabled?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  isActive?: boolean
  tooltip?: string
}

export type NavItemsMediaQueryWidths = {
  icon: number
  name: number
  burger: number
}

export type { NavItemId } from '../../consts/navItemId'
