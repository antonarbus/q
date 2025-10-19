import { cellKey } from '@entities/quotation/const/cellKey'
import { getBoqRowFromStore } from '@entities/quotation/redux/getter/getBoqRowFromStore'
import { getBoqRowsFromStore } from '@entities/quotation/redux/getter/getBoqRowsFromStore'
import { updateCellAtStore } from '@entities/quotation/redux/updater/updateCellAtStore'
import type { Row } from '@entities/quotation/type'
import { didBoqCellContentChange } from '@entities/quotation/util/didBoqCellContentChange'
import { updateCellWithValue } from '@entities/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entities/quotation/util/updateSubTotalPriceWithValue'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
  subTotalPriceEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const updateBoqRowQtyCell = ({
  qtyCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  if (qtyCellEditorRef.current === null) {
    return
  }

  const didContentChange = didBoqCellContentChange({
    editor: qtyCellEditorRef.current,
    blockIndex,
    rowIndex,
    cellKey: cellKey.qty,
  })

  if (didContentChange === false) {
    return
  }

  updateCellAtStore({
    blockIndex,
    rowIndex,
    cellKey: cellKey.qty,
    html: qtyCellEditorRef.current.html.get(),
  })

  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return
  }

  const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateCellWithValue({
    cellKey: cellKey.price,
    editor: priceCellEditorRef.current,
    blockIndex,
    rowIndex,
    value: newPriceValueRounded,
  })

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
