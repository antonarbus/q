export interface ItemBoqType {
  id: string
  type: 'boq'
  width: number
  height: number
  html: string
  msg: string | React.ReactNode
  boq: {
    header: {
      title: {
        html: string
        height: number
      }
    }
  }
}

export interface ItemTextEditableType {
  id: string
  type: 'text editable'
  width: number
  height: number
  html: string
  msg: string | React.ReactNode
}

export interface ItemTextType {
  id: string
  type: 'text'
  width: number
  height: number
  html: string
  msg: string | React.ReactNode
}

export interface ItemPasteType {
  id: string
  type: 'paste'
  width: number
  height: number
  html: string
  msg: string | React.ReactNode
}

export type ItemType = ItemBoqType | ItemTextEditableType | ItemTextType | ItemPasteType
export type ItemsType = ItemType[]
