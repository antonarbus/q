import type { Signal } from '@preact/signals-react'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import type { BoqColumnKey } from '../const/boqColumnKey'
import type { itemType } from '../const/itemType'
import type { RowTypeKey } from '../const/rowTypeKey'

type Common = {
  id: 'new' | (string & {})
  email: string
  name: string
  category: string
  desc: string
  info: string
  width?: number
  height?: number
  isFroala?: boolean
  createdAt: Date
  updatedAt: Date
  preview?: string
}

// boq
export type CellPin = {
  isPinned: boolean
  isShown: boolean
}

export type Cell = {
  html: string
  value: number
  pin: CellPin
}

export type Row = Common & {
  type: RowTypeKey
  description: Cell
  itemPrice: Cell
  qty: Cell
  price: Cell
}

export type Column = {
  html: string
  width: number
}

export type HeaderValue = {
  html: string
  value: number
}

type Header = {
  title: HeaderValue
  subtotalText: HeaderValue
  subTotalPrice: HeaderValue
}

export type HeaderKey = keyof Header

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
    column: Record<BoqColumnKey, Column>
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
  viewedAt?: Date
  access: {
    level: 'everyone' | 'nobody' | 'custom'
    userList: string[]
  }
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
  permissionLevel?:
    | 'Public'
    | 'Shared with you'
    | 'Owner'
    | 'Super admin'
    | 'Super admin on behalf of a user'
    | 'Forbidden'
  blocks: Item[]
}

export type SaveQuotationFormValues = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}

export type AccessFormValuesSignal = Signal<Quotation['access']>

export type InfoFormValues = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}
