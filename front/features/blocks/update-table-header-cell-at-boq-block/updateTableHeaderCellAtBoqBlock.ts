import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { updateColumnCellAtStore } from '@front/entities/quotation/redux/updater/updateColumnCellAtStore'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
  editorName:
    | 'boqBlockDescriptionColumn'
    | 'boqBlockQtyColumn'
    | 'boqBlockPriceColumn'
    | 'boqBlockItemPriceColumn'
}

export const updateTableHeaderCellAtBoqBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: props.editorName,
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
