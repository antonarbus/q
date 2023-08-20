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

interface BoqCols {
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

interface BoqItem extends Common {
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
    column: BoqCols
    rows: BoqRow[]
  }
}

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