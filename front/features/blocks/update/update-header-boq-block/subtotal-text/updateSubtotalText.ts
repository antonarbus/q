import { updateBoqHeaderCellAtStore } from '@entities/quotation/redux/updater/updateBoqHeaderCellAtStore'
import type { HeaderKey } from '@entities/quotation/type'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const updateSubtotalText = ({
  editorRef,
  blockIndex,
  boqHeaderKey,
}: Props): void => {
  updateBoqHeaderCellAtStore({
    editorRef,
    blockIndex,
    boqHeaderKey,
  })
}
