import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import type { FroalaEditor } from '@shared/type/froala'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getState } from '@shared/lib/redux'
import { itemType } from '../consts/itemType'
import { updateRowBlockCellAtStore } from '../redux/updaters/updateRowBlockCellAtStore'
import { BOOKMARK_POS_AT_BLOCKS } from '../consts/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '../consts/boqRowCellKey'

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
