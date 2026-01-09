import { updateBoqHeaderAtStore } from '@entity/quotation/redux/updater/updateBoqHeaderAtStore'
import type { HeaderKey } from '@back/entity/quotation/schema'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const updateSubtotalText = (props: Props): void => {
  updateBoqHeaderAtStore({
    editorRef: props.editorRef,
    blockIndex: props.blockIndex,
    boqHeaderKey: props.boqHeaderKey,
  })
}
