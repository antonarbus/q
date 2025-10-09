import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import type { FroalaEditor } from '@shared/type/froala'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import type { BoqRowCellKey } from '../const/boqRowCellKey'
import { getBoqRowFromStore } from '../redux/getter/getBoqRowFromStore'
import { updateBoqRowCellAtStore } from '../redux/updater/updateBoqRowCellAtStore'

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
