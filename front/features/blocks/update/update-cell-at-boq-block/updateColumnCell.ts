import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { updateColumnCellAtStore } from '@entities/quotation/redux/updater/updateColumnCellAtStore'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateColumnCell = ({
  editorRef,
  blockIndex,
  boqColumnKey,
}: Props): void => {
  updateColumnCellAtStore({ editorRef, blockIndex, boqColumnKey })
}
