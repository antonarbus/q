import { updateBoqHeaderAtStore } from '@entity/quotation/redux/updater/updateBoqHeaderAtStore'
import type { HeaderKey } from '@back/entity/quotation/schema'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const handleChangeOfTitle = (props: Props): void => {
  updateBoqHeaderAtStore({
    editor: props.editorRef.current,
    blockIndex: props.blockIndex,
    boqHeaderKey: props.boqHeaderKey,
  })
}
