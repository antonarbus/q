import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'
import { getBoqRowFromStore, getBoqRowsFromStore, updateBoqRowCellAtStore, updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from '@entities/items'
import { type BoqRow, type BoqColumnKey } from '@shared/types'

type Props = {
  qtyCellEditorRef: MutableRefObject<FroalaEditor | null>
  itemPriceCellEditorRef: MutableRefObject<FroalaEditor | null>
  priceCellEditorRef: MutableRefObject<FroalaEditor | null>
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqRowPriceCell = ({
  qtyCellEditorRef,
  itemPriceCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): void => {
  if (priceCellEditorRef.current === null) return

  // const didContentChange = didBoqCellContentChange({
  //   editor: priceCellEditorRef.current,
  //   itemIndex,
  //   rowIndex,
  //   boqColumnKey,
  // })

  // if (!didContentChange) return

  updateBoqRowCellAtStore({
    html: priceCellEditorRef.current.html.get(),
    itemIndex,
    rowIndex,
    boqColumnKey,
  })

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
      boqColumnKey: 'qty',
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
      boqColumnKey: 'itemPrice',
      value: newItemPriceValueRounded,
    })
  }

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
}
