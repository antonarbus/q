import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entity/quotation/util/updateBookmarkedRowCellWithValue'
import { getState } from '@shared/lib/redux'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { roundTo } from 'round-to'

type Props = {
  itemPriceCellEditorRef: EditorRef
  priceCellEditorRef: EditorRef
}

export const changePriceCell = (props: Props): void => {
  if (props.priceCellEditorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'price',
    html: props.priceCellEditorRef.current.getHTML(),
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
    editor: props.itemPriceCellEditorRef.current,
    cellKey: 'itemPrice',
    value: newItemPriceValueRounded,
  })
}
