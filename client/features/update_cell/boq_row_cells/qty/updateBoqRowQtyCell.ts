import { roundTo } from 'round-to'
import { didBoqCellContentChange, getBoqRowFromStore, getBoqRowsFromStore, saveItemsLocally, updateBoqRowCellAtStore, updateBoqRowCellWithValue, updateSubTotalPriceWithValue, type BoqRow, boqRowCellKey } from '@entities/items'
import { markAsNotSaved } from '@shared/isSaved'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
  subTotalPriceEditorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
}

export const updateBoqRowQtyCell = ({
  qtyCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  if (qtyCellEditorRef.current === null) return

  const didContentChange = didBoqCellContentChange({
    editor: qtyCellEditorRef.current,
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
  })

  if (!didContentChange) return

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
    html: qtyCellEditorRef.current.html.get(),
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

  const { didChange } = updateSubTotalPriceWithValue({
    itemIndex,
    subTotalPriceEditor: subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })

  if (!didChange) return

  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  markAsNotSaved()
}
