import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import type { BoqColumnKey } from '../const/boqColumnKey'
import type { RowTypeKey } from '../const/rowTypeKey'
import type { SelectBookmark } from '@back/entities/bookmark'

type BlockMetaData = Omit<SelectBookmark, 'type'>

type BlockDataInBucket = {
  info: string
  preview: string
  width: number
  height: number
}

type BlockDataRuntime = {
  isFroala: boolean
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

export type RowBlock = BlockMetaData &
  BlockDataInBucket &
  BlockDataRuntime & {
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

export type BoqBlock = BlockMetaData &
  BlockDataInBucket &
  BlockDataRuntime & {
    type: 'boq'
    boq: {
      header: Header
      column: Record<BoqColumnKey, Column>
      rows: RowBlock[]
    }
  }

export type TextBlock = BlockMetaData &
  BlockDataInBucket &
  BlockDataRuntime & {
    type: 'text'
    text: {
      html: string
      value: null
    }
  }

export type PriceBlock = BlockMetaData &
  BlockDataInBucket &
  BlockDataRuntime & {
    type: 'price'
    title: {
      html: string
      value: null
    }
    price: {
      html: string
      value: number
    }
  }

/** Maintain same shape for paste block for dev convenience */
export type PasteBlock = BlockMetaData &
  BlockDataInBucket &
  BlockDataRuntime & {
    type: 'paste'
  }

export type BlockItem =
  | BoqBlock
  | TextBlock
  | PriceBlock
  | RowBlock
  | PasteBlock
