import { getRowFromStoreByIndex } from '@entity/quotation/redux/getter/getRowFromStoreByIndex'
import { updateCellAtStore } from '@entity/quotation/redux/updater/updateCellAtStore'
import { recalculateSubTotalPrices } from '@entity/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@entity/quotation/util/recalculateTotalPrices'
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

export const onChangePriceCellAtBoqBlock = (props: Props): void => {
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

  const updateCellRes = updateCellAtStore({
    html: priceCellEditor.getHTML(),
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'price',
  })

  if (updateCellRes.didUpdate === false) {
    return
  }

  const row = getRowFromStoreByIndex({
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
          getRegistryKey({
            editorName: 'boqBlockQtyCell',
            blockIndex: props.blockIndex,
            rowIndex: props.rowIndex,
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
          getRegistryKey({
            editorName: 'boqBlockItemPriceCell',
            blockIndex: props.blockIndex,
            rowIndex: props.rowIndex,
          }),
        ) ?? null,
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      cellKey: 'itemPrice',
      value: newItemPriceValueRounded,
    })
  }

  recalculateSubTotalPrices({ incrementally: true })
  recalculateTotalPrices()
}
