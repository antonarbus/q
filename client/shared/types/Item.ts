interface Common {
  id: string
  width: number
  height: number
  msg: string
  // previewHtml: string
}

interface BoqRow {
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

export type BoqColWidth = number | null

export interface BoqCols {
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

interface BoqItem extends Common {
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