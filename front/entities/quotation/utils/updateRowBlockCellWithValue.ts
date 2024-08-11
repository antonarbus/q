import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import type { FroalaEditor } from '@shared/types/froala'
import {
  getNumberFromString,
  getTextContentFromHtml,
  getStringWithNewFormattedNumber,
} from '@shared/utils'
import type { BoqRowCellKey } from '../types'
import { getState } from '@lib_instances/store'
import { itemType } from '../consts/itemType'
import { updateRowBlockCellAtStore } from '../redux/updaters/updateRowBlockCellAtStore'

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

  const block = getState().quotation.blocks[1000]
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
