import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { updateColumnCellAtStore } from '@entity/quotation/redux/updater/updateColumnCellAtStore'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const handleChangeOfColumnCell = (props: Props): void => {
  updateColumnCellAtStore({
    editorRef: props.editorRef,
    blockIndex: props.blockIndex,
    boqColumnKey: props.boqColumnKey,
  })
}
