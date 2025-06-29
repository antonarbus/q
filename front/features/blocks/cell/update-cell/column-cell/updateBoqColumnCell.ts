import { updateBoqColumnCellAtStore } from '@entities/quotation'
import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import type { FroalaEditorRef } from '@shared/type/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqColumnCell = ({
  editorRef,
  blockIndex,
  boqColumnKey,
}: Props): void => {
  updateBoqColumnCellAtStore({ editorRef, blockIndex, boqColumnKey })
}
