import { type MouseEvent } from 'react'
import { type navMenuItemId } from '../../consts/navMenuItemId'

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
}

export type NavMenuItemIdKey = keyof typeof navMenuItemId
