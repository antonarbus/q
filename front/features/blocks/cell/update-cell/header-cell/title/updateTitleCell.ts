import { type HeaderKey, updateBoqHeaderCellAtStore } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/type/froala'

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
