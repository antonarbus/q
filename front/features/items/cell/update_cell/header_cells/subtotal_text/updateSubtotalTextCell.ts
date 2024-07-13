import {
  updateBoqHeaderCellAtStore,
  type BoqHeaderKey,
} from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateSubtotalTextCell = ({
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
