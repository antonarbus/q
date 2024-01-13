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
  value: number
}

export const updateBoqRowCellAtStoreAndVisually = ({
  itemIndex,
  rowIndex,
  editor,
  boqColumnKey,
  value,
}: Props): void => {
  if (editor === null) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const priceTextContent = getTextContentFromHtml({
    html: boqRow[boqColumnKey].html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqRow[boqColumnKey].html,
    oldNumber: priceValueFromHtml,
    newNumber: value,
  })

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqColumnKey,
    html: updatedHtml,
  })

  void updateNumberInHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: value,
    editor,
    html: boqRow[boqColumnKey].html,
  })
}
