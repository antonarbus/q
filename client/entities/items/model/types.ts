interface CommonItem {
  id: string
  width: number
  height: number
  msg: string
  previewHtml: string
}

export interface BoqRow {
  id: string
  description: {
    html: string
  }
  item: {
    html: string
    value: number
  }
  qty: {
    html: string
    value: number
  }
  price: {
    html: string
    value: number
  }
}

export interface BoqColumns {
  description: {
    html: string
    width: number | undefined
  }
  item: {
    html: string
    width: number | undefined
  }
  qty: {
    html: string
    width: number | undefined
  }
  price: {
    html: string
    width: number | undefined
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
        }
        currency: {
          html: string
        }
      }
    }
    column: BoqColumns
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

export type Item = BoqItem | PasteItem | TextItem
export type Items = Item[]
