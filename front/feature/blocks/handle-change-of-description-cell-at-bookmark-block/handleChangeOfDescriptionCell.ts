import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { rowEditorKey } from '@shared/lib/tiptap/editorKey'

type Props = Record<string, never>

export const handleChangeOfDescriptionCell = (_props: Props): void => {
  const editor =
    editorRegistry.get(
      rowEditorKey({
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
        cellKey: 'description',
      }),
    ) ?? null

  if (editor === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'description',
    html: editor.getHTML(),
  })
}
