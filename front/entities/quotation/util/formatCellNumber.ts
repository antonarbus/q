import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'
import type { CellKey } from '../const/cellKey'
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

  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return {
      didUpdate: false,
    }
  }

  const { value, html } = row[cellKey]

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
    quotationSlice.actions.updateCellReducer({
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
