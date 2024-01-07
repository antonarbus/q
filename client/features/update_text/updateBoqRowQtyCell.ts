import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberInHtmlIncrementallyByFroala } from 'client/shared/lib'
import { updateBoqRowCellAtStore } from './updateBoqRowCellAtStore'
import { roundTo } from 'round-to'
import { getBoqRow } from 'client/entities/items'
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

  const boqRow = getBoqRow({ itemIndex, rowIndex })
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

  updateNumberInHtmlIncrementallyByFroala({
    oldNumber: qtyValueFromHtml,
    newNumber: newQtyValueRounded,
    editor: qtyCellEditor,
    html: boqRow[boqColumnKey].html,
  })
}
