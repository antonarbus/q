import { type FroalaEditorRef } from '@shared/types/froala'
import { type BoqRowKey } from '../consts/boqRowKey'
import { type itemKey } from '../consts/itemKey'

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

export type BoqRowCellPin = {
  isPinned: boolean
  isShown: boolean
}

export type BoqRowCell = {
  html: string
  value: number
  pin: BoqRowCellPin
}

export type Row = Common & {
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

export type Boq = Common & {
  type: typeof itemKey.boq
  boq: {
    header: {
      title: BoqHeaderCell
      subtotalText: BoqHeaderCell
      subTotalPrice: BoqHeaderCell
    }
    column: BoqCols
    rows: Row[]
  }
}

export type BoqHeaderKey = keyof Boq['boq']['header']
export type BoqColumnKey = keyof BoqCols
export type BoqRowCellKey = keyof Omit<BoqCols, 'number'>

type Text = Common & {
  type: typeof itemKey.text
  text: {
    html: string
    value: null
  }
}

type Price = Common & {
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

export type Paste = Common & {
  type: typeof itemKey.paste
}

export type Item = Boq | Paste | Text | Price | Row

export type Quotation = Common & {
  type: typeof itemKey.quotation
  createdAt?: Date
  updatedAt?: Date
  openedAt?: Date
  sharedWith?: string[] //* if empty array, not shared, if '*' inside - with everyone
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
  items: Item[]
}

export type BoqRowEditorRefs = {
  description: FroalaEditorRef
  itemPrice: FroalaEditorRef
  qty: FroalaEditorRef
  price: FroalaEditorRef
}[]
