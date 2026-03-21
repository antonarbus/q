import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

export const formatQtyCellAtBookmarkBlock = (): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'qty',
    editor:
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockQtyCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        }),
      ) ?? null,
    roundToTwoDecimals: false,
  })
}
