import type { CellKey } from '@entities/quotation/const/cellKey'
import { dispatch } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { getRowFromStore } from '../getter/getRowFromStore'
import { quotationSlice } from '../quotationSlice'

type Props = {
  html: string
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

type Res = {
  didUpdate: boolean
}

export const updateCellAtStore = ({
  html,
  blockIndex,
  rowIndex,
  cellKey,
}: Props): Res => {
  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = row[cellKey].html
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
    quotationSlice.actions.updateCellReducer({
      blockIndex,
      rowIndex,
      html,
      value: cellValueFromHtml,
      cellKey,
    }),
  )

  return {
    didUpdate: true,
  }
}
