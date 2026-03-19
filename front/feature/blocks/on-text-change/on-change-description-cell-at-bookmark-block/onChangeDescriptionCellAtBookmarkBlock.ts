import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

export const onChangeDescriptionCellAtBookmarkBlock = (): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockDescriptionCell',
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
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
