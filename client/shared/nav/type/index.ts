import { type MouseEvent } from 'react'
import { type navItemKey } from '../../consts/navItemKey'

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
}

export type NavItemIdKey = keyof typeof navItemKey
