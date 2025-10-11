import {
  boqRowCellKey,
  didBoqHeaderCellContentChange,
  getBoqHeaderFromStore,
  getBoqRowFromStore,
  getBoqRowsFromStore,
  type Row,
  type RowEditorRefs,
  updateBoqHeaderCellAtStore,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
} from '@entities/quotation'
import type { FroalaEditor, FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'
import { toast } from 'sonner'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: RowEditorRefs
}

export const updateSubtotalPriceCell = ({
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

  const boqRows = getBoqRowsFromStore({ blockIndex })

  if (boqRows === undefined) {
    return
  }

  updateBoqHeaderCellAtStore({
    editorRef: subTotalPriceEditorRef,
    blockIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  const prevSubTotalPriceValue = boqRows.reduce((accumulator, boqRow) => {
    return accumulator + boqRow.price.value
  }, 0)

  const pinnedPricesSum = boqRows.reduce((accumulator, boqRow) => {
    if (boqRow.price.pin.isPinned) {
      return accumulator + boqRow.price.value
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

  const prices: Prices = boqRows.map((boqRow, index) => {
    const { value: oldValue } = boqRow.price
    const { isPinned } = boqRow.price.pin

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
    updateBoqRowCellWithValue({
      boqRowCellKey: boqRowCellKey.price,
      editor: boqRowEditorRefs.at(rowIndex)?.price.current ?? null,
      blockIndex,
      rowIndex,
      value: price.newValue,
    })

    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

    const isItemPricePinned = boqRow?.itemPrice.pin.isPinned

    if (isItemPricePinned === true) {
      if (boqRow.itemPrice.value === 0) {
        return
      }

      const newQtyValue = boqRow.price.value / boqRow.itemPrice.value
      const newQtyValueRounded = roundTo(newQtyValue, 3)

      updateBoqRowCellWithValue({
        editor: boqRowEditorRefs.at(rowIndex)?.qty.current ?? null,
        blockIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.qty,
        value: newQtyValueRounded,
      })
    }

    const isQtyPinned = boqRow?.qty.pin.isPinned

    if (isQtyPinned === true) {
      if (boqRow.qty.value === 0) {
        return
      }

      const newItemPriceValue = boqRow.price.value / boqRow.qty.value
      const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

      updateBoqRowCellWithValue({
        editor: boqRowEditorRefs.at(rowIndex)?.itemPrice.current ?? null,
        blockIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.itemPrice,
        value: newItemPriceValueRounded,
      })
    }
  })

  const boqRowsUpdated = getBoqRowsFromStore({ blockIndex })

  if (boqRowsUpdated === undefined) {
    return
  }

  const subTotalPriceValueNew: number = boqRowsUpdated.reduce(
    (accumulator: number, boqRow: Row) => {
      const price = boqRow.price.value

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
