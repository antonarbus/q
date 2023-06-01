type TCommonItem = {
  id: string
  width: number
  height: number
  msg: string | React.ReactNode
}

export type TBoqItem = TCommonItem & {
  type: 'boq'
  boq: {
    header: {
      title: {
        html: string
        height: number
      }
      subtotal: {
        text: {
          html: string
          height: number
        }
        price: {
          value: number
          html: string
          height: number
        },
        currency: {
          html: string
          height: number
        }
      }
    }
  }
}

export type TTextEditableItem = TCommonItem & {
  type: 'text editable'
  text: {
    html: string
    height: number
  }
}

export type IPasteItem = TCommonItem & {
  type: 'paste'
}

export type TItem = TBoqItem | TTextEditableItem | IPasteItem
export type TItems = TItem[]
