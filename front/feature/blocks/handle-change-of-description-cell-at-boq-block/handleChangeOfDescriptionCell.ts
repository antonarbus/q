import type { CellKey } from '@back/entity/quotation/schema'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const handleChangeOfDescriptionCell = (props: Props): void => {
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
