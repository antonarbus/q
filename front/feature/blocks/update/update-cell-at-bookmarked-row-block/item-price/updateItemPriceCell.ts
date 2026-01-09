import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { updateBookmarkedRowCellAtStore } from '@entity/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entity/quotation/util/updateBookmarkedRowCellWithValue'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import type { RefObject } from 'react'
import { roundTo } from 'round-to'

type Props = {
  itemPriceCellEditorRef: RefObject<FroalaEditor | null>
  priceCellEditorRef: RefObject<FroalaEditor | null>
}

export const updateItemPriceCell = (props: Props): void => {
  if (props.itemPriceCellEditorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: 'itemPrice',
    html: props.itemPriceCellEditorRef.current.html.get(),
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
