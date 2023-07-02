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

export type TBoqColumns = {
  description: {
    html: string
    height: number
    width: undefined | number
  },
  item: {
    html: string
    height: number
    width: undefined | number
  },
  qty: {
    html: string
    height: number
    width: undefined | number
  },
  price: {
    html: string
    height: number
    width: undefined | number
  }
}

export type TBoqItem = TCommonItem & {
  type: 'boq'
  boq: {
    header: {
      height: number,
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
    column: TBoqColumns,
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
