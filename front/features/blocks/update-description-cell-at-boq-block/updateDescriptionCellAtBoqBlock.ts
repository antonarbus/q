import type { CellKey } from '@back/entity/quotation/schema'
import { updateCellAtStore } from '@front/entities/quotation/redux/updater/updateCellAtStore'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const updateDescriptionCellAtBoqBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockDescriptionCell',
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
      }),
    ) ?? null

  if (editor === null) {
    return
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: props.cellKey,
    html: editor.getHTML(),
  })
}
