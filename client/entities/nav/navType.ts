export interface NavLevel {
  id: string
  name: string
  icon?: React.ReactNode | string
  link?: string
  func?: () => Promise<void> | void
  shortcut?: string[]
  menuItems?: NavLevel[]
  isHidden: boolean
  disabled?: boolean
}
