import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import type { Row } from '@entities/quotation/type'
import { isRowPriceValid } from '@entities/quotation/util/isRowPriceValid'
import { updateCellWithValue } from '@entities/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entities/quotation/util/updateSubTotalPriceWithValue'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'

type Props = {
  priceCellEditorRef: FroalaEditorRef
  subTotalPriceEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const validatePrice = ({
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

  const isPriceValid = isRowPriceValid({
    html: priceCellEditorRef.current.html.get(),
    blockIndex,
    rowIndex,
  })

  if (isPriceValid === false) {
    const row = getRowFromStore({ blockIndex, rowIndex })

    if (row === undefined) {
      return
    }

    const newPriceValue = row.qty.value * row.itemPrice.value
    const newPriceValueRounded = roundTo(newPriceValue, 2)

    updateCellWithValue({
      cellKey: cellKey.price,
      editor: priceCellEditorRef.current,
      blockIndex,
      rowIndex,
      value: newPriceValueRounded,
    })

    const rows = getRowsFromStore({ blockIndex })

    if (rows === undefined) {
      return
    }

    const subTotalPriceValueNew: number = rows.reduce(
      (accumulator: number, _row: Row) => {
        const price = _row.price.value

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
