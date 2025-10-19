import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { updateBookmarkedRowCellAtStore } from '@entities/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
}

export const updateDescriptionCell = ({ editorRef }: Props): void => {
  if (editorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: boqColumnKey.description,
    html: editorRef.current.html.get(),
  })
}
