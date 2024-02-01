import { type FroalaEditorRef } from '@shared/types'

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
  type: 'boq paste' | 'boq row'
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
  type: 'boq'
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
export type CopyableItem = BoqItem | BoqRow | TextItem

export type BoqRowEditorRefs = Array<{
  description: FroalaEditorRef
  itemPrice: FroalaEditorRef
  qty: FroalaEditorRef
  price: FroalaEditorRef
}>
