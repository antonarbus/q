import { updateBoqHeaderCellAtStore } from '@entities/quotation'
import { type BoqHeaderKey } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateTitleCell = ({
  editorRef,
  itemIndex,
  boqHeaderKey,
}: Props): void => {
  updateBoqHeaderCellAtStore({
    editorRef,
    itemIndex,
    boqHeaderKey,
  })
}
