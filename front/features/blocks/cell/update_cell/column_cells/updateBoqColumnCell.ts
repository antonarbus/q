import { updateBoqColumnCellAtStore, type ColumnKey } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqColumnKey: ColumnKey
}

export const updateBoqColumnCell = ({
  editorRef,
  blockIndex,
  boqColumnKey,
}: Props): void => {
  updateBoqColumnCellAtStore({ editorRef, blockIndex, boqColumnKey })
}
