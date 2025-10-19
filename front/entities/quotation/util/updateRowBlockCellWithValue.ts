import type { FroalaEditor } from '@shared/lib/froala/froala'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { BOOKMARK_POS_AT_BLOCKS } from '../const/bookmarkPosAtBlocks'
import type { CellKey } from '../const/cellKey'
import { itemType } from '../const/itemType'
import { updateRowBlockCellAtStore } from '../redux/updater/updateRowBlockCellAtStore'

type Props = {
  editor: FroalaEditor | null
  cellKey: CellKey
  value: number
}

export const updateRowBlockCellWithValue = ({
  editor,
  cellKey,
  value,
}: Props): void => {
  if (editor === null) {
    return
  }

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return
  }

  const row = block

  const priceTextContent = getTextContentFromHtml({
    html: row[cellKey].html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: row[cellKey].html,
    oldNumber: priceValueFromHtml,
    newNumber: value,
  })

  updateRowBlockCellAtStore({
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
