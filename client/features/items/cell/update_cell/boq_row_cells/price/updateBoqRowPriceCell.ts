import { dispatch } from '@lib_instances/store'
import { roundTo } from 'round-to'
import {
  getBoqRowFromStore,
  getBoqRowsFromStore,
  updateBoqRowCellAtStore,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
  type BoqRow,
  boqRowCellKey,
} from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  itemPriceCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
  subTotalPriceEditorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
}

export const updateBoqRowPriceCell = ({
  qtyCellEditorRef,
  itemPriceCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  if (priceCellEditorRef.current === null) return

  const { didUpdate } = updateBoqRowCellAtStore({
    html: priceCellEditorRef.current.html.get(),
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
  })

  if (!didUpdate) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })

  const isItemPricePinned = boqRow?.itemPrice.pin.isPinned

  if (isItemPricePinned) {
    if (boqRow.itemPrice.value === 0) return
    const newQtyValue = boqRow.price.value / boqRow.itemPrice.value
    const newQtyValueRounded = roundTo(newQtyValue, 5)

    updateBoqRowCellWithValue({
      editor: qtyCellEditorRef.current,
      itemIndex,
      rowIndex,
      boqRowCellKey: boqRowCellKey.qty,
      value: newQtyValueRounded,
    })
  }

  const isQtyPinned = boqRow?.qty.pin.isPinned

  if (isQtyPinned) {
    if (boqRow.qty.value === 0) return
    const newItemPriceValue = boqRow.price.value / boqRow.qty.value
    const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

    updateBoqRowCellWithValue({
      editor: itemPriceCellEditorRef.current,
      itemIndex,
      rowIndex,
      boqRowCellKey: boqRowCellKey.itemPrice,
      value: newItemPriceValueRounded,
    })
  }

  // update subTotalPrice
  const boqRows = getBoqRowsFromStore({ itemIndex })

  if (boqRows === undefined) return

  const subTotalPriceValueNew: number = boqRows.reduce(
    (accumulator: number, boqRow: BoqRow) => {
      const price = boqRow.price.value
      return accumulator + price
    },
    0,
  )

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    itemIndex,
    subTotalPriceEditor: subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
