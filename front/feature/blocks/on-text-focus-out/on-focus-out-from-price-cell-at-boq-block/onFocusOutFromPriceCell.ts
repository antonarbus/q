import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'
import { getRowFromStoreByIndex } from '@entity/quotation/redux/getter/getRowFromStoreByIndex'
import { isRowPriceValid } from '@entity/quotation/util/isRowPriceValid'
import { recalculateSubTotalPrices } from '@entity/quotation/util/recalculateSubTotalPrices'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { roundTo } from 'round-to'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const onFocusOutFromPriceCell = (props: Props): void => {
  const priceCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockPriceCell',
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
      }),
    ) ?? null

  if (priceCellEditor === null) {
    return
  }

  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'price',
    editor: priceCellEditor,
    roundToTwoDecimals: true,
  })

  // Validate price

  const isPriceValid = isRowPriceValid({
    html: priceCellEditor.getHTML(),
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (isPriceValid === false) {
    const row = getRowFromStoreByIndex({
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

    recalculateSubTotalPrices({ incrementally: true })
  }
}
