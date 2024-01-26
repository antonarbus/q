import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { saveItemsLocally, updateBoqHeaderCellAtStore } from '@entities/items'
import { type BoqHeaderKey } from '@entities/items'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateTitleCell = ({ editorRef, itemIndex, boqHeaderKey }: Props): void => {
  const { didUpdate } = updateBoqHeaderCellAtStore({ editorRef, itemIndex, boqHeaderKey })

  if (didUpdate) {
    saveItemsLocally({
      msgAboveItemWithIndex: itemIndex,
    })
  }
}
