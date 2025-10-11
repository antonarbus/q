import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { updateBoqRowCellAtStore } from '@entities/quotation/redux/updater/updateBoqRowCellAtStore'
import { didBoqCellContentChange } from '@entities/quotation/util/didBoqCellContentChange'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const updateDescriptionCell = ({
  editorRef,
  blockIndex,
  rowIndex,
  boqRowCellKey,
}: Props): void => {
  if (editorRef.current === null) {
    return
  }

  const didContentChange = didBoqCellContentChange({
    editor: editorRef.current,
    blockIndex,
    rowIndex,
    boqRowCellKey,
  })

  if (didContentChange === false) {
    return
  }

  updateBoqRowCellAtStore({
    blockIndex,
    rowIndex,
    boqRowCellKey,
    html: editorRef.current.html.get(),
  })
}
