type Common = {
  id: string
  width: number
  height: number
  msg: string
  isFroala: boolean
}

export type BoqRowCellPin = {
  isPinned: boolean
  isDisplayed: boolean
}

export type BoqRowCell = {
  html: string
  value: number
  pin: BoqRowCellPin
}

export type BoqRow = {
  id: string
  type: 'boq paste' | 'boq row'
  height: number
  width: number
  number: BoqRowCell
  description: BoqRowCell
  itemPrice: BoqRowCell
  qty: BoqRowCell
  price: BoqRowCell
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
  itemPrice: {
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
        value: null
      }
      subtotalText: {
        html: string
        value: null
      }
      subTotalPrice: {
        html: string
        value: number
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
    value: null
  }
} & Common

export type PasteItem = {
  type: 'paste'
} & Common

export type Item = BoqItem | PasteItem | TextItem

export type Copyable = BoqItem | BoqRow | TextItem
export type CopyableItem = BoqItem | TextItem | BoqRow
