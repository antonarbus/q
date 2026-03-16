import type { CellKey } from '@back/entity/quotation/schema'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { rowEditorKey } from '@shared/lib/tiptap/editorKey'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const handleChangeOfDescriptionCell = (props: Props): void => {
  const editor =
    editorRegistry.get(
      rowEditorKey({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'description',
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
