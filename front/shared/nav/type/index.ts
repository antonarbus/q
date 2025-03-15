import type { MouseEvent } from 'react'

export type MenuItemType = {
  id: string
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

export type { NavItemKey } from '../../consts/navItemKey'
