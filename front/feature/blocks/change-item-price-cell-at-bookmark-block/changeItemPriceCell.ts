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

export const changeItemPriceCell = (props: Props): void => {
  if (props.itemPriceCellEditorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'itemPrice',
    html: props.itemPriceCellEditorRef.current.getHTML(),
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
