type TCommonItem = {
  id: string
  width: number
  height: number // todo: change to itemHeight
  msg: string | React.ReactNode
}

type TBoqRow = {
  description: {
    html: string
    froalaHeight: number
  },
  item: {
    html: string
    froalaHeight: number
    value: number
  },
  qty: {
    html: string
    froalaHeight: number
    value: number
  },
  price: {
    html: string
    froalaHeight: number
    value: number
  },
}

export type TBoqItem = TCommonItem & {
  type: 'boq'
  boq: {
    header: {
      title: {
        html: string
        froalaHeight: number
      }
      subtotal: {
        text: {
          html: string
          froalaHeight: number
        }
        price: {
          value: number
          html: string
          froalaHeight: number
        },
        currency: {
          html: string
          froalaHeight: number
        }
      }
    },
    column: {
      description: {
        html: string
        froalaHeight: number
      },
      item: {
        html: string
        froalaHeight: number
      },
      qty: {
        html: string
        froalaHeight: number
      },
      price: {
        html: string
        froalaHeight: number
      }
    },
    rows: TBoqRow[]
  }
}

export type TTextItem = TCommonItem & {
  type: 'text'
  text: {
    html: string
    froalaHeight: number
  }
}

export type TPasteItem = TCommonItem & {
  type: 'paste'
}

export type TItem = TBoqItem | TTextItem | TPasteItem
export type TItems = TItem[]
