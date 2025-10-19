import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
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

export const updatePriceCell = ({
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

  const row = getRowFromStore({ blockIndex, rowIndex })

  const isItemPricePinned = row?.itemPrice.pin.isPinned

  if (isItemPricePinned === true) {
    if (row.itemPrice.value === 0) {
      return
    }

    const newQtyValue = row.price.value / row.itemPrice.value
    const newQtyValueRounded = roundTo(newQtyValue, 5)

    updateCellWithValue({
      editor: qtyCellEditorRef.current,
      blockIndex,
      rowIndex,
      cellKey: cellKey.qty,
      value: newQtyValueRounded,
    })
  }

  const isQtyPinned = row?.qty.pin.isPinned

  if (isQtyPinned === true) {
    if (row.qty.value === 0) {
      return
    }

    const newItemPriceValue = row.price.value / row.qty.value
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
  const rows = getRowsFromStore({ blockIndex })

  if (rows === undefined) {
    return
  }

  const subTotalPriceValueNew: number = rows.reduce(
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
