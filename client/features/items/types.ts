export type ItemType = {
  id: string
  type: 'text' | 'text editable' | 'boq' | 'paste'
  width: number
  height: number
  html: string
  msg: string | React.ReactNode
}
export type ItemsType = ItemType[]
