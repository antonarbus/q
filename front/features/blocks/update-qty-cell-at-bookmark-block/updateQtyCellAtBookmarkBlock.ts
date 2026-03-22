import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@front/entities/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@front/entities/quotation/util/updateBookmarkedRowCellWithValue'
import { getState } from '@front/shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'
import { roundTo } from 'round-to'

export const updateQtyCellAtBookmarkBlock = (): void => {
  const qtyCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockQtyCell',
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
      }),
    ) ?? null

  if (qtyCellEditor === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'qty',
    html: qtyCellEditor.getHTML(),
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
