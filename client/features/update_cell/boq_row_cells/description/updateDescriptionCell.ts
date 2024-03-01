import { type BoqRowCellKey, didBoqCellContentChange, saveItemsLocally, updateBoqRowCellAtStore } from '@entities/items'
import { markAsNotSaved } from '@shared/isSaved'
import { type FroalaEditorRef } from '@shared/types'

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

  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  markAsNotSaved()
}
