import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import type { RowBlock } from '@root/shared/types/BlockItem'
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

export const validatePrice = (props: Props): void => {
  if (props.priceCellEditorRef.current === null) {
    return
  }

  if (props.subTotalPriceEditorRef.current === null) {
    return
  }

  const isPriceValid = isRowPriceValid({
    html: props.priceCellEditorRef.current.html.get(),
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (isPriceValid === false) {
    const row = getRowFromStore({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
    })

    if (row === undefined) {
      return
    }

    const newPriceValue = row.qty.value * row.itemPrice.value
    const newPriceValueRounded = roundTo(newPriceValue, 2)

    updateCellWithValue({
      cellKey: cellKey.price,
      editor: props.priceCellEditorRef.current,
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      value: newPriceValueRounded,
    })

    const rows = getRowsFromStore({ blockIndex: props.blockIndex })

    if (rows === undefined) {
      return
    }

    const subTotalPriceValueNew: number = rows.reduce(
      (accumulator: number, _row: RowBlock) => {
        const price = _row.price.value

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
}
