import type { CellKey } from '@back/entity/quotation/schema'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import { didCellContentChange } from '@entity/quotation/util/didCellContentChange'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const updateDescriptionCell = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  const didContentChange = didCellContentChange({
    editor: props.editorRef.current,
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: props.cellKey,
  })

  if (didContentChange === false) {
    return
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: props.cellKey,
    html: props.editorRef.current.html.get(),
  })
}
