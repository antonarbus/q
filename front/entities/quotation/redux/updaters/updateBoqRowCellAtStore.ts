import { dispatch } from '@lib_instances/store'
import { getNumberFromString } from '@shared/utils/getNumberFromString'
import { getTextContentFromHtml } from '@shared/utils/getTextContentFromHtml'
import type { RowCellKey } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'
import { quotationSlice } from '../quotationSlice'

type Props = {
  html: string
  blockIndex: number
  rowIndex: number
  boqRowCellKey: RowCellKey
}

type Res = {
  didUpdate: boolean
}

export const updateBoqRowCellAtStore = ({
  html,
  blockIndex,
  rowIndex,
  boqRowCellKey,
}: Props): Res => {
  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = boqRow[boqRowCellKey].html
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
    quotationSlice.actions.updateBoqCellReducer({
      blockIndex,
      rowIndex,
      html,
      value: cellValueFromHtml,
      boqRowCellKey,
    }),
  )

  return {
    didUpdate: true,
  }
}
