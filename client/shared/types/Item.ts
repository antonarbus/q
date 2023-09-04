interface Common {
  id: string
  width: number
  height: number
  msg: string
  // previewHtml: string
}

export interface BoqRow {
  id: string
  type: 'boq paste' | 'boq row'
  number: {
    html: string
    value: number
  }
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

export type BoqColWidth = number | undefined

export interface BoqCols {
  number: {
    html: string
    width: BoqColWidth
  },
  description: {
    html: string
    width: BoqColWidth
  }
  item: {
    html: string
    width: BoqColWidth
  }
  qty: {
    html: string
    width: BoqColWidth
  }
  price: {
    html: string
    width: BoqColWidth
  }
}

export interface BoqItem extends Common {
  type: 'boq'
  boq: {
    header: {
      title: {
        html: string
      }
      subtotal: {
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
    column: BoqCols
    rows: BoqRow[]
  }
}

export type BoqHeaderKey = keyof BoqItem['boq']['header']

interface TextItem extends Common {
  type: 'text'
  text: {
    html: string
  }
}

export interface PasteItem extends Common {
  type: 'paste'
}

export type Item = BoqItem | PasteItem | TextItem

export type HtmlGetter = (props: { index: number, rowIndex?: number }) => string
