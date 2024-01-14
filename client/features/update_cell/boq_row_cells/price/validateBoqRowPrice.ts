import { getBoqRowFromStore, getBoqRowsFromStore, isBoqRowPriceValid, updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from 'client/entities/items'
import { formatBoqRowCellNumber } from 'client/features/format_cell'
import { type BoqColumnKey, type BoqRow } from 'client/shared/types'
import { notify } from 'client/shared/ui/top_msg'
import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'

type Props = {
  priceCellEditorRef: MutableRefObject<FroalaEditor | null>
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const validateBoqRowPrice = ({
  itemIndex,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  rowIndex,
  boqColumnKey,
}: Props): void => {
  if (priceCellEditorRef.current === null) return
  if (subTotalPriceEditorRef.current === null) return

  const isPriceValid = isBoqRowPriceValid({
    html: priceCellEditorRef.current.html.get(),
    itemIndex,
    rowIndex,
  })

  if (!isPriceValid) {
    const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
    if (boqRow === undefined) return

    const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
    const newPriceValueRounded = roundTo(newPriceValue, 2)

    updateBoqRowCellWithValue({
      boqColumnKey: 'price',
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
  }

  formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqColumnKey,
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
