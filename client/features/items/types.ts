type CommonItem = {
  id: string
  width: number
  height: number
  msg: string | React.ReactNode
}

export type BoqRow = {
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

export type BoqColumns = {
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

export type BoqItem = CommonItem & {
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
    column: BoqColumns,
    rows: BoqRow[]
  }
}

export type TextItem = CommonItem & {
  type: 'text'
  text: {
    html: string
  }
}

export type PasteItem = CommonItem & {
  type: 'paste'
}

export type Item = BoqItem | TextItem | PasteItem
export type Items = Item[]
