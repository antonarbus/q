import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { updateColumnCellAtStore } from '@entity/quotation/redux/updater/updateColumnCellAtStore'
import { editorRegistry, getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

const editorNameByColumnKey = {
  description: 'boqBlockDescriptionColumn',
  qty: 'boqBlockQtyColumn',
  price: 'boqBlockPriceColumn',
  itemPrice: 'boqBlockItemPriceColumn',
} as const

export const onChangeTableHeaderCellAtBoqBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: editorNameByColumnKey[props.boqColumnKey],
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  updateColumnCellAtStore({
    editor,
    blockIndex: props.blockIndex,
    boqColumnKey: props.boqColumnKey,
  })
}
