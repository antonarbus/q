import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/const/bookmarkPosAtBlocks'
import { formatBookmarkedRowCellNumber } from '@front/entities/quotation/util/formatBookmarkedRowCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

export const formatPriceCellAtBookmarkBlock = (): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'price',
    editor:
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockPriceCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        }),
      ) ?? null,
    roundToTwoDecimals: true,
  })
}
