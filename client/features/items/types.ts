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

export type TTextItem = TCommonItem & {
  type: 'text'
  text: {
    html: string
    height: number
  }
}

export type TPasteItem = TCommonItem & {
  type: 'paste'
}

export type TItem = TBoqItem | TTextItem | TPasteItem
export type TItems = TItem[]
