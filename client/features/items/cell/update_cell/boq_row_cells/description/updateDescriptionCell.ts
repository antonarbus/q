import {
  type BoqRowCellKey,
  didBoqCellContentChange,
  updateBoqRowCellAtStore,
} from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const updateDescriptionCell = ({
  editorRef,
  itemIndex,
  rowIndex,
  boqRowCellKey,
}: Props): void => {
  if (editorRef.current === null) return

  const didContentChange = didBoqCellContentChange({
    editor: editorRef.current,
    itemIndex,
    rowIndex,
    boqRowCellKey,
  })

  if (!didContentChange) return

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqRowCellKey,
    html: editorRef.current.html.get(),
  })
}
