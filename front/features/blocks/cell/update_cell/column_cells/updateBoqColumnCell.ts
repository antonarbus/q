import { updateBoqColumnCellAtStore } from '@entities/quotation'
import type { BoqColumnKey } from '@entities/quotation/consts/boqColumnKey'
import type { FroalaEditorRef } from '@shared/types/froala'

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
