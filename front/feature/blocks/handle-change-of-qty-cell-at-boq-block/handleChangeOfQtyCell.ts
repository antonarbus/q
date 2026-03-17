import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { recalculateTotalPrices } from '@entity/quotation/util/recalculateTotalPrices'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { roundTo } from 'round-to'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const handleChangeOfQtyCell = (props: Props): void => {
  const qtyCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockQtyCell',
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
      }),
    ) ?? null

  if (qtyCellEditor === null) {
    return
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'qty',
    html: qtyCellEditor.getHTML(),
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
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockPriceCell',
          blockIndex: props.blockIndex,
          rowIndex: props.rowIndex,
        }),
      ) ?? null,
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
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockSubTotalPrice',
          blockIndex: props.blockIndex,
          rowIndex: null,
        }),
      ) ?? null,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })

  recalculateTotalPrices()
}
