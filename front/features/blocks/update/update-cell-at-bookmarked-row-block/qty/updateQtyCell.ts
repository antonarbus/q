import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { cellKey } from '@entities/quotation/const/cellKey'
import { itemType } from '@entities/quotation/const/itemType'
import { updateBookmarkedRowCellAtStore } from '@entities/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entities/quotation/util/updateBookmarkedRowCellWithValue'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import { roundTo } from 'round-to'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

export const updateQtyCell = (props: Props): void => {
  if (props.qtyCellEditorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: cellKey.qty,
    html: props.qtyCellEditorRef.current.html.get(),
  })

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return
  }

  const row = block

  const newPriceValue = row.qty.value * row.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateBookmarkedRowCellWithValue({
    cellKey: cellKey.price,
    editor: props.priceCellEditorRef.current,
    value: newPriceValueRounded,
  })
}
