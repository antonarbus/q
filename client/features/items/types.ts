export type ItemType = {
  id: string,
  type: 'text' | 'text editable' | 'boq' | 'paste',
  width: number,
  height: number,
  html: string
}
export type ItemsType = ItemType[]
