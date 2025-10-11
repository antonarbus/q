import {
  boqRowCellKey,
  getBoqRowFromStore,
  getBoqRowsFromStore,
  type Row,
  updateBoqRowCellAtStore,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
} from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  itemPriceCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
  subTotalPriceEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const updateBoqRowPriceCell = ({
  qtyCellEditorRef,
  itemPriceCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  if (priceCellEditorRef.current === null) {
    return
  }

  const { didUpdate } = updateBoqRowCellAtStore({
    html: priceCellEditorRef.current.html.get(),
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
  })

  if (didUpdate === false) {
    return
  }

  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  const isItemPricePinned = boqRow?.itemPrice.pin.isPinned

  if (isItemPricePinned === true) {
    if (boqRow.itemPrice.value === 0) {
      return
    }

    const newQtyValue = boqRow.price.value / boqRow.itemPrice.value
    const newQtyValueRounded = roundTo(newQtyValue, 5)

    updateBoqRowCellWithValue({
      editor: qtyCellEditorRef.current,
      blockIndex,
      rowIndex,
      boqRowCellKey: boqRowCellKey.qty,
      value: newQtyValueRounded,
    })
  }

  const isQtyPinned = boqRow?.qty.pin.isPinned

  if (isQtyPinned === true) {
    if (boqRow.qty.value === 0) {
      return
    }

    const newItemPriceValue = boqRow.price.value / boqRow.qty.value
    const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

    updateBoqRowCellWithValue({
      editor: itemPriceCellEditorRef.current,
      blockIndex,
      rowIndex,
      boqRowCellKey: boqRowCellKey.itemPrice,
      value: newItemPriceValueRounded,
    })
  }

  // update subTotalPrice
  const boqRows = getBoqRowsFromStore({ blockIndex })

  if (boqRows === undefined) {
    return
  }

  const subTotalPriceValueNew: number = boqRows.reduce(
    (accumulator: number, row: Row) => {
      const price = row.price.value

      return accumulator + price
    },
    0,
  )

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    blockIndex,
    subTotalPriceEditor: subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
