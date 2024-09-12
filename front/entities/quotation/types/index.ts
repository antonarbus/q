import type { FroalaEditorRef } from '@shared/types/froala'
import type { BoqRowKey } from '../consts/boqRowKey'
import type { itemType } from '../consts/itemType'
import type { Signal } from '@preact/signals-react'
import type { SharedWithOption } from '@shared/consts/sharedWithOption'

type Common = {
  id: 'new' | (Record<never, never> & string)
  email: string
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
export type RowCellPin = {
  isPinned: boolean
  isShown: boolean
}

export type RowCell = {
  html: string
  value: number
  pin: RowCellPin
}

export type Row = Common & {
  type: BoqRowKey
  description: RowCell
  itemPrice: RowCell
  qty: RowCell
  price: RowCell
}

export type Col = {
  html: string
  width: number
}

export type Cols = {
  number: Col
  description: Col
  itemPrice: Col
  qty: Col
  price: Col
}

export type HeaderCell = {
  html: string
  value: number
}

type Header = {
  title: HeaderCell
  subtotalText: HeaderCell
  subTotalPrice: HeaderCell
}

export type HeaderKey = keyof Header

export type ColumnKey = keyof Cols

export type RowCellKey = keyof Omit<Cols, 'number'>

export type RowEditorRefs = {
  description: FroalaEditorRef
  itemPrice: FroalaEditorRef
  qty: FroalaEditorRef
  price: FroalaEditorRef
}[]

// block
export type Boq = Common & {
  type: typeof itemType.boq
  boq: {
    header: Header
    column: Cols
    rows: Row[]
  }
}

export type Text = Common & {
  type: typeof itemType.text
  text: {
    html: string
    value: null
  }
}

export type Price = Common & {
  type: typeof itemType.price
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
  type: typeof itemType.paste
}

export type Item = Boq | Paste | Text | Price | Row

export type Quotation = Common & {
  type: 'quotation'
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
  blocks: Item[]
}

export type QuotationFormValues = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
  sharedWithSignal: Signal<string[]>
  shareWithOptionSignal: Signal<SharedWithOption>
}

export type InfoFormValues = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}
