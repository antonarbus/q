export interface ItemBoqType {
  id: string
  type: 'boq'
  width: number
  height: number
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
  msg: string | React.ReactNode
  text: {
    html: string
    height: number
  }
}

export interface ItemTextType {
  id: string
  type: 'text'
  width: number
  height: number
  msg: string | React.ReactNode
  text: {
    html: string
  }
}

// todo: think to make have common props for all items, even paste items does not need it
// todo: it will simplify the code
export interface ItemPasteType {
  id: string
  type: 'paste'
}

export type ItemType = ItemBoqType | ItemTextEditableType | ItemTextType | ItemPasteType
export type ItemsType = ItemType[]
