import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberAtHtmlIncrementally } from '@shared/lib'
import { type BoqColumnKey } from '@shared/types'
import { getBoqRowFromStore } from '../redux/getters/getBoqRowFromStore'
import { updateBoqRowCellAtStore } from '../redux/updaters/updateBoqRowCellAtStore'

type Props = {
  itemIndex: number
  rowIndex: number
  editor: FroalaEditor | null
  boqColumnKey: BoqColumnKey
  value: number
  triggerContentChange?: boolean
}

export const updateBoqRowCellWithValue = ({
  itemIndex,
  rowIndex,
  editor,
  boqColumnKey,
  value,
  triggerContentChange,
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

  void updateNumberAtHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: value,
    editor,
    html: boqRow[boqColumnKey].html,
    triggerContentChange,
  })
}
