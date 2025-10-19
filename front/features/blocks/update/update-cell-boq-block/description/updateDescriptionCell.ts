import type { CellKey } from '@entities/quotation/const/cellKey'
import { updateCellAtStore } from '@entities/quotation/redux/updater/updateCellAtStore'
import { didCellContentChange } from '@entities/quotation/util/didCellContentChange'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const updateDescriptionCell = ({
  editorRef,
  blockIndex,
  rowIndex,
  cellKey,
}: Props): void => {
  if (editorRef.current === null) {
    return
  }

  const didContentChange = didCellContentChange({
    editor: editorRef.current,
    blockIndex,
    rowIndex,
    cellKey,
  })

  if (didContentChange === false) {
    return
  }

  updateCellAtStore({
    blockIndex,
    rowIndex,
    cellKey,
    html: editorRef.current.html.get(),
  })
}
