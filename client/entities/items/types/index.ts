import { type FroalaEditorRef } from '@shared/types'
import { type BoqRowType } from '../consts/boqRowType'
import { type itemType } from '../consts/itemType'

type Common = {
  id: string
  width: number
  height: number
  msg: string
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
  type: BoqRowType
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
  type: typeof itemType['boq']
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
  type: typeof itemType['text']
  text: {
    html: string
    value: null
  }
} & Common

type PriceItem = {
  type: typeof itemType['price']
} & Common

export type PasteItem = {
  type: typeof itemType['paste']
} & Common

export type Item = BoqItem | PasteItem | TextItem | PriceItem
export type CopyableItem = BoqItem | BoqRow | TextItem | PriceItem

export type BoqRowEditorRefs = Array<{
  description: FroalaEditorRef
  itemPrice: FroalaEditorRef
  qty: FroalaEditorRef
  price: FroalaEditorRef
}>
