import { dispatch, getState } from '@lib_instances/store'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'
import type { BoqRowCellKey } from '../../types'
import { quotationSlice } from '../quotationSlice'
import { itemType } from '@entities/quotation/consts/itemType'

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
  const block = getState().quotation.blocks[0]

  if (block?.type !== itemType.row) {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = block[boqRowCellKey].html
  const didTextChange = prevHtml !== html

  if (!didTextChange) {
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
