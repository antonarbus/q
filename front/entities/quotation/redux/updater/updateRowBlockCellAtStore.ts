import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { CellKey } from '@entities/quotation/const/cellKey'
import { itemType } from '@entities/quotation/const/itemType'
import { dispatch, getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { quotationSlice } from '../quotationSlice'

type Props = {
  html: string
  cellKey: CellKey
}

type Res = {
  didUpdate: boolean
}

export const updateRowBlockCellAtStore = ({ html, cellKey }: Props): Res => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = block[cellKey].html
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return {
      didUpdate: false,
    }
  }

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(
    quotationSlice.actions.updateRowBlockCellReducer({
      html,
      value: cellValueFromHtml,
      cellKey,
    }),
  )

  return {
    didUpdate: true,
  }
}
