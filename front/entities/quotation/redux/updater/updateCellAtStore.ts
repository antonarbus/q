import type { CellKey } from '@back/entity/quotation/schema'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { getNumberFromString } from '@front/shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@front/shared/util/getTextContentFromHtml'
import { getRowFromStoreByIndex } from '../getter/getRowFromStoreByIndex'
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
  const row = getRowFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

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

  reduxHolder.dispatch(
    quotationSlice.actions.updateCell({
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
