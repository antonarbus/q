import {
  didBoqCellContentChange,
  updateBoqRowCellAtStore,
} from '@entities/quotation'
import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import type { FroalaEditorRef } from '@shared/type/froala'

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
