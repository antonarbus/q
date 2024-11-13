import type FroalaEditor from 'froala-editor'
import type { MutableRefObject } from 'react'
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

type Props = {
  itemPriceCellEditorRef: MutableRefObject<FroalaEditor | null>
  priceCellEditorRef: MutableRefObject<FroalaEditor | null>
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
  blockIndex: number
  rowIndex: number
}

export const updateBoqRowItemPriceCell = ({
  itemPriceCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  if (itemPriceCellEditorRef.current === null) {
    return
  }

  const didContentChange = didBoqCellContentChange({
    editor: itemPriceCellEditorRef.current,
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.itemPrice,
  })

  if (!didContentChange) {
    return
  }

  updateBoqRowCellAtStore({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.itemPrice,
    html: itemPriceCellEditorRef.current.html.get(),
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
