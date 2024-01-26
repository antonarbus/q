import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { didBoqCellContentChange, saveItemsLocally, updateBoqRowCellAtStore } from '@entities/items'
import { type BoqColumnKey } from '@entities/items'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateDescriptionCell = ({
  editorRef,
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): void => {
  if (editorRef.current === null) return

  const didContentChange = didBoqCellContentChange({
    editor: editorRef.current,
    itemIndex,
    rowIndex,
    boqColumnKey,
  })

  if (!didContentChange) return

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqColumnKey,
    html: editorRef.current.html.get(),
  })

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
