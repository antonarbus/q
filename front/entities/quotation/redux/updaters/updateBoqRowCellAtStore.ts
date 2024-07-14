import { dispatch } from '@lib_instances/store'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'
import type { BoqRowCellKey } from '../../types'
import { getBoqRowByIndexFromStore } from '../getters/getBoqRowByIndexFromStore'
import { quotationSlice } from '../quotationSlice'

type Props = {
  html: string
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
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
  const boqRow = getBoqRowByIndexFromStore({ blockIndex, rowIndex })

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
