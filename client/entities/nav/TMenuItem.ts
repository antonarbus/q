export interface TMenuItem {
  id: string
  name: string
  icon?: React.ReactNode | string
  link?: string
  func?: () => Promise<void> | void
  shortcut?: string[]
  menuItems?: TMenuItem[]
  isHidden: boolean
  disabled?: boolean
}
