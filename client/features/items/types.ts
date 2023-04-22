type CommonItemProps = {
  id: string
  width: number
  height: number
  msg: string | React.ReactNode
}

export type ItemBoqType = CommonItemProps & {
  type: 'boq'
  boq: {
    header: {
      title: {
        html: string
        height: number
      }
    }
  }
}

export type ItemTextEditableType = CommonItemProps & {
  type: 'text editable'
  text: {
    html: string
    height: number
  }
}

export type ItemTextType = CommonItemProps & {
  type: 'text'
  text: {
    html: string
  }
}

export type ItemPasteType = CommonItemProps & {
  type: 'paste'
}

export type ItemType = ItemBoqType | ItemTextEditableType | ItemTextType | ItemPasteType
export type ItemsType = ItemType[]
