import { type FroalaEditorRef } from '@shared/types'
import { type BoqRowKey } from '../consts/boqRowKey'
import { type itemKey } from '../consts/itemKey'

type Common = {
  id: string
  width: number
  height: number
  isFroala: boolean
}

export type BoqRowCellPin = {
  isPinned: boolean
  isShown: boolean
}

export type BoqRowCell = {
  html: string
  value: number
  pin: BoqRowCellPin
}

export type BoqRow = {
  id: string
  type: BoqRowKey
  height: number
  width: number
  description: BoqRowCell
  itemPrice: BoqRowCell
  qty: BoqRowCell
  price: BoqRowCell
}

export type BoqCol = {
  html: string
  width: number
}

export type BoqCols = {
  number: BoqCol
  description: BoqCol
  itemPrice: BoqCol
  qty: BoqCol
  price: BoqCol
}

export type BoqHeaderCell = {
  html: string
  value: number
}

export type BoqItem = {
  type: typeof itemKey.boq
  boq: {
    header: {
      title: BoqHeaderCell
      subtotalText: BoqHeaderCell
      subTotalPrice: BoqHeaderCell
    }
    column: BoqCols
    rows: BoqRow[]
  }
} & Common

export type BoqHeaderKey = keyof BoqItem['boq']['header']
export type BoqColumnKey = keyof BoqCols
export type BoqRowCellKey = keyof Omit<BoqCols, 'number'>

type TextItem = {
  type: typeof itemKey.text
  text: {
    html: string
    value: null
  }
} & Common

type PriceItem = {
  type: typeof itemKey.price
  title: {
    html: string
    value: null
  }
  price: {
    html: string
    value: number
  }
} & Common

export type PasteItem = {
  type: typeof itemKey.paste
} & Common

export type Item = BoqItem | PasteItem | TextItem | PriceItem
export type CopyableItem = BoqItem | BoqRow | TextItem | PriceItem

export type Quotation = {
  info: string
  items: Item[]
}

export type BoqRowEditorRefs = Array<{
  description: FroalaEditorRef
  itemPrice: FroalaEditorRef
  qty: FroalaEditorRef
  price: FroalaEditorRef
}>
