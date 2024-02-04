import { updateBoqColumnCellAtStore } from '@entities/items'
import type { BoqColumnKey } from '@entities/items'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqColumnCell = ({
  editorRef,
  itemIndex,
  boqColumnKey,
}: Props): void => {
  updateBoqColumnCellAtStore({ editorRef, itemIndex, boqColumnKey })
}
