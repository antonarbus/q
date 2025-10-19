import { cellKey } from '@entities/quotation/const/cellKey'
import { getBoqRowFromStore } from '@entities/quotation/redux/getter/getBoqRowFromStore'
import { getBoqRowsFromStore } from '@entities/quotation/redux/getter/getBoqRowsFromStore'
import { updateCellAtStore } from '@entities/quotation/redux/updater/updateCellAtStore'
import type { Row } from '@entities/quotation/type'
import { updateCellWithValue } from '@entities/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entities/quotation/util/updateSubTotalPriceWithValue'
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

  const { didUpdate } = updateCellAtStore({
    html: priceCellEditorRef.current.html.get(),
    blockIndex,
    rowIndex,
    cellKey: cellKey.price,
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

    updateCellWithValue({
      editor: qtyCellEditorRef.current,
      blockIndex,
      rowIndex,
      cellKey: cellKey.qty,
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

    updateCellWithValue({
      editor: itemPriceCellEditorRef.current,
      blockIndex,
      rowIndex,
      cellKey: cellKey.itemPrice,
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
