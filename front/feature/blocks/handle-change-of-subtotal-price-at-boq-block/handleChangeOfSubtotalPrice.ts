import { getBoqHeaderFromStore } from '@entity/quotation/redux/getter/getBoqHeaderFromStore'
import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { updateBoqHeaderAtStore } from '@entity/quotation/redux/updater/updateBoqHeaderAtStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import type { Editor } from '@tiptap/react'
import { roundTo } from 'round-to'
import { toast } from 'sonner'
import type { RowEditorRefs } from '@entity/quotation/ref/rowEditorRefs'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: EditorRef
  rowEditorRefs: RowEditorRefs
}

export const handleChangeOfSubtotalPrice = (props: Props): void => {
  if (props.subTotalPriceEditorRef.current === null) {
    return
  }

  const rows = getRowsFromStore({ blockIndex: props.blockIndex })

  if (rows === undefined) {
    return
  }

  updateBoqHeaderAtStore({
    editorRef: props.subTotalPriceEditorRef,
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

  const subTotalPriceFromStore = getBoqHeaderFromStore({
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
      editor: props.rowEditorRefs.at(index)?.price.current ?? null,
    }
  })

  const areAllCellsPinned = prices.every((price) => price.isPinned)

  if (areAllCellsPinned === true) {
    toast.info(`Can't be changed. All row prices are pinned.`)

    updateSubTotalPriceWithValue({
      blockIndex: props.blockIndex,
      subTotalPriceEditor: props.subTotalPriceEditorRef.current,
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
      subTotalPriceEditor: props.subTotalPriceEditorRef.current,
      value: prevSubTotalPriceValue,
      incrementally: true,
    })
  }

  prices.forEach((price, rowIndex) => {
    updateCellWithValue({
      cellKey: 'price',
      editor: props.rowEditorRefs.at(rowIndex)?.price.current ?? null,
      blockIndex: props.blockIndex,
      rowIndex,
      value: price.newValue,
    })

    const row = getRowFromStore({ blockIndex: props.blockIndex, rowIndex })

    const isItemPricePinned = row?.itemPrice.pin.isPinned

    if (isItemPricePinned === true) {
      if (row.itemPrice.value === 0) {
        return
      }

      const newQtyValue = row.price.value / row.itemPrice.value
      const newQtyValueRounded = roundTo(newQtyValue, 3)

      updateCellWithValue({
        editor: props.rowEditorRefs.at(rowIndex)?.qty.current ?? null,
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
        editor: props.rowEditorRefs.at(rowIndex)?.itemPrice.current ?? null,
        blockIndex: props.blockIndex,
        rowIndex,
        cellKey: 'itemPrice',
        value: newItemPriceValueRounded,
      })
    }
  })

  const rowsUpdated = getRowsFromStore({ blockIndex: props.blockIndex })

  if (rowsUpdated === undefined) {
    return
  }

  const subTotalPriceValueNew: number = rowsUpdated.reduce(
    (accumulator: number, row: RowBlock) => {
      const price = row.price.value

      return accumulator + price
    },
    0,
  )

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    blockIndex: props.blockIndex,
    subTotalPriceEditor: props.subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
