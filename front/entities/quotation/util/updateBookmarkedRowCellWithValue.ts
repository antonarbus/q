import type { FroalaEditor } from '@shared/lib/froala/froala'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { BOOKMARK_POS_AT_BLOCKS } from '../const/bookmarkPosAtBlocks'
import type { CellKey } from '@back/entities/quotation/quotationSchema'
import { updateBookmarkedRowCellAtStore } from '../redux/updater/updateBookmarkedRowCellAtStore'

type Props = {
  editor: FroalaEditor | null
  cellKey: CellKey
  value: number
}

export const updateBookmarkedRowCellWithValue = (props: Props): void => {
  if (props.editor === null) {
    return
  }

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return
  }

  const row = block

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

  updateBookmarkedRowCellAtStore({
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
