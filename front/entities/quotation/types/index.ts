import type { FroalaEditorRef } from '@shared/types/froala'
import type { BoqRowKey } from '../consts/boqRowKey'
import type { itemType } from '../consts/itemType'
import type { Signal } from '@preact/signals-react'
import type { SharedWithOption } from '@shared/consts/sharedWithOption'

// this is common field for block + row + quotation
// a bit stupid but code is simpler if we maintain these fields everywhere, even if we do not need them everywhere
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
  type: typeof itemType.boq
  boq: {
    header: BoqHeader
    column: BoqCols
    rows: BoqRow[]
  }
}

export type TextBlock = Common & {
  type: typeof itemType.text
  text: {
    html: string
    value: null
  }
}

export type PriceBlock = Common & {
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

export type RowBlock = BoqRow

export type PasteBlock = Common & {
  type: typeof itemType.paste
}

export type Item = BoqBlock | PasteBlock | TextBlock | PriceBlock | RowBlock

// quotation
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
