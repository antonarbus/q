export type ItemType = {
  id: string,
  type: 'text' | 'text editable' | 'boq' | 'paste',
  width: number,
  height: number,
  innerHtml: string
}
export type ItemsType = ItemType[]
