import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = Record<string, never>

export const onFocusOutFromItemPriceCell = (_props: Props): void => {
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
