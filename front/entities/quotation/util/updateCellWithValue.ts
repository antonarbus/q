import type { FroalaEditor } from '@shared/lib/froala/froala'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import type { CellKey } from '../const/cellKey'
import { getRowFromStore } from '../redux/getter/getRowFromStore'
import { updateCellAtStore } from '../redux/updater/updateCellAtStore'

type Props = {
  blockIndex: number
  rowIndex: number
  editor: FroalaEditor | null
  cellKey: CellKey
  value: number
}

export const updateCellWithValue = ({
  blockIndex,
  rowIndex,
  editor,
  cellKey,
  value,
}: Props): void => {
  if (editor === null) {
    return
  }

  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return
  }

  const priceTextContent = getTextContentFromHtml({
    html: row[cellKey].html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: row[cellKey].html,
    newNumber: value,
  })

  updateCellAtStore({
    blockIndex,
    rowIndex,
    cellKey,
    html: updatedHtml,
  })

  updateNumberAtHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: value,
    editor,
    html: row[cellKey].html,
  })
}
