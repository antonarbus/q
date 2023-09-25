export type MenuItemTypes = {
  id: string
  name: string
  icon?: React.ReactNode | string
  link?: string
  func?: () => Promise<void> | void
  shortcut?: string[]
  menuItems?: MenuItemTypes[]
  isHidden: boolean
  disabled?: boolean
}
