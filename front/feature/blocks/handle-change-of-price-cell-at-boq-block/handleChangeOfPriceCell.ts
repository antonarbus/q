import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { roundTo } from 'round-to'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { blockEditorKey, rowEditorKey } from '@shared/lib/tiptap/editorKey'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const handleChangeOfPriceCell = (props: Props): void => {
  const priceCellEditor =
    editorRegistry.get(
      rowEditorKey({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'price',
      }),
    ) ?? null

  if (priceCellEditor === null) {
    return
  }

  const updateCellRes = updateCellAtStore({
    html: priceCellEditor.getHTML(),
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
      editor:
        editorRegistry.get(
          rowEditorKey({
            blockIndex: props.blockIndex,
            rowIndex: props.rowIndex,
            cellKey: 'qty',
          }),
        ) ?? null,
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
      editor:
        editorRegistry.get(
          rowEditorKey({
            blockIndex: props.blockIndex,
            rowIndex: props.rowIndex,
            cellKey: 'itemPrice',
          }),
        ) ?? null,
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
    subTotalPriceEditor:
      editorRegistry.get(
        blockEditorKey({
          blockIndex: props.blockIndex,
          editorName: 'subTotalPrice',
        }),
      ) ?? null,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
