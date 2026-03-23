import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { formatBookmarkedRowCellNumber } from '@front/entities/quotation/util/formatBookmarkedRowCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

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
