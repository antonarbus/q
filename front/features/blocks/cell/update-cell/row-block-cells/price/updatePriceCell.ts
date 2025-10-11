import {
  BOOKMARK_POS_AT_BLOCKS,
  boqRowCellKey,
  itemType,
} from '@entities/quotation'
import { updateRowBlockCellAtStore } from '@entities/quotation/redux/updater/updateRowBlockCellAtStore'
import { updateRowBlockCellWithValue } from '@entities/quotation/util/updateRowBlockCellWithValue'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { getState } from '@shared/lib/redux'
import { roundTo } from 'round-to'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

export const updatePriceCell = ({
  itemPriceCellEditorRef,
  priceCellEditorRef,
}: Props): void => {
  if (priceCellEditorRef.current === null) {
    return
  }

  updateRowBlockCellAtStore({
    boqRowCellKey: boqRowCellKey.price,
    html: priceCellEditorRef.current.html.get(),
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

  updateRowBlockCellWithValue({
    editor: itemPriceCellEditorRef.current,
    boqRowCellKey: boqRowCellKey.itemPrice,
    value: newItemPriceValueRounded,
  })
}
