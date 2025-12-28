import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { cellKey } from '@entities/quotation/const/cellKey'
import { itemType } from '@entities/quotation/const/itemType'
import { updateBookmarkedRowCellAtStore } from '@entities/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entities/quotation/util/updateBookmarkedRowCellWithValue'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import { roundTo } from 'round-to'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

export const updatePriceCell = (props: Props): void => {
  if (props.priceCellEditorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: cellKey.price,
    html: props.priceCellEditorRef.current.html.get(),
  })

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return
  }

  const row = block

  if (row.qty.value === 0) {
    return
  }

  const newItemPriceValue = row.price.value / row.qty.value
  const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

  updateBookmarkedRowCellWithValue({
    editor: props.itemPriceCellEditorRef.current,
    cellKey: cellKey.itemPrice,
    value: newItemPriceValueRounded,
  })
}
