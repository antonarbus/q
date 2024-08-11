import { roundTo } from 'round-to'
import { boqRowCellKey, itemType } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'
import { updateRowBlockCellAtStore } from '@entities/quotation/redux/updaters/updateRowBlockCellAtStore'
import { getState } from '@lib_instances/store'
import { updateRowBlockCellWithValue } from '@entities/quotation/utils/updateRowBlockCellWithValue'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

export const updatePriceCell = ({
  itemPriceCellEditorRef,
  priceCellEditorRef,
}: Props): void => {
  if (priceCellEditorRef.current === null) return

  updateRowBlockCellAtStore({
    boqRowCellKey: boqRowCellKey.price,
    html: priceCellEditorRef.current.html.get(),
  })

  const block = getState().quotation.blocks[1000]
  if (block?.type !== itemType.row) return

  const row = block

  if (row.qty.value === 0) return

  const newItemPriceValue = row.price.value / row.qty.value
  const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

  updateRowBlockCellWithValue({
    editor: itemPriceCellEditorRef.current,
    boqRowCellKey: boqRowCellKey.itemPrice,
    value: newItemPriceValueRounded,
  })
}
