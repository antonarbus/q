import { cellKey } from '@entities/quotation/const/cellKey'
import { getBoqHeaderFromStore } from '@entities/quotation/redux/getter/getBoqHeaderFromStore'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import { updateBoqHeaderCellAtStore } from '@entities/quotation/redux/updater/updateBoqHeaderCellAtStore'
import type { Row, RowEditorRefs } from '@entities/quotation/type'
import { didBoqHeaderCellContentChange } from '@entities/quotation/util/didBoqHeaderCellContentChange'
import { updateCellWithValue } from '@entities/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entities/quotation/util/updateSubTotalPriceWithValue'
import type { FroalaEditor, FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'
import { toast } from 'sonner'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: RowEditorRefs
}

export const updateSubtotalPrice = ({
  subTotalPriceEditorRef,
  blockIndex,
  boqRowEditorRefs,
}: Props): void => {
  if (subTotalPriceEditorRef.current === null) {
    return
  }

  const didContentChange = didBoqHeaderCellContentChange({
    editor: subTotalPriceEditorRef.current,
    blockIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  if (didContentChange === false) {
    return
  }

  const boqRows = getRowsFromStore({ blockIndex })

  if (boqRows === undefined) {
    return
  }

  updateBoqHeaderCellAtStore({
    editorRef: subTotalPriceEditorRef,
    blockIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  const prevSubTotalPriceValue = boqRows.reduce((accumulator, row) => {
    return accumulator + row.price.value
  }, 0)

  const pinnedPricesSum = boqRows.reduce((accumulator, row) => {
    if (row.price.pin.isPinned) {
      return accumulator + row.price.value
    }

    return accumulator
  }, 0)

  const subTotalPriceFromStore = getBoqHeaderFromStore({
    blockIndex,
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
    editor: FroalaEditor | null
  }[]

  const prices: Prices = boqRows.map((row, index) => {
    const { value: oldValue } = row.price
    const { isPinned } = row.price.pin

    const newValue = oldValue * (unpinnedPricesSumTarget / unpinnedPricesSum)

    return {
      oldValue,
      isPinned,
      newValue: isPinned === true ? oldValue : roundTo(newValue, 2),
      editor: boqRowEditorRefs.at(index)?.price.current ?? null,
    }
  })

  const areAllCellsPinned = prices.every((price) => price.isPinned)

  if (areAllCellsPinned === true) {
    toast.info(`Can't be changed. All row prices are pinned.`)

    updateSubTotalPriceWithValue({
      blockIndex,
      subTotalPriceEditor: subTotalPriceEditorRef.current,
      value: prevSubTotalPriceValue,
      incrementally: true,
    })
  }

  if (unpinnedPricesSum === 0) {
    toast.info(
      'Unpinned prices give zero. Impossible to adjust individual prices.',
    )

    updateSubTotalPriceWithValue({
      blockIndex,
      subTotalPriceEditor: subTotalPriceEditorRef.current,
      value: prevSubTotalPriceValue,
      incrementally: true,
    })
  }

  prices.forEach((price, rowIndex) => {
    updateCellWithValue({
      cellKey: cellKey.price,
      editor: boqRowEditorRefs.at(rowIndex)?.price.current ?? null,
      blockIndex,
      rowIndex,
      value: price.newValue,
    })

    const row = getRowFromStore({ blockIndex, rowIndex })

    const isItemPricePinned = row?.itemPrice.pin.isPinned

    if (isItemPricePinned === true) {
      if (row.itemPrice.value === 0) {
        return
      }

      const newQtyValue = row.price.value / row.itemPrice.value
      const newQtyValueRounded = roundTo(newQtyValue, 3)

      updateCellWithValue({
        editor: boqRowEditorRefs.at(rowIndex)?.qty.current ?? null,
        blockIndex,
        rowIndex,
        cellKey: cellKey.qty,
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
        editor: boqRowEditorRefs.at(rowIndex)?.itemPrice.current ?? null,
        blockIndex,
        rowIndex,
        cellKey: cellKey.itemPrice,
        value: newItemPriceValueRounded,
      })
    }
  })

  const boqRowsUpdated = getRowsFromStore({ blockIndex })

  if (boqRowsUpdated === undefined) {
    return
  }

  const subTotalPriceValueNew: number = boqRowsUpdated.reduce(
    (accumulator: number, row: Row) => {
      const price = row.price.value

      return accumulator + price
    },
    0,
  )

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    blockIndex,
    subTotalPriceEditor: subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
