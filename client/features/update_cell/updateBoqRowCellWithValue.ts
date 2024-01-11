import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberInHtmlIncrementally } from 'client/shared/lib'
import { roundTo } from 'round-to'
import { getBoqRowFromStore, updateBoqRowCellAtStore } from 'client/entities/items'
import { type BoqColumnKey } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  editor: FroalaEditor | null
  boqColumnKey: BoqColumnKey
}

// todo: make it generic
// todo: use it for price update
// todo: maybe use for other cells
export const updateBoqRowCellWithValue = ({
  itemIndex,
  rowIndex,
  editor,
  boqColumnKey,
}: Props): void => {
  if (editor === null) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  const priceTextContent = getTextContentFromHtml({
    html: boqRow[boqColumnKey].html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqRow[boqColumnKey].html,
    oldNumber: priceValueFromHtml,
    newNumber: newPriceValueRounded,
  })

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqColumnKey,
    html: updatedHtml,
  })

  void updateNumberInHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: newPriceValueRounded,
    editor,
    html: boqRow[boqColumnKey].html,
  })
}
