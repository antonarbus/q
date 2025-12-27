import { updateBoqHeaderAtStore } from '@entities/quotation/redux/updater/updateBoqHeaderAtStore'
import type { HeaderKey } from '@root/shared/types/BlockItem'
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
  updateBoqHeaderAtStore({
    editorRef,
    blockIndex,
    boqHeaderKey,
  })
}
