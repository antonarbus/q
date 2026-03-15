import type { CellKey } from '@back/entity/quotation/schema'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const handleChangeOfDescriptionCell = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: props.cellKey,
    html: props.editorRef.current.getHTML(),
  })
}
