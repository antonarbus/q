import { getRowFromStoreByIndex } from '@entity/quotation/redux/getter/getRowFromStoreByIndex'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
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

export const updateItemPriceCellAtBoqBlock = (props: Props): boolean => {
  const itemPriceCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockItemPriceCell',
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
      }),
    ) ?? null

  if (itemPriceCellEditor === null) {
    return false
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
    html: itemPriceCellEditor.getHTML(),
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
