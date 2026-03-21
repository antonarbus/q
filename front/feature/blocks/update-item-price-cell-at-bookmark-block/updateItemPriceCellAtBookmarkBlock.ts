import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entity/quotation/util/updateBookmarkedRowCellWithValue'
import { getState } from '@shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'
import { roundTo } from 'round-to'

export const updateItemPriceCellAtBookmarkBlock = (): void => {
  const itemPriceCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockItemPriceCell',
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
      }),
    ) ?? null

  if (itemPriceCellEditor === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'itemPrice',
    html: itemPriceCellEditor.getHTML(),
  })

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return
  }

  const row = block

  const newPriceValue = row.qty.value * row.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateBookmarkedRowCellWithValue({
    cellKey: 'price',
    editor:
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockPriceCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        }),
      ) ?? null,
    value: newPriceValueRounded,
  })
}
