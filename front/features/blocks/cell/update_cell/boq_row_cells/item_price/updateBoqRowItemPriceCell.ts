import type { FroalaEditor } from '@shared/type/froala'
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
  itemPriceCellEditorRef: React.RefObject<FroalaEditor | null>
  priceCellEditorRef: React.RefObject<FroalaEditor | null>
  subTotalPriceEditorRef: React.RefObject<FroalaEditor | null>
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

  if (didContentChange === false) {
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
