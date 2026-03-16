import type { Editor } from '@tiptap/react'

export type BlockEditorName =
  | 'boqTitle'
  | 'subtotalText'
  | 'subTotalPrice'
  | 'descriptionColumn'
  | 'itemPriceColumn'
  | 'priceColumn'
  | 'qtyColumn'
  | 'textBlock'
  | 'totalPriceTitle'
  | 'totalPriceValue'

export type CellKey = 'description' | 'itemPrice' | 'price' | 'qty'

export type BlockKeyProps = { blockIndex: number; editorName: BlockEditorName }

export type RowKeyProps = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

type RegistryKey = BlockKeyProps | RowKeyProps

const registry = new Map<string, Editor>()

export const editorRegistry = {
  set: (key: RegistryKey, editor: Editor | null): void => {
    if (editor !== null) {
      const strKey =
        'rowIndex' in key
          ? `${key.blockIndex}:${key.rowIndex}:${key.cellKey}`
          : `${key.blockIndex}:${key.editorName}`

      registry.set(strKey, editor)
    }
  },
  delete: (key: RegistryKey): void => {
    const strKey =
      'rowIndex' in key
        ? `${key.blockIndex}:${key.rowIndex}:${key.cellKey}`
        : `${key.blockIndex}:${key.editorName}`

    registry.delete(strKey)
  },
  get: (key: RegistryKey): Editor | undefined => {
    const strKey =
      'rowIndex' in key
        ? `${key.blockIndex}:${key.rowIndex}:${key.cellKey}`
        : `${key.blockIndex}:${key.editorName}`

    return registry.get(strKey)
  },
}
