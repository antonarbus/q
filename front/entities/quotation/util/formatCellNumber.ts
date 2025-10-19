import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'
import type { CellKey } from '../const/cellKey'
import { getBoqRowFromStore } from '../redux/getter/getBoqRowFromStore'
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

export const formatCellNumber = ({
  blockIndex,
  rowIndex,
  cellKey,
  editorRef,
  roundToTwoDecimals,
}: Props): Res => {
  if (editorRef.current === null) {
    return {
      didUpdate: false,
    }
  }

  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return {
      didUpdate: false,
    }
  }

  const { value, html } = boqRow[cellKey]

  const roundedValue = roundTo(value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: html,
    oldNumber: value,
    newNumber: roundToTwoDecimals === true ? roundedValue : value,
  })

  if (html === newHtml) {
    return {
      didUpdate: false,
    }
  }

  dispatch(
    quotationSlice.actions.updateBoqCellReducer({
      blockIndex,
      rowIndex,
      html: newHtml,
      value: roundToTwoDecimals === true ? roundedValue : value,
      cellKey,
    }),
  )

  editorRef.current.html.set(newHtml)

  return {
    didUpdate: true,
  }
}
