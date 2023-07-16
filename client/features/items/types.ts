type TCommonItem = {
  id: string
  width: number
  height: number
  msg: string | React.ReactNode
}

export type TBoqRow = {
  id: string
  description: {
    html: string
  },
  item: {
    html: string
    value: number
  },
  qty: {
    html: string
    value: number
  },
  price: {
    html: string
    value: number
  },
}

export type TBoqColumns = {
  description: {
    html: string
    width: undefined | number
  },
  item: {
    html: string
    width: undefined | number
  },
  qty: {
    html: string
    width: undefined | number
  },
  price: {
    html: string
    width: undefined | number
  }
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
    column: TBoqColumns,
    rows: TBoqRow[]
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
