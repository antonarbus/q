import { boqColumnKey } from '@entities/quotation'
import { updateRowBlockCellAtStore } from '@entities/quotation/redux/updaters/updateRowBlockCellAtStore'
import type { FroalaEditorRef } from '@shared/type/froala'

type Props = {
  editorRef: FroalaEditorRef
}

export const updateDescriptionCell = ({ editorRef }: Props): void => {
  if (editorRef.current === null) {
    return
  }

  updateRowBlockCellAtStore({
    boqRowCellKey: boqColumnKey.description,
    html: editorRef.current.html.get(),
  })
}
