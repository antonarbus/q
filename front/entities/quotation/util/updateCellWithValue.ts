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

export const updateCellWithValue = (props: Props): void => {
  if (props.editor === null) {
    return
  }

  const row = getRowFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return
  }

  const priceTextContent = getTextContentFromHtml({
    html: row[props.cellKey].html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: row[props.cellKey].html,
    newNumber: props.value,
  })

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: props.cellKey,
    html: updatedHtml,
  })

  updateNumberAtHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: props.value,
    editor: props.editor,
    html: row[props.cellKey].html,
  })
}
