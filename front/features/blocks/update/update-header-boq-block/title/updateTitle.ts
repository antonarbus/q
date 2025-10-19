import { updateBoqHeaderAtStore } from '@entities/quotation/redux/updater/updateBoqHeaderAtStore'
import type { HeaderKey } from '@entities/quotation/type'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const updateTitle = ({
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
