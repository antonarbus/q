import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@front/entities/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const updateDescriptionCellAtBookmarkBlock = (): void => {
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
