import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'
import { didBoqCellContentChange, getBoqRowFromStore, getBoqRowsFromStore, saveItemsLocally, updateBoqRowCellAtStore, updateBoqRowCellWithValue, updateSubTotalPriceWithValue, type BoqRow, boqRowCellKey } from '@entities/items'

type Props = {
  itemPriceCellEditorRef: MutableRefObject<FroalaEditor | null>
  priceCellEditorRef: MutableRefObject<FroalaEditor | null>
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
}

export const updateBoqRowItemPriceCell = ({
  itemPriceCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  if (itemPriceCellEditorRef.current === null) return

  const didContentChange = didBoqCellContentChange({
    editor: itemPriceCellEditorRef.current,
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
  })

  if (!didContentChange) return

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
    html: itemPriceCellEditorRef.current.html.get(),
  })

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateBoqRowCellWithValue({
    boqRowCellKey: boqRowCellKey.price,
    editor: priceCellEditorRef.current,
    itemIndex,
    rowIndex,
    value: newPriceValueRounded,
  })

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
