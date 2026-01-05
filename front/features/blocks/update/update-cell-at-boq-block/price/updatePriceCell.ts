import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import { updateCellAtStore } from '@entities/quotation/redux/updater/updateCellAtStore'
import type { RowBlock } from '@back/entities/quotation/quotationSchema'
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

export const updatePriceCell = (props: Props): void => {
  if (props.priceCellEditorRef.current === null) {
    return
  }

  const updateCellRes = updateCellAtStore({
    html: props.priceCellEditorRef.current.html.get(),
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'price',
  })

  if (updateCellRes.didUpdate === false) {
    return
  }

  const row = getRowFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  const isItemPricePinned = row?.itemPrice.pin.isPinned

  if (isItemPricePinned === true) {
    if (row.itemPrice.value === 0) {
      return
    }

    const newQtyValue = row.price.value / row.itemPrice.value
    const newQtyValueRounded = roundTo(newQtyValue, 5)

    updateCellWithValue({
      editor: props.qtyCellEditorRef.current,
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      cellKey: 'qty',
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
      editor: props.itemPriceCellEditorRef.current,
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      cellKey: 'itemPrice',
      value: newItemPriceValueRounded,
    })
  }

  // update subTotalPrice
  const rows = getRowsFromStore({ blockIndex: props.blockIndex })

  if (rows === undefined) {
    return
  }

  const subTotalPriceValueNew: number = rows.reduce(
    (accumulator: number, boqRow: RowBlock) => {
      const price = boqRow.price.value

      return accumulator + price
    },
    0,
  )

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    blockIndex: props.blockIndex,
    subTotalPriceEditor: props.subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
