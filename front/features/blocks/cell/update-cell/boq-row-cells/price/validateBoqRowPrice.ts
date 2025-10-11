import {
  boqRowCellKey,
  getBoqRowFromStore,
  getBoqRowsFromStore,
  isBoqRowPriceValid,
  type Row,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
} from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'

type Props = {
  priceCellEditorRef: FroalaEditorRef
  subTotalPriceEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const validateBoqRowPrice = ({
  blockIndex,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  rowIndex,
}: Props): void => {
  if (priceCellEditorRef.current === null) {
    return
  }

  if (subTotalPriceEditorRef.current === null) {
    return
  }

  const isPriceValid = isBoqRowPriceValid({
    html: priceCellEditorRef.current.html.get(),
    blockIndex,
    rowIndex,
  })

  if (isPriceValid === false) {
    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

    if (boqRow === undefined) {
      return
    }

    const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
    const newPriceValueRounded = roundTo(newPriceValue, 2)

    updateBoqRowCellWithValue({
      boqRowCellKey: boqRowCellKey.price,
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
}
