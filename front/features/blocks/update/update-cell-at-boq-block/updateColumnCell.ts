import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { updateColumnCellAtStore } from '@entities/quotation/redux/updater/updateColumnCellAtStore'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateColumnCell = (props: Props): void => {
  updateColumnCellAtStore({
    editorRef: props.editorRef,
    blockIndex: props.blockIndex,
    boqColumnKey: props.boqColumnKey,
  })
}
