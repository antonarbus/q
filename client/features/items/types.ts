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
      }
      subtotal: {
        text: {
          html: string
        }
        price: {
          value: number
          html: string
        },
        currency: {
          html: string
        }
      }
    },
    column: {
      description: {
        html: string
      },
      item: {
        html: string
      },
      qty: {
        html: string
      },
      price: {
        html: string
      }
    }
  }
}

export type TTextItem = TCommonItem & {
  type: 'text'
  text: {
    html: string
  }
}

export type TPasteItem = TCommonItem & {
  type: 'paste'
}

export type TItem = TBoqItem | TTextItem | TPasteItem
export type TItems = TItem[]
