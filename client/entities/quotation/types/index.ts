import { type FroalaEditorRef } from '@shared/types/froala'
import { type BoqRowKey } from '../consts/boqRowKey'
import { type itemKey } from '../consts/itemKey'

type ItemCommon = {
  id: string
  email: string
  name: string
  category: string
  desc?: string
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

export type BoqRow = ItemCommon & {
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

export type ItemBoq = ItemCommon & {
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
}

export type BoqHeaderKey = keyof ItemBoq['boq']['header']
export type BoqColumnKey = keyof BoqCols
export type BoqRowCellKey = keyof Omit<BoqCols, 'number'>

type ItemText = ItemCommon & {
  type: typeof itemKey.text
  text: {
    html: string
    value: null
  }
}

type ItemPrice = ItemCommon & {
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

export type ItemPaste = ItemCommon & {
  type: typeof itemKey.paste
}

export type Item = ItemBoq | ItemPaste | ItemText | ItemPrice | BoqRow
// export type Item = ItemText | ItemBoq | ItemPrice | BoqRow

export type Quotation = {
  id: 'new' | Record<never, never> & string
  email: string
  name: string
  category: string
  desc: string
  createdAt?: Date
  updatedAt?: Date
  openedAt?: Date
  sharedAt?: Date
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

export type BoqRowEditorRefs = Array<{
  description: FroalaEditorRef
  itemPrice: FroalaEditorRef
  qty: FroalaEditorRef
  price: FroalaEditorRef
}>
