import type { FroalaEditor } from '@shared/type/froala'
import { roundTo } from 'round-to'
import {
  BOOKMARK_POS_AT_BLOCKS,
  boqRowCellKey,
  itemType,
} from '@entities/quotation'
import { updateRowBlockCellAtStore } from '@entities/quotation/redux/updaters/updateRowBlockCellAtStore'
import { getState } from '@shared/lib/redux'
import { updateRowBlockCellWithValue } from '@entities/quotation/utils/updateRowBlockCellWithValue'

type Props = {
  itemPriceCellEditorRef: React.RefObject<FroalaEditor | null>
  priceCellEditorRef: React.RefObject<FroalaEditor | null>
}

export const updateItemPriceCell = ({
  itemPriceCellEditorRef,
  priceCellEditorRef,
}: Props): void => {
  if (itemPriceCellEditorRef.current === null) {
    return
  }

  updateRowBlockCellAtStore({
    boqRowCellKey: boqRowCellKey.itemPrice,
    html: itemPriceCellEditorRef.current.html.get(),
  })

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return
  }

  const row = block

  const newPriceValue = row.qty.value * row.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateRowBlockCellWithValue({
    boqRowCellKey: boqRowCellKey.price,
    editor: priceCellEditorRef.current,
    value: newPriceValueRounded,
  })
}
