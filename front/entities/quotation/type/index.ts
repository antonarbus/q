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
  createdAt: string
  updatedAt: string
  width?: number
  height?: number
  isFroala?: boolean
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

// boq block
export type Boq = Common & {
  type: typeof itemType.boq
  boq: {
    header: Header
    column: Record<BoqColumnKey, Column>
    rows: Row[]
  }
}

// text block
export type Text = Common & {
  type: typeof itemType.text
  text: {
    html: string
    value: null
  }
}

// price block
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

// paste block
export type Paste = Common & {
  type: typeof itemType.paste
}

export type Item = Boq | Paste | Text | Price | Row

export type Quotation = Common & {
  type: 'quotation'
  openedAt?: string | null
  viewedAt?: string | null
  access: {
    level: 'everyone' | 'nobody' | 'custom'
    userList: string[]
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
