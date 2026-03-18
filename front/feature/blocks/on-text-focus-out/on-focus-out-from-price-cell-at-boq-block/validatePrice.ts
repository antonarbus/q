import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { isRowPriceValid } from '@entity/quotation/util/isRowPriceValid'
import { recalculateSubTotalPrices } from '@entity/quotation/util/recalculateSubTotalPrices'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { roundTo } from 'round-to'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const validatePrice = (props: Props): void => {
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

    recalculateSubTotalPrices({ incrementally: true })
  }
}
