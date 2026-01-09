import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'
import type { CellKey } from '@back/entity/quotation/schema'
import { getRowFromStore } from '../redux/getter/getRowFromStore'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
  editorRef: FroalaEditorRef
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatCellNumber = (props: Props): Res => {
  if (props.editorRef.current === null) {
    return {
      didUpdate: false,
    }
  }

  const row = getRowFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return {
      didUpdate: false,
    }
  }

  const cell = row[props.cellKey]

  const roundedValue = roundTo(cell.value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: cell.html,
    newNumber: props.roundToTwoDecimals === true ? roundedValue : cell.value,
  })

  if (cell.html === newHtml) {
    return {
      didUpdate: false,
    }
  }

  dispatch(
    quotationSlice.actions.updateCellReducer({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      html: newHtml,
      value: props.roundToTwoDecimals === true ? roundedValue : cell.value,
      cellKey: props.cellKey,
    }),
  )

  props.editorRef.current.html.set(newHtml)

  return {
    didUpdate: true,
  }
}
