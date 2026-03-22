import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@front/entities/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@front/entities/quotation/util/updateBookmarkedRowCellWithValue'
import { getState } from '@front/shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'
import { roundTo } from 'round-to'

export const updatePriceCellAtBookmarkBlock = (): void => {
  const priceCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockPriceCell',
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
      }),
    ) ?? null

  if (priceCellEditor === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'price',
    html: priceCellEditor.getHTML(),
  })

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return
  }

  const row = block

  if (row.qty.value === 0) {
    return
  }

  const newItemPriceValue = row.price.value / row.qty.value
  const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

  updateBookmarkedRowCellWithValue({
    editor:
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockItemPriceCell',
          blockIndex: BOOKMARK_POS_AT_BLOCKS,
          rowIndex: 0,
        }),
      ) ?? null,
    cellKey: 'itemPrice',
    value: newItemPriceValueRounded,
  })
}
