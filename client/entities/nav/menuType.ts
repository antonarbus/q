export type MenuLevel = {
  id: string
  name: string
  icon?: React.ReactNode | string
  link?: any
  func?: () => void
  shortcut?: string[]
  menuItems?: MenuLevel[]
  isHidden?: boolean
  disabled?: boolean
}
