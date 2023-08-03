export interface TNavItem {
  id: string
  name: string
  icon?: React.ReactNode | string
  link?: string
  func?: () => Promise<void> | void
  shortcut?: string[]
  menuItems?: TNavItem[]
  isHidden: boolean
  disabled?: boolean
}
