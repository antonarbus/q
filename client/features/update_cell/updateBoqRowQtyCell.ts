import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberInHtmlIncrementally } from 'client/shared/lib'
import { roundTo } from 'round-to'
import { getBoqRowFromStore, updateBoqRowCellAtStore } from 'client/entities/items'
import { type BoqColumnKey } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  qtyCellEditor: FroalaEditor | null
}

const boqColumnKey: BoqColumnKey = 'qty'

export const updateBoqRowQtyCell = ({
  itemIndex,
  rowIndex,
  qtyCellEditor,
}: Props): void => {
  if (qtyCellEditor === null) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const newQtyValue = boqRow.price.value / boqRow.itemPrice.value
  const newQtyValueRounded = roundTo(newQtyValue, 5)

  const qtyTextContent = getTextContentFromHtml({
    html: boqRow[boqColumnKey].html,
  })

  const qtyValueFromHtml = getNumberFromString({
    string: qtyTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqRow[boqColumnKey].html,
    oldNumber: qtyValueFromHtml,
    newNumber: newQtyValueRounded,
  })

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqColumnKey,
    html: updatedHtml,
  })

  void updateNumberInHtmlIncrementally({
    oldNumber: qtyValueFromHtml,
    newNumber: newQtyValueRounded,
    editor: qtyCellEditor,
    html: boqRow[boqColumnKey].html,
  })
}
