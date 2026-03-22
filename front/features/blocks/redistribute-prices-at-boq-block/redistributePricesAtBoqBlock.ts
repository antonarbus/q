import { getBoqHeaderFromStoreByIndex } from '@front/entities/quotation/redux/getter/getBoqHeaderFromStoreByIndex'
import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { getRowsFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowsFromStoreByIndex'
import { updateBoqHeaderAtStore } from '@front/entities/quotation/redux/updater/updateBoqHeaderAtStore'
import { updateCellWithValue } from '@front/entities/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@front/entities/quotation/util/updateSubTotalPriceWithValue'
import type { Editor } from '@tiptap/react'
import { roundTo } from 'round-to'
import { toast } from 'sonner'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const redistributePricesAtBoqBlock = (props: Props): void => {
  const subTotalPriceEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockSubTotalPrice',
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  if (subTotalPriceEditor === null) {
    return
  }

  const rows = getRowsFromStoreByIndex({ blockIndex: props.blockIndex })

  if (rows === undefined) {
    return
  }

  updateBoqHeaderAtStore({
    editor: subTotalPriceEditor,
    blockIndex: props.blockIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  const prevSubTotalPriceValue = rows.reduce((accumulator, row) => {
    return accumulator + row.price.value
  }, 0)

  const pinnedPricesSum = rows.reduce((accumulator, row) => {
    if (row.price.pin.isPinned) {
      return accumulator + row.price.value
    }

    return accumulator
  }, 0)

  const subTotalPriceFromStore = getBoqHeaderFromStoreByIndex({
    blockIndex: props.blockIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  if (subTotalPriceFromStore === undefined) {
    return
  }

  const newSubTotalPriceValue = subTotalPriceFromStore.value

  const unpinnedPricesSumTarget = newSubTotalPriceValue - pinnedPricesSum
  const unpinnedPricesSum = prevSubTotalPriceValue - pinnedPricesSum

  type Prices = {
    oldValue: number
    isPinned: boolean
    newValue: number
    editor: Editor | null
  }[]

  const prices: Prices = rows.map((row, index) => {
    const newValue =
      row.price.value * (unpinnedPricesSumTarget / unpinnedPricesSum)

    return {
      oldValue: row.price.value,
      isPinned: row.price.pin.isPinned,
      newValue:
        row.price.pin.isPinned === true
          ? row.price.value
          : roundTo(newValue, 2),
      editor:
        editorRegistry.get(
          getRegistryKey({
            editorName: 'boqBlockPriceCell',
            blockIndex: props.blockIndex,
            rowIndex: index,
          }),
        ) ?? null,
    }
  })

  const areAllCellsPinned = prices.every((price) => price.isPinned)

  if (areAllCellsPinned === true) {
    toast.info(`Can't be changed. All row prices are pinned.`)

    updateSubTotalPriceWithValue({
      blockIndex: props.blockIndex,
      subTotalPriceEditor,
      value: prevSubTotalPriceValue,
      incrementally: true,
    })
  }

  if (unpinnedPricesSum === 0) {
    toast.info(
      'Unpinned prices give zero. Impossible to adjust individual prices.',
    )

    updateSubTotalPriceWithValue({
      blockIndex: props.blockIndex,
      subTotalPriceEditor,
      value: prevSubTotalPriceValue,
      incrementally: true,
    })
  }

  prices.forEach((price, rowIndex) => {
    updateCellWithValue({
      cellKey: 'price',
      editor:
        editorRegistry.get(
          getRegistryKey({
            editorName: 'boqBlockPriceCell',
            blockIndex: props.blockIndex,
            rowIndex,
          }),
        ) ?? null,
      blockIndex: props.blockIndex,
      rowIndex,
      value: price.newValue,
    })

    const row = getRowFromStoreByIndex({
      blockIndex: props.blockIndex,
      rowIndex,
    })

    const isItemPricePinned = row?.itemPrice.pin.isPinned

    if (isItemPricePinned === true) {
      if (row.itemPrice.value === 0) {
        return
      }

      const newQtyValue = row.price.value / row.itemPrice.value
      const newQtyValueRounded = roundTo(newQtyValue, 3)

      updateCellWithValue({
        editor:
          editorRegistry.get(
            getRegistryKey({
              editorName: 'boqBlockQtyCell',
              blockIndex: props.blockIndex,
              rowIndex,
            }),
          ) ?? null,
        blockIndex: props.blockIndex,
        rowIndex,
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
              rowIndex,
            }),
          ) ?? null,
        blockIndex: props.blockIndex,
        rowIndex,
        cellKey: 'itemPrice',
        value: newItemPriceValueRounded,
      })
    }
  })
}
