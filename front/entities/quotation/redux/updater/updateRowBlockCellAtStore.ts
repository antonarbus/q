import { dispatch, getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { quotationSlice } from '../quotationSlice'
import { itemType } from '@entities/quotation/const/itemType'
import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'

type Props = {
  html: string
  boqRowCellKey: BoqRowCellKey
}

type Res = {
  didUpdate: boolean
}

export const updateRowBlockCellAtStore = ({
  html,
  boqRowCellKey,
}: Props): Res => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = block[boqRowCellKey].html
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
      boqRowCellKey,
    }),
  )

  return {
    didUpdate: true,
  }
}
