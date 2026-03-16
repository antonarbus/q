import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { roundTo } from 'round-to'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const handleChangeOfItemPriceCell = (props: Props): void => {
  const itemPriceCellEditor =
    editorRegistry.get({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      cellKey: 'itemPrice',
    }) ?? null

  if (itemPriceCellEditor === null) {
    return
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
    html: itemPriceCellEditor.getHTML(),
  })

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
    editor:
      editorRegistry.get({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'price',
      }) ?? null,
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    value: newPriceValueRounded,
  })

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
    subTotalPriceEditor:
      editorRegistry.get({
        blockIndex: props.blockIndex,
        editorName: 'subTotalPrice',
      }) ?? null,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
