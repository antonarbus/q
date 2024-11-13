import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import type { FroalaEditor } from '@shared/types/froala'
import { getNumberFromString } from '@shared/utils/getNumberFromString'
import { getTextContentFromHtml } from '@shared/utils/getTextContentFromHtml'
import { getStringWithNewFormattedNumber } from '@shared/utils/getStringWithNewFormattedNumber'
import { getBoqRowFromStore } from '../redux/getters/getBoqRowFromStore'
import { updateBoqRowCellAtStore } from '../redux/updaters/updateBoqRowCellAtStore'
import type { BoqRowCellKey } from '../consts/boqRowCellKey'

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
  if (editor === null) {
    return
  }

  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return
  }

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

  updateNumberAtHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: value,
    editor,
    html: boqRow[boqRowCellKey].html,
  })
}
