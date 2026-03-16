import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entity/quotation/util/updateBookmarkedRowCellWithValue'
import { getState } from '@shared/lib/redux'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { roundTo } from 'round-to'

type Props = Record<string, never>

export const handleChangeOfPriceCell = (_props: Props): void => {
  const priceCellEditor =
    editorRegistry.get({
      blockIndex: BOOKMARK_POS_AT_BLOCKS,
      rowIndex: 0,
      cellKey: 'price',
    }) ?? null

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
      editorRegistry.get({
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
        cellKey: 'itemPrice',
      }) ?? null,
    cellKey: 'itemPrice',
    value: newItemPriceValueRounded,
  })
}
