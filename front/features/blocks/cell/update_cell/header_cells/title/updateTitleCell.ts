import { updateBoqHeaderCellAtStore, type HeaderKey } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const updateTitleCell = ({
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
