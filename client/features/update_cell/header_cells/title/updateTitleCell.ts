import { saveItemsLocally, updateBoqHeaderCellAtStore } from '@entities/items'
import { type BoqHeaderKey } from '@entities/items'
import { markAsNotSaved } from '@shared/isSaved'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateTitleCell = ({ editorRef, itemIndex, boqHeaderKey }: Props): void => {
  const { didUpdate } = updateBoqHeaderCellAtStore({ editorRef, itemIndex, boqHeaderKey })

  if (didUpdate) {
    saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
    markAsNotSaved()
  }
}
