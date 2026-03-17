import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { isRowPriceValid } from '@entity/quotation/util/isRowPriceValid'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { roundTo } from 'round-to'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const validatePrice = (props: Props): void => {
  const priceCellEditor =
    editorRegistry.get({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      cellKey: 'priceCell',
    }) ?? null

  const subTotalPriceEditor =
    editorRegistry.get({
      blockIndex: props.blockIndex,
      editorName: 'subTotalPrice',
    }) ?? null

  if (priceCellEditor === null) {
    return
  }

  if (subTotalPriceEditor === null) {
    return
  }

  const isPriceValid = isRowPriceValid({
    html: priceCellEditor.getHTML(),
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
      cellKey: 'price',
      editor: priceCellEditor,
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
      subTotalPriceEditor,
      value: subTotalPriceValueNewRounded,
      incrementally: true,
    })
  }
}
