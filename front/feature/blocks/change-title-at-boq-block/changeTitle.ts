import { updateBoqHeaderAtStore } from '@entity/quotation/redux/updater/updateBoqHeaderAtStore'
import type { HeaderKey } from '@back/entity/quotation/schema'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const changeTitle = (props: Props): void => {
  updateBoqHeaderAtStore({
    editorRef: props.editorRef,
    blockIndex: props.blockIndex,
    boqHeaderKey: props.boqHeaderKey,
  })
}
