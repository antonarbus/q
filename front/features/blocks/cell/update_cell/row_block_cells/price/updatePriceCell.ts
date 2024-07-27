import { roundTo } from 'round-to'
import { boqRowCellKey, itemType } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'
import { updateRowBlockCellAtStore } from '@entities/quotation/redux/updaters/updateRowBlockCellAtStore'
import { getState } from '@lib_instances/store'
import { updateRowBlockCellWithValue } from '@entities/quotation/utils/updateRowBlockCellWithValue'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  itemPriceCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

export const updatePriceCell = ({
  qtyCellEditorRef,
  itemPriceCellEditorRef,
  priceCellEditorRef,
}: Props): void => {
  if (priceCellEditorRef.current === null) return

  updateRowBlockCellAtStore({
    boqRowCellKey: boqRowCellKey.price,
    html: priceCellEditorRef.current.html.get(),
  })

  const block = getState().quotation.blocks[0]
  if (block?.type !== itemType.row) return

  const row = block

  const isItemPricePinned = row.itemPrice.pin.isPinned

  if (isItemPricePinned) {
    if (row.itemPrice.value === 0) return
    const newQtyValue = row.price.value / row.itemPrice.value
    const newQtyValueRounded = roundTo(newQtyValue, 5)

    updateRowBlockCellWithValue({
      editor: qtyCellEditorRef.current,
      boqRowCellKey: boqRowCellKey.qty,
      value: newQtyValueRounded,
    })
  }

  const isQtyPinned = row.qty.pin.isPinned

  if (isQtyPinned) {
    if (row.qty.value === 0) return
    const newItemPriceValue = row.price.value / row.qty.value
    const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

    updateRowBlockCellWithValue({
      editor: itemPriceCellEditorRef.current,
      boqRowCellKey: boqRowCellKey.itemPrice,
      value: newItemPriceValueRounded,
    })
  }
}
