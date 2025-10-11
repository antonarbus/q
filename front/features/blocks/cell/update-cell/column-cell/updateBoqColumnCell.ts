import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { updateBoqColumnCellAtStore } from '@entities/quotation/redux/updater/updateBoqColumnCellAtStore'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

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
