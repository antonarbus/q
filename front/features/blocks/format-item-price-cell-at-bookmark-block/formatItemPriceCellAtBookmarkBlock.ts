import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { formatBookmarkedRowCellNumber } from '@front/entities/quotation/util/formatBookmarkedRowCellNumber'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const formatItemPriceCellAtBookmarkBlock = (): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'itemPrice',
    editor:
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockItemPriceCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        }),
      ) ?? null,
    roundToTwoDecimals: true,
  })
}
