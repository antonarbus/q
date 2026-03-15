import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
}

export const updateDescriptionCell = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'description',
    html: props.editorRef.current.getHTML(),
  })
}
