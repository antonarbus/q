import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberAtHtmlIncrementally } from '@shared/lib'
import { getBoqRowFromStore } from '../redux/getters/getBoqRowFromStore'
import { updateBoqRowCellAtStore } from '../redux/updaters/updateBoqRowCellAtStore'
import { type BoqRowCellKey } from '../types'

type Props = {
  itemIndex: number
  rowIndex: number
  editor: FroalaEditor | null
  boqRowCellKey: BoqRowCellKey
  value: number
  triggerContentChange?: boolean
}

export const updateBoqRowCellWithValue = ({
  itemIndex,
  rowIndex,
  editor,
  boqRowCellKey,
  value,
  triggerContentChange,
}: Props): void => {
  if (editor === null) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const priceTextContent = getTextContentFromHtml({
    html: boqRow[boqRowCellKey].html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqRow[boqRowCellKey].html,
    oldNumber: priceValueFromHtml,
    newNumber: value,
  })

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqRowCellKey,
    html: updatedHtml,
  })

  void updateNumberAtHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: value,
    editor,
    html: boqRow[boqRowCellKey].html,
    triggerContentChange,
  })
}
