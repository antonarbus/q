import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberInHtmlIncrementallyByFroala } from 'client/shared/lib'
import { updateBoqRowCellAtStore } from './updateBoqRowCellAtStore'
import { roundTo } from 'round-to'
import { getBoqRow } from 'client/entities/items'
import { type BoqColumnKey } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  priceCellEditor: FroalaEditor | null
}

const boqColumnKey: BoqColumnKey = 'price'

export const updateBoqRowPriceCell = ({
  itemIndex,
  rowIndex,
  priceCellEditor,
}: Props): void => {
  if (priceCellEditor === null) return

  const boqRow = getBoqRow({ itemIndex, rowIndex })
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

  updateNumberInHtmlIncrementallyByFroala({
    oldNumber: priceValueFromHtml,
    newNumber: newPriceValueRounded,
    editor: priceCellEditor,
    html: boqRow[boqColumnKey].html,
  })
}
