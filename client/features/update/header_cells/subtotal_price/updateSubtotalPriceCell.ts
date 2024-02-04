import { roundTo } from 'round-to'
import { didBoqHeaderCellContentChange, getBoqHeaderFromStore, getBoqRowsFromStore, saveItemsLocally, updateBoqHeaderCellAtStore, updateBoqRowCellWithValue, updateSubTotalPriceWithValue, getBoqRowFromStore, type BoqRow, type BoqRowEditorRefs, boqRowCellKey } from '@entities/items'
import { type FroalaEditor, type FroalaEditorRef } from '@shared/types'
import { notify } from '@shared/ui/top_msg'

type Props = {
  itemIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: BoqRowEditorRefs
}

export const updateSubtotalPriceCell = ({
  subTotalPriceEditorRef,
  itemIndex,
  boqRowEditorRefs,
}: Props): void => {
  if (subTotalPriceEditorRef.current === null) return

  const didContentChange = didBoqHeaderCellContentChange({
    editor: subTotalPriceEditorRef.current,
    itemIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  if (!didContentChange) return

  const boqRows = getBoqRowsFromStore({ itemIndex })

  if (boqRows === undefined) return

  const { didUpdate } = updateBoqHeaderCellAtStore({
    editorRef: subTotalPriceEditorRef,
    itemIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  if (didUpdate) {
    saveItemsLocally({
      msgAboveItemWithIndex: itemIndex,
    })
  }

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
    itemIndex,
    boqHeaderKey: 'subTotalPrice',
  })

  if (subTotalPriceFromStore === undefined) return

  const newSubTotalPriceValue = subTotalPriceFromStore.value

  const unpinnedPricesSumTarget = newSubTotalPriceValue - pinnedPricesSum
  const unpinnedPricesSum = prevSubTotalPriceValue - pinnedPricesSum

  type Prices = Array<{
    oldValue: number
    isPinned: boolean
    newValue: number
    editor: FroalaEditor | null
  }>

  const prices: Prices = boqRows.map((boqRow, index) => {
    const oldValue = boqRow.price.value
    const isPinned = boqRow.price.pin.isPinned

    const newValue = oldValue * (unpinnedPricesSumTarget / unpinnedPricesSum)

    return {
      oldValue,
      isPinned,
      newValue: isPinned ? oldValue : roundTo(newValue, 2),
      editor: boqRowEditorRefs.at(index)?.price.current ?? null,
    }
  })

  const areAllCellsPinned = prices.every(price => price.isPinned)

  if (areAllCellsPinned) {
    notify({
      msg: 'Can\'t be changed. All row prices are pinned.',
      type: 'info',
    })

    updateSubTotalPriceWithValue({
      itemIndex,
      subTotalPriceEditor: subTotalPriceEditorRef.current,
      value: prevSubTotalPriceValue,
      incrementally: true,
    })

    return
  }

  if (unpinnedPricesSum === 0) {
    notify({
      msg: 'Unpinned prices give zero. Impossible to adjust individual prices.',
      type: 'info',
    })

    updateSubTotalPriceWithValue({
      itemIndex,
      subTotalPriceEditor: subTotalPriceEditorRef.current,
      value: prevSubTotalPriceValue,
      incrementally: true,
    })

    return
  }

  prices.forEach((price, rowIndex) => {
    updateBoqRowCellWithValue({
      boqRowCellKey: boqRowCellKey.price,
      editor: boqRowEditorRefs.at(rowIndex)?.price.current ?? null,
      itemIndex,
      rowIndex,
      value: price.newValue,
    })

    const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })

    const isItemPricePinned = boqRow?.itemPrice.pin.isPinned

    if (isItemPricePinned) {
      if (boqRow.itemPrice.value === 0) return
      const newQtyValue = boqRow.price.value / boqRow.itemPrice.value
      const newQtyValueRounded = roundTo(newQtyValue, 3)

      updateBoqRowCellWithValue({
        editor: boqRowEditorRefs.at(rowIndex)?.qty.current ?? null,
        itemIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.qty,
        value: newQtyValueRounded,
      })
    }

    const isQtyPinned = boqRow?.qty.pin.isPinned

    if (isQtyPinned) {
      if (boqRow.qty.value === 0) return
      const newItemPriceValue = boqRow.price.value / boqRow.qty.value
      const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

      updateBoqRowCellWithValue({
        editor: boqRowEditorRefs.at(rowIndex)?.itemPrice.current ?? null,
        itemIndex,
        rowIndex,
        boqRowCellKey: boqRowCellKey.itemPrice,
        value: newItemPriceValueRounded,
      })
    }
  })

  const boqRowsUpdated = getBoqRowsFromStore({ itemIndex })
  if (boqRowsUpdated === undefined) return

  const subTotalPriceValueNew: number = boqRowsUpdated.reduce((accumulator: number, boqRow: BoqRow) => {
    const price = boqRow.price.value
    return accumulator + price
  }, 0)

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    itemIndex,
    subTotalPriceEditor: subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
