import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import type { FroalaEditor } from '@shared/types/froala'
import { getNumberFromString } from '@shared/utils/getNumberFromString'
import { getTextContentFromHtml } from '@shared/utils/getTextContentFromHtml'
import { getStringWithNewFormattedNumber } from '@shared/utils/getStringWithNewFormattedNumber'
import { getState } from '@shared/lib/redux'
import { itemType } from '../consts/itemType'
import { updateRowBlockCellAtStore } from '../redux/updaters/updateRowBlockCellAtStore'
import { bookmarkPosAtBlocks } from '../consts/bookmarkPosAtBlocks'
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
  if (editor === null) return

  const block = getState().quotation.blocks[bookmarkPosAtBlocks]
  if (block?.type !== itemType.row) return

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
