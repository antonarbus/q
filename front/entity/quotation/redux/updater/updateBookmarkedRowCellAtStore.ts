import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { dispatch, getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { quotationSlice } from '../quotationSlice'
import type { CellKey } from '@back/entity/quotation/schema'

type Props = {
  html: string
  cellKey: CellKey
}

type Res = {
  didUpdate: boolean
}

export const updateBookmarkedRowCellAtStore = (props: Props): Res => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = block[props.cellKey].html
  const didTextChange = prevHtml !== props.html

  if (didTextChange === false) {
    return {
      didUpdate: false,
    }
  }

  const cellTextContent = getTextContentFromHtml({ html: props.html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(
    quotationSlice.actions.updateBookmarkedRowCell({
      html: props.html,
      value: cellValueFromHtml,
      cellKey: props.cellKey,
    }),
  )

  return {
    didUpdate: true,
  }
}
