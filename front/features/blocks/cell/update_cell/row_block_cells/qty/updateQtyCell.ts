import { roundTo } from 'round-to'
import { boqRowCellKey, itemType } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'
import { updateRowBlockCellAtStore } from '@entities/quotation/redux/updaters/updateRowBlockCellAtStore'
import { getState } from '@lib_instances/store'
import { updateRowBlockCellWithValue } from '@entities/quotation/utils/updateRowBlockCellWithValue'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

export const updateQtyCell = ({
  qtyCellEditorRef,
  priceCellEditorRef,
}: Props): void => {
  if (qtyCellEditorRef.current === null) return

  updateRowBlockCellAtStore({
    boqRowCellKey: boqRowCellKey.qty,
    html: qtyCellEditorRef.current.html.get(),
  })

  const block = getState().quotation.blocks[1000]
  if (block?.type !== itemType.row) return

  const row = block

  const newPriceValue = row.qty.value * row.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateRowBlockCellWithValue({
    boqRowCellKey: boqRowCellKey.price,
    editor: priceCellEditorRef.current,
    value: newPriceValueRounded,
  })
}
