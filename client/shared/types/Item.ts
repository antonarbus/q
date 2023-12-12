type Common = {
  id: string
  width: number
  height: number
  msg: string
  // previewHtml: string
}

export type BoqRow = {
  id: string
  type: 'boq paste' | 'boq row'
  height: number
  width: number
  number: {
    html: string
    value: number
    isFroala: boolean
  }
  description: {
    html: string
    isFroala: boolean
  }
  item: {
    html: string
    value: number
    isFroala: boolean
  }
  qty: {
    html: string
    value: number
    isFroala: boolean
  }
  price: {
    html: string
    value: number
    isFroala: boolean
  }
}

export type BoqColWidth = number | undefined

export type BoqCols = {
  number: {
    html: string
    width: BoqColWidth
  }
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

export type BoqItem = {
  type: 'boq'
  boq: {
    header: {
      title: {
        html: string
        // value: number
        isFroala: boolean
      }
      subtotal: {
        html: string
        isFroala: boolean
      }
      price: {
        html: string
        value: number
        isFroala: boolean
      }
    }
    column: BoqCols
    rows: BoqRow[]
  }
} & Common

export type BoqHeaderKey = keyof BoqItem['boq']['header']
export type BoqColumnKey = keyof BoqCols

type TextItem = {
  type: 'text'
  text: {
    html: string
  }
} & Common

export type PasteItem = {
  type: 'paste'
} & Common

export type Item = BoqItem | PasteItem | TextItem

export type Copyable = BoqItem | BoqRow | TextItem
export type CopyableItem = BoqItem | TextItem | BoqRow
