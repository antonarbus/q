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

export const updateCellAtStore = (props: Props): Res => {
  const row = getRowFromStore({ blockIndex: props.blockIndex, rowIndex: props.rowIndex })

  if (row === undefined) {
    return {
      didUpdate: false,
    }
  }

  const prevHtml = row[props.cellKey].html
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
    quotationSlice.actions.updateCellReducer({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      html: props.html,
      value: cellValueFromHtml,
      cellKey: props.cellKey,
    }),
  )

  return {
    didUpdate: true,
  }
}
