import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  editorRef: FroalaEditorRef
}

export const updateDescriptionCell = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'description',
    html: props.editorRef.current.html.get(),
  })
}
