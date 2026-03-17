import type { Editor } from '@tiptap/react'

type BlockEditorName =
  | 'textBlock'
  | 'boqBlockTitle'
  | 'boqBlockSubtotalText'
  | 'boqBlockSubTotalPrice'
  | 'boqBlockDescriptionColumn'
  | 'boqBlockQtyColumn'
  | 'boqBlockItemPriceColumn'
  | 'boqBlockPriceColumn'
  | 'boqBlockDescriptionCell'
  | 'boqBlockItemPriceCell'
  | 'boqBlockPriceCell'
  | 'boqBlockQtyCell'
  | 'priceBlockTitle'
  | 'priceBlockPrice'

type RegistryKeyProps = {
  editorName: BlockEditorName
  blockIndex: number
  rowIndex: number | null
}

export type RegistryKey =
  `${RegistryKeyProps['editorName']}:${RegistryKeyProps['blockIndex']}:${RegistryKeyProps['rowIndex']}`

export const getRegistryKey = (props: RegistryKeyProps): RegistryKey => {
  return `${props.editorName}:${props.blockIndex}:${props.rowIndex}`
}

const registry = new Map<RegistryKey, Editor>()

export const editorRegistry = {
  set: (registryKey: RegistryKey, editor: Editor | null): void => {
    if (editor !== null) {
      registry.set(registryKey, editor)
    }
  },
  delete: (registryKey: RegistryKey, editor: Editor): void => {
    if (registry.get(registryKey) === editor) {
      registry.delete(registryKey)
    }
  },
  get: (registryKey: RegistryKey): Editor | undefined => {
    const editor = registry.get(registryKey)

    return editor
  },
}
