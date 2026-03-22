import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { updateCellAtStore } from '@front/entities/quotation/redux/updater/updateCellAtStore'
import { updateCellWithValue } from '@front/entities/quotation/util/updateCellWithValue'
import { roundTo } from 'round-to'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const updateQtyCellAtBoqBlock = (props: Props): boolean => {
  const qtyCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockQtyCell',
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
      }),
    ) ?? null

  if (qtyCellEditor === null) {
    return false
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'qty',
    html: qtyCellEditor.getHTML(),
  })

  const row = getRowFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return false
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

  return true
}
