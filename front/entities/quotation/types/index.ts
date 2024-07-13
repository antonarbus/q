import { type FroalaEditorRef } from '@shared/types/froala'
import { type BoqRowKey } from '../consts/boqRowKey'
import { type itemKey } from '../consts/itemKey'

// this is common field for block + row + quotation
// a bit stupid but code is simpler if we maintain these fields everywhere, even if we do not need them everywhere
type Common = {
  id: 'new' | (Record<never, never> & string)
  email?: string
  name?: string
  category?: string
  desc?: string
  info?: string
  width?: number
  height?: number
  isFroala?: boolean
  createdAt?: Date
  updatedAt?: Date
  preview?: string
}

// boq
export type BoqRowCellPin = {
  isPinned: boolean
  isShown: boolean
}

export type BoqRowCell = {
  html: string
  value: number
  pin: BoqRowCellPin
}

export type BoqRow = Common & {
  type: BoqRowKey
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

type BoqHeader = {
  title: BoqHeaderCell
  subtotalText: BoqHeaderCell
  subTotalPrice: BoqHeaderCell
}

export type BoqHeaderKey = keyof BoqHeader

export type BoqColumnKey = keyof BoqCols

export type BoqRowCellKey = keyof Omit<BoqCols, 'number'>

export type BoqRowEditorRefs = {
  description: FroalaEditorRef
  itemPrice: FroalaEditorRef
  qty: FroalaEditorRef
  price: FroalaEditorRef
}[]

// block
export type BoqBlock = Common & {
  type: typeof itemKey.boq
  boq: {
    header: BoqHeader
    column: BoqCols
    rows: BoqRow[]
  }
}

type TextBlock = Common & {
  type: typeof itemKey.text
  text: {
    html: string
    value: null
  }
}

type PriceBlock = Common & {
  type: typeof itemKey.price
  title: {
    html: string
    value: null
  }
  price: {
    html: string
    value: number
  }
}

export type PasteBlock = Common & {
  type: typeof itemKey.paste
}

export type Block = BoqBlock | PasteBlock | TextBlock | PriceBlock

// item
export type Item = Block | BoqRow

// quotation
export type Quotation = Common & {
  type: typeof itemKey.quotation
  createdAt?: Date
  updatedAt?: Date
  openedAt?: Date
  sharedWith?: string[] //* if empty array - private, if ['*'] - public
  from?: {
    email?: string
    name?: string
    company?: string
  }
  to?: {
    email?: string
    name?: string
    company?: string
  }
  blocks: Block[]
}
