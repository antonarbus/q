export interface IMenuItem {
  id: string
  name: string
  icon?: React.ReactNode | string
  link?: string
  func?: () => Promise<void> | void
  shortcut?: string[]
  menuItems?: IMenuItem[]
  isHidden: boolean
  disabled?: boolean
}
