import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'
import { type BoqRowCellKey, getBoqRowFromStore, getBoqRowsFromStore, saveItemsLocally, updateBoqRowCellAtStore, updateBoqRowCellWithValue, updateSubTotalPriceWithValue, type BoqRow } from '@entities/items'

type Props = {
  qtyCellEditorRef: MutableRefObject<FroalaEditor | null>
  itemPriceCellEditorRef: MutableRefObject<FroalaEditor | null>
  priceCellEditorRef: MutableRefObject<FroalaEditor | null>
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const updateBoqRowPriceCell = ({
  qtyCellEditorRef,
  itemPriceCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  itemIndex,
  rowIndex,
  boqRowCellKey,
}: Props): void => {
  if (priceCellEditorRef.current === null) return

  const { didUpdate } = updateBoqRowCellAtStore({
    html: priceCellEditorRef.current.html.get(),
    itemIndex,
    rowIndex,
    boqRowCellKey,
  })

  if (!didUpdate) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })

  const isItemPricePinned = boqRow?.itemPrice.pin.isPinned

  if (isItemPricePinned) {
    if (boqRow.itemPrice.value === 0) return
    const newQtyValue = boqRow.price.value / boqRow.itemPrice.value
    const newQtyValueRounded = roundTo(newQtyValue, 5)

    updateBoqRowCellWithValue({
      editor: qtyCellEditorRef.current,
      itemIndex,
      rowIndex,
      boqRowCellKey: 'qty',
      value: newQtyValueRounded,
    })
  }

  const isQtyPinned = boqRow?.qty.pin.isPinned

  if (isQtyPinned) {
    if (boqRow.qty.value === 0) return
    const newItemPriceValue = boqRow.price.value / boqRow.qty.value
    const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

    updateBoqRowCellWithValue({
      editor: itemPriceCellEditorRef.current,
      itemIndex,
      rowIndex,
      boqRowCellKey: 'itemPrice',
      value: newItemPriceValueRounded,
    })
  }

  // update subTotalPrice
  const boqRows = getBoqRowsFromStore({ itemIndex })

  if (boqRows === undefined) return

  const subTotalPriceValueNew: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
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
