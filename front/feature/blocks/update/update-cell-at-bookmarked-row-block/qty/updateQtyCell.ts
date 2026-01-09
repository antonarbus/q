import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entity/quotation/util/updateBookmarkedRowCellWithValue'
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
    cellKey: 'qty',
    html: props.qtyCellEditorRef.current.html.get(),
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
    editor: props.priceCellEditorRef.current,
    value: newPriceValueRounded,
  })
}
