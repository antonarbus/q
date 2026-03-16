import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { rowEditorKey } from '@shared/lib/tiptap/editorKey'

type Props = Record<string, never>

export const handleFocusOutFromQtyCell = (_props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'qty',
    editor:
      editorRegistry.get(
        rowEditorKey({
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
          cellKey: 'qty',
        }),
      ) ?? null,
    roundToTwoDecimals: false,
  })
}
