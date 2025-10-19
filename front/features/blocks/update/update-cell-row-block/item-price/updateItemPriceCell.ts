import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { cellKey } from '@entities/quotation/const/cellKey'
import { itemType } from '@entities/quotation/const/itemType'
import { updateBookmarkedRowCellAtStore } from '@entities/quotation/redux/updater/updateBookmarkedRowCellAtStore'
import { updateBookmarkedRowCellWithValue } from '@entities/quotation/util/updateBookmarkedRowCellWithValue'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import type { RefObject } from 'react'
import { roundTo } from 'round-to'

type Props = {
  itemPriceCellEditorRef: RefObject<FroalaEditor | null>
  priceCellEditorRef: RefObject<FroalaEditor | null>
}

export const updateItemPriceCell = ({
  itemPriceCellEditorRef,
  priceCellEditorRef,
}: Props): void => {
  if (itemPriceCellEditorRef.current === null) {
    return
  }

  updateBookmarkedRowCellAtStore({
    cellKey: cellKey.itemPrice,
    html: itemPriceCellEditorRef.current.html.get(),
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
    editor: priceCellEditorRef.current,
    value: newPriceValueRounded,
  })
}
