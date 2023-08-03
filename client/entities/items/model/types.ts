interface TCommonItem {
  id: string
  width: number
  height: number
  msg: string
  previewHtml: string
}

interface TBoqRow {
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

interface TBoqCols {
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

type TBoqItem = TCommonItem & {
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
    column: TBoqCols
    rows: TBoqRow[]
  }
}

type TTextItem = TCommonItem & {
  type: 'text'
  text: {
    html: string
  }
}

export type TPasteItem = TCommonItem & {
  type: 'paste'
}

export type TItem = TBoqItem | TPasteItem | TTextItem
export type TItems = TItem[]
