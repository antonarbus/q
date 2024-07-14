import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { type FroalaEditor } from '@shared/types/froala'
import {
  getNumberFromString,
  getTextContentFromHtml,
  getStringWithNewFormattedNumber,
} from '@shared/utils'
import { getBoqRowByIndexFromStore } from '../redux/getters/getBoqRowByIndexFromStore'
import { updateBoqRowCellAtStore } from '../redux/updaters/updateBoqRowCellAtStore'
import { type BoqRowCellKey } from '../types'

type Props = {
  blockIndex: number
  rowIndex: number
  editor: FroalaEditor | null
  boqRowCellKey: BoqRowCellKey
  value: number
}

export const updateBoqRowCellWithValue = ({
  blockIndex,
  rowIndex,
  editor,
  boqRowCellKey,
  value,
}: Props): void => {
  if (editor === null) return

  const boqRow = getBoqRowByIndexFromStore({ blockIndex, rowIndex })
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
    blockIndex,
    rowIndex,
    boqRowCellKey,
    html: updatedHtml,
  })

  void updateNumberAtHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: value,
    editor,
    html: boqRow[boqRowCellKey].html,
  })
}
