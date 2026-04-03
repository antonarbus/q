import type { Editor } from '@tiptap/react'
import { updateNumberAtHtmlIncrementally } from '@front/shared/lib/tiptap/util/updateNumberAtHtmlIncrementally'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { getNumberFromString } from '@front/shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@front/shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@front/shared/util/getTextContentFromHtml'
import { BOOKMARK_POS_AT_BLOCKS } from '../redux/bookmarkPosAtBlocks'
import type { CellKey } from '@back/entity/quotation/schema'
import { updateBookmarkedRowCellAtStore } from '../redux/updater/updateBookmarkedRowCellAtStore'

type Props = {
  editor: Editor | null
  cellKey: CellKey
  value: number
}

export const updateBookmarkedRowCellWithValue = (props: Props): void => {
  if (props.editor === null) {
    return
  }

  const block = reduxHolder.getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

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
    totalPriceValueEditor: props.editor,
    html: row[props.cellKey].html,
  })
}
