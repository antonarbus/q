import { dispatch } from '@lib_instances/store'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'
import type { BoqRowCellKey } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'
import { quotationSlice } from '../quotationSlice'

type Props = {
  html: string
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

type Res = {
  didUpdate: boolean
}

export const updateBoqRowCellAtStore = ({
  html,
  itemIndex,
  rowIndex,
  boqRowCellKey,
}: Props): Res => {
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })

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
      itemIndex,
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
