import { roundTo } from 'round-to'
import {
  didBoqCellContentChange,
  getBoqRowFromStore,
  getBoqRowsFromStore,
  updateBoqRowCellAtStore,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
  type Row,
  boqRowCellKey,
} from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/type/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
  subTotalPriceEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const updateBoqRowQtyCell = ({
  qtyCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  if (qtyCellEditorRef.current === null) {
    return
  }

  const didContentChange = didBoqCellContentChange({
    editor: qtyCellEditorRef.current,
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
  })

  if (didContentChange === false) {
    return
  }

  updateBoqRowCellAtStore({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
    html: qtyCellEditorRef.current.html.get(),
  })

  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return
  }

  const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateBoqRowCellWithValue({
    boqRowCellKey: boqRowCellKey.price,
    editor: priceCellEditorRef.current,
    blockIndex,
    rowIndex,
    value: newPriceValueRounded,
  })

  const boqRows = getBoqRowsFromStore({ blockIndex })

  if (boqRows === undefined) {
    return
  }

  const subTotalPriceValueNew: number = boqRows.reduce(
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
