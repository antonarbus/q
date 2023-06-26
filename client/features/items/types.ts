type TCommonItem = {
  id: string
  width: number
  height: number // todo: change to itemHeight
  msg: string | React.ReactNode
}

type TBoqRow = {
  description: {
    html: string
    height: number
  },
  item: {
    html: string
    height: number
    value: number
  },
  qty: {
    html: string
    height: number
    value: number
  },
  price: {
    html: string
    height: number
    value: number
  },
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
    },
    column: {
      description: {
        html: string
        height: number
      },
      item: {
        html: string
        height: number
      },
      qty: {
        html: string
        height: number
      },
      price: {
        html: string
        height: number
      }
    },
    rows: TBoqRow[]
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
