import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'
import { didBoqHeaderCellContentChange, getBoqHeaderFromStore, getBoqRowsFromStore, saveItemsLocally, updateBoqHeaderCellAtStore, updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from '@entities/items'
import { notify } from '@shared/ui/top_msg'

type Props = {
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqPriceEditorRefs: Array<{
    current: FroalaEditor | null
  }>
}

export const updateSubtotalPriceCell = ({
  subTotalPriceEditorRef,
  itemIndex,
  boqPriceEditorRefs,
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
      editor: boqPriceEditorRefs.at(index)?.current ?? null,
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

  prices.forEach((price, index) => {
    updateBoqRowCellWithValue({
      boqRowCellKey: 'price',
      editor: price.editor,
      itemIndex,
      rowIndex: index,
      value: price.newValue,
      triggerContentChange: true,
    })
  })

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
