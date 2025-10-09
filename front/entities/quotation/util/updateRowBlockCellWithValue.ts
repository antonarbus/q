import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { getState } from '@shared/lib/redux'
import type { FroalaEditor } from '@shared/type/froala'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { BOOKMARK_POS_AT_BLOCKS } from '../const/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '../const/boqRowCellKey'
import { itemType } from '../const/itemType'
import { updateRowBlockCellAtStore } from '../redux/updater/updateRowBlockCellAtStore'

type Props = {
  editor: FroalaEditor | null
  boqRowCellKey: BoqRowCellKey
  value: number
}

export const updateRowBlockCellWithValue = ({
  editor,
  boqRowCellKey,
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
    html: row[boqRowCellKey].html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: row[boqRowCellKey].html,
    oldNumber: priceValueFromHtml,
    newNumber: value,
  })

  updateRowBlockCellAtStore({
    boqRowCellKey,
    html: updatedHtml,
  })

  updateNumberAtHtmlIncrementally({
    oldNumber: priceValueFromHtml,
    newNumber: value,
    editor,
    html: row[boqRowCellKey].html,
  })
}
